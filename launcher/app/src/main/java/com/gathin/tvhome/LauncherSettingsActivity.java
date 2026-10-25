package com.gathin.tvhome;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.widget.TextView;
import android.widget.Toast;

/**
 * Remote-friendly settings owned by the launcher; system settings stay one row away.
 * Renders as a translucent frosted-glass side sheet over the active home screen.
 */
public final class LauncherSettingsActivity extends Activity {
    static final String EXTRA_REORDER = "com.gathin.tvhome.extra.REORDER_FROM_SETTINGS";
    private SharedPreferences choices;
    private boolean isClosing = false;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        overridePendingTransition(0, 0);
        setContentView(R.layout.activity_launcher_settings);
        choices = getSharedPreferences(Config.SETTINGS_NAME, MODE_PRIVATE);
        Config config = Config.load(this);

        View scrim = findViewById(R.id.scrim);
        View panel = findViewById(R.id.settings_panel);
        if (scrim != null) scrim.setOnClickListener(v -> animateClose());

        if (config.animations && panel != null && scrim != null) {
            scrim.setAlpha(0f);
            scrim.animate().alpha(1f).setDuration(220).start();
            float panelWidth = 480f * getResources().getDisplayMetrics().density;
            panel.setTranslationX(panelWidth);
            panel.animate()
                    .translationX(0f)
                    .setDuration(260)
                    .setInterpolator(new DecelerateInterpolator(1.8f))
                    .start();
        }
    }

    private void animateClose() {
        if (isClosing) return;
        isClosing = true;
        Config config = Config.load(this);
        View scrim = findViewById(R.id.scrim);
        View panel = findViewById(R.id.settings_panel);
        if (config.animations && panel != null && scrim != null) {
            scrim.animate().alpha(0f).setDuration(180).start();
            float panelWidth = 480f * getResources().getDisplayMetrics().density;
            panel.animate()
                    .translationX(panelWidth)
                    .setDuration(200)
                    .setInterpolator(new AccelerateInterpolator(1.8f))
                    .withEndAction(this::finishInternal)
                    .start();
        } else {
            finishInternal();
        }
    }

    private void finishInternal() {
        super.finish();
        overridePendingTransition(0, 0);
    }

    @Override
    public void onBackPressed() {
        animateClose();
    }
}
