window.SOCIALLIFT_CONFIG = {
  /* ---------- Company ---------- */
  COMPANY_NAME: "SocialLift",
  CONTACT_EMAIL: "privacy@company.com",

  /* ---------- Facebook / Meta ---------- */
  FB_APP_ID: "REPLACE_WITH_YOUR_APP_ID",
  GRAPH_API_VERSION: "v25.0",
  FB_SCOPES: [
    "public_profile",
    "email",
    "pages_show_list",
    "pages_read_engagement",
    "pages_manage_posts",
    "pages_manage_metadata",
    "pages_messaging",
    "business_management",
    "instagram_basic",
    "instagram_content_publish",
    "instagram_manage_comments",
    "instagram_manage_messages",
    "instagram_manage_insights",
  ],

  /* ---------- TikTok ---------- */
  TIKTOK_CLIENT_KEY: "REPLACE_WITH_YOUR_CLIENT_KEY",
  TIKTOK_REDIRECT_URI: "https://app.sociallift.com/auth/tiktok/callback/",
  TIKTOK_SCOPES: [
    "user.info.basic",
    "user.info.profile",
    "user.info.stats",
    "message.list.read",
    "message.list.manage",
    "comment.list",
    "comment.list.manage",
    "video.list",
    "video.publish",
    "biz.brand.insights",
    "biz.creator.insights",
  ],

  /* ---------- Endpoints ---------- */
  BACKEND_TOKEN_ENDPOINT: "/api/store-tokens",
};
