# socialLift

Frontend onboarding flow for connecting a business's Facebook Pages and
Instagram Business accounts to SocialLift for posting and messaging via the
Meta Graph API.

## What it does

1. Business user clicks **Continue with Facebook** on [public/index.html](public/index.html).
2. Facebook JS SDK requests the scopes listed in [public/config.js](public/config.js) (Pages, Pages messaging, Instagram content publish, Instagram DMs, business management).
3. Frontend calls `/me/accounts` to enumerate Pages + linked Instagram business accounts (with per-Page access tokens).
4. User clicks **Send tokens to SocialLift backend** → payload posted to the Netlify Function [netlify/functions/store-tokens.js](netlify/functions/store-tokens.js).
5. The function exchanges the short-lived user token for a long-lived one using the app secret (never exposed to the browser) and acknowledges. Persistence is a TODO stub — wire in your DB there.

## Project structure

```
public/               # Static site Netlify serves
  index.html
  styles.css
  app.js
  config.js           # Public config (app id, scopes, graph version)
netlify/
  functions/
    store-tokens.js   # Backend: receives tokens, exchanges for long-lived
netlify.toml          # Build + dev + headers config
.env.example          # Server-only env vars (NOT committed)
```

## Setup

### 1. Create a Meta app
- Go to https://developers.facebook.com/apps/creation/
- Use case: **Business**
- Add products: Facebook Login, Instagram, WhatsApp (optional), Webhooks
- In **Facebook Login → Settings**, add your Netlify URL to **Valid OAuth Redirect URIs** and to **Allowed Domains for the JavaScript SDK**
- Note the **App ID** and **App Secret**

### 2. Configure the frontend
Edit [public/config.js](public/config.js):
```js
FB_APP_ID: "1234567890123456"
```

### 3. Configure the Netlify site
In the Netlify dashboard → Site settings → Environment variables:
- `FB_APP_ID` — same as above
- `FB_APP_SECRET` — from the Meta app dashboard (Settings → Basic)
- `ALLOWED_ORIGIN` — your deployed URL, e.g. `https://sociallift.netlify.app`

### 4. Local development
```bash
npm install -g netlify-cli
netlify dev
```
Serves the site on `http://localhost:8888` with the function mounted at
`/.netlify/functions/store-tokens`.

### 5. Deploy
```bash
netlify deploy --prod
```
Or connect this repo to Netlify and it will build on push using
[netlify.toml](netlify.toml).

## App Review

The scopes in `public/config.js` require Meta **App Review** before non-role
users can log in. Until then, add test users under **Roles → Testers** in the
Meta dashboard. See [claudeFbResearch.md](claudeFbResearch.md) §7 for the full
review checklist.

## Security notes

- `FB_APP_SECRET` lives only in Netlify env vars and is used server-side in the function.
- The function does not persist tokens yet — wire in your DB and encrypt tokens at rest before going live.
- `ALLOWED_ORIGIN` should be set to your production domain to lock down CORS.
- Do not log access tokens.
