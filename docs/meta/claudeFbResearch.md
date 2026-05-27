# META DEVELOPER TOOLS — COMPREHENSIVE DEEP RESEARCH REPORT 2026

> **APIs • SDKs • Permissions • Events • Onboarding • Platforms**
> Compiled from Meta Developer Documentation, Official API References, Developer Blogs, and Changelogs
> _April 2026 | developers.facebook.com | developers.meta.com_

---

## KEY STATISTICS

| Metric                              | Value                                            |
| ----------------------------------- | ------------------------------------------------ |
| Daily Active Users across Meta apps | 3.29 Billion+                                    |
| Llama Model Downloads               | 100 Million+ (leading open source LLM family)    |
| Spent on Meta Quest titles          | $1 Billion+ (1 in 12 titles earning $10M+ gross) |
| WhatsApp Users Globally             | 2 Billion+                                       |
| Meta Ad Revenue (Q3 2025)           | $50.08 Billion (26% YoY increase)                |

---

## TABLE OF CONTENTS

1. [Executive Overview](#1-executive-overview)
2. [Developer Portals & Entry Points](#2-developer-portals--entry-points)
3. [Developer Registration & App Creation](#3-developer-registration--app-creation)
4. [Graph API — The Core of Meta's Platform](#4-graph-api--the-core-of-metas-platform)
5. [Access Tokens — Authentication & Authorization](#5-access-tokens--authentication--authorization)
6. [Permissions — Granular API Authorization](#6-permissions--granular-api-authorization)
7. [App Review & Business Verification](#7-app-review--business-verification)
8. [Webhooks — Real-Time Event Notifications](#8-webhooks--real-time-event-notifications)
9. [Facebook Login & Authentication](#9-facebook-login--authentication)
10. [Instagram Platform API](#10-instagram-platform-api)
11. [WhatsApp Business Platform](#11-whatsapp-business-platform)
12. [Messenger Platform](#12-messenger-platform)
13. [Threads API](#13-threads-api)
14. [Marketing API](#14-marketing-api)
15. [Meta Pixel & Conversions API (CAPI)](#15-meta-pixel--conversions-api-capi)
16. [Meta App Events & SDKs](#16-meta-app-events--sdks)
17. [Meta Horizon OS — VR & Mixed Reality](#17-meta-horizon-os--vr--mixed-reality)
18. [Llama & Meta AI Developer Tools](#18-llama--meta-ai-developer-tools)
19. [Facebook Pages API](#19-facebook-pages-api)
20. [Commerce Platform & Catalog API](#20-commerce-platform--catalog-api)
21. [Live Video API & Stories](#21-live-video-api--stories)
22. [Meta Audience Network](#22-meta-audience-network)
23. [Meta Wearables Developer Toolkit](#23-meta-wearables-developer-toolkit)
24. [Rate Limits, Quotas & Best Practices](#24-rate-limits-quotas--best-practices)
25. [Social Plugins & Sharing](#25-social-plugins--sharing)
26. [App Links](#26-app-links)
27. [Gaming — Instant Games](#27-gaming--instant-games)
28. [Data Privacy, Compliance & Responsible Platform](#28-data-privacy-compliance--responsible-platform)
29. [Developer Tools, Testing & Debugging](#29-developer-tools-testing--debugging)
30. [Quick Reference — Key Endpoints & Resources](#30-quick-reference--key-endpoints--resources)

---

## 1. Executive Overview

Meta's developer ecosystem is one of the largest in the world, spanning social technologies, AI, mixed reality, wearables, and business messaging. As of 2026, the Meta developer platform is organized around **five major pillars**:

1. **Social Technologies** — Facebook, Instagram, WhatsApp, Messenger, Threads
2. **AI & Llama Models** — Open-source LLMs, Wit.ai NLP, on-device AI
3. **Meta Horizon OS** — VR/MR headsets (Quest 3, Quest 3S), immersive app development
4. **Worlds** — Meta Horizon Worlds creator and social platform
5. **Wearables** — AI glasses and wearable devices (restricted beta access)

Each pillar provides a rich set of APIs, SDKs, events, tools, and onboarding workflows. This report is a comprehensive synthesis of all major Meta developer documentation, guides, APIs, permissions, events, access levels, onboarding procedures, and recent changes as of April 2026.

Meta's platform is accessed through two primary developer portals:

- `developers.facebook.com` — Social technologies, Graph API, marketing, business messaging
- `developers.meta.com` — AI, Horizon OS, Wearables, unified developer hub

---

## 2. Developer Portals & Entry Points

### 2.1 Primary Portals

| Portal                             | Scope & Description                                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `developers.facebook.com`          | Social technologies: Graph API, Facebook Login, Instagram Platform, WhatsApp, Messenger, Marketing API, Commerce APIs, SDKs |
| `developers.meta.com`              | Meta-wide: AI/Llama, Meta Horizon OS (VR/MR), Wearables Device Access Toolkit, Social tech overview                         |
| `developers.meta.com/horizon`      | Meta Horizon OS developer center: Unity, Unreal, OpenXR, Spatial SDK, Quest tools, Passthrough Camera API                   |
| `wearables.developer.meta.com`     | AI glasses & wearables developer access toolkit (restricted beta)                                                           |
| `business.whatsapp.com/developers` | WhatsApp Business Platform developer hub: API reference, webhooks, pricing, training, Blueprint courses                     |

### 2.2 App Dashboard

The **App Dashboard** (`developers.facebook.com/apps`) is the central control panel for all Meta app development. From here, developers:

- Create and configure apps, set app type, and manage basic settings
- Choose **use cases** — Meta organizes app capabilities around use cases rather than raw product categories
- Request permissions and manage access levels (Standard vs. Advanced)
- Submit for App Review
- Connect to a Business Portfolio
- Configure Webhooks
- Add Products (e.g., Facebook Login, Marketing API, WhatsApp, Messenger)
- Manage Roles and Test Users
- Generate access tokens via the integrated Graph API Explorer link
- View App Health, alerts, and compliance status

### 2.3 Developer Centers by Product Area

| Developer Center    | URL                                | Focus                                             |
| ------------------- | ---------------------------------- | ------------------------------------------------- |
| AI                  | developers.meta.com/ai             | Llama models, Wit.ai, on-device AI                |
| Meta Horizon OS     | developers.meta.com/horizon        | VR/MR app development                             |
| Social Technologies | developers.facebook.com            | Facebook, Instagram, WhatsApp, Messenger, Threads |
| Wearables           | wearables.developer.meta.com       | AI glasses, wearable devices                      |
| Worlds              | developers.meta.com/horizon/worlds | Horizon Worlds creation                           |

---

## 3. Developer Registration & App Creation

### 3.1 Registration Steps

Before using any Meta API, you must register as a developer:

1. Go to `developers.facebook.com` and log in with a Facebook account
2. Accept the **Meta Platform Terms** and **Developer Policies**
3. Phone number verification may be required for identity confirmation
4. Navigate to **My Apps** and click **Create App**
5. Select app type: Consumer, Business, Gaming, or None
6. Optionally connect to a **Business Portfolio** (recommended for business use cases)
7. Choose a **Use Case** that aligns with intended API usage
8. Provide app name, contact email, **Privacy Policy URL**, and app domain
9. Submit — your app is created in Development Mode

> **Note:** A Privacy Policy URL and App Domain are required even for internal apps. For apps without a website, generate a policy using a free generator and host it on GitHub Pages or similar.

### 3.2 App Types

Choosing the correct app type is critical — it determines which APIs and products are available:

| App Type     | Description & Best For                                                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Business** | Required for Marketing API, WhatsApp Business Platform, Instagram API with Business Login. Grants access to business-oriented capabilities including ads, pages, and B2B features. |
| **Consumer** | For apps connecting with individual Facebook/Instagram users. Enables Facebook Login, social graph access, sharing, and user data features.                                        |
| **Gaming**   | For Instant Games and gaming-specific APIs. Access to gaming platforms and player services.                                                                                        |
| **None**     | Utility selection when none of the above apply. May restrict some products.                                                                                                        |

### 3.3 Use Cases

Meta's use-case-driven model helps developers configure only the products and permissions they need. Common use cases include:

- **Authenticate and request data from users** — Facebook Login, user profile data
- **Create ads for an ad account** — Marketing API, Ads Management
- **Manage business assets** — Business Manager API, Page management
- **Engage with your customers** — Messenger, WhatsApp, Instagram messaging
- **Access content from Instagram** — Instagram Platform API
- **Other** — For products like Conversions API, Webhooks, Commerce

### 3.4 App Roles

| Role          | Access Level                                             |
| ------------- | -------------------------------------------------------- |
| Administrator | Full access to all app settings                          |
| Developer     | Can use development tools, see test user tokens          |
| Tester        | Can use the app in Development Mode without admin access |
| Advertiser    | Can view app analytics and ad-related data               |
| Analyst       | Read-only access to analytics                            |

### 3.5 Test Users

Meta allows creating test users (synthetic accounts) in the App Dashboard. Test users can be used to simulate real user interactions during development without using real accounts, protecting developer privacy and enabling isolated testing.

---

## 4. Graph API — The Core of Meta's Platform

### 4.1 Overview

The **Graph API** is Meta's primary HTTP-based API for reading and writing data to the Meta social graph. It is built around the concept of a **social graph** composed of **nodes**, **edges**, and **fields**. All requests are made to `graph.facebook.com` over HTTPS.

```
Base URL: https://graph.facebook.com/{version}/{endpoint}?access_token={token}
```

The API is named after the "social graph" — a representation of information on Facebook where people, Pages, Groups, Posts, Photos, and other objects are interconnected. It works with any language that has an HTTP library.

### 4.2 Core Concepts

#### Nodes

Individual objects with unique IDs. Examples: User, Page, Post, Photo, Comment, Group, Ad Account, App. Each node has a numeric or alphanumeric ID.

```bash
GET https://graph.facebook.com/USER-ID?access_token=ACCESS-TOKEN
```

Response:

```json
{
  "name": "Your Name",
  "id": "YOUR-USER-ID"
}
```

#### Edges

Connections between two nodes, representing relationships. A User node has a `/photos` edge (their photos), a `/friends` edge, a `/feed` edge, etc. Edge calls return collections of connected objects.

```bash
GET https://graph.facebook.com/USER-ID/photos?access_token=ACCESS-TOKEN
```

Response:

```json
{
  "data": [
    { "created_time": "2024-01-06T18:04:10+0000", "id": "1353272134728652" },
    { "created_time": "2024-01-06T18:01:13+0000", "id": "1353269908062208" }
  ]
}
```

#### Fields

Properties of nodes. By default, the API returns a minimal set. Use the `fields` parameter to specify exactly which data you want — critical for performance and data minimization.

```bash
GET https://graph.facebook.com/USER-ID?fields=id,name,email,picture&access_token=ACCESS-TOKEN
```

Response:

```json
{
  "id": "USER-ID",
  "name": "EXAMPLE NAME",
  "email": "EXAMPLE@EMAIL.COM",
  "picture": {
    "data": {
      "height": 50,
      "is_silhouette": false,
      "url": "URL-FOR-USER-PROFILE-PICTURE",
      "width": 50
    }
  }
}
```

#### The /me Endpoint

A special shortcut that resolves to the object ID of the person or Page whose access token is currently being used. Simplifies personal data retrieval.

```bash
GET https://graph.facebook.com/me?fields=id,name,email&access_token=ACCESS-TOKEN
```

#### Node Metadata (Deprecated)

> ⚠️ **Deprecation Notice:** The `metadata` parameter is deprecated in Graph API v25.0 and will be removed for **all versions on May 19, 2026**. Use the Graph API Explorer or API references instead.

### 4.3 Graph API Versioning

The Graph API uses quarterly versioned releases. Always specify a version in requests to avoid defaulting to the oldest available version. Meta deprecates old versions with notice.

**Current major version: v23.0 (as of April 2026)**

```bash
GET https://graph.facebook.com/v23.0/me?access_token=ACCESS-TOKEN
```

**Version Lifecycle:**

- New versions released quarterly
- Each version supported for approximately 2 years
- Oldest available version is the fallback if no version specified (not recommended)
- Changelog published at `developers.facebook.com/docs/graph-api/changelog`

### 4.4 HTTP Operations

| Operation            | Description                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **GET**              | Read data from a node or edge. Returns JSON objects with requested fields.                                                              |
| **POST**             | Create new objects or update existing ones. Used for publishing posts, creating ads, etc.                                               |
| **DELETE**           | Remove objects you have created. Applies to nodes like Posts and Photos.                                                                |
| **Read-After-Write** | Graph API can immediately return fields from a newly created/updated object by adding the `fields` parameter to create/update requests. |
| **Batch Requests**   | Send multiple API calls in a single HTTP request to reduce latency.                                                                     |

#### POST Example — Publish to Page Feed

```bash
curl -i -X POST "https://graph.facebook.com/PAGE-ID/feed
  ?message=Hello
  &fields=created_time,from,id,message
  &access_token=ACCESS-TOKEN"
```

Response:

```json
{
  "created_time": "2024-04-06T22:04:21+0000",
  "from": { "name": "My Facebook Page", "id": "PAGE-ID" },
  "id": "POST_ID",
  "message": "Hello"
}
```

#### Batch Request Example

```bash
curl -i -X POST "https://graph.facebook.com/v23.0/"
  -F 'access_token=ACCESS-TOKEN'
  -F 'batch=[
    {"method":"GET","relative_url":"me"},
    {"method":"GET","relative_url":"me/friends?limit=50"}
  ]'
```

### 4.5 Pagination

For edge calls returning multiple objects, Graph API uses **cursor-based pagination**:

- `before` — Cursor pointing to the start of the previous page
- `after` — Cursor pointing to the start of the next page
- `limit` — Number of results per page (default and max vary by endpoint)

Response includes `paging.cursors.before`, `paging.cursors.after`, `paging.next`, and `paging.previous`.

### 4.6 Field Expansion

Field expansion allows nesting of related data in a single request, reducing the number of API calls:

```bash
GET https://graph.facebook.com/me?fields=id,name,photos{id,created_time,likes{name}}&access_token=ACCESS-TOKEN
```

### 4.7 Complex Parameters

- **List type**: Specified in JSON syntax, e.g., `["firstitem", "seconditem", "thirditem"]`
- **Object type**: Specified in JSON syntax, e.g., `{"firstkey": "firstvalue", "secondKey": 123}`

### 4.8 HTTPS & Security

All data transfers conform to HTTP/1.1 and all endpoints require HTTPS. Meta has enabled the `includeSubdomains` HSTS directive on `facebook.com`. All API calls should include an `appsecret_proof` parameter for enhanced security (HMAC-SHA256 of the access token using the app secret).

---

## 5. Access Tokens — Authentication & Authorization

Access tokens are opaque strings that identify a user, app, or Page and authorize API calls. They embed information about expiry and the generating app. Almost all Graph API endpoints require a token. The length of all access token types will change over time as Meta updates encoding.

### 5.1 Token Types

| Token Type            | Description & Use Case                                                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **User Access Token** | Identifies an individual Facebook user. Two forms: **short-lived** (~1-2 hours) and **long-lived** (~60 days). Obtained via Facebook Login. Can be exchanged for long-lived via the token exchange endpoint.             |
| **Page Access Token** | Allows API calls on behalf of a Facebook Page. Unique per Page+Admin+App combination. Retrieve via `GET /{user-id}/accounts` using a user token with page permissions.                                                   |
| **App Access Token**  | Identifies the app itself rather than a user. Generated via `client_credentials` grant. **Cannot be used if app is set to Native/Desktop** (considered insecure). Used for server-side calls not requiring user context. |
| **Client Token**      | App-level token for making Graph API requests from client-side code. Must be combined with App ID: format `APP-ID\|CLIENT-TOKEN`. Cannot be used standalone. Found in App Dashboard > Settings > Advanced > Security.    |
| **System User Token** | Long-lived, non-expiring token tied to a Business Manager system user. **Preferred for server-side integrations**, Conversions API, and automated workflows where reliability and security are critical.                 |

### 5.2 Short-Lived vs. Long-Lived User Tokens

- **Short-lived tokens** — Lifetime of approximately 1-2 hours. Should not be relied upon for production workflows.
- **Long-lived tokens** — Lifetime of approximately 60 days. Obtained by exchanging a short-lived token using the app secret.
- **Do not depend on these lifetimes remaining the same** — they may change without warning.

#### Exchange Short-Lived for Long-Lived Token

```bash
GET https://graph.facebook.com/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={APP-ID}
  &client_secret={APP-SECRET}
  &fb_exchange_token={SHORT-LIVED-TOKEN}
```

### 5.3 Generating an App Access Token

```bash
curl -X GET "https://graph.facebook.com/oauth/access_token
  ?client_id={YOUR-APP-ID}
  &client_secret={YOUR-APP-SECRET}
  &grant_type=client_credentials"
```

> ⚠️ **Security Warning:** Never hard-code app access tokens in client-side or native app code. This exposes your app secret and allows anyone to impersonate your app. App access tokens are considered insecure for Native/Desktop apps and will not work for API calls in those contexts.

### 5.4 Retrieving a Page Access Token

```bash
curl -i -X GET "https://graph.facebook.com/{YOUR-USER-ID}/accounts
  ?access_token={USER-ACCESS-TOKEN}"
```

Returns a list of Pages you manage with their access tokens, categories, names, and your permission scope on each Page.

### 5.5 Token Best Practices

- Store tokens in **environment variables** or a **secrets management service** (e.g., AWS Secrets Manager, HashiCorp Vault) — never in source code or public repositories
- Use **System User tokens** for production server-to-server integrations for maximum stability and longevity
- Implement **token refresh logic** before expiry to avoid service interruptions
- Scope tokens to **minimum necessary permissions** — avoid over-permissioning
- **Revoke tokens** when no longer needed or when a user's access is removed
- Monitor token health via the **Token Debugger** at `developers.facebook.com/tools/debug/accesstoken`
- Treat access tokens like passwords — never log them, never expose in URLs, never commit to version control

### 5.6 Token Inspection

Use the Token Debugger to inspect any token and see:

- Token validity
- App it belongs to
- User or Page it identifies
- Issued at and expiration time
- Permission scopes granted

---

## 6. Permissions — Granular API Authorization

Permissions are **user-granted authorizations** that determine what data your app can access via the Graph API. Meta enforces a **principle of least privilege**: only request permissions your app genuinely requires. Requesting unnecessary permissions is the **#1 cause of App Review rejection**.

Permission requests happen via:

- Facebook Login
- Facebook Login for Business
- Instagram API with Facebook Login for Business
- Instagram API with Business Login for Instagram
- Meta Business Manager

> **Important:** If a user doesn't use a granted permission for **90 days** (usually due to inactivity), they must re-grant that permission.

### 6.1 Access Levels

| Access Level        | Description                                                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Standard Access** | Default level. Allows access to data you own or have admin permissions for. Sufficient for personal/internal tools. No app review needed for most standard permissions.                                    |
| **Advanced Access** | Required for third-party tools serving multiple businesses/users. Requires **Business Verification AND successful App Review**. Grants access to data owned by other users and businesses beyond your own. |

### 6.2 Requirements for Advanced Access

- **Meta App Review** — For apps that need access to data you do not own or manage
- **Business Verification** — Required for all apps making requests for Advanced Access
- **Data Handling Questions** — May be required for sensitive permissions
- **Annual Data Use Checkup** — Required to maintain Advanced Access once granted

### 6.3 Complete Permissions Catalog

#### Advertising & Marketing

| Permission            | Description                                                                      | Dependencies                               |
| --------------------- | -------------------------------------------------------------------------------- | ------------------------------------------ |
| `ads_management`      | Create campaigns, manage ads, fetch metrics. Build ad management tools.          | `pages_read_engagement`, `pages_show_list` |
| `ads_read`            | Access Ads Insights API for ad performance data. Access Server-Side API.         | None                                       |
| `attribution_read`    | Access Attribution API for attribution report data.                              | None                                       |
| `business_management` | Read/write with Business Manager API. Manage business assets, claim ad accounts. | `pages_read_engagement`, `pages_show_list` |

#### Commerce

| Permission                       | Description                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `catalog_management`             | Create/read/update/delete business-owned product catalogs. For ecommerce, travel, dynamic ads. Dependency: `business_management` |
| `commerce_account_manage_orders` | Read and update commerce account orders. Webhook notifications access.                                                           |
| `commerce_account_read_orders`   | Read-only access to commerce orders. Use buyer email for marketing only if buyer opted in.                                       |
| `commerce_account_read_reports`  | Finance reporting: tax, cash reconciliation, reimbursements.                                                                     |
| `commerce_account_read_settings` | Read commerce account settings, connected channels, shipping, fulfillment.                                                       |
| `commerce_manage_accounts`       | Create and manage commerce accounts. Associate app with commerce account.                                                        |

#### User & Identity

| Permission       | Description                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| `email`          | Read a person's primary email address. For communication and login.                                      |
| `public_profile` | Access basic profile info: name, profile picture, age range, gender, locale. Default for Facebook Login. |
| `user_friends`   | Access list of the user's friends who also use the app.                                                  |
| `user_birthday`  | Access birthday.                                                                                         |
| `user_gender`    | Access gender.                                                                                           |
| `user_hometown`  | Access hometown.                                                                                         |
| `user_location`  | Access current city/location.                                                                            |
| `user_likes`     | Access Pages and things the user has liked.                                                              |
| `user_photos`    | Access photos the user has uploaded.                                                                     |
| `user_videos`    | Access videos the user has uploaded.                                                                     |
| `user_posts`     | Access posts the user has published.                                                                     |

#### Pages

| Permission                | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| `pages_manage_metadata`   | Subscribe to/receive webhooks about Page activity; update Page settings. |
| `pages_read_engagement`   | Read Page info and engagement data (likes, comments, shares).            |
| `pages_show_list`         | Access list of Pages a user manages or has roles on.                     |
| `pages_messaging`         | Send and receive messages via Messenger for a Page.                      |
| `pages_manage_ads`        | Manage Page ads.                                                         |
| `pages_manage_posts`      | Create, edit, delete Page posts.                                         |
| `pages_manage_engagement` | Reply to comments, like content, follow/unfollow users.                  |
| `pages_read_user_content` | Read user-generated content on Pages (comments, posts by visitors).      |
| `page_events`             | Read Events from a Page.                                                 |

#### Instagram

| Permission                        | Description                                                             |
| --------------------------------- | ----------------------------------------------------------------------- |
| `instagram_basic`                 | Read an Instagram account's profile info and media.                     |
| `instagram_content_publish`       | Publish media (photos, videos, Reels, Stories, carousels) to Instagram. |
| `instagram_manage_comments`       | Read and reply to comments. Delete comments.                            |
| `instagram_manage_insights`       | Account metrics, reach, impressions, follower demographics.             |
| `instagram_manage_messages`       | Access and reply to DMs. Requires `pages_manage_metadata`.              |
| `instagram_shopping_tag_products` | Tag products in Instagram posts.                                        |

#### WhatsApp

| Permission                     | Description                                                          |
| ------------------------------ | -------------------------------------------------------------------- |
| `whatsapp_business_messaging`  | Send and receive WhatsApp messages. Webhook access for messages.     |
| `whatsapp_business_management` | Manage WhatsApp Business Accounts (WABAs), phone numbers, templates. |

#### Groups & Events

| Permission                  | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| `groups_access_member_info` | Read member info of groups the user manages.                |
| `publish_to_groups`         | Post to groups on behalf of a user (user must be a member). |

#### Gaming

| Permission           | Description                                    |
| -------------------- | ---------------------------------------------- |
| `gaming_user_locale` | Get the user's locale for the gaming platform. |

### 6.4 Removing Permissions

Use the **Meta App Dashboard** to remove permissions your app no longer uses or that have been deprecated. Always audit permissions periodically to maintain security hygiene and data compliance. You can also remove permissions programmatically via:

```bash
DELETE https://graph.facebook.com/{user-id}/permissions/{permission}?access_token={token}
```

---

## 7. App Review & Business Verification

### 7.1 What is App Review?

**App Review** is Meta's gatekeeper process for granting Advanced Access to sensitive permissions and features. It ensures apps use Meta's products in approved, ethical, and policy-compliant ways. Reviews typically take **2–7 business days** per submission. Rejections add another 3–5 days per attempt.

### 7.2 When App Review is Required

- When your app needs to access data owned by users other than yourself
- When requesting Advanced Access to any sensitive permission
- When accessing Instagram APIs for non-test users at scale
- When building third-party tools for other businesses (WhatsApp Tech Provider, marketing platforms)
- When publishing apps to the Meta Horizon Store
- When moving app from Development Mode to Live Mode with sensitive permissions

### 7.3 Business Verification

Business Verification confirms your organization is a legitimate business entity. It is a **prerequisite for all apps requesting Advanced Access**.

**Process:**

1. Navigate to Business Manager (`business.facebook.com`)
2. Go to Business Settings > Security Center
3. Click "Start Verification"
4. Choose verification method (domain verification, phone, document)
5. Submit official business registration documents (incorporation certificate, tax ID, utility bill)
6. Details must **exactly match** government registration documents
7. Meta reviews and responds — typically within 24 hours if documents are correct

**Unlocks:**

- Ability to request Advanced Access permissions
- Access to WhatsApp Business Platform Tech Provider features
- Full Business Manager capabilities for managing client accounts

### 7.4 App Review Submission Requirements

| Requirement                   | Details                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Use Case Description**      | Specifically why each requested permission is needed. Be precise — vague descriptions are the top rejection cause. |
| **Screencast**                | Video demonstrating the complete user flow. Meta reviewers rely primarily on this.                                 |
| **Privacy Policy URL**        | Must be publicly accessible, load quickly, and accurately describe data practices.                                 |
| **App Domain**                | Must be configured in App Dashboard settings.                                                                      |
| **Data Handling Questions**   | Required for data-sensitive permissions — how data is stored, processed, and retained.                             |
| **Platform Onboarding Terms** | Must be accepted when submitting for review.                                                                       |

### 7.5 Screencast Requirements

Meta reviewers use your screencast as their primary reference. Requirements:

- Show the **complete Facebook/Instagram Login flow** including the permission grant dialog
- Demonstrate **each requested permission in actual use** — show ads data being displayed, show Page management working, etc.
- Screen resolution: **width must not exceed 1440 pixels**
- Treat the reviewer as someone who has **never seen your app before** — explain everything clearly
- If your app requires special login credentials, provide them in the "Notes for Reviewer" field
- First video (WhatsApp Tech Providers): Show creating a message, sending from your app, and receiving in a WhatsApp client
- Second video (WhatsApp Tech Providers): Show creating a message template in your app

### 7.6 Common Rejection Reasons

1. **Over-permissioning** — Requesting permissions not clearly used. #1 rejection cause.
2. **Vague use-case descriptions** — Not specific enough about how each permission is used
3. **Screencast gaps** — Doesn't show the complete login/permission grant flow
4. **Privacy Policy issues** — Missing, slow to load, inaccurate, or inaccessible
5. **App setup issues** — Privacy policy URL not added in App Dashboard, incorrect platform settings
6. **Mismatched behavior** — App's actual behavior doesn't match the declared use case
7. **Incomplete test environment** — Reviewer cannot verify the experience (broken links, login failures)
8. **Missing required dependencies** — Requesting a permission without its required dependency permissions

> **Tip:** Once you refuse a request for child safety reasons, or find your app rejected for policy violations, subsequent submissions face heightened scrutiny.

### 7.7 App Modes

| Mode                 | Description                                                                                                                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Development Mode** | Default after app creation. Only users with a role on the app (developer, tester) can use it. No public data access. No app review needed. Safe for testing and building.                                                                      |
| **Live Mode**        | Required to serve all public users. Only **approved permissions** are available. Must complete App Review for all needed Advanced Access permissions BEFORE switching. Switching prematurely may make your app unusable even for role-holders. |

### 7.8 Meta Horizon Store Review (VR Apps)

For Meta Horizon apps, a separate review process applies:

1. **Submit via Developer Dashboard** at least **2 weeks before target launch date**
2. **Technical Review** — Verifies app meets Virtual Reality Check (VRC) guidelines: performance targets, entitlement checks, reserved interactions
3. **Content Review** — Production value, polish, utility/entertainment assessment
4. **Statuses:** Submitted → Under Review (1 hour after submission) → Approved / Changes Required
5. Use the **"Notes for Reviewer"** field to communicate deadlines, special login requirements, or context
6. Download **sample test plans** (PC and Mobile VRC) from the Developer Dashboard to pre-validate your app

---

## 8. Webhooks — Real-Time Event Notifications

Webhooks allow your app to receive real-time notifications when specific events occur on Facebook, Instagram, WhatsApp, or other Meta platforms — eliminating the need to poll the Graph API repeatedly.

### 8.1 How Webhooks Work

1. Create and expose a public **HTTPS webhook endpoint** on your server
2. Meta sends an HTTP **GET** to verify your endpoint using a **Verify Token** you set
3. Your endpoint responds with the `hub.challenge` value to confirm ownership
4. Subscribe to specific **fields/topics** in the App Dashboard or via API
5. Meta sends HTTP **POST** requests to your endpoint when subscribed events occur
6. Your server processes the payload and returns **HTTP 200** quickly (handle processing asynchronously)

### 8.2 Verification Handshake

When you subscribe, Meta sends:

```
GET https://your-webhook-url
  ?hub.mode=subscribe
  &hub.verify_token=YOUR_VERIFY_TOKEN
  &hub.challenge=RANDOM_CHALLENGE_STRING
```

Your server must respond with the `hub.challenge` value and HTTP 200.

### 8.3 Webhook Payload Structure

Meta sends a POST with a JSON payload. For Facebook Page events:

```json
{
  "object": "page",
  "entry": [
    {
      "id": "PAGE-ID",
      "time": 1458692050,
      "messaging": [
        {
          "sender": { "id": "USER-ID" },
          "recipient": { "id": "PAGE-ID" },
          "timestamp": 1458692050,
          "message": {
            "mid": "MESSAGE-ID",
            "text": "Hello, world!"
          }
        }
      ]
    }
  ]
}
```

### 8.4 Webhook Topics by Platform

| Platform             | Key Webhook Topics                                                                                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Facebook (Pages)** | `feed` (posts, likes, comments), `messages`, `message_reads`, `message_deliveries`, `messaging_postbacks`, `standby`, `messaging_handovers`, `page` (attribute changes) |
| **Instagram**        | `comments`, `live_comments`, `mentions`, `story_insights`, `messages`, `messaging_seen`, `messaging_referral`, `feed` (posts, likes)                                    |
| **WhatsApp**         | `messages` (incoming), `message_status` (delivered, read, sent, failed), `account_alerts`, `account_update`, `phone_number_quality_update`                              |
| **Messenger**        | `messages`, `messaging_seen`, `messaging_deliveries`, `messaging_postbacks`, `messaging_referrals`, `messaging_handovers`, `inbox_labels`                               |
| **Ads/Marketing**    | Ad account changes, campaign updates, creative approvals, billing events                                                                                                |
| **Commerce**         | Order status changes, inventory updates, product catalog changes                                                                                                        |
| **User (Personal)**  | Permissions changes, data deletion requests                                                                                                                             |

### 8.5 Required Permissions for Webhooks

- **Facebook Pages:** `pages_manage_metadata` to subscribe to Page activity webhooks
- **Instagram:** `instagram_manage_messages` and `pages_manage_metadata`
- **WhatsApp:** `whatsapp_business_messaging` and `whatsapp_business_management`
- **Messenger:** `pages_messaging` and `pages_manage_metadata`

### 8.6 Webhook Best Practices

- Always respond with HTTP 200 within 5-10 seconds; process async if needed
- Implement **signature verification** using `X-Hub-Signature-256` header (HMAC-SHA256)
- Handle **duplicate deliveries** — Meta may send the same event more than once
- Implement **retry logic** for any downstream service failures (Meta will retry if you don't respond 200)
- Subscribe to **only the fields you need** for efficiency
- Use **queue-based processing** (e.g., Redis, SQS) for high-volume webhook events

---

## 9. Facebook Login & Authentication

### 9.1 Standard Facebook Login

**Facebook Login** is Meta's OAuth 2.0-based authentication system. It allows users to log into third-party apps using their Facebook credentials without sharing passwords, and generates user access tokens for API access.

**Supported Platforms:**

- Web (JavaScript SDK / `FB.login()`)
- iOS (native Facebook SDK)
- Android (native Facebook SDK)
- Unity (Facebook Unity SDK)
- Server-side (manual OAuth flow)

**OAuth Flow:**

1. App redirects user to `https://www.facebook.com/v23.0/dialog/oauth` with `client_id`, `redirect_uri`, and `scope`
2. User authenticates and grants requested permissions
3. Facebook redirects back to `redirect_uri` with an authorization `code`
4. App exchanges `code` for user access token via `https://graph.facebook.com/v23.0/oauth/access_token`
5. App uses token to make API calls

**Key Points:**

- Users can grant or deny individual permissions — apps must handle partial grants gracefully
- Tokens obtained are **app-scoped**: a user's ID is unique per app for privacy (not transferable between apps)
- Requesting unneeded permissions during login reduces conversion — only ask for what's immediately needed (use **incremental authorization** for permissions needed later)

### 9.2 Limited Facebook Login (iOS)

A **privacy-preserving** version of Facebook Login for iOS, designed for apps that don't need to access the social graph:

- Provides a **signed nonce** for authentication without a traditional access token
- Does NOT generate an access token, so the Graph API cannot be called
- Reduces data exposure in compliance with **Apple's App Tracking Transparency (ATT)**
- Data returned: limited profile info (name, email, profile picture), no social graph access
- Ideal for apps that only need identity verification, not social features

### 9.3 Facebook Login for Business

Designed for **B2B use cases** where businesses grant access to their business assets:

- Used by agency tools, partner integrations, and tech provider onboarding
- Allows businesses to grant access to Pages, Ad Accounts, Catalogs, and WhatsApp accounts
- Required permission flow for **WhatsApp Tech Providers** (Embedded Signup)
- Generates tokens with business asset permissions rather than personal user data
- Configured via App Dashboard → Add Product → Facebook Login for Business

### 9.4 Login Connect with Messenger

An authentication flow via Messenger conversation — users can log in to your app by exchanging a message with your Page on Messenger. Generates a user access token linked to the Messenger conversation context.

### 9.5 Business Login for Instagram

A specialized login flow for Instagram Business and Creator accounts:

- Allows apps to access Instagram-specific business data
- Does not require the Instagram account to be connected to a Facebook Page (unlike the traditional Instagram API with Facebook Login path)
- Uses Meta's secure OAuth flow with Instagram-specific permission scopes
- Recommended for new Instagram integrations as of 2024+

---

## 10. Instagram Platform API

The Instagram Platform gives developers programmatic access to Instagram Business and Creator accounts. It is built on top of the Graph API.

### 10.1 Instagram API with Facebook Login (Legacy Path)

The original Instagram business API integration. Requires the Instagram account to be **connected to a Facebook Page**.

**Capabilities:**

- Access profile info, media, comments, and insights
- Publish photos, videos, carousels, Reels, and Stories
- Reply to comments and DMs (via Messenger API for Instagram)
- Retrieve hashtag and mention data
- Access Instagram Shopping product tagging

**Key Endpoints:**

```bash
# Get Instagram Business Account info
GET https://graph.facebook.com/v23.0/{ig-user-id}?fields=id,name,biography,followers_count

# Get media
GET https://graph.facebook.com/v23.0/{ig-user-id}/media?fields=id,caption,media_type,timestamp

# Publish a photo
POST https://graph.facebook.com/v23.0/{ig-user-id}/media
  ?image_url={URL}&caption={CAPTION}&access_token={TOKEN}

# Publish the container
POST https://graph.facebook.com/v23.0/{ig-user-id}/media_publish
  ?creation_id={CONTAINER-ID}&access_token={TOKEN}
```

### 10.2 Instagram API with Business Login for Instagram (New Path)

The newer integration path allowing Instagram Business and Creator accounts to grant access directly without requiring a Facebook Page connection:

- Uses Instagram's own OAuth authorization flow
- Recommended for new integrations
- Supports same capabilities as the Facebook Login path
- Configured via App Dashboard → Add Product → Instagram

### 10.3 Content Publishing

**Supported Media Types:**

- Single image posts
- Single video posts
- Carousel posts (up to 10 images/videos)
- Instagram Reels (video)
- Instagram Stories (image or video)

**Publishing Flow (Two-Step):**

1. Create a media **container** (returns a `creation_id`)
2. Publish the container using `media_publish`

**Rate Limit:** 50 API-published posts per 24-hour period (per Instagram Business Account).

### 10.4 Instagram Insights & Analytics

Available metrics:

- **Account-level:** followers, impressions, reach, profile_views, website_clicks, follower demographics (age, gender, city, country)
- **Media-level:** impressions, reach, likes, comments, shares, saves, video views
- **Story-level:** impressions, reach, exits, replies, taps_forward, taps_back

### 10.5 Key Instagram Permissions

| Permission                        | Description                                                |
| --------------------------------- | ---------------------------------------------------------- |
| `instagram_basic`                 | Profile info and media read access                         |
| `instagram_content_publish`       | Publish media to Instagram                                 |
| `instagram_manage_comments`       | Read and reply to comments                                 |
| `instagram_manage_insights`       | Account metrics and reach data                             |
| `instagram_manage_messages`       | Access and reply to DMs (requires `pages_manage_metadata`) |
| `instagram_shopping_tag_products` | Tag products in Instagram posts                            |

---

## 11. WhatsApp Business Platform

### 11.1 Platform Overview

The **WhatsApp Business Platform** (formerly WhatsApp Business API) is Meta's enterprise messaging solution for medium to large businesses needing to communicate with customers at scale.

**Three Products:**
| Product | For |
|---|---|
| WhatsApp Messenger | Consumer app. Explicitly prohibits commercial use at scale. |
| WhatsApp Business App | Free mobile app for small businesses. Limited to a few devices. Manual operation. |
| **WhatsApp Business Platform (Cloud API)** | Programmatic access for medium/large businesses. REST API. Meta-hosted infrastructure. |

**As of October 2025:** The On-Premises API (self-hosted Docker containers) was officially **sunset**. Only the **Cloud API** (Meta-hosted) is supported in 2026.

### 11.2 Cloud API Architecture

Meta hosts all Cloud API infrastructure. Developers make REST API calls to `graph.facebook.com`. No server setup or WhatsApp containers to manage.

**Base URL:**

```
https://graph.facebook.com/v{VERSION}/{PHONE_NUMBER_ID}/messages
```

**Send a Text Message:**

```bash
curl 'https://graph.facebook.com/v23.0/{TEST_BUSINESS_PHONE_NUMBER_ID}/messages' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {SYSTEM_USER_ACCESS_TOKEN}' \
  -d '{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "{WHATSAPP_USER_PHONE_NUMBER}",
    "type": "text",
    "text": { "body": "Hello!" }
  }'
```

### 11.3 Message Types

| Message Type             | Description                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Template Messages**    | Pre-approved structured messages. Required for business-initiated conversations outside the 24-hour window. Four categories: Marketing, Utility, Authentication, Service. |
| **Free-form Messages**   | Any format within the 24-hour customer service window (user must initiate).                                                                                               |
| **Interactive Messages** | Buttons, lists, quick replies for structured interactions.                                                                                                                |
| **Media Messages**       | Images, documents, audio, video, stickers.                                                                                                                                |
| **Location Messages**    | Share geographic coordinates.                                                                                                                                             |
| **Contact Messages**     | Share contact cards (vCard format).                                                                                                                                       |
| **Reaction Messages**    | React to messages with emoji.                                                                                                                                             |
| **Group Messages**       | Create and manage group conversations (advanced feature).                                                                                                                 |

### 11.4 Template Messages

Templates must be **pre-approved by Meta** before use. They are categorized as:

| Category           | Use Case                                              | Pricing                                                             |
| ------------------ | ----------------------------------------------------- | ------------------------------------------------------------------- |
| **Marketing**      | Promotions, offers, newsletters                       | Most expensive                                                      |
| **Utility**        | Order confirmations, shipping updates, account alerts | Mid-tier                                                            |
| **Authentication** | OTPs, verification codes                              | Per-type pricing; Authentication-International significantly higher |
| **Service**        | Customer support replies within 24h window            | **FREE**                                                            |

**Template Components:**

- Header (text, image, video, document)
- Body (text with variables `{{1}}`, `{{2}}`, etc.)
- Footer (text)
- Buttons (call-to-action, quick reply, copy code, URL)

### 11.5 Message Pricing (2026)

Meta revised its pricing model in **July 2025** from per-24h-conversation to **per-delivered-template-message**:

- **Service messages** (replies within the 24h customer service window) are **FREE** — unlimited
- **Marketing templates** are the most expensive (up to $0.24 for some countries)
- **Authentication-International** OTPs can cost up to **20x domestic rates**
- **72-hour free window:** Users entering via Click-to-WhatsApp Ads receive zero message fees for 72 hours — including marketing messages
- No volume discounts as of 2026 for marketing messages (utility and authentication have auto-volume tiers at high volumes)
- Pricing is **destination-based**: depends on the recipient's country, not your location

**Since January 15, 2026:** General-purpose AI chatbots (open AI assistants without a defined purpose, e.g., ChatGPT-style bots answering anything) are **prohibited** on WhatsApp Business Platform. Only **task-specific agents** are permitted — bots with clearly defined purposes such as support inquiries, product consultations, or order status queries.

### 11.6 Customer Service Window

- Opens when a **user messages your business** on WhatsApp
- Lasts **24 hours** from the most recent user message
- Within this window: send any free-form message (text, media, interactive) at no charge
- Outside this window: only **template messages** can be sent (charged per template)

### 11.7 Webhooks for WhatsApp

Webhook events include:

- **`messages`** — Incoming messages from users (text, media, interactive replies, reactions)
- **`message_status`** — Delivery receipts: sent, delivered, read, failed
- **`account_alerts`** — Quality rating changes, template pauses, phone number quality issues
- **`account_update`** — WABA-level updates
- **`phone_number_quality_update`** — Phone number messaging tier changes

**Setup:**

```bash
# Verify webhook endpoint
GET https://your-webhook-url
  ?hub.mode=subscribe
  &hub.verify_token=YOUR_VERIFY_TOKEN
  &hub.challenge=CHALLENGE_STRING

# After verification, Meta sends POST for each event
POST https://your-webhook-url
Content-Type: application/json
X-Hub-Signature-256: sha256=HMAC-SIGNATURE

{ "object": "whatsapp_business_account", "entry": [...] }
```

### 11.8 WhatsApp Onboarding — Getting Started

1. Register as a Meta developer at `developers.facebook.com`
2. Open the Meta App Dashboard and create a new Meta app with the **WhatsApp use case**
3. Connect to a Meta Business Account (or create one)
4. A WhatsApp Business Account (WABA) is automatically created/connected
5. In the API Setup panel, save your **WhatsApp Business Account ID** and **test phone number ID**
6. Click **Generate access token** to get a temporary token for sending a test message
7. Select a **From phone number**, add a **To phone number**, and send your first message
8. Respond to the test message to open the 24-hour customer service window
9. Set up a **webhook endpoint** to receive message notifications
10. For production: generate a **permanent System User token**

### 11.9 Adding a Production Phone Number

1. In the WhatsApp section of App Dashboard, go to Phone Numbers
2. Click **Add phone number**
3. Enter the phone number and verify via **OTP** (SMS or voice call)
4. Set a **Display Name** for your business (requires Meta review)
5. Verify your Meta Business Account (Business Verification)

**Rules:**

- A phone number cannot be active on WhatsApp Messenger or WhatsApp Business App if used with the API
- Numbers must be fully dedicated to the API or migrated from the consumer/Business apps

### 11.10 Messaging Tiers (Rate Limits)

| Tier      | Daily Business-Initiated Conversations |
| --------- | -------------------------------------- |
| Tier 1    | 1,000 unique per day                   |
| Tier 2    | 10,000 unique per day                  |
| Tier 3    | 100,000 unique per day                 |
| Unlimited | No daily limit                         |

Tier upgrades happen automatically based on quality ratings and volume milestones. Quality is affected by user reports, blocks, and message delivery rates.

### 11.11 Tech Provider Onboarding (Embedded Signup)

Becoming a **WhatsApp Tech Provider** allows building platforms that manage WhatsApp for multiple businesses:

1. Create a Meta app with WhatsApp use case in the App Dashboard
2. Add **Facebook Login for Business** product and configure required permissions
3. Submit App Review with screencasts demonstrating message creation and template management flows
4. Obtain **Advanced Access** for `whatsapp_business_messaging` and `whatsapp_business_management`
5. Complete **Access Verification** (additional compliance step in the Onboarding panel)
6. Build and integrate the **Embedded Signup Builder** flow into your website/portal
7. Business customers use Embedded Signup to connect their WABA to your platform
8. Receive OAuth callback with access to the customer's WhatsApp Business Account
9. Optionally: migrate existing customer WABAs to your app (customers receive confirmation email)

**Embedded Signup Builder:** Available in the App Dashboard Quick Start section. Generates the complete OAuth flow code for embedding in your website.

---

## 12. Messenger Platform

The **Messenger Platform** enables businesses to build chatbots and automated messaging experiences on Facebook Messenger. It connects to Facebook Pages and supports rich interactive messaging.

### 12.1 Core Features

- **Send API** — Send messages, templates, and media to users
- **Receive Webhooks** — Real-time notifications for incoming messages
- **Persistent Menu** — Custom menus accessible from the Messenger composer
- **Quick Replies** — Suggested response buttons (up to 13)
- **Templates** — Button templates, generic templates, receipt templates, airline boarding pass/check-in templates, media templates
- **Get Started Button** — Trigger for first user interaction with your bot
- **Greeting Text** — Custom welcome message displayed before conversation starts
- **Handover Protocol** — Transfer conversation control between bots and live agents
- **NLP** — Built-in Wit.ai integration for intent recognition without additional setup
- **Pass Thread Control** — Pass conversation between multiple bots/apps
- **Private Replies** — Reply privately to public Page comments and posts via Messenger

### 12.2 Messenger Send API

```bash
POST https://graph.facebook.com/v23.0/me/messages
  ?access_token=PAGE_ACCESS_TOKEN

{
  "recipient": { "id": "USER-PSID" },
  "message": {
    "text": "Hello from Messenger Bot!"
  }
}
```

**PSID (Page-Scoped ID):** Every user has a unique ID per Page. Received in webhook payloads when users interact with your Page on Messenger.

### 12.3 Messenger Webhooks

Subscribe to:

- `messages` — Incoming messages (text, attachments, quick reply selections)
- `messaging_postbacks` — Button click events
- `messaging_deliveries` — Message delivery confirmations
- `messaging_reads` — Message read receipts
- `messaging_referrals` — Referral parameters (from ads, links, QR codes)
- `messaging_handovers` — Handover protocol events
- `standby` — Messages when your app doesn't have thread control

### 12.4 Required Permissions

- `pages_messaging` — Send and receive Messenger messages
- `pages_manage_metadata` — Subscribe to webhooks, update Page settings

---

## 13. Threads API

The **Threads API** (`developers.facebook.com/docs/threads`) allows developers to integrate with Meta's Threads platform programmatically.

### 13.1 Capabilities

- **Publish posts** — Text, images, videos, carousels to Threads
- **Read posts** — Access published posts and their engagement data
- **Replies** — Read, create, and manage replies to Threads posts
- **Insights** — Account-level and post-level metrics
- **Reply Controls** — Configure who can reply (everyone, accounts you follow, mentioned accounts only)
- **Quota Management** — Track and manage API usage against Threads-specific quotas

### 13.2 Publishing Flow

Similar to Instagram's two-step publish:

1. Create a Threads media **container** (`POST /{user-id}/threads`)
2. Publish the container (`POST /{user-id}/threads_publish`)

### 13.3 Content Types

- Single text post (up to 500 characters)
- Single image
- Single video
- Carousel (up to 20 items — images, videos, or mixed)

### 13.4 Access & Permissions

Threads API uses the same Graph API infrastructure. Requires:

- Facebook Login (standard flow) with Threads-specific permissions
- Business verification may be needed for Advanced Access features (insights, reply management at scale)

---

## 14. Marketing API

### 14.1 Overview

The **Marketing API** provides programmatic access to Meta's advertising platform, enabling creation and management of campaigns, ad sets, ads, and audiences; pulling performance data; managing product catalogs; and automating ad operations at scale.

**Base URL:**

```
https://graph.facebook.com/v{VERSION}/act_{AD_ACCOUNT_ID}/campaigns
```

### 14.2 Ad Account Structure

```
Business Manager
└── Ad Account (act_{AD_ACCOUNT_ID})
    └── Campaign (campaign_id)
        └── Ad Set (adset_id)
            └── Ad (ad_id)
                └── Ad Creative (creative_id)
```

### 14.3 Campaign Objectives

| Objective               | Use Case                                      |
| ----------------------- | --------------------------------------------- |
| `OUTCOME_AWARENESS`     | Brand awareness, reach                        |
| `OUTCOME_TRAFFIC`       | Drive website visits, app opens               |
| `OUTCOME_ENGAGEMENT`    | Post engagement, video views, event responses |
| `OUTCOME_LEADS`         | Lead generation forms                         |
| `OUTCOME_APP_PROMOTION` | App installs and in-app actions               |
| `OUTCOME_SALES`         | Conversions, catalog sales, store traffic     |

### 14.4 Create a Campaign

```bash
curl -X POST "https://graph.facebook.com/v23.0/act_{AD-ACCOUNT-ID}/campaigns"
  -d "name=My Campaign"
  -d "objective=OUTCOME_SALES"
  -d "status=PAUSED"
  -d "access_token={ACCESS-TOKEN}"
```

### 14.5 Ad Set Configuration

Key parameters:

- `campaign_id` — Parent campaign
- `targeting` — Audience definition (locations, demographics, interests, behaviors, custom audiences)
- `daily_budget` or `lifetime_budget` — Budget in cents (e.g., 5000 = $50)
- `optimization_goal` — What to optimize for (OFFSITE_CONVERSIONS, LINK_CLICKS, etc.)
- `billing_event` — When you're charged (IMPRESSIONS, LINK_CLICKS, etc.)
- `start_time` / `end_time` — ISO 8601 format (required for lifetime budget)

### 14.6 Targeting

```json
{
  "targeting": {
    "geo_locations": { "countries": ["US", "CA"] },
    "age_min": 25,
    "age_max": 45,
    "genders": [1, 2],
    "interests": [{ "id": "6003139266461", "name": "Technology" }],
    "custom_audiences": [{ "id": "AUDIENCE-ID" }],
    "excluded_custom_audiences": [{ "id": "EXCLUDED-AUDIENCE-ID" }]
  }
}
```

### 14.7 Custom Audiences

| Audience Type              | Source                                                                 |
| -------------------------- | ---------------------------------------------------------------------- |
| Customer List              | Upload hashed email/phone CSV                                          |
| Website Custom Audience    | Pixel events (site visitors, purchasers)                               |
| App Custom Audience        | App Events SDK (mobile users)                                          |
| Engagement Custom Audience | Video viewers, Page fans, Instagram followers, Form leads              |
| Lookalike Audience         | Based on any custom audience + country + similarity percentage (1-10%) |

### 14.8 Ads Insights API

Pull performance metrics:

```bash
GET https://graph.facebook.com/v23.0/act_{AD-ACCOUNT-ID}/insights
  ?fields=impressions,clicks,spend,conversions,ctr,cpc,cpm,roas
  &date_preset=last_30d
  &level=campaign
  &access_token={ACCESS-TOKEN}
```

**Available metrics:** impressions, clicks, reach, frequency, spend, CPC, CPM, CTR, conversions, ROAS, cost_per_result, video_views, video_thruplay_watched_actions, and many more.

### 14.9 Standard vs. Advanced Access for Marketing API

| Access              | Description                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Standard Access** | Work with ad accounts you own or where you have admin/advertiser permissions. For internal tools and personal ad management. No app review required. |
| **Advanced Access** | Build third-party marketing tools serving multiple business clients. Requires App Review + Business Verification. Can take weeks for review.         |

### 14.10 API Changes & Deprecations (2026)

- **January 12, 2026** — Certain Ads Insights API attribution window and breakdown options limited
- **Q1 2026** — Legacy Advantage Shopping and App Campaign APIs deprecated. Advantage+ campaign structure migration required.
- **October 2025** — Legacy Advantage Shopping and App Campaign APIs deprecated
- **V24 Changes** — New GAPI/MAPI changes including reporting metric updates
- **June 22, 2026** — Nielsen's DMA for automotive model ads discontinued

---

## 15. Meta Pixel & Conversions API (CAPI)

### 15.1 Meta Pixel

The **Meta Pixel** is a JavaScript snippet placed on websites to track user actions (page views, adds to cart, purchases) for ad optimization and attribution. Fires browser-side.

**Standard Pixel Events:**
| Event | Trigger |
|---|---|
| `PageView` | Any page load |
| `ViewContent` | Product/content page view |
| `Search` | Site search |
| `AddToCart` | Add item to cart |
| `AddToWishlist` | Add item to wishlist |
| `InitiateCheckout` | Start checkout |
| `AddPaymentInfo` | Add payment details |
| `Purchase` | Complete purchase |
| `Lead` | Form submission, sign-up |
| `CompleteRegistration` | Account creation |
| `Contact` | Contact form submission |
| `Subscribe` | Subscription |
| `StartTrial` | Trial start |

**Basic Pixel Code:**

```html
<script>
  !(function (f, b, e, v, n, t, s) {
    /* Meta Pixel base code */
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js",
  );
  fbq("init", "PIXEL-ID");
  fbq("track", "PageView");
</script>
```

**Track Custom Events:**

```javascript
fbq("trackCustom", "StartTrial", {
  plan: "premium",
  value: 29.99,
  currency: "USD",
});
```

**April 2026 Update:** Meta added an **AI-powered enrichment feature** to the Meta Pixel that automatically pulls in additional page and product information to improve post-click signal quality — without developers needing to add extra code. A 30-day review window and Events Manager controls allow advertisers to audit what is being transmitted.

### 15.2 Advanced Matching

Advanced Matching allows the Pixel to capture additional user data (hashed email, phone, name, address) from form fields on your website:

- Hashes all PII client-side before sending to Meta
- Enables Meta to match more Pixel events to Facebook profiles
- Improves attribution accuracy and ad delivery optimization
- Enable in Events Manager > Pixel Settings > Automatic Advanced Matching

### 15.3 Conversions API (CAPI) — Overview

The **Conversions API** is a server-to-server tracking interface that sends conversion events directly from your server to Meta's API. It bypasses browser restrictions, ad blockers, iOS privacy limits, and consent banners.

**In 2026, Meta recommends every advertiser running paid campaigns implement CAPI in addition to the Pixel.**

**CAPI Endpoint:**

```
POST https://graph.facebook.com/v23.0/{PIXEL-ID}/events
  ?access_token={ACCESS-TOKEN}
```

**Example Purchase Event:**

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1715000000,
      "event_id": "unique-event-id-for-deduplication",
      "event_source_url": "https://example.com/checkout",
      "action_source": "website",
      "user_data": {
        "em": ["HASHED-EMAIL"],
        "ph": ["HASHED-PHONE"],
        "client_ip_address": "1.2.3.4",
        "client_user_agent": "Mozilla/5.0...",
        "fbp": "fb.1.1234567890.1234567890",
        "fbc": "fb.1.1234567890.AbCdEfGhIj"
      },
      "custom_data": {
        "currency": "USD",
        "value": 99.99,
        "contents": [{ "id": "product-123", "quantity": 1 }]
      }
    }
  ]
}
```

### 15.4 Event Match Quality (EMQ)

EMQ is a score (1-10) measuring how accurately CAPI events can be matched to real Meta users. Higher EMQ = better ad performance.

**Parameters that improve EMQ (in order of impact):**

1. `em` — Email (hashed SHA-256, lowercase)
2. `ph` — Phone (hashed SHA-256, E.164 format)
3. `external_id` — Your internal user ID (hashed)
4. `fbp` — Facebook Browser ID cookie (`_fbp`)
5. `fbc` — Facebook Click ID from URL (`fbclid`)
6. `client_ip_address` — User's IP
7. `client_user_agent` — Browser user agent
8. `fn` + `ln` — First/last name (hashed)
9. `ct`, `st`, `zp`, `country` — Location data (hashed)

Check EMQ scores in Events Manager at least weekly. Scores below 6.0 need attention.

### 15.5 Deduplication

When running Pixel + CAPI simultaneously, set matching `event_id` values to prevent Meta from counting the same conversion twice:

```javascript
// In Pixel (browser)
fbq('track', 'Purchase', { value: 99.99, currency: 'USD' }, { eventID: 'purchase-abc-123' });

// In CAPI (server) — same event_id
{ "event_name": "Purchase", "event_id": "purchase-abc-123", ... }
```

### 15.6 CAPI Implementation Methods

| Method                                                 | Setup Time       | Cost                    | Best For                                                         |
| ------------------------------------------------------ | ---------------- | ----------------------- | ---------------------------------------------------------------- |
| **Direct Server Integration**                          | 20-40 hours      | Server hosting costs    | Large enterprises, custom platforms, complex conversion tracking |
| **Server-Side Google Tag Manager**                     | 4-8 hours        | $10-50/month (server)   | Multi-platform advertisers (Meta + Google + TikTok), agencies    |
| **Platform Native Integration** (Shopify, WooCommerce) | 30 min - 2 hours | Free (platform feature) | E-commerce on supported platforms, non-technical marketers       |
| **One-Click Meta Setup (New April 2026)**              | Minutes          | Free                    | SMBs, advertisers without engineering resources                  |

### 15.7 CAPI Access Token Setup

1. Open **Events Manager** at `business.facebook.com/events_manager`
2. Select your Pixel
3. Click the **Settings** tab
4. Find **Conversions API** section
5. Click **Generate access token** under "Set up manually"
6. Follow the popup instructions

> Note: The Generate access token link is only visible to users with **developer privileges** for the business.

### 15.8 CAPI + Pixel Architecture

```
Browser (Website)
    │
    ├─► Meta Pixel ──────────────────────────────────► Meta Servers
    │       (browser-side, may be blocked by         (event data)
    │        ad blockers / iOS restrictions)
    │
Your Server
    │
    └─► CAPI ─────────────────────────────────────────► Meta Servers
            (server-side, bypasses all restrictions)   (same event data)
                                                        ▼
                                              Deduplication via event_id
                                              (counted as one conversion)
```

### 15.9 CAPI Legal Context (2026)

- **February 2026:** German court found Meta liable for illegal third-party data collection via Pixel. Website operators embedding Meta tracking tools may share GDPR liability. Ordered damages of €1,500 per plaintiff.
- **March 2026:** Meta's DMA compliance report confirmed EU users selecting less-personalized advertising option face ~90% reduction in data signals for targeting.
- **June 2025:** Meta Pixel had been involved in covert Android tracking via localhost ports. As of June 3, 2025, the Pixel script stopped sending packets to localhost.
- Implement proper **consent management** and GDPR-compliant cookie banners before any Pixel or CAPI events fire.

---

## 16. Meta App Events & SDKs

### 16.1 Meta App Events

**App Events** allow mobile apps to send user action data to Meta for ad measurement, optimization, and analytics. Functions similarly to the Pixel but for iOS and Android apps.

**Standard App Events:**
| Event | Constant |
|---|---|
| App install / first open | `fb_mobile_activate_app` |
| Purchase | `fb_mobile_purchase` |
| Add to cart | `fb_mobile_add_to_cart` |
| Add to wishlist | `fb_mobile_add_to_wishlist` |
| Initiate checkout | `fb_mobile_initiated_checkout` |
| Complete registration | `fb_mobile_complete_registration` |
| Search | `fb_mobile_search` |
| View content | `fb_mobile_content_view` |
| Level achieved | `fb_mobile_level_achieved` |
| Achievement unlocked | `fb_mobile_achievement_unlocked` |
| Tutorial completion | `fb_mobile_tutorial_completion` |

**iOS (Swift) Example:**

```swift
AppEvents.shared.logEvent(.purchasedItemInApp, parameters: [
    AppEvents.ParameterName("fb_currency"): "USD",
    AppEvents.ParameterName("fb_content_id"): "product-123",
    AppEvents.ParameterName(rawValue: "value"): 29.99
])
```

**Android (Kotlin) Example:**

```kotlin
val logger = AppEventsLogger.newLogger(context)
val params = Bundle()
params.putString(AppEventsConstants.EVENT_PARAM_CURRENCY, "USD")
params.putDouble(AppEventsConstants.EVENT_PARAM_VALUE_TO_SUM, 29.99)
logger.logEvent(AppEventsConstants.EVENT_NAME_PURCHASED, 29.99, params)
```

### 16.2 ATT Impact on App Events

Since Apple's **App Tracking Transparency (ATT)** framework, only approximately **25-35% of iOS users globally opt in** to tracking. This means the Facebook SDK alone misses the majority of post-install events on iOS. CAPI (server-to-server) is essential for recovering measurement accuracy, as it sends events regardless of ATT consent status.

### 16.3 Meta SDKs

| SDK                             | Platform                   | Key Capabilities                                                                                                                      |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Facebook SDK for Android**    | Android                    | Facebook Login, App Events, Graph API calls, Share Dialog, App Links, Audience Network, Gaming SDK. Install via Gradle.               |
| **Facebook SDK for iOS**        | iOS                        | Same capabilities as Android. Install via CocoaPods or Swift Package Manager. Includes Limited Login for privacy compliance.          |
| **Facebook SDK for JavaScript** | Web / Node.js              | Graph API calls, Facebook Login, Social Plugins. Loaded asynchronously. Use `window.FB` object.                                       |
| **Meta Business SDK**           | Python, PHP, Java, Node.js | Server-side SDK wrapping Marketing API, Conversions API, and business-oriented APIs. Recommended for server-side programmatic access. |
| **Unity SDK**                   | Unity                      | Facebook Login, App Events, Audience Network monetization, social features for Unity game development.                                |
| **Facebook SDK for PHP**        | PHP                        | Archived on GitHub (`facebookarchive/php-graph-sdk`). Community maintained. Meta now recommends the Business SDK for PHP.             |

### 16.4 SDK Installation

**Android (Gradle):**

```gradle
dependencies {
    implementation 'com.facebook.android:facebook-android-sdk:latest.release'
}
```

**iOS (CocoaPods):**

```ruby
pod 'FBSDKCoreKit'
pod 'FBSDKLoginKit'
pod 'FBSDKShareKit'
```

**JavaScript:**

```html
<script
  async
  defer
  crossorigin="anonymous"
  src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v23.0&appId=YOUR-APP-ID"
></script>
```

**Meta Business SDK (Python):**

```bash
pip install facebook_business
```

```python
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount

FacebookAdsApi.init(app_id, app_secret, access_token)
account = AdAccount('act_{AD-ACCOUNT-ID}')
campaigns = account.get_campaigns()
```

---

## 17. Meta Horizon OS — VR & Mixed Reality

### 17.1 Platform Overview

**Meta Horizon OS** is the operating system powering Meta Quest headsets (Quest 3, Quest 3S, and future devices). It is **Android-based** (built on AOSP) with custom VR/MR extensions. Meta Quest is the leading VR platform:

- $1B+ spent on Meta Quest titles
- 1 in 12 titles has earned more than $10M in gross revenue
- Growing ecosystem with more $1M+ titles than ever before (as of GDC 2026)

### 17.2 Development Paths

| Path                          | Description                                                                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Unity**                     | Most popular path. Full support for hand tracking, passthrough, scene understanding, spatial audio, and social features via the Meta SDK for Unity.                                                                      |
| **Unreal Engine**             | High-fidelity 3D experiences. Supports Meta OpenXR plugin and Passthrough Camera API (since Horizon OS v83).                                                                                                             |
| **Native Android / OpenXR**   | Direct C++/Java development targeting Horizon OS. Maximum performance and hardware access. Uses OpenXR as the open standard XR API.                                                                                      |
| **Meta Spatial SDK**          | Native Android framework for spatial computing. Supports 2D Android panel apps elevated into 3D space, Jetpack Compose UI, and Passthrough Camera API.                                                                   |
| **Immersive Web SDK (IWSDK)** | JavaScript framework built on Three.js with ECS architecture for WebXR experiences. Eliminates need for complex 3D math setup. Runs in Meta Quest browser with desktop mouse/keyboard emulation. Updated March 11, 2026. |
| **2D Apps for Horizon OS**    | Existing Android apps run as 2D panel apps in Horizon OS. Easy entry point for Android developers.                                                                                                                       |

### 17.3 Immersive Web SDK (IWSDK) Details

- Built on **Three.js** (most popular JavaScript 3D library)
- Uses **Entity-Component-System (ECS)** pattern for scalable architecture
- Provides complete foundation: physics, spatial audio, grab interactions, scene understanding
- **No browser extensions or special setup needed** — desktop users get automatic mouse-and-keyboard emulation
- Anyone with a computer can develop for the immersive web
- Three entry paths: **Guides** (step-by-step tutorials), **Concepts** (deep dives on ECS, locomotion, grabbing, spatial UI), **API Reference** (complete component/system/utility docs)

### 17.4 Passthrough Camera API

Publicly released in Horizon OS **v76** (2025), the **Passthrough Camera API** provides developers access to the forward-facing RGB cameras on Meta Quest 3 and Quest 3S for computer vision and machine learning use cases.

**Key Facts:**

- Based on Android **Camera2 API** — familiar surface for Android developers
- All common Android Camera APIs supported: CameraNDK, Camera1, Camera2, CameraX
- Available in: Unity (v74+), Unreal/Native (v83+), Meta Spatial SDK, Android panel apps, web (coming soon)
- **Supported resolutions:**
  - 1280x960 (available since v74)
  - 1280x1280 (added in v83 — wider field of view)
- Apps using this API can now be **published to the Meta Horizon Store**
- Meta added two special **Vendor Tags** to distinguish passthrough cameras from other virtual or physical cameras

**Required Permissions:**

```xml
<!-- In AndroidManifest.xml -->
<uses-feature android:name="horizonos.feature.HEADSET_CAMERA" android:required="true" />

<!-- Option 1: Access both passthrough and avatar camera -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Option 2: Access only passthrough camera -->
<uses-permission android:name="horizonos.permission.HEADSET_CAMERA" />
```

**Common Use Cases:**

- Object detection and tracking (identify fitness equipment, products, tools)
- AR overlays on real-world objects
- Workplace workflow automation (scan and fill paperwork, QR codes)
- AI vision integration with cloud LLMs (Llama, GPT)
- Wayfinding and indoor navigation (where GPS is ineffective)
- Texture transfer — overlay real faces/textures onto virtual objects
- Computer vision pipelines for custom ML models
- Livestreaming the user's point of view

**Unity Example (Camera Controller):**

```kotlin
// Meta Spatial SDK pattern
class CameraController(context: Context, cameraEye: Int) {
    fun initialize() { /* starts background threads, gets camera service */ }
    fun start(surfaceProviders, imageListener) { /* starts camera session */ }
    fun stop() { /* closes session — call when not actively using */ }
}
```

**Best Practice:** Run camera sessions on **background threads** to maintain UI framerate. Stop sessions when not actively using to conserve device energy.

**Restriction:** Parental restrictions for Teen and Youth accounts (e.g., blocking Camera Access) are **not applied** if the app is installed through Meta Quest Developer Hub — only affects store-installed apps.

### 17.5 Key APIs & Features (Horizon OS)

| API / Feature                        | Description                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **Scene Understanding API**          | Spatial anchors, room layout, object recognition. Understand and interact with physical space. |
| **Hand Tracking**                    | Full hand and finger joint tracking without controllers. Available in Unity, Unreal, OpenXR.   |
| **Full Body Tracking**               | Body pose estimation for avatar animation and fitness apps.                                    |
| **Spatial Audio**                    | 3D positional audio — sounds emanate from virtual positions in space.                          |
| **Social Features**                  | Multiplayer networking, voice chat, Meta Avatars integration.                                  |
| **Haptics**                          | Controller vibration patterns and intensity control.                                           |
| **Eye Tracking**                     | Gaze detection for foveated rendering (better performance) and UI interaction.                 |
| **Face Tracking**                    | Facial expression mirroring for avatar animation.                                              |
| **Scene Mesh**                       | Dense 3D mesh of the user's environment for precise physics and occlusion.                     |
| **Spatial Anchors**                  | Persistent 3D anchors that survive app restarts and sessions.                                  |
| **Shared Spatial Anchors**           | Share anchors between multiple users in the same physical space.                               |
| **Scene API**                        | Understand room layout: walls, floor, ceiling, furniture, windows, doors.                      |
| **Mixed Reality Utility Kit (MRUK)** | High-level scene understanding utilities for MR app development.                               |
| **Media Projection API**             | Cast what the user sees (including UI) — distinct from Passthrough Camera API.                 |

### 17.6 Meta Quest Developer Hub (MQDH)

The recommended starting point for Quest development:

- **Device Management** — Connect, reboot, factory reset headsets
- **APK Sideloading** — Install and test apps without going through the Store
- **Performance Analyzer** — GPU/CPU/memory/framerate profiling
- **Perfetto Integration** — Detailed system-level traces
- **File Manager** — Transfer files to/from headset
- **Downloads** — SDK updates, documentation links
- **News** — Developer announcements and changelogs

**Available on:** Windows and macOS

### 17.7 Developer Tools for Quest

| Tool Category              | Tools                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Android Tools**          | Android Studio, ADB, Android Debug Bridge (installed with Android Studio for Unreal/OpenXR; as a Unity module) |
| **Performance Monitoring** | MQDH Performance Analyzer, Perfetto, RenderDoc, GPU Systrace                                                   |
| **Testing & Automation**   | MQDH, automated test frameworks, VRC test plan downloads                                                       |

### 17.8 Meta Horizon Store Publishing

**Requirements:**

1. Developer Dashboard app setup: description, screenshots, promo video, icon assets
2. **Technical Review (VRC):** Performance targets, entitlement checks (ownership verification), reserved interaction compliance, framerate requirements
3. **Content Review:** Production value, polish, utility/entertainment assessment
4. Submit at least **2 weeks before target launch** to allow time for review and revisions

**App Submission Statuses:**

- `Submitted` — Received. You have 1 hour to make changes before moving to "Under Review"
- `Under Review` — Technical and content review in progress
- `Changes Required` — Feedback provided, resubmission needed
- `Approved` — Cleared for release

**Release Categories:**

- **Early Access** — Work-in-progress content, still polished enough to charge for
- **Full Release** — Complete, production-quality app

**Release Channels:** Alpha → Beta → Public (version management available)

### 17.9 Start Program

An exclusive program for developers who have launched or are actively preparing an app for the Meta Horizon Store. Provides:

- Enhanced support and developer relations
- Early access to new APIs and features
- Co-marketing opportunities
- Business development resources

### 17.10 GDC 2026 Highlights

At **GDC 2026**, Meta announced for Horizon OS developers:

- **Faster build tools** reducing Unity and Unreal compile times
- **Smarter Store discovery** improvements — better app discoverability signals and featured placement algorithms
- **LiveOps strategies** and analytics improvements for retention and monetization
- **AI-assisted Unity workflows** for Horizon OS development
- **Data-driven retention tips** based on aggregated developer insights from top-performing titles
- Gorilla Tag showcased LiveOps strategies that drove continued engagement

---

## 18. Llama & Meta AI Developer Tools

### 18.1 Llama Models

Meta's **Llama** family of open-source large language models has become the world's most downloaded LLM family with **100M+ downloads**. Llama models are optimized for deployment efficiency, cost, and performance at scale.

**Available Models (2026):**

| Model                           | Capabilities                             | Best For                                          |
| ------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| **Llama 3.2 Vision** (11B, 90B) | Multimodal: text + image understanding   | Computer vision, image analysis, mixed reality AI |
| **Llama 3.3**                   | Text generation, reasoning, coding       | General purpose, instruction following            |
| **Llama 4** (latest)            | Advanced reasoning, coding, multilingual | Complex tasks, enterprise workflows               |

**Access Channels:**

- Direct download from `llama.meta.com`
- AWS Bedrock (primary supported method for spatial apps)
- Microsoft Azure AI
- Google Cloud Vertex AI
- Hugging Face Model Hub
- NVIDIA AI Catalog
- Many other partners

### 18.2 Llama Use Cases (Developer Examples)

**Shopify + Llama:**
Shopify used Llama to automate product tagging at scale, improving search relevance and reducing inference costs — demonstrating enterprise e-commerce applications.

**Upwork + Llama:**
Reduced proposal costs by 19% and boosted engagement by 59%, enabling more wins for freelancers.

**CGS Immersive + Llama 4 (Passthrough Camera):**
Integrated Llama 4 with the Passthrough Camera API on Meta Quest for workplace workflow automation. Technicians don headsets to scan equipment, place digital boxes on-screen, and initiate paperwork — all hands-free.

### 18.3 Wit.ai

**Wit.ai** (`wit.ai`) is Meta's free, open-source natural language processing platform:

- Build voice and text-based conversational interfaces
- Integrates natively with Messenger bots for intent recognition and entity extraction
- Train custom NLP models with your own utterances
- No API key cost — free to use
- REST API: `POST https://api.wit.ai/message?v={version}&q={utterance}`

### 18.4 AI in Meta Horizon OS

Combining Passthrough Camera + ML + Llama enables powerful on-device + cloud AI workflows:

**Spatial Scanner (Sample App):**

- Uses Passthrough Camera API for live RGB video
- Google ML Kit Object Detection for on-device object recognition and tracking
- Llama 3.2 11B Vision (via AWS Bedrock) for detailed object analysis
- Meta Spatial Editor for scene composition
- Jetpack Compose + Meta Spatial UI Set for UI

**Object Detection Pipeline:**

```
Camera Feed → Background Thread
    → ML Kit Detection → Detected Object Cache
    → TrackedObjectSystem (3D labels in space)
    → (On user tap) Crop image → AWS Bedrock → Llama Vision Response
```

### 18.5 Llama Integration Best Practices

- Use **background threads** for all camera + inference operations to maintain VR framerate
- Use **DetectedObjectCache** to filter overlapping objects (e.g., adjacent bookshelves detected as both "shelf" and "bookcase")
- Stop camera sessions when not actively processing to conserve battery
- Use **task-specific system prompts** — general-purpose AI is prohibited on WhatsApp and creates poor user experiences elsewhere
- AWS Bedrock currently the recommended method for Llama invocation in spatial apps; Azure and GCP also supported

---

## 19. Facebook Pages API

The **Pages API** enables programmatic management of Facebook Pages. Required permissions vary by operation.

### 19.1 Key Capabilities

| Operation         | Endpoint                                        | Permission                |
| ----------------- | ----------------------------------------------- | ------------------------- |
| Get Page info     | `GET /{page-id}?fields=name,category,fan_count` | `pages_read_engagement`   |
| Get Page feed     | `GET /{page-id}/feed`                           | `pages_read_engagement`   |
| Publish post      | `POST /{page-id}/feed?message={text}`           | `pages_manage_posts`      |
| Upload photo      | `POST /{page-id}/photos`                        | `pages_manage_posts`      |
| Get insights      | `GET /{page-id}/insights`                       | `pages_read_engagement`   |
| Moderate comments | `POST /{comment-id}`                            | `pages_manage_engagement` |
| Reply to messages | Via Messenger Platform                          | `pages_messaging`         |
| Get events        | `GET /{page-id}/events`                         | `page_events`             |
| Update settings   | `POST /{page-id}`                               | `pages_manage_metadata`   |

### 19.2 Page Access Token Retrieval

```bash
# Get all Pages you manage + their access tokens
GET https://graph.facebook.com/{user-id}/accounts
  ?access_token={user-access-token-with-page-permissions}
```

Returns page ID, name, access token, category, and your specific permission scope on each Page.

### 19.3 Page Insights Metrics

- **Reach:** `page_impressions_unique`, `page_reach`
- **Engagement:** `page_post_engagements`, `page_actions_post_reactions_total`
- **Growth:** `page_fan_adds`, `page_fan_removes`, `page_fans`
- **Views:** `page_views_total`, `page_views_by_profile_tab_total`
- **Video:** `page_video_views`, `page_video_complete_views_30s`

---

## 20. Commerce Platform & Catalog API

### 20.1 Overview

Meta's **Commerce Platform** enables businesses to sell products directly on Facebook and Instagram. The **Catalog API** powers dynamic ads, product tags in posts/stories/Reels, and Facebook Shops.

### 20.2 Product Catalog

A Catalog is a container for your product inventory. Supports multiple verticals:

| Catalog Type  | For                 |
| ------------- | ------------------- |
| Products      | E-commerce, retail  |
| Hotels        | Travel, hospitality |
| Flights       | Airlines, travel    |
| Vehicles      | Automotive          |
| Home Listings | Real estate         |
| Destinations  | Travel experiences  |

### 20.3 Uploading Product Data

| Method                    | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| **Data Feed URL**         | Host a CSV, TSV, or XML file; Meta fetches on schedule      |
| **Batch Upload**          | Upload file directly via API                                |
| **Facebook Pixel Events** | Auto-create products from Pixel ViewContent events          |
| **SFTP**                  | Schedule automated data feed uploads via SFTP               |
| **Real-Time Updates**     | API calls to update individual product availability/pricing |

### 20.4 Required Permissions

- `catalog_management` — Create/manage catalogs
- `business_management` — Connect catalogs to business assets (dependency)
- `commerce_account_manage_orders` — Manage orders with webhook access
- `commerce_account_read_reports` — Finance reports
- `commerce_manage_accounts` — Create/manage commerce accounts

### 20.5 Facebook Shops

Facebook Shops creates a native in-app shopping experience on Facebook and Instagram:

- Customizable storefront layout
- Native checkout (US) or redirect to website
- Instagram product tagging in posts, stories, and Reels
- WhatsApp integration for customer service
- Shops discovery via Facebook and Instagram feeds and ads

### 20.6 Commerce Webhooks

Subscribe to:

- `ORDERS` — Order created, updated, cancelled
- `RETURNS` — Return requests
- `SHIPMENT` — Shipping updates
- `PRODUCT_CATALOG` — Catalog changes

---

## 21. Live Video API & Stories

### 21.1 Live Video API

Allows streaming live video to Facebook Pages, Groups, User profiles, and Events:

```bash
# Create a live video stream
POST https://graph.facebook.com/{page-id}/live_videos
  ?status=LIVE_NOW
  &title=My Live Stream
  &description=Welcome to my stream
  &access_token={PAGE-ACCESS-TOKEN}
```

Response includes `stream_url` and `secure_stream_url` (RTMP endpoint) and `id`.

**Use cases:** Broadcast platforms, OBS integration, streaming software, live event management, social media schedulers.

### 21.2 Page Stories API

Publish ephemeral Stories to Facebook Pages programmatically:

```bash
# Publish a photo story
POST https://graph.facebook.com/{page-id}/photo_stories
  -F "source=@/path/to/image.jpg"
  -F "access_token={PAGE-ACCESS-TOKEN}"
```

Supports images, video, and link attachments. Stories disappear after 24 hours. Used by social media management tools for scheduled Story publishing.

---

## 22. Meta Audience Network

The **Audience Network** allows mobile app publishers to monetize with Meta ads:

- Display Meta ads within your app using the Audience Network SDK
- **Ad Formats:** Banner ads, interstitials, rewarded video ads, native ads
- Revenue driven by Meta's advertiser demand
- **Platform support:** iOS and Android
- Publishers earn revenue from Meta advertisers targeting their app's audience

**SDK Integration (Android):**

```gradle
dependencies {
    implementation 'com.facebook.android:audience-network-sdk:6.+'
}
```

**Load a Rewarded Video:**

```java
RewardedVideoAd rewardedVideoAd = new RewardedVideoAd(context, "YOUR-PLACEMENT-ID");
RewardedVideoAdListener listener = new RewardedVideoAdListener() {
    @Override
    public void onRewardedVideoCompleted() {
        // User watched full video — give reward
    }
    // ... implement other callbacks
};
rewardedVideoAd.loadAd(rewardedVideoAd.buildLoadAdConfig().withAdListener(listener).build());
```

---

## 23. Meta Wearables Developer Toolkit

### 23.1 Overview

The **Meta Wearables Developer Toolkit** (`wearables.developer.meta.com`) provides access for developers building experiences for Meta's **AI glasses** and wearable devices. As of 2026, access is restricted to early beta participants.

### 23.2 Key Components

| Component              | Description                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **Developer Mode**     | Allows fast iteration and testing of Meta AI app and device integrations                |
| **Projects**           | Register integrations and request permissions for device functionality access           |
| **Version Management** | Set up release channels and versioning for wearable apps                                |
| **Sign-Up**            | Subscribe to updates — be among the first to access new features and toolkit expansions |

### 23.3 Wearable Device Access Toolkit

- Provides API access to AI glasses hardware features
- Hands-free, AI-powered experiences enabled by physical glasses form factor
- Integration with Meta AI for voice commands and contextual awareness
- Privacy controls and user consent mechanisms for camera/microphone data

### 23.4 Strategic Importance

Wearables is one of Meta's highest-priority consumer hardware platforms alongside Quest headsets. The AI glasses represent the next major computing paradigm — lightweight, always-on, ambient computing. Developers building for wearables now are positioning for a potentially massive ecosystem.

---

## 24. Rate Limits, Quotas & Best Practices

### 24.1 Graph API Rate Limits

Meta enforces rate limits to protect platform stability. Primary types:

| Limit Type                  | Details                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Application-Level**       | Per app per token type. ~200 calls per hour per user per app. Tracked via `X-App-Usage` response header (shows % of limit consumed). |
| **Page-Level**              | 4,800 calls per 24-hour period per Page. Tracked via `X-Page-Usage` response header.                                                 |
| **BUC (Business Use Case)** | Rate limit per Business Use Case (e.g., Messenger messaging, WhatsApp messaging)                                                     |

**Rate Limit Error Response:**

```json
{
  "error": {
    "message": "User request limit reached",
    "type": "OAuthException",
    "code": 17,
    "fbtrace_id": "ABC123"
  }
}
```

### 24.2 WhatsApp Messaging Tiers

| Tier          | Daily Business-Initiated Conversations | How to Upgrade                                                                               |
| ------------- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Tier 1**    | 1,000 unique                           | Automatic when quality rating is High/Medium and you initiate 500 conversations in 7 days    |
| **Tier 2**    | 10,000 unique                          | Automatic when quality rating is High/Medium and you initiate 5,000 conversations in 7 days  |
| **Tier 3**    | 100,000 unique                         | Automatic when quality rating is High/Medium and you initiate 75,000 conversations in 7 days |
| **Unlimited** | Unlimited                              | Automatic when quality rating is High/Medium and you initiate 75,000+ conversations          |

Quality is affected by: user blocks, user reports, delivery failures, and message template quality ratings.

### 24.3 Instagram Limits

- **Content Publishing:** 50 API-published posts per 24-hour period per Instagram account
- **Hashtag Search:** 30 unique hashtags per 7-day period per account
- **Rate Limits:** Same Graph API 200 calls/hour/user/app pattern

### 24.4 Marketing API Limits

- Rate limits based on ad account spend level
- Higher-spending accounts receive higher API rate limits
- `X-Business-Use-Case-Usage` header shows limit consumption for Marketing API calls

### 24.5 General Best Practices

- **Use field selection** — Always specify only needed `fields` to reduce response size and API usage
- **Implement exponential backoff** — For retrying on rate limit errors (HTTP 429) and transient errors
- **Cache responses** — Store and reuse data that doesn't change frequently (Page info, user profiles)
- **Use batch requests** — Combine multiple calls into one HTTP request where possible (up to 50 per batch)
- **Use webhooks instead of polling** — Far more efficient for real-time updates
- **Paginate properly** — Use cursor-based pagination (`before`/`after` cursors) for large datasets
- **Request only what you need** — Both for fields and for permissions

---

## 25. Social Plugins & Sharing

### 25.1 Social Plugins

**Social Plugins** are embeddable web components adding Facebook functionality to any website without requiring API access:

| Plugin              | Description                                               | Implementation                                    |
| ------------------- | --------------------------------------------------------- | ------------------------------------------------- |
| **Like Button**     | Allow users to like Facebook Pages or content             | `<div class="fb-like" data-href="URL">`           |
| **Share Button**    | Share URLs to Facebook feed or Messenger                  | `<div class="fb-share-button" data-href="URL">`   |
| **Comments Plugin** | Embed Facebook commenting system                          | `<div class="fb-comments" data-href="URL">`       |
| **Page Plugin**     | Embed a Facebook Page widget (timeline, events, messages) | `<div class="fb-page" data-href="PAGE-URL">`      |
| **Login Button**    | Quick Facebook Login integration                          | `<div class="fb-login-button" data-size="large">` |
| **Video Plugin**    | Embed Facebook videos                                     | `<div class="fb-video" data-href="VIDEO-URL">`    |
| **Follow Button**   | Follow a Facebook Page without liking                     | `<div class="fb-follow" data-href="PAGE-URL">`    |
| **Group Plugin**    | Embed a Facebook Group widget                             | `<div class="fb-group" data-href="GROUP-URL">`    |

All Social Plugins require the JavaScript SDK to be loaded.

### 25.2 Open Graph Tags

Control how your content appears when shared on Facebook via Open Graph meta tags:

```html
<meta property="og:title" content="My Article Title" />
<meta property="og:description" content="Article description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/article" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="My Site" />
```

**Image Requirements for Sharing:**

- Minimum size: 200x200 pixels
- Recommended: 1200x630 pixels (1.91:1 ratio)
- File size: under 8MB
- Format: JPG, PNG, GIF (static)

Use the **Sharing Debugger** to preview appearance and force re-scraping when you update OG tags.

### 25.3 Sharing API

Programmatic content sharing to Facebook feeds, Pages, and Stories:

```javascript
// Web Share Dialog
FB.ui(
  {
    method: "share",
    href: "https://example.com/article",
  },
  function (response) {
    console.log(response);
  },
);
```

---

## 26. App Links

**App Links** is Meta's open standard for **mobile deep linking**. It allows URLs on the web to open specific pages within iOS and Android apps.

### 26.1 App Links Metadata

Add Open Graph meta tags to your web pages:

```html
<!-- iOS -->
<meta property="al:ios:url" content="appname://path/to/content" />
<meta property="al:ios:app_store_id" content="APP-STORE-ID" />
<meta property="al:ios:app_name" content="App Name" />

<!-- Android -->
<meta property="al:android:url" content="appname://path/to/content" />
<meta property="al:android:package" content="com.example.appname" />
<meta property="al:android:app_name" content="App Name" />

<!-- Web fallback -->
<meta property="al:web:url" content="https://example.com/path/to/content" />
```

### 26.2 App Links Index API

Use the App Links Index API to programmatically read App Links metadata:

```bash
GET https://graph.facebook.com/?id={URL}&fields=app_links&access_token={TOKEN}
```

---

## 27. Gaming — Instant Games

### 27.1 Overview

**Meta Instant Games** enables HTML5 games that run natively within Facebook and Messenger **without installation**. Built with web technologies (HTML5, JavaScript, Canvas/WebGL).

### 27.2 Instant Games SDK Capabilities

| Feature                   | Description                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Player Authentication** | Identify players using `FBInstant.player.getID()` without Facebook Login flow          |
| **Leaderboards**          | Global and friend-specific leaderboards via `FBInstant.getLeaderboardAsync()`          |
| **Tournaments**           | Competitive bracket tournaments with structured scoring                                |
| **In-App Purchases**      | Sell items within games (supported markets only)                                       |
| **Ads**                   | Rewarded video, interstitial ads via Audience Network                                  |
| **Sharing**               | Share contextual game moments and invites to encourage virality                        |
| **Context**               | Detect and switch between solo, multiplayer (friend-specific), and group play contexts |
| **Player Data**           | Persistent player data storage (per player, per game)                                  |
| **Connected Players**     | Get info about friends who have played the game                                        |

### 27.3 Basic Setup

```javascript
FBInstant.initializeAsync()
  .then(function () {
    return FBInstant.startGameAsync();
  })
  .then(function () {
    // Game is ready to play
    const playerName = FBInstant.player.getName();
    const playerId = FBInstant.player.getID();
  });

// Log a score
FBInstant.getLeaderboardAsync("weekly-scores")
  .then((leaderboard) => leaderboard.setScoreAsync(score))
  .then((entry) => console.log("Score submitted:", entry.getScore()));
```

---

## 28. Data Privacy, Compliance & Responsible Platform

### 28.1 Meta's Responsible Platform Initiatives

Meta's Responsible Platform team manages App Review and ongoing compliance monitoring. Their stated mission: ensure apps use Meta products in approved, ethical, and policy-compliant ways.

**Key Annual Requirements:**

- **Data Use Checkup** — Annual re-certification that your app continues to use data exactly as declared during App Review
- **Privacy Policy** — Must be publicly accessible, accurate, and updated when data practices change
- **Data Handling Questions** — Required documentation of how data is stored, processed, and retained for sensitive permissions
- **Data Deletion Callback** — Required for apps accessing user data; must handle Meta-originated user data deletion requests
- **Business Verification** — Required for Advanced Access (one-time, but must stay current)

### 28.2 Developer Policies (Key Points)

- **Minimum Necessary Data** — Only request data your app genuinely needs. Prohibited from collecting data "just in case."
- **No Selling Data** — Prohibited from selling Meta user data to third parties
- **No Transfer** — Prohibited from transferring data to ad networks, data brokers, or other monetization without user consent
- **Transparency** — Must clearly disclose to users what data is collected and how it's used
- **Security** — Must implement reasonable data security measures
- **Compliance with Laws** — Must comply with all applicable laws (GDPR, CCPA, etc.)
- **Platform Policies** — Subject to additional policies per product (WhatsApp Commerce Policy, Instagram Platform Policy, etc.)

### 28.3 Privacy Settings in SDKs

| Feature                     | Description                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| **Limited Login (iOS)**     | Authentication without traditional access tokens — limits data sharing to comply with ATT |
| **Advanced Matching**       | Hashes user PII client-side before sending to Meta — no raw PII transmitted               |
| **Data Processing Options** | Flag events for CCPA Limited Data Use (California Consumer Privacy Act)                   |
| **Automatic Deletion**      | Set data retention policies in Events Manager for Pixel and CAPI data                     |

### 28.4 GDPR & DMA Considerations (2026)

Key legal developments affecting Meta developer tools in Europe:

| Event                             | Date          | Impact                                                                                                                                                           |
| --------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **German court ruling on Pixel**  | February 2026 | Found Meta liable for illegal data collection via Pixel. Website operators embedding Meta tracking tools may share GDPR liability. €1,500 damages per plaintiff. |
| **DMA compliance report**         | March 2026    | EU users opting out of personalized advertising face ~90% reduction in data signals for targeting — directly impacts ad performance for businesses.              |
| **Meta Pixel localhost tracking** | June 2025     | Pixel found tracking via localhost ports in covert manner. Fixed as of June 3, 2025.                                                                             |
| **Consent Management**            | Ongoing       | Developers must implement proper consent banners before any tracking fires. Non-compliant implementations face shared liability.                                 |

**EU Developer Checklist:**

- Implement a **Consent Management Platform (CMP)** before loading Pixel or CAPI
- Only fire tracking events **after user consent** is obtained
- Honor user deletion requests via **Data Deletion Callback URL** (set in App Dashboard)
- Review whether your use case requires a **Data Processing Agreement (DPA)** with Meta
- Keep your **Privacy Policy** up to date with all data uses

### 28.5 CCPA (California)

- Implement **Data Processing Options** on Pixel and CAPI events for California users
- Provide a "Do Not Sell My Personal Information" link if applicable
- Honor opt-outs via Pixel's `dataProcessingOptions: ['LDU']` flag

```javascript
// Pixel: California Limited Data Use
fbq(
  "init",
  "PIXEL-ID",
  {},
  {
    dataProcessingOptions: ["LDU"],
    dataProcessingOptionsCountry: 1,
    dataProcessingOptionsState: 1000,
  },
);
```

```json
// CAPI: Limited Data Use
{
  "data": [{
    "event_name": "Purchase",
    "data_processing_options": ["LDU"],
    "data_processing_options_country": 1,
    "data_processing_options_state": 1000,
    ...
  }]
}
```

### 28.6 Data Deletion Request Callback

Meta sends a signed request to your deletion callback URL when a user requests data deletion:

1. Configure your **Data Deletion Request URL** in App Dashboard → Settings → Advanced
2. Meta sends a `POST` with a `signed_request` parameter
3. Your server decodes and verifies the signature, deletes user data, and responds with a confirmation code and status URL

---

## 29. Developer Tools, Testing & Debugging

### 29.1 Essential Developer Tools

| Tool                                | URL / Location                                    | Description                                                                                                                                |
| ----------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Graph API Explorer**              | `developers.facebook.com/tools/explorer`          | Interactive tool for testing API calls, generating access tokens, and exploring the social graph. Essential for prototyping and debugging. |
| **Access Token Debugger**           | `developers.facebook.com/tools/debug/accesstoken` | Inspect tokens: expiry, scopes, app association, user ID. Detect invalid or expired tokens.                                                |
| **Sharing Debugger**                | `developers.facebook.com/tools/debug`             | Preview how shared URLs appear on Facebook. Forces re-scraping of Open Graph metadata.                                                     |
| **Payload Helper**                  | Events Manager                                    | Validate CAPI JSON payloads before implementation. Ensures correct event data structure.                                                   |
| **Test Events Tool**                | Events Manager                                    | Verify CAPI events are received correctly by Meta in real time. Filter by event name and event source.                                     |
| **Embedded Signup Builder**         | App Dashboard → WhatsApp → Quick Start            | Generate and test the Embedded Signup flow for WhatsApp business customer onboarding.                                                      |
| **Meta Quest Developer Hub (MQDH)** | Desktop app (Windows/macOS)                       | One-stop Quest headset management, performance analysis, APK sideloading, and development workflow.                                        |
| **Performance Analyzer**            | Built into MQDH                                   | Profile GPU, CPU, memory, and framerate for Quest app optimization.                                                                        |
| **VRC Test Plans**                  | Developer Dashboard downloads                     | Downloadable test plans listing exact criteria for Meta Horizon Store technical review.                                                    |
| **Webhooks Tester**                 | App Dashboard → Webhooks                          | Send test webhook payloads to your endpoint to verify handling.                                                                            |

### 29.2 Graph API Explorer — Detailed Guide

1. Navigate to `developers.facebook.com/tools/explorer`
2. Select your app from the **Meta App** dropdown
3. Choose token type: **User Token**, **Page Token**, or **App Token**
4. Click **Generate Access Token** and authenticate
5. Enter endpoint in the URL field (e.g., `me?fields=id,name,email`)
6. Select **GET**, **POST**, or **DELETE**
7. Click **Submit** to execute the API call
8. View formatted JSON response
9. Use the **Code** button to generate cURL, Python, PHP, JavaScript, or iOS/Android sample code

### 29.3 Debugging Common Errors

| Error Code | Meaning                              | Resolution                                           |
| ---------- | ------------------------------------ | ---------------------------------------------------- |
| 1          | Unknown error                        | Retry with exponential backoff                       |
| 2          | Service temporarily unavailable      | Retry later                                          |
| 4          | Application request limit reached    | Implement rate limit handling, reduce call frequency |
| 10         | Application does not have permission | Check permission scopes, request needed permissions  |
| 17         | User request limit reached           | Throttle requests, implement backoff                 |
| 100        | Invalid parameter                    | Check API documentation for correct parameters       |
| 102        | Session key invalid / expired        | Refresh or regenerate access token                   |
| 190        | Access token expired / invalid       | Refresh token or re-authenticate user                |
| 200-299    | Permission errors (various)          | Request the required permission via login/review     |
| 368        | Temporarily blocked                  | Content review issue — check developer policies      |

### 29.4 Webhook Signature Verification

Always verify webhook payloads are from Meta:

```python
import hashlib
import hmac

def verify_signature(payload_body: bytes, signature_header: str, app_secret: str) -> bool:
    expected = "sha256=" + hmac.new(
        app_secret.encode('utf-8'),
        payload_body,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature_header)
```

```javascript
// Node.js
const crypto = require("crypto");

function verifyWebhook(body, signature, appSecret) {
  const expectedSignature =
    "sha256=" +
    crypto.createHmac("sha256", appSecret).update(body).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
}
```

---

## 30. Quick Reference — Key Endpoints & Resources

### 30.1 Key URLs

| Resource                             | URL                                                |
| ------------------------------------ | -------------------------------------------------- |
| Social Technologies Developer Portal | `developers.facebook.com`                          |
| Meta-Wide Developer Portal           | `developers.meta.com`                              |
| Meta Horizon OS Developer Center     | `developers.meta.com/horizon`                      |
| Wearables Developer Toolkit          | `wearables.developer.meta.com`                     |
| WhatsApp Business Developer Hub      | `business.whatsapp.com/developers/developer-hub`   |
| Graph API Base URL                   | `https://graph.facebook.com/v23.0/`                |
| App Dashboard                        | `developers.facebook.com/apps`                     |
| Graph API Explorer                   | `developers.facebook.com/tools/explorer`           |
| Access Token Debugger                | `developers.facebook.com/tools/debug/accesstoken`  |
| Sharing Debugger                     | `developers.facebook.com/tools/debug`              |
| Developer Policies                   | `developers.facebook.com/devpolicy`                |
| Meta Platform Terms                  | `developers.facebook.com/terms`                    |
| Permissions Reference                | `developers.facebook.com/docs/permissions`         |
| Graph API Changelog                  | `developers.facebook.com/docs/graph-api/changelog` |
| Llama Models                         | `llama.meta.com`                                   |
| Meta Quest Developer Hub             | Download from `developers.meta.com/horizon`        |
| Business Manager                     | `business.facebook.com`                            |
| Events Manager (Pixel/CAPI)          | `business.facebook.com/events_manager`             |

### 30.2 Current API Version

```
Graph API Latest Stable: v23.0 (as of April 2026)
Always specify version in API requests to avoid defaulting to oldest available.
```

### 30.3 Compliance Deadlines (2026)

| Date                          | Change                                                                    |
| ----------------------------- | ------------------------------------------------------------------------- |
| **January 12, 2026** _(past)_ | Ads Insights API attribution window and breakdown limitations took effect |
| **January 15, 2026** _(past)_ | General-purpose AI chatbots prohibited on WhatsApp Business Platform      |
| **May 19, 2026**              | `metadata` parameter deprecated for **all Graph API versions**            |
| **June 22, 2026**             | Nielsen DMA discontinued for automotive model ads                         |

### 30.4 Developer Onboarding Checklist

**For Social API Apps:**

- [ ] Register as Meta developer at `developers.facebook.com`
- [ ] Create an app (choose correct type: Business/Consumer/Gaming)
- [ ] Configure app settings (privacy policy URL, app domain, contact email)
- [ ] Add required products (Facebook Login, Marketing API, Instagram, WhatsApp, etc.)
- [ ] Configure use cases and requested permissions (minimum necessary only)
- [ ] Set up webhooks endpoint and verify ownership
- [ ] Test in Development Mode with test users
- [ ] Complete Business Verification (if requesting Advanced Access)
- [ ] Submit App Review with use-case descriptions and screencasts
- [ ] Switch to Live Mode after App Review approval
- [ ] Implement Data Deletion Callback URL
- [ ] Complete annual Data Use Checkup

**For WhatsApp Business Platform:**

- [ ] Create Meta app with WhatsApp use case
- [ ] Connect to Meta Business Account
- [ ] Add and verify phone number via OTP
- [ ] Generate System User access token
- [ ] Set up webhook endpoint for messages and status updates
- [ ] Create and get approval for message templates
- [ ] Implement Embedded Signup (for Tech Providers)
- [ ] Complete Business Verification
- [ ] Submit App Review for Advanced Access

**For Meta Horizon OS Apps:**

- [ ] Install Meta Quest Developer Hub (MQDH)
- [ ] Enable Developer Mode on your Quest headset
- [ ] Set up development environment (Unity/Unreal/Android Studio)
- [ ] Install Meta SDK (Unity: Meta XR SDK; Unreal: Meta OpenXR plugin)
- [ ] Build and test via ADB sideloading through MQDH
- [ ] Run VRC validation tests using downloaded test plans
- [ ] Create store listing in Developer Dashboard
- [ ] Submit for technical and content review (at least 2 weeks before launch)
- [ ] Publish to Meta Horizon Store

### 30.5 Key Terms Glossary

| Term      | Definition                                                                                   |
| --------- | -------------------------------------------------------------------------------------------- |
| **WABA**  | WhatsApp Business Account — the account entity that owns phone numbers and templates         |
| **PSID**  | Page-Scoped ID — a user's unique ID within a specific Facebook Page (used in Messenger)      |
| **ASID**  | App-Scoped ID — a user's unique ID within a specific app (used in Graph API)                 |
| **EMQ**   | Event Match Quality — score (1-10) measuring how well CAPI events match to Facebook profiles |
| **CAPI**  | Conversions API — Meta's server-to-server event tracking solution                            |
| **VRC**   | Virtual Reality Check — Meta's technical requirements for Horizon Store submissions          |
| **MQDH**  | Meta Quest Developer Hub — desktop tool for Quest development workflow                       |
| **IWSDK** | Immersive Web SDK — JavaScript framework for WebXR development on Horizon OS                 |
| **ECS**   | Entity-Component-System — architecture pattern used by IWSDK                                 |
| **ATT**   | App Tracking Transparency — Apple's iOS framework requiring user consent for tracking        |
| **DMA**   | Digital Markets Act — EU regulation affecting Meta's data practices                          |
| **LDU**   | Limited Data Use — CCPA-compliant mode for restricting data processing for California users  |
| **MMP**   | Mobile Measurement Partner — third-party attribution tools (AppsFlyer, Adjust, etc.)         |
| **HMAC**  | Hash-based Message Authentication Code — used for webhook signature verification             |
| **RTMP**  | Real-Time Messaging Protocol — streaming protocol used for Live Video API                    |
| **OG**    | Open Graph — Meta's protocol for controlling how URLs appear when shared                     |

---

_End of Report_

---

**Compiled from:** Meta Developer Documentation, developers.facebook.com, developers.meta.com, business.whatsapp.com/developers, Meta Developer Blog, GDC 2026 session notes, AdExchanger, official API changelogs, and developer community resources.

**Last updated:** April 19, 2026

**Sources:**

- `developers.facebook.com/docs/` — Full documentation for Graph API, permissions, authentication, SDKs
- `developers.meta.com/horizon/` — Meta Horizon OS, Passthrough Camera API, Quest tools
- `developers.facebook.com/docs/whatsapp/` — WhatsApp Business Platform documentation
- `developers.facebook.com/docs/marketing-api/` — Marketing API and Ads Insights documentation
- `developers.facebook.com/docs/marketing-api/conversions-api/` — CAPI documentation
- `developers.meta.com/resources/blog/` — Developer news and changelogs
- `ppc.land` — Meta Pixel and CAPI updates (April 2026)
- `adexchanger.com` — Meta CAPI one-click setup announcement (April 2026)
