# GAUDI mini-app

Static Telegram Mini App for the internal GAUDI team panel. It requests the current employee profile from the `admin` Supabase Edge Function.

Open it from [t.me/Gaudi_decor_bot/panel](https://t.me/Gaudi_decor_bot/panel).

Do not add keys, tokens, Telegram IDs, phone numbers, or manager data to this repository.

## Deploying

GitHub Pages serves this repository as-is; there is no build step. Push to `main` and Pages
publishes within about a minute.

**Bump the `?v=` on `app.js` and `style.css` in `index.html` on every deploy.** Telegram keeps
the Mini App in its own WebView cache, so without a new query string the panel keeps showing
the previous version and the deploy looks like it silently failed. This already cost one
round of confusion on 2026-09-11.
