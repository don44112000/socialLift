# socialLift

Frontend onboarding flow for connecting a business's Facebook Pages and
Instagram Business accounts to SocialLift for posting and messaging via the
Meta Graph API.

## What it does

1. Business user clicks **Continue with Facebook** on [frontend/index.html](frontend/index.html).
2. Facebook JS SDK requests the scopes listed in [frontend/config.js](frontend/config.js) (Pages, Pages messaging, Instagram content publish, Instagram DMs, business management).
3. Frontend calls `/me/accounts` to enumerate Pages + linked Instagram business accounts (with per-Page access tokens).
4. User clicks **Send tokens to SocialLift backend** → payload posted to the backend API endpoint `/api/store-tokens`.
5. The backend server exchanges the short-lived user token for a long-lived one using the app secret (never exposed to the browser) and acknowledges. Persistence is a TODO stub — wire in your DB there.

## Project structure

```
frontend/             # Static frontend client served by Express
  index.html
  styles.css
  app.js
  config.js           # Public config (app id, scopes, graph version)
backend/              # Monolithic Express backend
  src/
    server.js         # Main Express server serving APIs and public assets
    routes/
      api.js          # Facebook OAuth and storage API routes
  .env.example        # Backend environment variable template
  package.json        # Backend dependencies and run scripts
package.json          # Root orchestration package.json (npm workspaces)
```

## Setup

### 1. Create a Meta app
- Go to https://developers.facebook.com/apps/creation/
- Use case: **Business**
- Add products: Facebook Login, Instagram, WhatsApp (optional), Webhooks
- In **Facebook Login → Settings**, add your Netlify URL to **Valid OAuth Redirect URIs** and to **Allowed Domains for the JavaScript SDK**
- Note the **App ID** and **App Secret**

### 2. Configure the frontend
Edit [frontend/config.js](frontend/config.js):
```js
FB_APP_ID: "1234567890123456"
```

### 3. Configure the environment
Create a `.env` file based on `.env.example`:
- `FB_APP_ID` — same as above
- `FB_APP_SECRET` — from the Meta app dashboard (Settings → Basic)
- `ALLOWED_ORIGIN` — your local/production URL, e.g. `http://localhost:8888`

### 4. Local development
```bash
npm install
npm run dev
```
Serves the site and APIs on `http://localhost:8888`.

## Deploy
Run the start script on any Node.js compatible platform:
```bash
npm start
```

The scopes in `frontend/config.js` require Meta **App Review** before non-role
users can log in. Until then, add test users under **Roles → Testers** in the
Meta dashboard. See [claudeFbResearch.md](claudeFbResearch.md) §7 for the full
review checklist.

## Security notes

- `FB_APP_SECRET` lives only in Netlify env vars and is used server-side in the function.
- The function does not persist tokens yet — wire in your DB and encrypt tokens at rest before going live.
- `ALLOWED_ORIGIN` should be set to your production domain to lock down CORS.
- Do not log access tokens.
