# Facebook / Instagram flow (Approach B)

Separate UI from the main TikTok dashboard. Uses demo data in `data.js` until Meta App Review credentials are configured.

## Entry

1. Open `/` (main landing).
2. Accept Terms & Privacy.
3. Click **Continue with Facebook** → demo session (or real OAuth if configured) → `/facebook/dashboard.html`.

Sidebar branding matches the TikTok app: `logo-square.png` + “Wouchh” text (no duplicate wide logo).

## Pages

| File | Route |
|------|--------|
| `dashboard.html` | `/facebook/dashboard.html` |
| `mentions.html` | `/facebook/mentions.html` |
| `comments.html` | `/facebook/comments.html` |
| `inbox.html` | `/facebook/inbox.html` |
| `analytics.html` | `/facebook/analytics.html` |
| `activity.html` | `/facebook/activity.html` |
| `accounts.html` | `/facebook/accounts.html` |
| `settings.html` | `/facebook/settings.html` |

## Session

Stored in `sessionStorage` under key `sl_fb_session` (via `FB.setSession` / `FB.getSession` in `shell.js`).

## Stitch reference

Exported Stitch HTML/screenshots live in `stitch-reference/` (regenerate with root `.env` `STITCH_API_KEY`).
