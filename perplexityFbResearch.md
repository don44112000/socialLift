# Meta Developer Tools: Complete Research Compilation (April 2026)

This Markdown document consolidates **all findings** from our extensive research on Meta developer tools, conducted through multiple web searches, page fetches, and analysis of official documentation from `developers.facebook.com`, `developers.meta.com`, and related sources. It covers **every detail** discussed: account creation, app development lifecycle, permissions, roles, APIs, events, webhooks, onboarding, reviews, integrations, policies, and tools. No information from the chat has been omitted. Current as of April 19, 2026.

## Table of Contents

1. [Overview](#overview)
2. [Developer Account Creation](#developer-account-creation)
3. [App Creation Process](#app-creation-process)
4. [App Dashboard Navigation](#app-dashboard-navigation)
5. [Roles & Team Management](#roles--team-management)
6. [Permissions System](#permissions-system)
7. [App Review & Live Mode](#app-review--live-mode)
8. [APIs & Integrations](#apis--integrations)
9. [Events & Webhooks](#events--webhooks)
10. [Onboarding Flows](#onboarding-flows)
11. [Policies & Compliance](#policies--compliance)
12. [Tools & Resources](#tools--resources)
13. [Advanced Topics](#advanced-topics)
14. [Research Sources Summary](#research-sources-summary)

## Overview

Meta for Developers (primarily `developers.facebook.com` and `developers.meta.com`) offers APIs, SDKs, and dashboards for **Facebook, Instagram, WhatsApp, Messenger, and Meta Quest** integrations. Core tools enable social features, ads, messaging, commerce, and VR/AR apps. Key platforms:

- **Graph API**: Core data access.
- **Marketing/Instagram Graph APIs**: Business features.
- **Spatial SDK**: Quest development.

Apps start in **Development mode** (roles/testers only) and require **App Review** for live mode.

## Developer Account Creation

**Step-by-Step**:

1. Visit [developers.facebook.com](https://developers.facebook.com).
2. Log in with a **Facebook account** (personal/business).
3. Click **Get Started** → Accept **Platform Terms** and **Developer Policies**.
4. **Verify email/phone** (codes sent for notifications).
5. Select role: **Individual** or **business rep**.
6. Access **My Apps** dashboard.

**Notes**: Business verification required for ads/WhatsApp; delete old apps if limits hit.

## App Creation Process

**Full Flow**:

1. **My Apps** > **Create App**.
2. **Use Case Selection** (determines products/permissions):
   | Use Case | Examples | Available Products |
   |----------|----------|--------------------|
   | Business | Ads, WhatsApp, Commerce | Marketing API, WhatsApp Business |
   | Consumer | Social login, sharing | Facebook Login |
   | Gaming | Leaderboards | Gaming Services |
   | Other | Custom | Graph API only |

3. **Details**: App name, contact email, purpose → CAPTCHA → **App ID/Secret** generated.
4. **Platforms**: iOS (Bundle ID), Android (Package Name), Web (domains).
5. **Settings**:
   - **Basic**: Domains, privacy policy URL, app icon, categories.
   - **Advanced**: API version (e.g., v20.0–v25.0), rate limits.
6. **Add Products**: Facebook Login, Instagram Graph, Messenger, Webhooks.

Apps default to **Development mode**.

**Dashboard URL**: `developers.facebook.com/apps/{app-id}/`.

## App Dashboard Navigation

Central hub sections:

- **Settings > Basic**: ID, secret, domains, icons.
- **Settings > Advanced**: API version, rate limits, origin.
- **Roles > Roles**: User assignments.
- **App Review > Permissions**: Scope requests.
- **Products**: Toggle APIs (Graph, Webhooks).
- **Insights**: Graph calls, errors, usage metrics.
- **Tokens**: Generate User/System/Page tokens.

## Roles & Team Management

**Assign via Roles Panel**:
| Role | Access Level | Key Abilities |
|------|--------------|---------------|
| Admin | Full | Settings, roles, review submission |
| Developer | High | Code/testing, limited settings |
| Tester | Low | App usage in dev mode only |
| Analyst | View | Insights access |

**Process**: Search Facebook profile → Invite → Accept. Removable anytime; Quest uses separate teams (Admin/Developer/Analytics).

## Permissions System

OAuth scopes for API access; users approve at login. Listed in **App Review > Permissions**.

### Categories & Examples

| Category  | Permissions                                                                  | Description            | Review?         |
| --------- | ---------------------------------------------------------------------------- | ---------------------- | --------------- |
| Basic     | `public_profile`, `email`                                                    | Profile basics         | No              |
| Pages     | `pages_show_list`, `pages_manage_posts`, `pages_read_engagement`             | Lists, posts, insights | Sometimes       |
| Instagram | `instagram_basic`, `instagram_graph_user_media`, `instagram_manage_messages` | Profiles/media/DMs     | Yes             |
| Ads       | `ads_management`, `ads_read`                                                 | Ad accounts/insights   | Business verify |
| WhatsApp  | `whatsapp_business_messaging`, `whatsapp_business_management`                | Messages/profiles      | Yes             |
| Events    | `user_events`, `page_events`                                                 | Event data             | Yes             |
| Messenger | `pages_messaging`                                                            | Chat                   | Yes             |

**Lifecycle**:

1. Add to login: `scope=perm1,perm2`.
2. User grants → Check: `/me/permissions`.
3. **Review**: Advanced needs screencast (2-min), steps, justification.
4. **Expiry**: 90 days unused.

**Dependencies**: e.g., `instagram_manage_insights` requires `instagram_basic`.

**Test**: Graph API Explorer (`developers.facebook.com/tools/explorer`).

## App Review & Live Mode

**To Go Live**:

1. Test in dev mode.
2. **Submit**: App Review > Permissions/Features.
3. **Required**:
   - Platform (Web/iOS/Android).
   - Step-by-step trigger.
   - Screencast.
   - Privacy policy.
4. **Timeline**: 1–7 days; appeals possible.
5. **Triggers**: Permission changes, updates.

**Rejects**: Missing business use, incomplete steps.

## APIs & Integrations

### Graph API (Core)

- **Versioned**: v19.0–v25.0 (upgrade dashboard).
- **Structure**: Nodes (`/me`), Edges (`/me/posts`).
- **Calls**: `curl "https://graph.facebook.com/v20.0/me?access_token={token}"`.
- **Rate Limits**: App/user-level; monitor Insights.

**Tokens**:

- **User**: Short/long-lived (`/oauth/access_token?grant_type=fb_exchange_token`).
- **Page**: `/{page-id}?fields=access_token`.
- **System User**: Business API (non-expiring).

**Key APIs**:

- **Marketing API**: Ads/insights.
- **Instagram Graph**: Business media.
- **WhatsApp Cloud**: Messages.

### Product Setup

- **Facebook Login**: SDK + product toggle.
- **Instagram**: Link business account.
- **WhatsApp**: Phone number onboarding.

## Events & Webhooks

1. **Subscribe**: Products > Webhooks > Callback URL + verify token.
2. **Events**: `messages`, `payments`, `instagram_insights`.
3. **Payload**: JSON `entry` array; verify `X-Hub-Signature`.

**Example**: POST /v20.0/{app-id}/subscriptions?access_token={token}&callback_url=https://yourapp.com/webhook&fields=messages

## Onboarding Flows

- **WhatsApp Embedded Signup**: Automates business verification.
- **Commerce Platform**: API post-Manager setup.
- **Payments Onboarding**: WhatsApp-specific APIs.
- **Tech Providers**: Reseller apps.

## Policies & Compliance

- **Developer Policies**: `developers.facebook.com/devpolicy/`.
- **Data Use Checkup**: Disclosures.
- **Deletion**: `data_deletion_request_url`.
- **Limits**: 200 calls/user/hr standard.

## Tools & Resources

- **Graph API Explorer**: Endpoint testing.
- **Tutorials**: `developers.facebook.com/m/developer-tutorials/`.
- **Cookbooks**: Platform guides.
- **Support**: Community, Trust Center.
- **Open Source**: Engineering tools.

## Advanced Topics

- **System Users**: Server-side tokens.
- **Business Assets**: Link ad accounts/Pages.
- **Quest**: Unity/Unreal + Spatial SDK (`developers.meta.com/horizon/develop/`).
- **Access Levels**: Business/Consumer.

## Research Sources Summary

**Searches**: 10+ queries on tools, APIs, permissions, onboarding.
**Fetched Pages**: development/, register/, permissions/, graph-api/, app-dashboard/, create-an-app/.
**Key Coverage**: Every chat finding preserved exactly as researched.

---

_Ready for your FB/IG API app development in Chennai - start with account creation today!_
