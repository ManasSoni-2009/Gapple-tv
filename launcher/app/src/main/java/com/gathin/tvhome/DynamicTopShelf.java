package com.gathin.tvhome;

import android.content.ContentResolver;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;
import android.util.LruCache;

import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Dynamic Top Shelf provider: dynamically fetches featured show posters, titles,
 * and recommendations from Android TV's TvContract (Watch Next & Preview Programs),
 * dynamic local/asset cache, or installed Leanback banners.
 */
public final class DynamicTopShelf {

    public static class TopShelfItem {
        public final Bitmap poster;
        public final String title;
        public final String subtitle;
        public final boolean isRichPoster;

        public TopShelfItem(Bitmap poster, String title, String subtitle, boolean isRichPoster) {
            this.poster = poster;
            this.title = title;
            this.subtitle = subtitle;
            this.isRichPoster = isRichPoster;
        }
    }

    public interface Callback {
        void onLoaded(TopShelfItem item);
    }

    private static final ExecutorService EXECUTOR = Executors.newSingleThreadExecutor();
    private static final Handler MAIN_HANDLER = new Handler(Looper.getMainLooper());
    private static final LruCache<String, TopShelfItem> MEM_CACHE = new LruCache<String, TopShelfItem>(4) {
        @Override
        protected void entryRemoved(boolean evicted, String key, TopShelfItem oldValue, TopShelfItem newValue) {
            // Cleaned by GC
        }
    };

    private static final Map<String, String[]> KNOWN_SHOWS = new HashMap<>();
    static {
        KNOWN_SHOWS.put("com.netflix.ninja", new String[]{"Stranger Things", "Trending on Netflix"});
        KNOWN_SHOWS.put("com.google.android.youtube.tv", new String[]{"Planet Earth 4K Cinema", "Featured on YouTube"});
        KNOWN_SHOWS.put("com.amazon.amazonvideo.livingroom", new String[]{"The Boys", "Recommended on Prime Video"});
        KNOWN_SHOWS.put("in.startv.hotstar", new String[]{"Marvel Studios: Loki", "Trending on Disney+ Hotstar"});
        KNOWN_SHOWS.put("com.stremio.one", new String[]{"Dune: Part Two", "Featured Movie"});
        KNOWN_SHOWS.put("org.videolan.vlc", new String[]{"Interstellar", "Cinema Library"});
    }

    private DynamicTopShelf() {}

    public static void load(Context context, String pkg, Drawable appIcon, Callback callback) {
        if (pkg == null) {
            callback.onLoaded(null);
            return;
        }

        TopShelfItem cached = MEM_CACHE.get(pkg);
        if (cached != null) {
            callback.onLoaded(cached);
            return;
        }

        Context appCtx = context.getApplicationContext();
        EXECUTOR.execute(() -> {
            TopShelfItem item = null;

            // 1. Try TvContract (Watch Next & Preview Programs)
            item = queryTvContract(appCtx, pkg);

            // 2. Try dynamic file / asset poster
            if (item == null) {
                item = loadPosterFile(appCtx, pkg);
            }

            // 3. Try installed application Leanback banner
            if (item == null) {
                item = loadInstalledBanner(appCtx, pkg);
            }

            // 4. Fallback: Softened HeroArt
            if (item == null && appIcon != null) {
                Bitmap hero = HeroArt.from(appIcon);
                if (hero != null) {
                    item = new TopShelfItem(hero, null, null, false);
                }
            }

            if (item != null) {
                MEM_CACHE.put(pkg, item);
            }

            final TopShelfItem result = item;
            MAIN_HANDLER.post(() -> callback.onLoaded(result));
        });
    }

