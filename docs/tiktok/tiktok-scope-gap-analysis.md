# Scope Gap Analysis — Onboarding Doc vs. TikTok's Full Scope List

## Summary

Your onboarding doc lists **11 scopes**. TikTok's official auth response example shows **21 scopes**. That's **10 missing** — but not all of them are relevant to SocialLift. After analysis, **5 should be added** and **5 can be skipped**.

---

## What Your Onboarding Doc Currently Requests (11)

| # | Scope | Purpose | Verdict |
|---|---|---|---|
| 1 | `user.info.basic` | Authenticated user identity | ✅ Keep |
| 2 | `user.info.profile` | Profile metadata (bio, display name, avatar) | ✅ Keep |
| 3 | `user.info.stats` | Follower count, following count, total likes | ✅ Keep |
| 4 | `message.list.read` | Read DM inbox | ✅ Keep |
| 5 | `message.list.manage` | Send DMs | ✅ Keep |
| 6 | `comment.list` | Read comments on owned posts | ✅ Keep |
| 7 | `comment.list.manage` | Reply / hide / delete comments | ✅ Keep |
| 8 | `video.list` | List owned videos | ✅ Keep |
| 9 | `video.publish` | Post content | ✅ Keep |
| 10 | `biz.brand.insights` | Mention monitoring + brand insights | ✅ Keep |
| 11 | `biz.creator.insights` | Creator analytics | ✅ Keep |

---

## Missing Scopes — Should Add (5)

| # | Scope | Why you need it | Impact if missing |
|---|---|---|---|
| 1 | **`user.account.type`** | Tells you if the connected account is a Business Account or Personal Account. SocialLift only works with Business Accounts — this scope lets you validate at OAuth time and reject Personal accounts gracefully. | You won't be able to detect/block personal accounts from connecting. |
| 2 | **`user.info.username`** | Returns the `username` (handle) of the TikTok account. Without it, you only get `display_name` and `open_id`. You need the handle to generate TikTok.me short links, display "@username" in your dashboard, and match webhook payloads to accounts. | Dashboard shows display names but not @handles. Can't generate TikTok.me links. |
| 3 | **`video.insights`** | Returns per-video analytics: views, likes, comments, shares, reach, impressions, watch time. `video.list` only gives you the video metadata and basic counts — `video.insights` unlocks the deeper analytics breakdown. | Your analytics dashboard will be shallow — only surface-level metrics. |
| 4 | **`user.insights`** | Returns account-level daily metrics: video views, profile views, follower growth, audience demographics (age, gender, country, city), engagement rate. Different from `user.info.stats` which only gives lifetime totals. | No daily trends, no audience demographics, no growth tracking in dashboard. |
| 5 | **`message.list.send`** | This appears as a separate scope from `message.list.manage` in TikTok's scope list. While `message.list.manage` may cover sending, TikTok's auth response explicitly lists both. Requesting it ensures you have explicit send permission. | Possible edge case where manage doesn't cover send in some flows. Safety net. |

---

## Missing Scopes — Can Skip (5)

| # | Scope | What it does | Why skip |
|---|---|---|---|
| 1 | `biz.spark.auth` | Authorize organic content as Spark Ads | SocialLift doesn't manage ad campaigns — this is for turning organic posts into paid ads |
| 2 | `tcm.order.update` | TikTok Creator Marketplace order management | SocialLift doesn't manage creator marketplace orders |
| 3 | `biz.ads.recommend` | Spark Ads recommendation — find high-performing content to boost | Ad-specific, not relevant to your automation use case |
| 4 | `biz.creator.info` | Creator information for marketplace | Marketplace-specific, not needed for business automation |
| 5 | `video.upload` | Upload video assets (separate from publish) | `video.publish` already covers the full publish flow; `video.upload` is for uploading raw assets to the creative library for ads |

---

## Recommended Updated Scope List (16 total)

```
user.info.basic
user.info.profile
user.info.stats
user.info.username          ← NEW
user.account.type           ← NEW
user.insights               ← NEW
video.list
video.publish
video.insights              ← NEW
comment.list
comment.list.manage
message.list.read
message.list.manage
message.list.send           ← NEW
biz.brand.insights
biz.creator.insights
```

---

## Impact on Onboarding Doc

The scopes table in [tiktok-developer-onboarding.md](file:///Users/NI013/Documents/Om%20Docs/depos/socialLift/docs/tiktok/tiktok-developer-onboarding.md#L122-L136) should be updated from 11 to 16 scopes.

> [!IMPORTANT]
> **Data minimization principle**: TikTok's DSPR explicitly requires you to *"only request access to API that is required to achieve your specific business purpose."* All 16 scopes above are justified by SocialLift's stated features (profile display, DM handling, comment management, content publishing, analytics dashboard, mention monitoring). The 5 you're skipping (Spark Ads, Creator Marketplace, ad recommendations) are genuinely not needed.

> [!TIP]
> You can always add more scopes later by going to **My Apps → App Detail → Scope of permission → Edit**. It triggers a 2-3 business day re-review. So it's fine to start with these 16 and add more if/when you need ad-related features.
