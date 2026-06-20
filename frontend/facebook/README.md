# Facebook / Instagram flow (Approach B)

Separate UI from the main TikTok dashboard. Uses demo data in `data.js` until Meta App Review credentials are configured.

## Entry

1. Open `/` (main landing).
2. Accept Terms & Privacy.
3. Click **Continue with Facebook** → demo session (or real OAuth if configured) → `/facebook/dashboard.html`.

Sidebar branding matches the TikTok app: `logo-square.png` + “Wouchh” text (no duplicate wide logo).

## Login flow (popup OAuth + state)

Login runs in a **popup window** with a modal backdrop over the app (OAuth can't be
iframed). `FB.startFbLogin()` in `shell.js`:

1. Mints a per-login `state` UUID, caches it under `sessionStorage["fb_login_state"]`,
   and opens `{BACKEND_BASE_URL}/auth/facebook/login?state={state}` in the popup.
2. **Every** backend call thereafter carries that UUID as a `state` query param —
   `FB.apiUrl("accounts")` → `{backend}/api/accounts?state={state}`. Existing query
   params are preserved (`/api/comments?account_id=1` → `…?account_id=1&state={state}`).
   All `data.js` calls go through `FB.apiUrl()`.
3. Completion is detected when the popup closes, returns to our origin, or posts a
   `wouchh-auth` message — then the opener verifies via `/api/me?state={state}` and continues.

### Backend redirect target (required for instant popup close)

After the Facebook handshake, the backend should redirect the popup to
**`/facebook/auth-callback.html`** (on the frontend origin). That page:

- **Popup flow** → `postMessage({type:"wouchh-auth", status}, origin)` to the opener,
  then `window.close()` (so the modal closes instantly instead of waiting for the poll).
- **Full-page fallback** (popup was blocked, no opener) → redirects to
  `/facebook/dashboard.html` (or `/` on error).

The opener treats `/api/{state}/me` as the source of truth, so the callback works even
if the backend can't pass a `status` query param.

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
