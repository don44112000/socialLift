# How to run SocialLift

Two ways: **local dev** (fastest for iterating) and **Netlify deploy** (what real businesses will hit).

Before either, finish the Meta setup in [META_SETUP.md](./META_SETUP.md). You need an **App ID**, **App Secret**, and at least one **test user** added under App Roles.

---

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| A Meta app | — | See [META_SETUP.md](./META_SETUP.md) |

Verify:
```bash
node --version     # v18.x or higher
npm --version      # v9.x or higher
```

---

## Local development

### 1. Clone and enter the repo
```bash
git clone <your-repo-url> socialLift
cd socialLift
```

### 2. Set the Facebook App ID in the frontend
Edit [frontend/config.js](../frontend/config.js):
```js
window.SOCIALLIFT_CONFIG = {
  FB_APP_ID: "1234567890123456",  // <-- your App ID
  ...
};
```

### 3. Create a local `.env` for the Monolith Backend
Copy the template:
```bash
cp .env.example .env
```
Fill in `.env`:
```
PORT=8888
FB_APP_ID=1234567890123456
FB_APP_SECRET=abcd1234...
ALLOWED_ORIGIN=http://localhost:8888
```
`.env` is gitignored — never commit it.

### 4. Install dependencies and start the dev server
```bash
npm install
npm run dev
```
You should see:
```
◈ Monolith server running at http://localhost:8888
```

Open http://localhost:8888 in your browser.

### 5. Test the flow
1. You must be logged into Facebook as a user who is listed as **Tester/Developer/Admin** on the Meta app (see [META_SETUP.md](./META_SETUP.md) §8). Regular users cannot log in until App Review is approved.
2. Click **Continue with Facebook**.
3. Grant the requested permissions in the popup.
4. You should see your user, your Pages, and any linked Instagram business accounts.
5. Click **Send tokens to SocialLift backend**.
6. The Netlify Function exchanges the short-lived token for a long-lived one and returns a success message.

### 6. Watch for errors

| Symptom | Likely cause |
|---|---|
| Button stays "Loading Facebook SDK…" | Ad blocker or network blocking `connect.facebook.net` |
| "FB_APP_ID not set" badge | You didn't edit `frontend/config.js` |
| Popup says "App Not Setup" | App ID wrong, or localhost not in Allowed Domains (§5 of META_SETUP) |
| "Backend returned 502: token exchange failed" | `FB_APP_SECRET` missing or wrong in `.env` |
| Zero Pages returned | Logged-in user doesn't admin any Pages, or didn't grant `pages_show_list` |
| CORS error | `ALLOWED_ORIGIN` in `.env` doesn't match the URL you loaded |

Function logs stream in the `netlify dev` terminal.

---

## Deploying the Monolith

The project is built as a standard monolithic Node.js Express application. You can deploy it to any cloud provider that supports Node.js (e.g., Railway, Render, Heroku, AWS, DigitalOcean).

### Steps:
1. Set the environment variables in your hosting provider's dashboard:
   - `PORT` (optional, defaults to 8888)
   - `FB_APP_ID` = `your-app-id`
   - `FB_APP_SECRET` = `your-app-secret`
   - `ALLOWED_ORIGIN` = `https://your-deployed-domain.com`
2. Configure the start command:
   ```bash
   npm start
   ```
3. Update the OAuth redirect URIs and Allowed Domains for the JS SDK in your Meta App Dashboard to match your deployed URL.

---

## Custom domain

1. In Netlify → **Domain management → Add custom domain** → follow the DNS instructions.
2. Once live, go back to:
   - Meta app → **App Settings → Basic → App Domains**: add your custom domain.
   - Meta app → **Facebook Login → Settings**: add your custom domain URL to redirect URIs and allowed domains.
   - Netlify env: update `ALLOWED_ORIGIN` to the custom domain and redeploy.

---

## Project structure reference

```
socialLift/
├── frontend/                  # Static frontend files (serviced by Express statically)
│   ├── index.html             # Landing page
│   ├── styles.css             # Styling
│   ├── app.js                 # FB SDK login + page fetching
│   └── config.js              # App ID + scopes (browser-safe)
├── backend/                   # Monolithic Express backend
│   ├── src/
│   │   ├── server.js          # Monolithic server entry point
│   │   └── routes/
│   │       └── api.js         # Token store and OAuth APIs
│   ├── .env.example           # Template for backend .env
│   └── package.json           # Backend node dependencies
├── docs/
│   ├── META_SETUP.md          # Meta developer platform setup
│   └── HOW_TO_RUN.md          # This file
├── package.json               # Root Node dependencies and workspace scripts
├── .gitignore
└── README.md
```

---

## What's next (not yet implemented)

The current backend function only acknowledges receipt. Before onboarding real businesses you need:

1. **Persistence** — store `{ userId, longLivedUserToken, pages: [{pageId, pageAccessToken, igBusinessId}] }` in a database. Netlify integrates cleanly with Supabase, Neon, Upstash, MongoDB Atlas. Do not log tokens.
2. **Encryption at rest** — wrap tokens with a KMS key or application-level encryption (e.g. libsodium sealed box) before writing.
3. **Post / message APIs** — separate Netlify Functions (or a proper backend) that read a token from the DB and call the Graph API (`POST /{page-id}/feed`, `POST /{ig-user-id}/media`, `POST /{phone-number-id}/messages`, etc.).
4. **Webhook receiver** — for inbound messages/comments. See [META_SETUP.md](./META_SETUP.md) §10.
5. **App Review submission** — required before any non-tester can log in.
