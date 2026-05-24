# Meta Developer Platform — Full Setup Guide for SocialLift

This is the end-to-end runbook for configuring the Meta app that powers
[SocialLift](https://social-loyalty.netlify.app). Every field, URL, and
troubleshooting step that came up during setup is in here.

**Your values (re-used throughout this guide):**

| Thing | Value |
|---|---|
| Meta App ID | `1836977160350092` |
| Deployed site | `https://social-loyalty.netlify.app` |
| Meta app dashboard | https://developers.facebook.com/apps/1836977160350092/ |
| Graph API version | `v25.0` (set in [public/config.js](../public/config.js)) |

**Secret handling rule:** the App Secret belongs only in Netlify env vars
(`FB_APP_SECRET`). Never commit it, never paste it into chat, never put it in
any file in [public/](../public/). If it leaks, reset it immediately under
**App Settings → Basic → App Secret → Reset**.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Developer Account](#2-developer-account)
3. [Business Portfolio](#3-business-portfolio)
4. [Create the Meta App](#4-create-the-meta-app)
5. [App Settings → Basic](#5-app-settings--basic)
6. [Facebook Login for Business](#6-facebook-login-for-business)
7. [Instagram Product](#7-instagram-product)
8. [Messenger Product (optional)](#8-messenger-product-optional)
9. [WhatsApp Product (optional)](#9-whatsapp-product-optional)
10. [Webhooks](#10-webhooks)
11. [Permissions (scopes) — Full Reference](#11-permissions-scopes--full-reference)
12. [Standard vs Advanced Access](#12-standard-vs-advanced-access)
13. [Roles & Test Users](#13-roles--test-users)
14. [Data Use Checkup](#14-data-use-checkup)
15. [Business Verification](#15-business-verification)
16. [App Review Submission](#16-app-review-submission)
17. [Going Live](#17-going-live)
18. [Access Tokens — Short, Long-Lived, System User](#18-access-tokens--short-long-lived-system-user)
19. [Rate Limits](#19-rate-limits)
20. [Troubleshooting](#20-troubleshooting)
21. [Deauthorize & Data Deletion Callbacks](#21-deauthorize--data-deletion-callbacks)
22. [Maintenance & API Version Upgrades](#22-maintenance--api-version-upgrades)
23. [Reference Links](#23-reference-links)

---

## 1. Prerequisites

Before starting the Meta dashboard work, make sure you have:

- [ ] A personal Facebook account you're willing to tie to this developer account (Meta uses it for identity).
- [ ] A **Facebook Page** you administer (needed to test posting). Create at https://www.facebook.com/pages/create.
- [ ] An **Instagram account** converted to **Business** or **Creator**, and linked to your Facebook Page (Instagram app → Settings → Account type → Switch to Professional → Business → link Page).
- [ ] The SocialLift frontend **deployed** to Netlify and reachable:
      https://social-loyalty.netlify.app/privacy.html must return 200.
      If it 404s, `git add . && git commit && git push` so Netlify redeploys.
      Meta validates these URLs by fetching them — if they're missing, several steps below will fail silently.
- [ ] A 1024×1024 PNG app icon ready to upload.

---

## 2. Developer Account

1. Go to https://developers.facebook.com.
2. Log in with your Facebook account (top-right).
3. Click **Get Started** (top-right). If you already signed up this button is missing — skip to step 6.
4. Accept **Meta Platform Terms** and **Developer Policies**.
5. Verify phone number (SMS code) and email.
6. You should now see **My Apps** in the top nav — you're a developer.

**Notes**:
- There is no separate "developer password" — Meta uses your Facebook login.
- You can belong to multiple businesses with a single developer account.

---

## 3. Business Portfolio

A Business Portfolio is a container that owns your app, Pages, Instagram
accounts, and ad accounts. It's optional to start but required before you
can submit for App Review.

### Create one

1. Go to https://business.facebook.com → **Create account** (top-right).
2. Enter:
   - Business and account name: e.g. `SocialLift`
   - Your name
   - Business email (work address preferred — used for policy notifications)
3. Click **Submit**.

### Add your assets

Inside **Business Settings** (gear icon in left sidebar):

| Section | Add |
|---|---|
| **Accounts → Pages** | Click **Add → Add a Page** → paste Page URL. Meta will ask the current admin to accept. If it's your own Page, it adds instantly. |
| **Accounts → Instagram accounts** | Add your IG business account. Log in with the IG credentials when prompted. |
| **Users → People** | Add yourself if not already there; assign role "Admin". |
| **Accounts → Apps** | Will auto-populate after you create the Meta app in §4. |

### Note the Business ID

Under **Business Settings → Business Info**, copy the numeric **Business ID**.
You'll need it during App Review.

---

## 4. Create the Meta App

1. Go to https://developers.facebook.com/apps/creation/.
2. **App details**:
   - **Add an app name**: `SocialLift`
   - **App contact email**: your email
   - Click **Continue**.
3. **Use cases**: pick **Other** (most flexible; we'll add products manually).
   Click **Next**, then select **Business** on the next screen. **Next**.
4. **Business Portfolio**: pick the portfolio from §3. (Or "I don't want to connect yet" — you can link later under App Settings → Advanced.)
5. **Accept terms**: check the box for Platform Terms + Developer Policies → **Create app**.
6. You land on the app dashboard. The **App ID** is displayed at the top (for this guide: `1836977160350092`).
7. **Grab the App Secret**:
   - Left sidebar → **App settings → Basic**
   - Find **App Secret** → click **Show** → enter your Facebook password → copy the secret.
   - Paste it immediately into Netlify → **Site settings → Environment variables → `FB_APP_SECRET`**.
   - Do not paste it anywhere else. Ever.

---

## 5. App Settings → Basic

Navigate to https://developers.facebook.com/apps/1836977160350092/settings/basic/
and fill in **every** field below. Incomplete values block App Review, Advanced
Access, and Live mode.

| Field | Value | Notes |
|---|---|---|
| **Display Name** | `SocialLift` | Shown in the consent dialog. |
| **App Domains** | `social-loyalty.netlify.app` | Hostname only. Multiple values allowed (one per line). |
| **Contact Email** | your email | Meta sends policy notices here. |
| **Privacy Policy URL** | `https://social-loyalty.netlify.app/privacy.html` | Must return HTTP 200 publicly. Meta validates on save. |
| **Terms of Service URL** | `https://social-loyalty.netlify.app/terms.html` | Required before submitting for review. |
| **User Data Deletion** | Choose **Data Deletion Instructions URL** → `https://social-loyalty.netlify.app/data-deletion.html` | The alternative is a callback endpoint — not needed for v1. |
| **App Icon** | upload 1024×1024 PNG | Shown in consent dialog, Business Integrations, etc. |
| **Category** | `Business and Pages` | Pick the closest match; can be changed later. |
| **Subcategory** | `Social Media Management` | |

Scroll to the bottom and click **Save Changes**. The button is easy to miss — it's fixed at the bottom-right.

### App Settings → Advanced

Navigate to the **Advanced** tab.

| Field | Value | Notes |
|---|---|---|
| **Upgrade API** | latest (currently v25.0) | Match what [public/config.js](../public/config.js) sets. |
| **Allow API Access to App Settings** | leave default (off for Consumer, on for Business) | |
| **Server IP Allowlist** | (leave empty unless you have static egress IPs) | |
| **Business Use** | Connect the Business Portfolio from §3 | Required for Advanced Access. |

Save changes.

---

## 6. Facebook Login for Business

This is the core product that powers the login button on the site.

### Add the product

1. Dashboard left sidebar → **Products → + Add Product**.
2. Find **Facebook Login for Business** → **Set up**.

### Configure

Go to **Facebook Login for Business → Settings**:

| Toggle | Setting |
|---|---|
| Client OAuth Login | **ON** |
| Web OAuth Login | **ON** |
| Force Web OAuth Reauthentication | OFF (turn on only if you need re-entry) |
| Embedded Browser OAuth Login | ON |
| Use Strict Mode for Redirect URIs | **ON** (recommended) |
| Enforce HTTPS | **ON** (mandatory in 2026) |
| Login with the JavaScript SDK | **ON** |

### Valid OAuth Redirect URIs

**Exact, full URLs only.** Hostname alone fails the validator.

```
https://social-loyalty.netlify.app/
https://social-loyalty.netlify.app/dashboard.html
http://localhost:8888/
```

Add each on its own line. Save.

Why both `/` and `/dashboard.html`: after login we `window.location.href = "/dashboard.html"`. Meta's strict matching rejects paths not in the list.

### Allowed Domains for the JavaScript SDK

Hostname only, no `https://`, no path:

```
social-loyalty.netlify.app
localhost
```

Save. Without this, `FB.login()` throws **"Can't load URL: the domain of this URL isn't included in the app's domains."**

### Validate

In the same settings page, there's a **Redirect URI Validator**. Paste:

```
https://social-loyalty.netlify.app/
```

(with `https://` and trailing `/`) → click **Check URI** → green check. If red:
- Did you include the protocol? `https://...`
- Did you save changes before testing?
- Is the URL an **exact match** (including trailing slash)? No wildcards, no prefix matching.

---

## 7. Instagram Product

Needed for IG posting, comments, and DMs.

1. **Products → + Add Product → Instagram** (labeled **Instagram API with Instagram Login** or **Instagram Graph API** depending on your app type).
2. Follow the setup wizard. There's usually nothing to configure beyond adding your linked business account.
3. Prerequisite: the Instagram account you want to manage must be:
   - Converted to **Business** (or Creator) in the IG mobile app.
   - Linked to a Facebook Page you admin.
   - That Page must be in your Business Portfolio (§3).
4. To test, go to **Instagram → API Setup with Instagram Login** (if that section exists) → **Generate token** → pick your IG business account → copy token → paste into https://developers.facebook.com/tools/debug/accesstoken/ and confirm it has `instagram_basic` + `instagram_content_publish` scopes.

**Gotcha:** personal IG accounts cannot be managed through the API. Every IG
user SocialLift connects must be on a Business account.

---

## 8. Messenger Product (optional)

Only needed if you want to send and receive **Page DMs** (the `/inbox.html` page uses it).

1. **Products → + Add Product → Messenger** → Set up.
2. **Messenger → Settings → Access Tokens**: under each Page, click **Generate Token** to confirm the flow works. (SocialLift obtains tokens via Login for Business, not this page — this is just a sanity check.)
3. **Webhooks** (if you want real-time inbound messages): see §10.
4. For personalized flows you can also configure:
   - **App Settings → Messenger → Messenger Profile API** — home URL, greeting, persistent menu.
   - **NLP provider** — enable built-in NLP or connect Wit.ai.

---

## 9. WhatsApp Product (optional)

Only if you plan to add WhatsApp to SocialLift later. Not wired into the
current frontend.

1. **Products → + Add Product → WhatsApp**.
2. Accept WhatsApp Business Platform terms.
3. Add a **WhatsApp Business Account (WABA)** via the embedded signup wizard — needs a phone number that isn't currently on any WhatsApp app.
4. Get a **Phone Number ID** and **WABA ID**.
5. The 24-hour messaging rule applies: free-form messages only within 24h of the user's last message; otherwise use approved **message templates**.
6. Templates are created under **WhatsApp → Message Templates** and reviewed by Meta (~24h).

---

## 10. Webhooks

Needed for inbound events (DMs, comments, feed changes). **SocialLift's current
frontend does not implement a webhook receiver**, but here's how to add one.

1. **Products → + Add Product → Webhooks**.
2. Pick the object: **Page**, **Instagram**, **User**, **WhatsApp Business Account**, etc.
3. Callback config:
   - **Callback URL**: HTTPS endpoint on a backend (not a Netlify static site — use a Netlify Function or separate service). Example: `https://social-loyalty.netlify.app/.netlify/functions/webhook`
   - **Verify Token**: a random string. Set the same value as an env var on your backend.
4. Implement the webhook endpoint:
   - **GET** — handshake: echo back `hub.challenge` if `hub.verify_token` matches and `hub.mode === "subscribe"`.
   - **POST** — real events. Verify signature from header `X-Hub-Signature-256` using HMAC-SHA256 with `FB_APP_SECRET`.
5. Subscribe to fields. Minimum useful sets:
   - **Page**: `messages`, `messaging_postbacks`, `feed`
   - **Instagram**: `messages`, `comments`, `mentions`, `story_insights`
   - **WABA**: `messages`, `message_template_status_update`
6. For **Page** webhooks, each Page must also be subscribed via:
   `POST /{page-id}/subscribed_apps?subscribed_fields=messages,feed&access_token={page-token}`

**Dev mode vs Live mode for webhooks:**
- Development mode: only role users trigger events, plus the "Test" button in the dashboard.
- Live mode: all authorized users trigger events.

---

## 11. Permissions (scopes) — Full Reference

The frontend requests the scopes listed in [public/config.js](../public/config.js).
Each has specific App Review requirements.

| Scope | What it allows | Used by SocialLift for | Review required? | Advanced access prereq |
|---|---|---|---|---|
| `public_profile` | Name, user ID, default profile fields | Login identity | **No review** — but must be flipped to Advanced | Data Use Checkup + Privacy URL |
| `email` | User's primary email | Contact on file | No review — flip to Advanced | Same as above |
| `pages_show_list` | List of Pages user admins | Populating the Pages dropdown | **Yes** | + Business Verification |
| `pages_read_engagement` | Read Page posts, metadata, insights | Posts list, Analytics | Yes | + Business Verification |
| `pages_manage_posts` | Create, edit, delete Page posts | Compose page | Yes | + Business Verification |
| `pages_manage_metadata` | Subscribe Page to webhooks, update settings | Webhook wiring | Yes | + Business Verification |
| `pages_messaging` | Send/receive Page DMs | Inbox | Yes | + Business Verification |
| `business_management` | Manage Business Manager assets | Cross-asset ops | Yes | + Business Verification |
| `instagram_basic` | Read IG profile + media | Posts list, Analytics | Yes | + Business Verification |
| `instagram_content_publish` | Publish IG posts | Compose (IG) | Yes | + Business Verification |
| `instagram_manage_comments` | Read/reply to IG comments | Inbox comments | Yes | + Business Verification |
| `instagram_manage_messages` | IG Direct messaging | Inbox | Yes | + Business Verification |
| `instagram_manage_insights` | IG analytics | Analytics | Yes | + Business Verification |

**Rules for all scopes:**
- Users must grant during login. They can un-check individual scopes in the consent screen.
- Re-prompted if you pass `auth_type: "rerequest"` (we do — see [public/app.js](../public/app.js)).
- If unused for **90 days**, the scope is auto-revoked; user must re-grant.

---

## 12. Standard vs Advanced Access

Two orthogonal concepts that trip people up:

| Concept | What it controls |
|---|---|
| **App mode** (Development / Live) | Whether non-role users can use the app at all. |
| **Access level per permission** (Standard / Advanced) | Whether the app can use that specific scope for non-role users. |

### Standard Access
- Default for every permission.
- Only users with a Role on the app (Admin, Developer, Tester, Analytics User) can grant this scope.
- Good for development and internal testing.

### Advanced Access
- Required to use the scope for **anyone** who logs in.
- For `public_profile` and `email`: flip instantly under **App Review → Permissions and Features → Get advanced access**. No submission needed — as long as Privacy URL + Data Use Checkup are done.
- For all other scopes: requires **full App Review** (see §16) **and** Business Verification.

### How to flip `public_profile` to Advanced

1. Go to https://developers.facebook.com/apps/1836977160350092/app-review/permissions/
2. Find row **public_profile**.
3. Click **Get advanced access**.
4. Confirm.

If the button is disabled: the app is missing Privacy Policy URL, Terms URL, or Data Use Checkup. Fix §5 + §14, then retry.

### The "Facebook Login for Business requires advanced access" error

This is Meta telling you the Login for Business product **requires** at least
`public_profile` on Advanced. It's the exact fix above. Until you do it, the
login button works for role users only.

---

## 13. Roles & Test Users

Before App Review is approved, only role users can log in and grant scopes.

### Add a human tester

1. Dashboard → **App Roles → Roles → Add People**.
2. Choose role: **Tester** (least privilege) / **Developer** (can edit code) / **Admin** (full) / **Analytics User** (metrics only).
3. Enter their Facebook username or profile URL.
4. The invitee receives a notification at https://developers.facebook.com/settings/developer/requests/ — they must click **Accept**.
5. Role takes effect after acceptance.

### Create a Test User (synthetic)

Use these for reviewer demos and automated testing.

1. **App Roles → Test Users → Add**.
2. Configure:
   - **How many users?** 1
   - **Automatically authorize this app?** Yes
   - **Permissions to grant**: check every scope SocialLift uses.
3. Meta generates a dummy Facebook account with email + password.
4. Open an incognito window → facebook.com → log in with the test creds.
5. Create a **Test Page** under that user's account (Profile → Pages → Create).
6. Create a test IG account and link it to the test Page (IG app, mobile).

**Reviewer tip:** provide these credentials in your App Review submission
(§16) — reviewers won't create their own.

---

## 14. Data Use Checkup

An annual self-certification that your app follows the Developer Data Use
Policy. Blocks Advanced Access if overdue.

1. Dashboard → **Alerts** (bell icon top-right). If there's a red dot, there's an open checkup.
2. Or go directly: https://developers.facebook.com/apps/1836977160350092/duc/
3. For each permission your app uses, answer:
   - **Do you still use this?** → Yes
   - **How?** → 1-sentence description tying the scope to a visible feature
   - **Are you complying with restrictions?** → Yes
4. Submit.

Renewal reminders come to your app contact email yearly.

---

## 15. Business Verification

Required before you can request App Review for Advanced Access on `pages_*`,
`instagram_*`, or `business_management`. Not required for Standard Access or
for `public_profile`/`email`.

1. **Business Settings → Security Center** (https://business.facebook.com/settings/security/).
2. Click **Start verification**.
3. Enter:
   - Legal business name (exactly as on documents)
   - Registered address, phone, website
4. Upload **one** of:
   - Business license
   - Articles of incorporation
   - Certificate of formation
   - Utility bill / bank statement showing business name + address
5. Verify a company phone number via call or SMS OR verify a domain (DNS TXT record).
6. Review: **1–5 business days** typical, up to 2 weeks for complex cases.

**Common rejection reasons:**
- Name on document doesn't exactly match what you typed.
- Document is older than 3 months (utility bills must be recent).
- Address mismatch.
- Document is not in English and no translation provided.

---

## 16. App Review Submission

Do this when:
- Business Verification is complete (§15).
- Test user + test Page + test IG account exist (§13).
- Privacy, Terms, Data Deletion URLs all return 200 (§5).
- Data Use Checkup is current (§14).
- App is fully functional in Development mode for a role user.

### Submit each permission

Go to https://developers.facebook.com/apps/1836977160350092/app-review/permissions/.

For each scope in the table in §11 (except `public_profile`/`email`), click
**Request advanced access** and provide:

#### 1. Platform
Select **Web**.

#### 2. How will you use this permission?
1–2 sentences tying the scope to a visible SocialLift feature. Examples:

> **pages_manage_posts**: SocialLift's Compose page lets authenticated business users create and publish text + link posts to their Facebook Pages. We call POST /{page-id}/feed on their behalf using the Page access token obtained via Facebook Login for Business.

> **pages_messaging**: SocialLift's Inbox shows incoming Page DMs and lets the user reply. We call GET /{page-id}/conversations and POST /{page-id}/messages using Page access tokens.

> **instagram_content_publish**: SocialLift's Compose page uploads business users' images to their Instagram Business account via the two-step POST /{ig-user-id}/media → POST /{ig-user-id}/media_publish flow.

#### 3. Step-by-step reproduction
Exact clicks. Example for `pages_manage_posts`:

1. Go to https://social-loyalty.netlify.app/
2. Click **Continue with Facebook**.
3. Log in with test credentials (provided below).
4. Grant all requested permissions.
5. Click **Compose** in the left sidebar.
6. Type "SocialLift review test" in the Message field.
7. Under Targets, check the box next to the test Facebook Page.
8. Click **Publish now**.
9. Observe "✓ Posted to [Page name]" success message.
10. Verify the post appears on the Facebook Page feed.

#### 4. Screencast (1080p MP4 or MOV, ≤2 min)

**Required format:** 1920×1080, ≤2 minutes, normal speed (no speeding up).

Content (match the reproduction steps exactly):
1. Show the landing page URL `https://social-loyalty.netlify.app/` in the address bar.
2. Click Continue with Facebook.
3. Show the consent dialog with the scope being reviewed **visible**.
4. Click Continue.
5. Navigate to the feature that uses the scope.
6. **Use the scope** — reviewer must see the feature work end-to-end.
7. Show the result (post appearing, message sent, etc.).

Host the video on Google Drive / Loom / YouTube (unlisted) and paste the URL.

#### 5. Test credentials
Provide the email + password for the Test User created in §13. Include:
- Facebook email + password
- Test Page name and ID
- Test Instagram username

#### 6. Submit
Click **Submit for Review** at the bottom of each permission, then the main
submission button in the App Review overview.

### Timeline
- Simple submissions: **5–7 business days**.
- Complex submissions: **2–4 weeks**.
- Rejections come with a specific reason. Fix and resubmit.

### Common rejection reasons
| Reason | Fix |
|---|---|
| "App not reachable" | Site returned 500/timeout during review. Check Netlify logs; fix any bugs. |
| "Steps unclear" | Rewrite the reproduction with numbered, verbatim clicks. |
| "Screencast doesn't show permission usage" | Re-record — reviewer must see the feature work while logged in with granted scope. |
| "Privacy Policy inaccessible" | URL returns anything other than 200. Re-deploy. |
| "Test credentials don't work" | Rotate the Test User password and re-submit. |
| "Permission not needed for the use case" | Remove scopes you don't actually use — requesting extras is the top rejection cause. |

---

## 17. Going Live

Once some permissions are approved (or you only need role users), flip the mode.

1. Dashboard top header → toggle switch next to app name.
2. Click **Development** → switch to **Live**.
3. Meta checks prerequisites:
   - Privacy Policy URL reachable
   - Category selected
   - Business email set
   - App icon uploaded
4. Confirm.

In Live mode:
- **Non-role users** can log in — but only for scopes that are on **Advanced Access**.
- Scopes still on **Standard Access** return "insufficient_scope" for non-role users. Log them and prompt re-login with narrower scope if needed.

---

## 18. Access Tokens — Short, Long-Lived, System User

### Token types

| Type | How to get | Lifetime | Use for |
|---|---|---|---|
| **Short-lived User Token** | `FB.login()` returns this | ~1 hour | Initial login, exchanging for long-lived |
| **Long-lived User Token** | Exchange via `/oauth/access_token?grant_type=fb_exchange_token` | ~60 days | Keep on backend, refresh Page tokens |
| **Page Access Token** | `GET /me/accounts` using long-lived user token | Does not expire (as long as user token is valid) | All Page API calls |
| **System User Token** | Business Settings → System Users → Generate Token | Does not expire | Server-to-server; recommended for production backend |

### The exchange flow (implemented in [netlify/functions/store-tokens.js](../netlify/functions/store-tokens.js))

```
GET https://graph.facebook.com/v25.0/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={FB_APP_ID}
  &client_secret={FB_APP_SECRET}
  &fb_exchange_token={short-lived-user-token}
```

Returns:
```json
{
  "access_token": "EAA...",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

Then fetch Pages:
```
GET https://graph.facebook.com/v25.0/me/accounts
  ?fields=id,name,access_token,instagram_business_account{id,username}
  &access_token={long-lived-user-token}
```

Each Page's `access_token` in the response **does not expire** for as long as
the underlying user token is valid.

### Refresh strategy
- Every ~50 days, call `/oauth/access_token?grant_type=fb_exchange_token` again with the current long-lived token to get a fresh one.
- If a user changes their password, all tokens invalidate — you'll get `OAuthException` code 190, subcode 460. Prompt re-login.
- If the user revokes the app (Business Integrations), Meta calls your Deauthorize callback (§21).

### Debug any token
https://developers.facebook.com/tools/debug/accesstoken/ — paste a token, see
scopes, expiry, app it was issued for, user, and Page (if Page token).

---

## 19. Rate Limits

### App-level (Graph API)
- 200 calls per hour per user per app.
- Monitor with response header `X-App-Usage`:
  ```json
  {"call_count": 28, "total_time": 25, "total_cputime": 25}
  ```
  Each field is a percentage; stay below 100.

### Marketing API
- Different limit formula based on ads spend.
- Header: `X-Ad-Account-Usage`.

### WhatsApp Cloud API
- Tiered: 1K → 10K → 100K → unlimited messages per 24h based on quality rating.
- Rate limit headers: `X-WhatsApp-RateLimit-*`.

### Instagram Graph API
- 200 requests per hour per user.
- `GET /{ig-user-id}/media` counts against quota.
- Cache responses aggressively.

### Strategies
- **Batch requests**: `POST https://graph.facebook.com/v25.0/?batch=[...]` — up to 50 sub-requests in one HTTP call, counts as 1.
- **Field expansion**: `?fields=id,name,posts{id,message}` — fewer round trips.
- **Cache**: store Pages, IG IDs; only re-fetch on demand.
- **Exponential backoff**: on `code=4` (app rate limit) or `code=17` (user rate limit), sleep `2^n * 1s + jitter`.

---

## 20. Troubleshooting

| Error message | Cause | Fix |
|---|---|---|
| "Can't load URL: domain not in app's domains" | JS SDK blocked | Add hostname to **Allowed Domains for the JavaScript SDK** (§6). |
| "URI is not permitted" / Redirect URI Validator red | Redirect URI not in list or format wrong | Add **full `https://...` URL** with exact path + trailing slash to **Valid OAuth Redirect URIs**. |
| "Facebook Login for Business requires advanced access" | `public_profile` still on Standard | Flip to Advanced (§12). |
| "Invalid Privacy Policy URL" when flipping to Advanced | URL returns 404 | Deploy latest code so `/privacy.html` is live. Verify in incognito. |
| "App Not Setup: This app is still in development mode" on login | Logged-in user has no Role | Add them as Tester (§13) or submit for App Review (§16). |
| `OAuthException 100: Missing permission` on API call | Scope not granted or not on Advanced | Check granted scopes in [settings.html](../public/settings.html). Re-login with `auth_type: rerequest`. |
| `OAuthException 190`: token invalid | Token expired / user changed password / user revoked | Re-run login. If production: trigger re-auth flow. |
| `OAuthException 200: (#200) Requires permissions manage_pages or pages_manage_metadata` | Old/deprecated scope name | Use the new scope: `pages_manage_posts`, `pages_manage_metadata`, etc. |
| `OAuthException 10: (#10) Application does not have permission for this action` | App not in Advanced Access for that scope | Submit for App Review (§16) or use a role user. |
| IG publish fails: `(#24) Media container unusable` | `image_url` returns non-200 or wrong content-type | Host image on HTTPS, serve `image/jpeg` or `image/png`. |
| IG publish fails: `(#2207026) Unsupported post request` | IG account isn't Business, or not linked to a Page in the same Business | Convert to Business, link to Page, add both to Business Portfolio. |
| Webhook never fires | Not subscribed per-Page | Call `POST /{page-id}/subscribed_apps` with the Page access token. |
| Webhook signature mismatch | Wrong secret or wrong HMAC algorithm | Use `FB_APP_SECRET` + HMAC-SHA256 on raw request body. Header is `X-Hub-Signature-256`. |

---

## 21. Deauthorize & Data Deletion Callbacks

Meta pings your backend when a user revokes the app. Wiring these is good
practice and required before publishing to the App Store.

### Deauthorize Callback URL

**App Settings → Basic → User Data Deletion** → choose **Deauthorize Callback URL** (in addition to the Data Deletion URL you already set).

Meta sends a `POST` with a **signed_request** parameter. Decode with:
```js
// signed_request = base64UrlEncode(sig) + "." + base64UrlEncode(payload)
// verify sig = HMAC-SHA256(payload, FB_APP_SECRET)
// payload contains { user_id }
```

On receipt, delete all stored tokens + cached data for that user_id.

### Data Deletion Request Callback

Similar format. Must return JSON:
```json
{
  "url": "https://social-loyalty.netlify.app/deletion-status?id=abc123",
  "confirmation_code": "abc123"
}
```

Where `url` is a page the user can visit to check deletion status.

---

## 22. Maintenance & API Version Upgrades

- **New Graph version every quarter** (Feb / May / Aug / Nov). Each version is supported for ~2 years.
- Upgrade path:
  1. Read the changelog: https://developers.facebook.com/docs/graph-api/changelog
  2. Bump `GRAPH_API_VERSION` in [public/config.js](../public/config.js) **and** `GRAPH_VERSION` in [netlify/functions/store-tokens.js](../netlify/functions/store-tokens.js).
  3. Test on a Development app first if you have one.
  4. Update **App Settings → Advanced → Upgrade API** to match.
- **Data Use Checkup** comes around yearly — watch for the email.
- **Business Verification** renewal is automatic unless business details change.
- **Token rotation** — build a cron that refreshes long-lived user tokens every 50 days.

---

## 23. Reference Links

**Your app**
- Dashboard: https://developers.facebook.com/apps/1836977160350092/
- Permissions: https://developers.facebook.com/apps/1836977160350092/app-review/permissions/
- Basic Settings: https://developers.facebook.com/apps/1836977160350092/settings/basic/
- Facebook Login for Business Settings: https://developers.facebook.com/apps/1836977160350092/fb-login/settings/
- Data Use Checkup: https://developers.facebook.com/apps/1836977160350092/duc/

**Tools**
- Graph API Explorer: https://developers.facebook.com/tools/explorer/
- Access Token Debugger: https://developers.facebook.com/tools/debug/accesstoken/
- Sharing Debugger: https://developers.facebook.com/tools/debug/
- Redirect URI Validator: inside Facebook Login for Business → Settings

**Docs**
- Graph API: https://developers.facebook.com/docs/graph-api
- Permissions reference: https://developers.facebook.com/docs/permissions
- Facebook Login for Business: https://developers.facebook.com/docs/facebook-login/facebook-login-for-business
- Instagram Graph API: https://developers.facebook.com/docs/instagram-api
- Messenger Platform: https://developers.facebook.com/docs/messenger-platform
- Webhooks: https://developers.facebook.com/docs/graph-api/webhooks
- App Review: https://developers.facebook.com/docs/app-review
- Changelog: https://developers.facebook.com/docs/graph-api/changelog

**Policy**
- Developer Policies: https://developers.facebook.com/devpolicy/
- Platform Terms: https://developers.facebook.com/terms/
- Data Use Policy: https://developers.facebook.com/devpolicy/#data-use

---

## Setup checklist (tick as you go)

- [ ] Facebook developer account created (§2)
- [ ] Business Portfolio created, Pages + IG linked (§3)
- [ ] Meta app `1836977160350092` created (§4)
- [ ] App Secret stored in Netlify env as `FB_APP_SECRET` (§4)
- [ ] App Settings → Basic complete: Privacy URL, Terms URL, Data Deletion URL, icon, category (§5)
- [ ] Facebook Login for Business product added + configured (§6)
- [ ] Redirect URI Validator returns green for `https://social-loyalty.netlify.app/` (§6)
- [ ] JS SDK allowed domains include `social-loyalty.netlify.app` (§6)
- [ ] Instagram product added, IG account Business+linked (§7)
- [ ] Test User created with all scopes pre-authorized (§13)
- [ ] Data Use Checkup current (§14)
- [ ] `public_profile` flipped to Advanced (§12)
- [ ] Business Verification submitted (§15)
- [ ] App Review submissions drafted for each Page/IG scope (§16)
- [ ] Token exchange working end-to-end via Netlify Function (§18)
- [ ] Deauthorize + Data Deletion callbacks wired (§21)
