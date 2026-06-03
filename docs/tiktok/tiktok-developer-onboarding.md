# TikTok Developer Onboarding Checklist
**Project:** Wouchh (platform name: Wouchh)  
**Company:** Wouchh  
**Domain:** https://wouchh.com/  
**Target:** TikTok for Business Developer access (Marketing API + Business Messaging API + Organic API)  
**Last updated:** 2026-06-04

---

## 🟢 PROGRESS TRACKER

| Step | Status | Date | Notes |
|---|---|---|---|
| 1. TikTok for Business account | ✅ **DONE** | 2026-06-03 | Registered with `@wouchh.com` email |
| 2. Developer registration | ✅ **DONE** | 2026-06-03 | Approved — registered as Technology Company |
| 3. Developer App ("Wouchh") | ⏳ **SUBMITTED** | 2026-06-03 | Under review — expect ~2-3 business days (~June 6) |
| 4a. Business Center created | ✅ **DONE** | 2026-06-03 | ID: `7647271851734958097` — Agency type, India |
| 4b. Business Center verification | ⏳ **IN PROGRESS** | 2026-06-03 | Udyam registration submitted — expect ~2 days (~June 5-6) |
| 5. Accounts API form | 🔜 **BLOCKED** | — | Waiting on BC verification (#4b), then submit immediately |
| 6. Business Messaging API form | 🔜 **BLOCKED** | — | Waiting on app approval (#3), then submit immediately |
| 7. Sandbox setup | 🔜 **BLOCKED** | — | Waiting on app approval (#3) |

---

## Key Identifiers & Credentials

| Item | Value |
|---|---|
| Company name | **Wouchh** |
| Business Center ID | `7647271851734958097` |
| Business Center type | Agency |
| Business Center country | India |
| Business Center currency | USD |
| Business Center timezone | UTC+05:30 India Standard Time |
| Developer profile type | Technology Company |
| Contact email | `@wouchh.com` (the email used for dev registration) |
| Website | https://wouchh.com/ |
| Privacy Policy URL | https://wouchh.com/privacy |
| Terms of Service URL | https://wouchh.com/terms |
| Data Deletion URL | https://wouchh.com/data-deletion |
| About URL | https://wouchh.com/about |
| Business verification doc | Udyam Registration (MSME) |
| OAuth redirect URL (temporary) | `https://wouchh.com/` |

---

## Overview — The 7-Step Access Ladder

| Tier | What it is | Timeline |
|---|---|---|
| 1. TikTok for Business account | Company-level account on TikTok Business platform | Instant |
| 2. Developer registration | Tag your account as a developer | ~3 business days |
| 3. Developer App | The actual Wouchh integration with `client_key` + `client_secret` | ~2-3 business days |
| 4. Business Center + Verification | Required for Accounts API business verification | ~2 days |
| 5. Accounts API access (Organic) | Application form for comment/mention/video/user APIs | Varies |
| 6. Business Messaging API access | Separate DSPR/USDS audit for DM capabilities | ~3-5 weeks |
| 7. Sandbox + Build | Test against sandbox while waiting for approvals | Parallel |

**Total realistic timeline to production-ready:** **4-8 weeks**

---

## Step 1: Create TikTok for Business Account ✅ DONE

**URL:** https://business-api.tiktok.com/portal → click registration button

### What was provided
- [x] **Email address** — `@wouchh.com` company domain email
- [x] Password
- [x] Agreed to terms / privacy policy
- [x] Verified via code sent to email

### Email rules
- **MUST be a company domain email** (e.g., `@wouchh.com`)
- ❌ Personal emails (`@gmail.com`, etc.) will be **rejected**
- ❌ Temporary/disposable emails will be rejected

---

## Step 2: Register as a Developer ✅ DONE

**URL:** https://business-api.tiktok.com/portal → click "Become a Developer"

### What was submitted

| Field | Value submitted |
|---|---|
| User type | **Technology Company** |
| Company name | **Wouchh** |
| Company website | `https://wouchh.com/` |
| Primary Country of Operation | **India** |
| Services Provided | Campaign Management, Reporting, Creative Management, Audience Management, Catalog Management, Business Center, Ad Measurement, TikTok Store, Accounts, TikTok Creator Marketplace |
| Specialized Verticals | Travel, eCommerce, Entertainment, Retail |
| Top 5 Mutual Clients | -- |
| Service Regions | North America, LATAM, EMEA, APAC |
| Estimate Yearly Revenue From TikTok | 0 |
| Description | See below |

### Description submitted
```
WOUCHH is a technology company building a B2B SaaS platform (WOUCHH) that helps business
owners manage, track, and respond to their social media customer engagement from a single
web interface. We plan to use TikTok's developer APIs (Business Messaging API, Accounts API,
and Marketing API) to enable authorized business users to view and interact with their TikTok
Business audience directly from the WOUCHH unified inbox. Specifically, we plan to use TikTok
data and APIs for the following features:
1. Business Messaging: We will integrate the Business Messaging API so authorized businesses
   can receive incoming direct messages sent by their customers and send manual text replies
   directly from the WOUCHH dashboard.
2. Comment and Mention Management: We will use the Accounts (Organic) API to allow business
   owners to view comments on their published videos, publish replies to user comments,
   hide/delete spam comments, and monitor brand mentions or tags to maintain high engagement.
3. Content Publishing: We will use publishing scopes to allow users to schedule and publish
   organic video content to their own TikTok accounts.
4. Analytics & Insights: We will fetch aggregate account-level stats, video performance
   metrics, and audience demographics to build performance reports and insights dashboards
   for business owners.
All access to TikTok account data is granted securely via OAuth 2.0. Users explicitly
authorize WOUCHH to access their accounts and can revoke consent at any time. We do not
store or share personal user data beyond what is technically required to facilitate the
dashboard and messaging functionality for that specific business account.
```

---

## Step 3: Create the Developer App ⏳ SUBMITTED — Under Review

**URL:** https://business-api.tiktok.com/portal → "Create an App" → Marketing API App  
**Expected approval:** ~June 5-6, 2026

### What was submitted

| Field | Value submitted |
|---|---|
| App name | **Wouchh** |
| App description | See below |
| Advertiser redirect URL | `https://wouchh.com/` |
| TikTok account holder redirect URL | `https://wouchh.com/` |

### App description submitted (max 500 chars)
```
Wouchh is a B2B SaaS platform that helps TikTok business accounts manage customer
engagement from a unified dashboard. Authorized accounts grant access via OAuth to:
- Read and reply to direct messages from customers
- View and manage comments on owned videos
- Monitor brand mentions and tags
- Publish organic video content
- View account analytics and audience demographics
Access is per-account and revocable anytime. Developer app is shared with external
business accounts.
```

### Scopes/permissions selected in the form

These are the **Marketing API app permission categories** selected:

| Category | Sub-permission | Maps to scope |
|---|---|---|
| ✅ Ad Account Management | Read Ad Account Information | Baseline requirement |
| ✅ Measurement | Report Conversion Event | Required for Business Messaging application |
| ✅ CTX Events Management | List CTM Event Sets | Required for Business Messaging application |
| ✅ TikTok Accounts | Account User (Basic Info + Insights) | `user.info.basic`, `user.info.profile`, `user.info.stats`, `user.info.username`, `user.account.type`, `user.insights` |
| ✅ TikTok Accounts | Get Account Media | `video.list`, `video.insights` |
| ✅ TikTok Accounts | Account Comment (Get + Manage) | `comment.list`, `comment.list.manage` |
| ✅ TikTok Accounts | Account Post Content → Video Publish | `video.publish` |
| ✅ Mentions | Content + Comment | `biz.brand.insights` |
| ✅ Creative Management | TikTok Message Management | Welcome messages + auto-reply config |

### Scopes NOT selected (intentionally skipped)
- ❌ Ads Management — not running ads
- ❌ Audience Management — not needed
- ❌ Reporting — ad reports, not needed
- ❌ DPA Catalog Management — not needed
- ❌ Reach & Frequency — not needed
- ❌ TikTok Creator Marketplace — not needed
- ❌ Business Recommendation — Spark Ads, not needed
- ❌ Brand Safety — not needed
- ❌ Automated Rules — not needed

### Full scope list (what the app should have when fully approved)

| Scope | Purpose |
|---|---|
| `user.info.basic` | Get authenticated user identity |
| `user.info.profile` | Profile metadata (bio, display name, avatar) |
| `user.info.stats` | Account-level lifetime stats (follower count, etc.) |
| `user.info.username` | Get the @handle — needed for TikTok.me links, dashboard display, webhook matching |
| `user.account.type` | Detect Business vs Personal account — reject Personal accounts at OAuth |
| `user.insights` | Daily metrics: video views, profile views, follower growth, audience demographics |
| `message.list.read` | Read DM inbox (added after DSPR approval) |
| `message.list.manage` | Manage DMs (added after DSPR approval) |
| `message.list.send` | Explicit send permission for DMs (added after DSPR approval) |
| `comment.list` | Read comments on owned posts |
| `comment.list.manage` | Reply / hide / delete comments |
| `video.list` | List owned videos |
| `video.publish` | Post content |
| `video.insights` | Per-video analytics: views, reach, impressions, watch time |
| `biz.brand.insights` | Mention monitoring + brand insights |
| `biz.creator.insights` | Creator analytics |

> **Note:** `message.list.*` scopes are NOT in the app creation form. They get added automatically after you pass the DSPR/USDS review (Step 6).

### Redirect URLs (to update later)
Currently set to `https://wouchh.com/` as a placeholder. Once the OAuth callback is built, update to:
- `https://wouchh.com/auth/tiktok/callback/`
- Or `https://app.wouchh.com/auth/tiktok/callback/`
- You can have up to **10 redirect URLs**
- Rules: HTTPS only, must end with `/`, no ports, no query params, no anchors

### App logo
- [ ] Upload **512 × 512 px** JPG/JPEG/PNG of Wouchh logo
- **Required** — missing logo = OAuth error page for users
- Upload at: My Apps → App Detail → Basic Information

---

## Step 4: Business Center Setup ✅ DONE (Verification In Progress)

### Why this was needed
The Accounts API form (Step 5) requires business verification. Two options were available:
1. ~~Submit an acceptable document~~ — India was not in the country list for this option
2. ✅ **Provide a Business Center ID with Company Information Verified** — this works for India

### Business Center created

| Field | Value |
|---|---|
| Business type | **Agency** ("I manage the business on behalf of my clients") |
| Company website | `https://wouchh.com/` |
| Country/Region | **India** |
| Business name | **Wouchh** |
| BC name | **Wouchh** |
| Timezone | (UTC+05:30) Indian Standard Time |
| Currency | USD |
| **Business Center ID** | **`7647271851734958097`** |

> Note: When India was selected, TikTok showed: "The country you select cannot be used to create an ad account. You can still use this Business Center account for other activities." — this is fine, we don't need ad accounts.

### Business Center Verification ⏳ IN PROGRESS

| Field | Value |
|---|---|
| Industry | Not applicable |
| Document type | **Udyam Registration (MSME)** — used as "Certificate of registration" |
| Certificate number | Udyam number (e.g., `UDYAM-MH-XX-XXXXXXX`) |
| Additional documents | Skipped (optional) |
| Verification ETA | **~2 days** (~June 5-6, 2026) |

> **How Udyam was obtained:** Registered at https://udyamregistration.gov.in/ — free, instant, only requires Aadhaar + PAN. Qualifies as "Certificate of registration" for TikTok's verification.

---

## Step 5: Apply for Accounts API (Organic) Access 🔜 BLOCKED ON BC VERIFICATION

**Form URL:** https://bytedance.sg.larkoffice.com/share/base/form/shrlgu4WEvtSXpEDLcCw56u4Rfc  
**Prerequisite:** Business Center verification must be complete (Step 4b)

### Answers to use when submitting

| # | Question | Answer |
|---|---|---|
| 1 | Business Name | **Wouchh** |
| 2 | Does Business Name match developer profile? | **Yes** |
| 3 | App Name | **Wouchh** |
| 4 | Email Address | The `@wouchh.com` email used for dev registration |
| 5 | Website | `https://wouchh.com/` |
| 6 | Business Verification | **Provide A Business Center ID with Company Information Verified** → `7647271851734958097` |
| 7 | Use Case | See detailed answer below |
| 8 | Screen Recordings | Record walkthrough of Wouchh frontend (see tips below) |
| 9 | Estimated Count of Accounts | **Less Than 10** |
| 10 | Developer Account Type | **Technology Company** |
| 11 | Usage Acknowledgment | **Agree** |

### Question 7 — Use Case (full answer to copy-paste)
```
Wouchh is a B2B SaaS platform that provides business owners a unified dashboard for managing their TikTok Business Account engagement. Here is how we use each requested scope:

ACCOUNT USER (user.info.basic, user.info.profile, user.info.stats, user.info.username, user.account.type, user.insights):
After a business owner authorizes Wouchh via OAuth, we display their profile information (display name, avatar, username, bio) and account statistics (followers, following, total likes, video count) in the dashboard. We use user.account.type to verify the account is a Business Account before proceeding. We use user.insights to show daily performance trends — video views, profile views, follower growth, and audience demographics (age, gender, geography) — so business owners can track growth without switching to the native TikTok app.

GET ACCOUNT MEDIA (video.list, video.insights):
We list the business owner's published videos with thumbnails, captions, and timestamps. We fetch per-video analytics (views, likes, comments, shares, reach, impressions, average watch time) to build a performance dashboard that helps businesses identify their top-performing content.

ACCOUNT COMMENT (comment.list, comment.list.manage):
We display comments on the business owner's videos in a unified inbox. Business owners can reply to customer comments, hide spam, and delete inappropriate comments directly from the Wouchh dashboard — significantly faster than doing it natively in the TikTok app when managing multiple videos.

ACCOUNT POST CONTENT (video.publish):
We allow business owners to schedule and publish organic video content to their TikTok account from our dashboard, enabling batch content planning and cross-platform publishing alongside Facebook and Instagram.

WHY API INTEGRATION IS NECESSARY:
The native TikTok app and TikTok for Business web platform do not provide a unified cross-platform inbox, scheduled content publishing across multiple social networks, or centralized analytics. Business owners managing engagement across TikTok, Facebook, and Instagram must currently switch between 3 separate apps. Wouchh consolidates this into a single dashboard, saving time and enabling faster response to customer interactions. The API integration is essential because there is no way to programmatically read comments, fetch analytics, or publish content on behalf of a business account without the Accounts API.
```

### Screen Recording Tips
When recording the Wouchh frontend demo, show:
1. **Login page** → the TikTok OAuth button + permission scopes listed
2. **Dashboard** → where profile info / stats would appear
3. **Comment/inbox area** → where comments would be displayed and replied to
4. **Content publishing** → any scheduling or publishing UI
5. **Analytics section** → where video metrics / audience demographics would show
- Even placeholder UI screens are fine — reviewers want to see a real product with a clear user flow

---

## Step 6: Apply for Business Messaging API Access 🔜 BLOCKED ON APP APPROVAL

**Critical for Wouchh's core DM automation use case.**  
**Form URL:** https://bytedance.sg.larkoffice.com/share/base/form/shrlg7vFArGhg9V20neYCEwIKrb  
**Prerequisite:** Developer app must be approved first (Step 3)

### Regional availability
- ❌ **Not available** in EEA, Switzerland, UK
- ✅ Available in US (extra US Data Security Review required)
- ✅ Available in all other regions

### Two-stage audit
1. **DSPR** (Data Security & Privacy Review) — required for all
2. **USDS** (US Data Security Review) — only if serving US business accounts

### USDS eligibility restrictions
❌ **Ineligible if developer is located in or has Ultimate Beneficial Owners from:**
- China (including Hong Kong), Russia, Iran, North Korea, Cuba, Syria
- Also ineligible if >25% owned by individuals/entities from those countries.

### Documents to prepare BEFORE applying

| Document | Purpose |
|---|---|
| **ISO 27001 certificate** | Information security management standard |
| **SOC 2 report** | Trust services (security, availability, confidentiality) |
| **Latest vulnerability scan report** | Recent infra security scan |
| **Latest penetration testing report** | Recent pen test results |
| **Privacy policy URL** | `https://wouchh.com/privacy` ✅ Already live |
| **Terms of service URL** | `https://wouchh.com/terms` ✅ Already live |
| **GDPR / CPRA compliance documentation** | If touching EU/CA data |
| **Data retention policy** | How long you store data |
| **Incident response policy** | How you handle breaches |

### Technical security requirements
- [ ] Encryption at rest: **AES-256 or RSA-1024+**
- [ ] Encryption in transit: **TLS v1.2+**
- [ ] MFA enforced for admin access
- [ ] Network segmentation
- [ ] Endpoint protection (anti-virus, HIPS)
- [ ] Access control: need-to-know + least-privilege
- [ ] Regular vulnerability scans + pen tests
- [ ] Documented incident response plan
- [ ] Awareness training program

### Privacy requirements
- [ ] Dedicated data privacy role/owner
- [ ] Privacy notice covering full data lifecycle
- [ ] Data subject rights implemented (access, download, update, delete)
- [ ] Data minimization (don't request scopes you don't need)
- [ ] Data retention limits enforced

### Process
1. Submit application form
2. TikTok initiates review **within 10 working days**
3. You receive email: **"TikTok/ByteDance Third-Party Due Diligence Questionnaire" (DSPR DDQ)** — fill out
4. If applicable, ~1 week later: **"A questionnaire request from TikTok U.S. Data Security Inc." (USDS VAQ)**
5. Complete questionnaires + attach prepared documents
6. Approval → messaging scopes (`message.list.read`, `message.list.manage`, `message.list.send`) added to your app

### Timeline
- DSPR: **2–4 weeks**
- USDS: **7–10 business days** after questionnaire submission
- Combined realistic: **3–5 weeks total**

---

## Step 7: Set Up Sandbox 🔜 BLOCKED ON APP APPROVAL

**Prerequisite:** Developer app approved (Step 3).  
**URL:** https://ads.tiktok.com/marketing_api/homepage → "Go to my apps"

### Steps
1. Click your Developer Application
2. Click **"Create a Sandbox Ad Account"**
3. Specify: name, country, currency, timezone
4. Click "Create"
5. Generate sandbox access token

### Sandbox limits
- **1 QPS** / **30 QPM** / **1,000 QPD**

### Sandbox endpoints
- Base URL: `https://sandbox-ads.tiktok.com/open_api`
- Production: `https://business-api.tiktok.com/open_api`

### Mock data
- Reporting data available for time range: 2020-12-08 to 2020-12-19

---

## Step 8: Final Production Checklist

Before go-live with real business customers:

- [ ] Developer account approved
- [ ] Developer app approved with all required scopes
- [ ] Business Messaging API: DSPR passed
- [ ] Business Messaging API: USDS passed (if serving US)
- [ ] Accounts API access approved
- [ ] App logo uploaded (512×512)
- [ ] All OAuth redirect URLs registered (update from `https://wouchh.com/` to actual callback)
- [ ] Privacy policy + ToS live on wouchh.com ✅
- [ ] Data deletion page live on wouchh.com ✅
- [ ] SOC 2 / ISO 27001 in place (or in active progress)
- [ ] Encryption at rest and in transit verified
- [ ] Webhook endpoint live and verified by TikTok
- [ ] Sandbox testing complete for all critical flows
- [ ] Rate limit handling implemented
- [ ] Token refresh logic implemented (24hr access token, 1yr refresh token)

---

## Key URLs Reference

| Purpose | URL |
|---|---|
| Business Developer Portal | https://business-api.tiktok.com/portal |
| My Apps Dashboard | https://ads.tiktok.com/marketing_api/apps/ |
| API Homepage | https://ads.tiktok.com/marketing_api/homepage |
| Business Messaging API Application | https://bytedance.sg.larkoffice.com/share/base/form/shrlg7vFArGhg9V20neYCEwIKrb |
| Accounts API Application | https://bytedance.sg.larkoffice.com/share/base/form/shrlgu4WEvtSXpEDLcCw56u4Rfc |
| Business Center Dashboard | https://business.tiktok.com/ |
| Postman Collection | https://www.postman.com/tiktok/workspace/tiktok-api-for-business/ |
| Production API base | `https://business-api.tiktok.com/open_api` |
| Sandbox API base | `https://sandbox-ads.tiktok.com/open_api` |

---

## Realistic Timeline From Today (June 3, 2026)

```
✅ Day 0  (Jun 3):   Account + dev registration + app submitted + BC created + BC verification submitted
⏳ Day ~2 (Jun 5-6): BC verification complete → submit Accounts API form immediately
⏳ Day ~3 (Jun 6):   App approved → submit Business Messaging form + create sandbox + start building
⏳ Day ~6-30:        Build in sandbox while DSPR/USDS reviews run
⏳ Day 30+:          Full production access with all scopes
```

---

## Website Pages Status (all live on wouchh.com)

| Page | URL | Status | TikTok Requirement |
|---|---|---|---|
| Homepage | https://wouchh.com/ | ✅ Live | Professional company website |
| Privacy Policy | https://wouchh.com/privacy | ✅ Live | Required for DSPR |
| Terms of Service | https://wouchh.com/terms | ✅ Live | Required for DSPR |
| Data Deletion | https://wouchh.com/data-deletion | ✅ Live | Bonus (shows maturity) |
| About | https://wouchh.com/about | ✅ Live | Company info page |

### Policy pages review status
- Privacy Policy: **Covers all DSPR requirements** — data lifecycle, minimization, encryption, subject rights, incident response, EEA restriction, scope-level transparency
- Terms of Service: **Links TikTok + Meta ToS**, documents messaging restrictions, proper disclaimers
- Data Deletion: **4 deletion methods**, 30-day timeline, webhook handling
- All pages are multi-platform ready (TikTok + Facebook + Instagram documented)

### Minor optional improvements for policies (not blockers)
- About page: Consider adding "Wouchh is a technology company registered in Maharashtra, India" for entity consistency
- Privacy Policy §4.2: Add explicit mention of "security awareness training" (DSPR checklist item)
- Privacy Policy §13: Consider a `privacy@wouchh.com` alias for DPO-style contact

---

## Authentication Architecture (for reference when building)

```
Business clicks auth URL → TikTok consent screen → Redirect with auth_code
     ↓
POST /tt_user/oauth2/token/ (auth_code → access_token + refresh_token)
     ↓
access_token expires in 24 hours
     ↓
POST /tt_user/oauth2/refresh_token/ (refresh_token → new access_token)
     ↓
refresh_token expires in 1 year → user must re-authorize
```

### Auth code rules
- Accounts API auth codes: valid for **10 minutes only** (vs 1 hour for Marketing API)
- Single-use only
- Exchange via `/tt_user/oauth2/token/` endpoint

### Rate Limits (Basic tier, default)
- **10 QPS** / **600 QPM** / **864,000 QPD**
- Business Messaging API: fixed at **10 QPS**
- Sandbox: **1 QPS** / **30 QPM** / **1,000 QPD**

### Messaging Windows
| Situation | Limit |
|---|---|
| Within 48hrs of user's first message | Up to 10 messages from business |
| User replies — active conversation | Unlimited for 48hrs after last user reply |
| User inactive 48+ hours | Max 3 messages until user responds again |
