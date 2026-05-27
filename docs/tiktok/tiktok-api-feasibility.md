# TikTok API Feasibility Study
**Project:** SocialLift — Business Automation Platform  
**Date:** 2026-05-24  
**Source:** TikTok Official Docs (`docs/tiktok/business-apis docs/` + `docs/tiktok/devportal-docs/`)

---

## Overview

TikTok exposes two separate developer portals:

| Portal | Path | Coverage |
|---|---|---|
| Business APIs | `docs/tiktok/business-apis docs/` (1,135 files) | Marketing API, Organic API, Business Messaging API, Ad campaigns, Reporting |
| Developer Portal | `docs/tiktok/devportal-docs/` (214 files) | Login Kit (OAuth2), Share Kit, Content Posting API, Display API, Research Tools, Minis |

---

## Platform Goal

Build a SaaS tool where businesses connect their TikTok account and get an autonomous agent that:
- Detects incoming interactions (tags, mentions, follows, DMs)
- Decides what to respond based on interaction context
- Handles full conversation flows autonomously
- (Future) Posts content from the tool itself

---

## Authentication & Login

**Status: Fully Supported**

- OAuth 2.0 flow for business accounts
- Token endpoint: `POST /tt_user/oauth2/token/`
- Refresh endpoint: `POST /tt_user/oauth2/refresh_token/`
- Access tokens expire in 24 hours; refresh tokens valid 1 year

**Key scopes needed for this platform:**

| Scope | Purpose |
|---|---|
| `message.list.manage` | Send and receive DMs |
| `message.list.read` | Read DM inbox and conversation history |
| `comment.list` | Read comments on owned posts + receive comment webhooks |
| `comment.list.manage` | Reply, hide, delete comments |
| `video.publish` | Post content from the tool |
| `video.list` | Read own post data |

---

## Webhooks — Complete Event List

TikTok supports **18 webhook event types** across all APIs.

### Relevant to this platform:

#### Mention & Comment Events

| Event | Trigger | Latency | Key Payload Fields |
|---|---|---|---|
| `brand.mention.event` (VIDEO_MENTION) | Someone tags business in a post caption | 2-3 hours | `video_id`, `video_caption`, `share_url`, `unique_identifier` of poster |
| `brand.mention.event` (COMMENT) | Someone tags business in a comment | 2-3 hours | `comment_id`, `video_id`, `video_caption`, `share_url`, `unique_identifier` of commenter |
| `comment.update` | Comment created/deleted/visibility changed on owned post | ~5 minutes | `comment_id`, `video_id`, `comment_type`, `comment_action`, `unique_identifier` |
| `im_receive_high_intent_comment` | High-purchase-intent comment on owned video | Real-time | `comment_id`, `comment_text`, `from_user`, `is_follower` ⚠️ Vietnam/Indonesia/Thailand only |

#### DM / Messaging Events

| Event | Trigger | Latency | Key Payload Fields |
|---|---|---|---|
| `im_receive_msg` | User sends a DM to the business (non-EU) | Real-time | `from`, `unique_identifier`, `conversation_id`, `message_id`, message content, `is_follower` |
| `im_receive_msg_eu` | User from EEA/Switzerland/UK sends a DM | Real-time | `to`, `timestamp` only (privacy-limited) |
| `im_referral_msg` | User enters DM from a Click-to-Message Ad or TikTok.me link | Real-time | `from`, `unique_identifier`, `referral.source`, ad metadata |
| `im_mark_read_msg` | User marks messages as read | Real-time | `conversation_id`, `last_read_timestamp` |
| `im_send_msg` | Business sends a message | Real-time | Full message payload |
| `im_auto_message_config_update` | Welcome/auto-reply config changed | ~5 minutes | `auto_message_type`, `auto_message_action` |
| `im_auto_message_audit_update` | Auto-reply approved/rejected by TikTok | ~5 minutes | `audit_status` (APPROVED/REJECTED) |

#### Post Publishing Events

| Event | Trigger |
|---|---|
| `post.publish.complete` | Upload succeeded |
| `post.publish.publicly_available` | Post passed moderation, now live |
| `post.publish.failed` | Upload failed (with machine-readable reason) |
| `post.publish.no_longer_publicly_available` | Post removed from public |

#### Platform Events

| Event | Trigger |
|---|---|
| `authorization.removed` | User disconnects their account from the app |

**Follow events: NO webhook exists.**

---

## Data Access — By Interaction Case

### Case 1: Someone Tags Business in a Comment
**Webhook:** `brand.mention.event` with `mention_type: COMMENT` (2-3hr delay)

| Data | Available | Source |
|---|---|---|
| Comment text | ✅ | Pull via `/v1.3/business/comment/list/` using `comment_id` |
| Commenter username | ✅ | Webhook payload + comment API |
| Commenter display name | ✅ | Comment API |
| Commenter profile picture | ✅ | Comment API (URL expires) |
| Post thumbnail where tagged | ✅ | `/v1.3/business/video/list/` using `video_id` |
| Post caption | ✅ | Webhook payload directly |
| Post engagement (likes, views, shares) | ✅ | `/v1.3/business/video/list/` |
| Commenter follower count | ❌ | No public user lookup API |
| Commenter bio | ❌ | No public user lookup API |
| Commenter verification status | ❌ | No public user lookup API |
| Actual video media file | ❌ | Not exposed via API |
| Reply to their comment publicly | ✅ | `/v1.3/business/comment/create/` |
| DM them | ❌ | Prohibited — they haven't messaged first |

