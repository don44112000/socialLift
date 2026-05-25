# TikTok Developer Onboarding Checklist
**Project:** SocialLift  
**Target:** TikTok for Business Developer access (Marketing API + Business Messaging API + Organic API)

---

## Overview — What You're Signing Up For

| Tier | What it is | Timeline |
|---|---|---|
| 1. TikTok for Business account | Company-level account on TikTok Business platform | Instant |
| 2. Developer registration | Tag your account as a developer | ~3 business days |
| 3. Developer App | The actual SocialLift integration with `client_key` + `client_secret` | ~2-3 business days |
| 4. Business Messaging API access | Separate audit for DM capabilities | ~2-4 weeks |
| 5. Accounts API access (Organic) | Separate application for comment/mention APIs | Varies |

**Total realistic timeline to production-ready:** **4-8 weeks**

---

## Step 1: Create TikTok for Business Account

**URL:** https://business-api.tiktok.com/portal → click registration button

### What to provide
- [ ] **Email address** — use an alias like `developers+tiktok@novatab.com` so multiple team members share access
- [ ] Password
- [ ] Agree to terms / privacy policy
- [ ] Verify via code sent to email/phone

### Email rules
- **MUST be a company domain email** (e.g., `@novatab.com`)
- ❌ Personal emails (`@gmail.com`, etc.) will be **rejected**
- ❌ Temporary/disposable emails will be rejected
- ✅ Recommended: shared alias `developers+tiktok@novatab.com`

---

## Step 2: Register as a Developer

**URL:** https://business-api.tiktok.com/portal → click "Become a Developer"

### Form fields