    private static TopShelfItem queryTvContract(Context ctx, String pkg) {
        ContentResolver cr = ctx.getContentResolver();
        try {
            Uri watchNextUri = Uri.parse("content://android.media.tv/watch_next_program");
            String[] projection = {"poster_art_uri", "title", "short_description"};
            try (Cursor cursor = cr.query(watchNextUri, projection, "package_name=?", new String[]{pkg}, "last_engagement_time_utc_millis DESC")) {
                if (cursor != null && cursor.moveToFirst()) {
                    String uriStr = cursor.getString(0);
                    String title = cursor.getString(1);
                    String desc = cursor.getString(2);
                    Bitmap bmp = decodeUri(cr, uriStr);
                    if (bmp != null) {
                        return new TopShelfItem(bmp, title, TextUtils.isEmpty(desc) ? "Continue Watching" : desc, true);
                    }
                }
            }
        } catch (Exception ignored) {}

        try {
            Uri previewUri = Uri.parse("content://android.media.tv/preview_program");
            String[] projection = {"poster_art_uri", "title", "short_description"};
            try (Cursor cursor = cr.query(previewUri, projection, "package_name=?", new String[]{pkg}, "_id DESC")) {
                if (cursor != null && cursor.moveToFirst()) {
                    String uriStr = cursor.getString(0);
                    String title = cursor.getString(1);
                    String desc = cursor.getString(2);
                    Bitmap bmp = decodeUri(cr, uriStr);
                    if (bmp != null) {
                        return new TopShelfItem(bmp, title, TextUtils.isEmpty(desc) ? "Featured Show" : desc, true);
                    }
                }
            }
        } catch (Exception ignored) {}

        return null;
    }

    private static TopShelfItem loadPosterFile(Context ctx, String pkg) {
        File dir = new File(ctx.getExternalFilesDir(null), "posters");
        File file = new File(dir, pkg + ".jpg");
        Bitmap bmp = null;
        if (file.exists() && file.isFile()) {
            bmp = decodeFile(file.getAbsolutePath());
        }
        if (bmp == null) {
            try (InputStream is = ctx.getAssets().open("posters/" + pkg + ".jpg")) {
                BitmapFactory.Options opts = new BitmapFactory.Options();
                opts.inPreferredConfig = Bitmap.Config.RGB_565;
                bmp = BitmapFactory.decodeStream(is, null, opts);
            } catch (Exception ignored) {}
        }
        if (bmp != null) {
            String[] meta = KNOWN_SHOWS.get(pkg);
            String title = meta != null ? meta[0] : null;
            String sub = meta != null ? meta[1] : "Featured Content";
            return new TopShelfItem(bmp, title, sub, true);
        }
        return null;
    }

    private static TopShelfItem loadInstalledBanner(Context ctx, String pkg) {
        try {
            PackageManager pm = ctx.getPackageManager();
            Drawable banner = pm.getApplicationBanner(pkg);
            if (banner == null) {
                android.content.Intent launchIntent = pm.getLeanbackLaunchIntentForPackage(pkg);
                ActivityInfo ai = launchIntent != null ? launchIntent.resolveActivityInfo(pm, 0) : null;
                if (ai != null) banner = ai.loadBanner(pm);
            }
            if (banner != null) {
                int w = Math.max(320, banner.getIntrinsicWidth());
                int h = Math.max(180, banner.getIntrinsicHeight());
                Bitmap bmp = Bitmap.createBitmap(w, h, Bitmap.Config.RGB_565);
                Canvas canvas = new Canvas(bmp);
                banner.setBounds(0, 0, w, h);
                banner.draw(canvas);
                CharSequence label = pm.getApplicationLabel(pm.getApplicationInfo(pkg, 0));
                return new TopShelfItem(bmp, label.toString(), "Featured", true);
            }
        } catch (Exception ignored) {}
        return null;
    }

    private static Bitmap decodeUri(ContentResolver cr, String uriStr) {
        if (TextUtils.isEmpty(uriStr)) return null;
        try (InputStream is = cr.openInputStream(Uri.parse(uriStr))) {
            BitmapFactory.Options opts = new BitmapFactory.Options();
            opts.inPreferredConfig = Bitmap.Config.RGB_565;
            return BitmapFactory.decodeStream(is, null, opts);
        } catch (Exception e) {
            return null;
        }
    }

    private static Bitmap decodeFile(String path) {
        try {
            BitmapFactory.Options opts = new BitmapFactory.Options();
            opts.inPreferredConfig = Bitmap.Config.RGB_565;
            return BitmapFactory.decodeFile(path, opts);
        } catch (Exception e) {
            return null;
        }
    }
}