---

### Case 2: Someone Tags Business in a Post/Video
**Webhook:** `brand.mention.event` with `mention_type: VIDEO_MENTION` (2-3hr delay)

| Data | Available | Source |
|---|---|---|
| Post caption mentioning business | ✅ | Webhook payload |
| Post share URL | ✅ | Webhook payload |
| Poster's username | ✅ | Webhook payload |
| Post thumbnail | ✅ | `/v1.3/business/video/list/` |
| Post engagement metrics | ✅ | `/v1.3/business/video/list/` |
| Poster's follower count / bio | ❌ | No public user lookup |
| Actual video file | ❌ | Not exposed via API |
| DM the poster | ❌ | Prohibited |
| Comment on their post | ❌ | Can only manage comments on own posts |

---

### Case 3: Someone DMs the Business First ⭐ Most Powerful Case
**Webhook:** `im_receive_msg` (real-time)

| Data | Available | Source |
|---|---|---|
| Full message content (text/image/video/sticker/emoji) | ✅ | Webhook payload |
| Sender username | ✅ | Webhook (`from` field) |
| Sender unique identifier | ✅ | Webhook |
| Whether sender follows the business | ✅ | `is_follower` field in webhook |
| Full conversation history | ✅ | `/business/message/list/` |
| Reply to them (unlimited back-and-forth) | ✅ | `/business/message/send/` |
| Sender follower count / bio | ❌ | No public user lookup |

**Once a user messages first, full autonomous conversation is completely unlocked with no message count restrictions (within 48hr activity windows).**

---

### Case 4: High-Intent Comment on Business's Own Video
**Webhook:** `im_receive_high_intent_comment` (real-time)
**⚠️ Geographic restriction: Businesses registered in Vietnam, Indonesia, or Thailand only**

| Data | Available | Source |
|---|---|---|
| Comment text | ✅ | Webhook payload |
| Commenter username | ✅ | Webhook |
| Whether commenter follows the business | ✅ | `is_follower` in webhook |
| **Initiate a DM to them** | ✅ | `/business/message/send/` with `direct_reply` + `comment_id` |

This is the **only TikTok-sanctioned way to initiate an outbound DM** from a comment interaction.

---

### Case 5: Someone Follows the Business
**Webhook:** ❌ Does not exist  
**Polling endpoint for follower list:** ❌ Not available in Business API  
**DM new followers:** ❌ Prohibited

No programmatic action possible at follow time.

---

## Business Messaging — Rules & Limits

### The Core Restriction
> TikTok explicitly prohibits initiating a conversation or messaging any user who has not started a conversation with you first.

### Messaging Windows (for non-mutual-follow conversations)

| Situation | Limit |
|---|---|
| Within 48hrs of user's first message | Up to 10 messages from business |
| User replies — active conversation | Unlimited messages for 48hrs after last user reply |
| User inactive 48+ hours | Max 3 messages until user responds again |

---

## Content Posting API

**Status: Fully Supported**

- Endpoint: `POST /v2/post/publish/video/init/`
- Modes: `FILE_UPLOAD` or `PULL_FROM_URL`
- Supports: privacy settings, disable comments/duets/stitches, video cover timestamp
- Photo posts also supported via `/v2/post/publish/content/init/`
- Requires `video.publish` scope and app approval
- Posts from unaudited apps restricted to private until audit completes

---

## Rate Limits

| Tier | Requests/sec | Requests/min | Requests/day |
|---|---|---|---|
| Basic (default) | 10 | 600 | 864,000 |
| Advanced | 20 | 1,200 | 1,728,000 |
| Premium | 30 | 1,800 | 2,592,000 |
| Ultimate | 50 | 3,000 | 4,320,000 |

---

## TikTok-Native Workarounds & Funnels

These are creative ways to use ONLY TikTok's official APIs/webhooks to bridge the gaps (no third-party tools).

### 1. TikTok.me Short Links → DM Funnel
- Business creates TikTok.me short links with a `ref` parameter and a `prefilled_message`
- Place link in bio, post captions, or as a comment reply when someone tags business
- User clicks → lands in DM with the prefilled message → `im_referral_msg` webhook fires (source: `short_link`)
- Now the DM channel is "open" — full conversation handling unlocked
- **Caveat:** prefilled messages undergo TikTok audit (`prefilled_message_audit_status`: PASS/REJECT)

### 2. Click-to-Message (CTM) Ads
- Promotion type: `LEAD_GEN_CLICK_TO_TT_DIRECT_MESSAGE`
- User clicks "Send message" on ad → enters DM → `im_referral_msg` webhook fires (source: `ad`)
- Payload includes `ad_id`, `advertiser_id`, `message_material_id`, `embed_url`
- Available regions: APAC + LATAM only
- Welcome message attachable via `auto_message_id`

