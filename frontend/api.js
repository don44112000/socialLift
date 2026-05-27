(function () {
  "use strict";

  /* ==========================================================
     Demo / mock data for TikTok features.
     Replace with real API calls once credentials are available.
     ========================================================== */

  const DEMO_TIKTOK_PROFILE = {
    display_name: "YourBrand Official",
    username: "yourbrand",
    avatar_url: "https://api.dicebear.com/9.x/initials/svg?seed=YB&backgroundColor=8b5cf6",
    bio: "Official account for YourBrand. Products, tips & community 🚀",
    followers_count: 48200,
    following_count: 312,
    likes_count: 1340000,
    video_count: 87,
    is_verified: true,
  };

  const DEMO_TIKTOK_VIDEOS = [
    {
      id: "v001", title: "5 tips to boost your engagement",
      caption: "Here are 5 tips every small business needs to know 🔥 #smallbiz #tips #marketing",
      cover_url: "https://api.dicebear.com/9.x/shapes/svg?seed=tip1&backgroundColor=1a1a22",
      create_time: Date.now() / 1000 - 86400 * 2,
      share_url: "https://www.tiktok.com/@yourbrand/video/001",
      view_count: 124500, like_count: 8930, comment_count: 342, share_count: 1240,
    },
    {
      id: "v002", title: "Behind the scenes of our new product",
      caption: "The making of something special 👀 Stay tuned! #bts #newproduct",
      cover_url: "https://api.dicebear.com/9.x/shapes/svg?seed=bts2&backgroundColor=1a1a22",
      create_time: Date.now() / 1000 - 86400 * 5,
      share_url: "https://www.tiktok.com/@yourbrand/video/002",
      view_count: 89200, like_count: 5420, comment_count: 198, share_count: 876,
    },
    {
      id: "v003", title: "Customer spotlight: @happycustomer",
      caption: "Love seeing your stories! Thank you @happycustomer 💜 #community #customerspot",
      cover_url: "https://api.dicebear.com/9.x/shapes/svg?seed=cust3&backgroundColor=1a1a22",
      create_time: Date.now() / 1000 - 86400 * 8,
      share_url: "https://www.tiktok.com/@yourbrand/video/003",
      view_count: 67800, like_count: 4100, comment_count: 156, share_count: 540,
    },
    {
      id: "v004", title: "Quick tutorial: Getting started",
      caption: "New here? Here's everything you need to know in 60 seconds ⏱️ #tutorial #howto",
      cover_url: "https://api.dicebear.com/9.x/shapes/svg?seed=tut4&backgroundColor=1a1a22",
      create_time: Date.now() / 1000 - 86400 * 12,
      share_url: "https://www.tiktok.com/@yourbrand/video/004",
      view_count: 210300, like_count: 15600, comment_count: 890, share_count: 3200,
    },
  ];

  const DEMO_TIKTOK_COMMENTS = [
    {
      id: "c001", video_id: "v001",
      user: { username: "sarah_creates", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=sarah" },
      text: "This is so helpful! Tip #3 changed everything for my business 🙌",
      like_count: 42, create_time: Date.now() / 1000 - 3600 * 4, replied: false,
    },
    {
      id: "c002", video_id: "v001",
      user: { username: "mike_digital", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=mike" },
      text: "Can you do a deeper dive into the analytics part? Would love more details!",
      like_count: 18, create_time: Date.now() / 1000 - 3600 * 8, replied: true,
      reply: { text: "Great idea! We'll cover analytics in our next video 📊", time: Date.now() / 1000 - 3600 * 6 },
    },
    {
      id: "c003", video_id: "v001",
      user: { username: "jenny.biz", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=jenny" },
      text: "Shared with my entire team. Pure gold! 💛",
      like_count: 31, create_time: Date.now() / 1000 - 3600 * 12, replied: false,
    },
    {
      id: "c004", video_id: "v002",
      user: { username: "techie_tom", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=tom" },
      text: "The product looks amazing! When is the launch date?",
      like_count: 56, create_time: Date.now() / 1000 - 3600 * 20, replied: true,
      reply: { text: "Coming very soon! Follow us to be the first to know 🔔", time: Date.now() / 1000 - 3600 * 18 },
    },
    {
      id: "c005", video_id: "v002",
      user: { username: "lisa_shops", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=lisa" },
      text: "Take my money already! 😍 Where can I pre-order?",
      like_count: 23, create_time: Date.now() / 1000 - 3600 * 28, replied: false,
    },
    {
      id: "c006", video_id: "v003",
      user: { username: "happycustomer", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=happy" },
      text: "OMG thank you for featuring me!! 😭💜 Best brand ever!",
      like_count: 89, create_time: Date.now() / 1000 - 3600 * 36, replied: true,
      reply: { text: "You deserve it! We love our community 💜", time: Date.now() / 1000 - 3600 * 34 },
    },
  ];

  const DEMO_TIKTOK_MENTIONS = [
    {
      id: "m001", mention_type: "COMMENT",
      user: { username: "fashion_daily", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=fashion" },
      text: "Just tried @yourbrand and the quality is insane! Highly recommend 🔥",
      video_caption: "My top 5 favorite brands this month",
      share_url: "https://www.tiktok.com/@fashion_daily/video/m001",
      time: Date.now() / 1000 - 3600 * 2,
      view_count: 34500, like_count: 2100, comment_count: 89,
    },
    {
      id: "m002", mention_type: "VIDEO_MENTION",
      user: { username: "unbox_king", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=unbox" },
      text: "",
      video_caption: "Unboxing @yourbrand new collection — you won't believe what's inside!",
      share_url: "https://www.tiktok.com/@unbox_king/video/m002",
      time: Date.now() / 1000 - 3600 * 5,
      view_count: 89200, like_count: 6700, comment_count: 432,
    },
    {
      id: "m003", mention_type: "COMMENT",
      user: { username: "startup_coach", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=coach" },
      text: "@yourbrand is the best example of how to build community on TikTok 👏",
      video_caption: "Building a brand on TikTok in 2026",
      share_url: "https://www.tiktok.com/@startup_coach/video/m003",
      time: Date.now() / 1000 - 3600 * 14,
      view_count: 56100, like_count: 3800, comment_count: 201,
    },
    {
      id: "m004", mention_type: "VIDEO_MENTION",
      user: { username: "review_queen", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=queen" },
      text: "",
      video_caption: "Honest review of @yourbrand — is it worth the hype?",
      share_url: "https://www.tiktok.com/@review_queen/video/m004",
      time: Date.now() / 1000 - 3600 * 48,
      view_count: 121000, like_count: 9400, comment_count: 678,
    },
    {
      id: "m005", mention_type: "COMMENT",
      user: { username: "daily_deals", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=deals" },
      text: "Anyone else obsessed with @yourbrand? Just me? 😅",
      video_caption: "Things I bought this week that I love",
      share_url: "https://www.tiktok.com/@daily_deals/video/m005",
      time: Date.now() / 1000 - 3600 * 72,
      view_count: 18900, like_count: 1200, comment_count: 67,
    },
  ];

  const DEMO_TIKTOK_DMS = [
    {
      conversation_id: "dm001",
      user: { username: "interested_buyer", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=buyer", is_follower: true },
      last_message: "Do you ship internationally?",
      updated_at: Date.now() / 1000 - 600,
      unread_count: 2,
      messages: [
        { from: "interested_buyer", text: "Hi! I love your products 😍", time: Date.now() / 1000 - 7200 },
        { from: "yourbrand", text: "Thank you so much! How can we help you today?", time: Date.now() / 1000 - 6800 },
        { from: "interested_buyer", text: "Do you ship internationally?", time: Date.now() / 1000 - 600 },
        { from: "interested_buyer", text: "Specifically to Canada?", time: Date.now() / 1000 - 580 },
      ],
    },
    {
      conversation_id: "dm002",
      user: { username: "collab_request", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=collab", is_follower: true },
      last_message: "Would love to collaborate on a video!",
      updated_at: Date.now() / 1000 - 3600 * 3,
      unread_count: 1,
      messages: [
        { from: "collab_request", text: "Hey! I'm a creator with 50K followers and I'd love to collaborate on a video!", time: Date.now() / 1000 - 3600 * 3 },
      ],
    },
    {
      conversation_id: "dm003",
      user: { username: "happy_fan", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=fan", is_follower: true },
      last_message: "Thank you for the quick reply! 🙏",
      updated_at: Date.now() / 1000 - 3600 * 12,
      unread_count: 0,
      messages: [
        { from: "happy_fan", text: "Your latest video was amazing!", time: Date.now() / 1000 - 3600 * 14 },
        { from: "yourbrand", text: "Thanks so much! Means a lot to us 💜", time: Date.now() / 1000 - 3600 * 13 },
        { from: "happy_fan", text: "Thank you for the quick reply! 🙏", time: Date.now() / 1000 - 3600 * 12 },
      ],
    },
    {
      conversation_id: "dm004",
      user: { username: "support_question", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=support", is_follower: false },
      last_message: "Got it, thanks for the help!",
      updated_at: Date.now() / 1000 - 3600 * 24,
      unread_count: 0,
      messages: [
        { from: "support_question", text: "How do I track my order?", time: Date.now() / 1000 - 3600 * 26 },
        { from: "yourbrand", text: "You can track it at track.yourbrand.com with your order number!", time: Date.now() / 1000 - 3600 * 25 },
        { from: "support_question", text: "Got it, thanks for the help!", time: Date.now() / 1000 - 3600 * 24 },
      ],
    },
  ];

  const DEMO_TIKTOK_INSIGHTS = {
    video_views_7d: 512400,
    profile_views_7d: 8940,
    followers_gained_7d: 1240,
    avg_engagement_rate: 6.8,
    top_video_views: 210300,
    audience: { "18-24": 34, "25-34": 41, "35-44": 16, "45+": 9 },
    top_countries: [
      { country: "United States", pct: 42 },
      { country: "United Kingdom", pct: 18 },
      { country: "Canada", pct: 12 },
      { country: "Australia", pct: 8 },
    ],
  };

  /* ==========================================================
     TikTok API stubs — return demo data
     ========================================================== */
  function tiktokProfile()          { return Promise.resolve(DEMO_TIKTOK_PROFILE); }
  function tiktokStats()            { return Promise.resolve(DEMO_TIKTOK_PROFILE); }
  function tiktokVideos()           { return Promise.resolve(DEMO_TIKTOK_VIDEOS); }
  function tiktokComments(videoId)  {
    return Promise.resolve(DEMO_TIKTOK_COMMENTS.filter(c => !videoId || c.video_id === videoId));
  }
  function tiktokReplyComment(commentId, text) {
    return Promise.resolve({ success: true, comment_id: commentId, reply_text: text });
  }
  function tiktokMentions()         { return Promise.resolve(DEMO_TIKTOK_MENTIONS); }
  function tiktokCreatorInsights()  { return Promise.resolve(DEMO_TIKTOK_INSIGHTS); }
  function tiktokConversations()    { return Promise.resolve(DEMO_TIKTOK_DMS); }
  function tiktokSendMessage(convoId, text) {
    return Promise.resolve({ success: true, conversation_id: convoId, text: text });
  }
  function tiktokPublish(data)      { return Promise.resolve({ success: true, video_id: "new_" + Date.now() }); }

  /* ==========================================================
     Facebook / Meta Graph API helper (unchanged)
     ========================================================== */
  function fbCall(method, path, params, token) {
    return new Promise((resolve, reject) => {
      if (!window.FB) { reject(new Error("Facebook SDK not loaded")); return; }
      const p = Object.assign({}, params || {});
      if (token) p.access_token = token;
      FB.api(path, method, p, (res) => {
        if (!res || res.error) reject(new Error((res && res.error && res.error.message) || "Graph API error"));
        else resolve(res);
      });
    });
  }
  function postFeed(pageId, pageToken, message, link) {
    const params = { message }; if (link) params.link = link;
    return fbCall("POST", "/" + pageId + "/feed", params, pageToken);
  }
  function publishIgImage(igUserId, pageToken, imageUrl, caption) {
    return fbCall("POST", "/" + igUserId + "/media", { image_url: imageUrl, caption: caption || "" }, pageToken)
      .then(c => { if (!c.id) throw new Error("Failed to create IG container"); return fbCall("POST", "/" + igUserId + "/media_publish", { creation_id: c.id }, pageToken); });
  }
  function pageFeed(pageId, pageToken, limit) {
    return fbCall("GET", "/" + pageId + "/feed", { fields: "id,message,created_time,permalink_url,full_picture,likes.summary(true),comments.summary(true),shares", limit: limit || 10 }, pageToken);
  }
  function igMedia(igUserId, pageToken, limit) {
    return fbCall("GET", "/" + igUserId + "/media", { fields: "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count", limit: limit || 10 }, pageToken);
  }
  function pageInsights(pageId, pageToken) {
    return fbCall("GET", "/" + pageId + "/insights", { metric: "page_impressions,page_post_engagements,page_fans,page_views_total", period: "day", date_preset: "last_7d" }, pageToken);
  }
  function igInsights(igUserId, pageToken) {
    return fbCall("GET", "/" + igUserId + "/insights", { metric: "impressions,reach,profile_views,follower_count", period: "day" }, pageToken);
  }
  function pageConversations(pageId, pageToken, platform) {
    return fbCall("GET", "/" + pageId + "/conversations", { platform: platform || "messenger", fields: "id,updated_time,snippet,unread_count,participants,messages.limit(1){message,from,created_time}", limit: 25 }, pageToken);
  }

  /* ==========================================================
     Helpers
     ========================================================== */
  function relativeTime(ts) {
    const sec = Math.floor(Date.now() / 1000 - ts);
    if (sec < 60) return "just now";
    if (sec < 3600) return Math.floor(sec / 60) + "m ago";
    if (sec < 86400) return Math.floor(sec / 3600) + "h ago";
    if (sec < 604800) return Math.floor(sec / 86400) + "d ago";
    return new Date(ts * 1000).toLocaleDateString();
  }
  function formatCount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
  }

  /* ---------- Public API ---------- */
  window.SLApi = {
    /* Facebook / Meta */
    fbCall, postFeed, publishIgImage, pageFeed, igMedia,
    pageInsights, igInsights, pageConversations,
    /* TikTok (demo) */
    tiktokProfile, tiktokStats, tiktokVideos, tiktokComments,
    tiktokReplyComment, tiktokMentions, tiktokCreatorInsights,
    tiktokConversations, tiktokSendMessage, tiktokPublish,
    /* Helpers */
    relativeTime, formatCount,
  };
})();