| Field | What to put |
|---|---|
| **Name** | Your full name |
| **Communication email** | Same company domain alias from Step 1 (must be verified) |
| **User type** (dropdown) | Select **"Technology Company"** (you're building a SaaS, not an agency or direct advertiser) |
| **Company name** | Novatab (or the entity you incorporate SocialLift under) |
| **Company website** | URL of SocialLift's site or Novatab's site |
| **Primary Developer Location** | Your dev team's primary country |
| **Additional company information** | Free-text description (see template below) |

### Company website requirements (strict)
- [ ] Publicly accessible (no login wall)
- [ ] Fully developed, professional presentation
- [ ] Hosted on a domain owned by Novatab
- [ ] Domain must match the email domain
- [ ] ❌ Cannot use social media pages, third-party hosting, e-commerce platforms
- [ ] ❌ No shortened URLs
- [ ] ❌ No personal/individual websites — only company sites

### "Additional company information" template
```
Novatab is a technology company headquartered in [country], building SocialLift —
a SaaS platform that helps TikTok business accounts automate customer interactions.
We are the product and development team. We integrate TikTok's Business Messaging API,
Organic API, and Marketing API to provide business owners with autonomous AI agents
that handle direct messages, comment replies, and mention monitoring on their
authorized TikTok business accounts.
```

### Timeline
- Review result via email within **3 business days**

---

## Step 3: Create the Developer App

**Prerequisite:** Developer registration approved.  
**URL:** https://business-api.tiktok.com/portal → "Create an App"

### Fields to fill

| Field | What to put |
|---|---|
| **App name** | `SocialLift` |
| **Intended Uses** | Description (see template below) |
| **Developer App Access Controls** | Specify: "Shared with external business accounts who authorize via OAuth" |
| **Advertiser redirect URL(s)** | Up to 10 OAuth callback URLs — must follow rules below |
| **Scope of permission** | Tick required scopes (see list below) |

### Redirect URL rules
- [ ] Must be absolute, ending with `/`
- [ ] Must start with `https://` (not `http://`)
- [ ] No query parameters (`?` not allowed)
- [ ] No anchors (`#` not allowed)
- [ ] No ports (e.g., no `:3000`)
- [ ] Length: 10–512 characters

**Examples:**
- ✅ `https://app.sociallift.com/auth/tiktok/callback/`
- ❌ `https://app.sociallift.com/auth/tiktok/callback` (missing `/`)
- ❌ `http://app.sociallift.com/auth/...` (not https)
- ❌ `https://app.sociallift.com:3000/auth/...` (has port)

To pass data through OAuth, use the `state` parameter instead of query strings.

### Intended Uses template
```
SocialLift is a B2B SaaS platform that helps TikTok business accounts automate
customer engagement. Authorized business accounts grant the app access via OAuth to:
- Read and reply to DMs autonomously using AI
- Monitor and reply to comments on their owned videos
- Track brand mentions and tags
- Schedule and publish content
- View engagement analytics
Access is granted per-business-account and revocable at any time.
```

### Scopes to request

| Scope | Purpose |
|---|---|
| `user.info.basic` | Get authenticated user identity |
| `user.info.profile` | Profile metadata |
| `user.info.stats` | Account-level stats (follower count, etc.) |
| `message.list.read` | Read DM inbox |
| `message.list.manage` | Send DMs (requires Business Messaging API approval) |
| `comment.list` | Read comments on owned posts |
| `comment.list.manage` | Reply / hide / delete comments |
| `video.list` | List owned videos |
| `video.publish` | Post content |
| `biz.brand.insights` | Mention monitoring + brand insights |
| `biz.creator.insights` | Creator analytics |

### Upload app logo
- [ ] JPG / JPEG / PNG
- [ ] Max **512 × 512 px**
- [ ] Required — missing logo = OAuth error page

### Timeline
- App review: **2–3 business days**
- You can have up to **5 developer apps** per account

---

## Step 4: Apply for Business Messaging API Access

**Critical for SocialLift's core use case.**

**Form URL:** https://bytedance.sg.larkoffice.com/share/base/form/shrlg7vFArGhg9V20neYCEwIKrb

### Regional availability
- ❌ **Not available** in EEA, Switzerland, UK
- ✅ Available in US (extra US Data Security Review required)
- ✅ Available in all other regions

### Two-stage audit
1. **DSPR** (Data Security & Privacy Review) — required for all
2. **USDS** (US Data Security Review) — only if serving US business accounts

### USDS eligibility restrictions
❌ **Ineligible if developer is located in or has Ultimate Beneficial Owners from:**
- China (including Hong Kong)
- Russia
- Iran
- North Korea
- Cuba
- Syria

Also ineligible if >25% owned by individuals/entities from those countries.

### Documents to prepare BEFORE applying (speeds up review significantly)

| Document | Purpose |
|---|---|
| **ISO 27001 certificate** | Information security management standard |
| **SOC 2 report** | Trust services (security, availability, confidentiality) |
| **Latest vulnerability scan report** | Recent infra security scan |
| **Latest penetration testing report** | Recent pen test results |
| **Privacy policy URL** | Public policy explaining data lifecycle |
| **Terms of service URL** | Public ToS for SocialLift |
| **GDPR / CPRA compliance documentation** | If touching EU/CA data |
| **Data retention policy** | How long you store data |
| **Incident response policy** | How you handle breaches |

### Technical security requirements you must meet
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
6. Approval

### Timeline
- DSPR: **2–4 weeks**
- USDS: **7–10 business days** after questionnaire submission
- Combined realistic: **3–5 weeks total**

⚠️ The USDS VAQ is the most critical step for US market access. Prioritize completing it by the email deadline.

---

## Step 5: Apply for Accounts API (Organic) Access

**Form URL (required from March 20, 2026):** https://bytedance.sg.larkoffice.com/share/base/form/shrlgu4WEvtSXpEDLcCw56u4Rfc

Required before requesting any scope that includes "TikTok Accounts" permission.

### Process
1. Complete the application form
2. Configure TikTok account holder redirect URLs (up to 10) in app settings
3. Wait for approval
4. Use auth flow to onboard business accounts

### TikTok Account holder authorization URL
Found at: My Apps → App Detail → Basic Information → "TikTok account holder authorization URL"
- This is what you'll share with business owners to authorize SocialLift
- Different from the Marketing API advertiser auth flow

### Auth code rules (different from Marketing API)
- Authorization code valid for **10 minutes only** (Marketing API is 1 hour)
- Single-use only
- Exchange via `/tt_user/oauth2/token/` endpoint

---

## Step 6: Set Up Sandbox

**Prerequisite:** Developer app approved.  
**URL:** https://ads.tiktok.com/marketing_api/homepage → "Go to my apps"

### Steps
1. Click your Developer Application
2. Click **"Create a Sandbox Ad Account"**
3. Specify: name, country, currency, timezone
4. Click "Create"
5. Generate sandbox access token

### Sandbox limits
- **1 QPS** (queries per second)
- **30 QPM** (queries per minute)
- **1,000 QPD** (queries per day)

### Sandbox endpoints
- Base URL: `https://sandbox-ads.tiktok.com/open_api`
- Production: `https://business-api.tiktok.com/open_api`

### Mock data
- Reporting data available for time range: 2020-12-08 to 2020-12-19

---

## Step 7: Final Production Checklist

Before go-live with real business customers:

- [ ] Developer account approved
- [ ] Developer app approved with all required scopes
- [ ] Business Messaging API: DSPR passed
- [ ] Business Messaging API: USDS passed (if serving US)
- [ ] Accounts API access approved
- [ ] App logo uploaded
- [ ] All OAuth redirect URLs registered
- [ ] Privacy policy + ToS live on Novatab/SocialLift domain
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
| Postman Collection | https://www.postman.com/tiktok/workspace/tiktok-api-for-business/ |
| Production API base | `https://business-api.tiktok.com/open_api` |
| Sandbox API base | `https://sandbox-ads.tiktok.com/open_api` |

---

## Approval Timeline Summary

```
Day 0:    Sign up TikTok for Business account              [instant]
Day 0:    Submit developer registration                    [3 business days]
Day 3:    Developer approved → Create developer app        [2-3 business days]
Day 6:    App approved → Apply for Business Messaging API  [up to 4 weeks]
Day 6:    Apply for Accounts API in parallel               [varies]
Day 6:    Build in sandbox                                  [parallel work]
Day 30+:  DSPR/USDS approval → Production rollout
```

**Realistic end-to-end:** **4 to 8 weeks** from signup to handling real customer business accounts in production.

---

## What to Prepare Right Now (Before Even Signing Up)

1. **Company domain email alias** — `developers+tiktok@novatab.com`
2. **Public-facing SocialLift website** — must be live, polished, on Novatab domain
3. **Privacy policy** — published at a public URL
4. **Terms of service** — published at a public URL
5. **Plan to obtain SOC 2 / ISO 27001** — even in progress helps
6. **Encryption review** — confirm AES-256 at rest, TLS 1.2+ in transit in your stack
7. **OAuth callback URLs decided** — must be HTTPS, no ports, ending with `/`
8. **App logo** — 512×512 PNG/JPG ready

Get these in order before starting the signup, or expect rejections and delays.
