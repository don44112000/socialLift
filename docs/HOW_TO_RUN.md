# How to run SocialLift

Two ways: **local dev** (fastest for iterating) and **Netlify deploy** (what real businesses will hit).

Before either, finish the Meta setup in [META_SETUP.md](./META_SETUP.md). You need an **App ID**, **App Secret**, and at least one **test user** added under App Roles.

---

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| Netlify CLI | latest | `npm install -g netlify-cli` |
| A Meta app | — | See [META_SETUP.md](./META_SETUP.md) |

Verify:
```bash
node --version     # v18.x or higher
netlify --version  # 17.x or higher
```

---

## Local development

### 1. Clone and enter the repo
```bash
git clone <your-repo-url> socialLift
cd socialLift
```

### 2. Set the Facebook App ID in the frontend
Edit [public/config.js](../public/config.js):
```js
window.SOCIALLIFT_CONFIG = {
  FB_APP_ID: "1234567890123456",  // <-- your App ID
  ...
};
```

### 3. Create a local `.env` for the Netlify Function
Copy the template:
```bash
cp .env.example .env
```
Fill in `.env`:
```
FB_APP_ID=1234567890123456
FB_APP_SECRET=abcd1234...
ALLOWED_ORIGIN=http://localhost:8888
```
`.env` is gitignored — never commit it.

### 4. Start the dev server
```bash
netlify dev
```
You should see:
```
◈ Server now ready on http://localhost:8888
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
| "FB_APP_ID not set" badge | You didn't edit `public/config.js` |
| Popup says "App Not Setup" | App ID wrong, or localhost not in Allowed Domains (§5 of META_SETUP) |
| "Backend returned 502: token exchange failed" | `FB_APP_SECRET` missing or wrong in `.env` |
| Zero Pages returned | Logged-in user doesn't admin any Pages, or didn't grant `pages_show_list` |
| CORS error | `ALLOWED_ORIGIN` in `.env` doesn't match the URL you loaded |

Function logs stream in the `netlify dev` terminal.

---

## Deploying to Netlify

### Option A: Connect a Git repo (recommended)

1. Push the repo to GitHub/GitLab/Bitbucket.
2. https://app.netlify.com → **Add new site → Import an existing project** → pick the repo.
3. Build settings are auto-detected from [netlify.toml](../netlify.toml):
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
   - Build command: (none)
4. **Site settings → Environment variables → Add**:
   - `FB_APP_ID` = `1234567890123456`
   - `FB_APP_SECRET` = `abcd1234...`
   - `ALLOWED_ORIGIN` = `https://your-site.netlify.app` (use your actual URL after first deploy)
5. Trigger a deploy (push a commit, or **Deploys → Trigger deploy**).
6. Copy the deployed URL (e.g. `https://sociallift-abc123.netlify.app`).
7. Go back to the Meta app dashboard → **Facebook Login → Settings** → add that URL to **Valid OAuth Redirect URIs** and **Allowed Domains for the JS SDK**.
8. Update `ALLOWED_ORIGIN` in Netlify env to match, then redeploy.

### Option B: Manual deploy from CLI

```bash
netlify login
netlify init           # link to an existing site or create a new one
netlify deploy         # preview deploy
netlify deploy --prod  # production
```

Set env vars via CLI instead of the UI:
```bash
netlify env:set FB_APP_ID 1234567890123456
netlify env:set FB_APP_SECRET abcd1234...
netlify env:set ALLOWED_ORIGIN https://your-site.netlify.app
```

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
├── public/                    # Netlify serves this folder
│   ├── index.html             # Landing page
│   ├── styles.css             # Styling
│   ├── app.js                 # FB SDK login + page fetching
│   └── config.js              # App ID + scopes (browser-safe)
├── netlify/
│   └── functions/
│       └── store-tokens.js    # Backend: exchanges + persists tokens
├── docs/
│   ├── META_SETUP.md          # Meta developer platform setup
│   └── HOW_TO_RUN.md          # This file
├── netlify.toml               # Netlify config
├── .env.example               # Template for local .env
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
