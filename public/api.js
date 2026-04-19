(function () {
  "use strict";

  function call(method, path, params, token) {
    return new Promise((resolve, reject) => {
      if (!window.FB) {
        reject(new Error("Facebook SDK not loaded"));
        return;
      }
      const p = Object.assign({}, params || {});
      if (token) p.access_token = token;
      FB.api(path, method, p, (res) => {
        if (!res || res.error) {
          reject(
            new Error(
              (res && res.error && res.error.message) || "Graph API error"
            )
          );
        } else {
          resolve(res);
        }
      });
    });
  }

  async function postFeed(pageId, pageToken, message, link) {
    const params = { message };
    if (link) params.link = link;
    return call("POST", "/" + pageId + "/feed", params, pageToken);
  }

  async function publishIgImage(igUserId, pageToken, imageUrl, caption) {
    const container = await call(
      "POST",
      "/" + igUserId + "/media",
      { image_url: imageUrl, caption: caption || "" },
      pageToken
    );
    if (!container.id) throw new Error("Failed to create IG media container");
    return call(
      "POST",
      "/" + igUserId + "/media_publish",
      { creation_id: container.id },
      pageToken
    );
  }

  async function pageFeed(pageId, pageToken, limit) {
    return call(
      "GET",
      "/" + pageId + "/feed",
      {
        fields:
          "id,message,created_time,permalink_url,full_picture,likes.summary(true),comments.summary(true),shares",
        limit: limit || 10,
      },
      pageToken
    );
  }

  async function igMedia(igUserId, pageToken, limit) {
    return call(
      "GET",
      "/" + igUserId + "/media",
      {
        fields:
          "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count",
        limit: limit || 10,
      },
      pageToken
    );
  }

  async function pageInsights(pageId, pageToken) {
    return call(
      "GET",
      "/" + pageId + "/insights",
      {
        metric:
          "page_impressions,page_post_engagements,page_fans,page_views_total",
        period: "day",
        date_preset: "last_7d",
      },
      pageToken
    );
  }

  async function igInsights(igUserId, pageToken) {
    return call(
      "GET",
      "/" + igUserId + "/insights",
      {
        metric: "impressions,reach,profile_views,follower_count",
        period: "day",
      },
      pageToken
    );
  }

  async function pageConversations(pageId, pageToken, platform) {
    return call(
      "GET",
      "/" + pageId + "/conversations",
      {
        platform: platform || "messenger",
        fields:
          "id,updated_time,snippet,unread_count,participants,messages.limit(1){message,from,created_time}",
        limit: 25,
      },
      pageToken
    );
  }

  window.SLApi = {
    call,
    postFeed,
    publishIgImage,
    pageFeed,
    igMedia,
    pageInsights,
    igInsights,
    pageConversations,
  };
})();