### 3. Lead Generation Ads with Instant Forms
- Pre-filled forms capture **name, email, phone** directly from TikTok user profile
- Retrieve via `/page/lead/task/` and `/page/lead/task/download/`
- Real-time webhook delivery available
- This is the **only way to get user PII (email/phone)** from TikTok

### 4. Welcome Message + Q&A Templates (Guided Conversations)
- `/business/message/auto_message/create/` to configure:
  - **Welcome Messages** (250 chars) — fire when user starts first DM
  - **Suggested Questions** (up to 3, 80/200 char limits) — preset FAQ buttons
  - **Chat Prompts** (up to 6, 18 char buttons) — interactive buttons above input
- User clicks → auto-generates question into conversation → triggers preset response

### 5. Template Messages in DM Replies
- `QA_BUTTON_CARD` or `QA_LINK_CARD` in DM replies
- Up to 3 buttons/links per card — users click to send predefined replies
- Builds a guided choose-your-own-path conversation flow

### 6. Comment Reply with Image
- `/business/comment/reply/create/` supports either text OR image (not both)
- Image upload via `/business/comment/image/upload/`
- **No link support in comment text** — links must go through bio or TikTok.me redirects

### 7. Comment-to-Message (Comment → DM Initiation)
- Only legitimate way to initiate a DM from a comment
- ⚠️ **Vietnam, Indonesia, Thailand only**
- Triggered by `im_receive_high_intent_comment` webhook
- Strict conditions: 48hr window, no prior DM history, commenter 18+, never replied via DM before
- API: `/business/message/send/` with `direct_reply` + `comment_id`

### 8. Mention Monitoring (Brand Insights)
- Scope: `biz.brand.insights`
- Endpoints: `/mention/get/`, `/mention/content/get/`, `/mention/keywords/`, `/mention/hashtags/`
- Returns top 1000 mentioned posts for brand
- Webhook: `mention_publish` for real-time alerts

### 9. Passive Follower Detection
- No bulk follower list endpoint exists
- `is_follower: true/false` field appears in `im_receive_msg` and `im_receive_high_intent_comment` webhooks
- Build follower database passively over time as users interact
- Cannot get unsolicited follower list

### What's STILL Not Possible (Even With Workarounds)

- ❌ Bulk follower list (usernames of who follows you)
- ❌ Public user profile lookup (bio, follower count of any random user)
- ❌ Webhook on follow event itself
- ❌ Initiating DMs to taggers/mentioners outside the regional Comment-to-Message exception
- ❌ Initiating DMs to new followers
- ❌ Access to the actual video file when someone tags business in a post (only thumbnail)

### Ruled Out: External Workarounds
- **Third-party scrapers (Apify, etc.)** — violate TikTok ToS, risk app shutdown
- **TikTok Research API** — academic/non-profit only, commercial use blocked
- **TikTok Display API** — only authenticated user's own data, can't query arbitrary users

---

## What Can Be Built — Realistic Scope

### Core Automation Flow

```
Tag in comment (2-3hr delay)
  → webhook received
  → pull: comment text, username, profile pic, post thumbnail, engagement
  → AI generates context-aware comment reply
  → post reply publicly via /business/comment/create/
  → log interaction in CRM

DM received (real-time)
  → webhook received
  → context: message content, username, is_follower, conversation history
  → AI decides reply
  → send DM via /business/message/send/
  → handle full back-and-forth autonomously
```

### Feature Matrix

| Feature | Feasibility |
|---|---|
| Business OAuth login | ✅ Fully supported |
| Auto-reply to comments where business is tagged | ✅ Fully supported |
| Auto-reply to mentions in posts (comment on post) | ❌ Can only manage own post comments |
| Autonomous DM handling (user-initiated) | ✅ Fully supported |
| Real-time DM inbox with AI replies | ✅ Fully supported |
| Auto-DM when someone tags in comment | ❌ Prohibited |
| Auto-DM when someone tags in post | ❌ Prohibited |
| Auto-DM new followers | ❌ No webhook + prohibited |
| High-intent comment → initiate DM | ✅ Vietnam/Indonesia/Thailand only |
| Schedule and post content | ✅ Fully supported |
| Unified inbox (comments + DMs) | ✅ Fully buildable |
| Engagement analytics | ✅ Via /business/video/list/ metrics |
| Enriched user profiles (bio, follower count) | ❌ No public user lookup API |

---

## Recommended Architecture

1. **Entry point:** TikTok OAuth login per business account
2. **Webhook server:** Subscribe to `brand.mention.event`, `comment.update`, `im_receive_msg`, `im_receive_msg_eu`
3. **Comment agent:** On tag webhook → pull context → AI reply → post comment
4. **DM agent:** On message webhook → load conversation history → AI reply → send DM
5. **Content scheduler:** Business queues posts → publish via Content Posting API
6. **Dashboard:** Unified view of all interactions, conversation threads, post performance

---

*Study based on complete local mirror of TikTok official documentation as of May 2026.*
