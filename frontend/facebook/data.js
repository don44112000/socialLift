(function () {
  "use strict";

  const RESTAURANT = {
    name: "Bombay Spice Kitchen",
    shortName: "Bombay Spice",
    plan: "Premium Plan",
    logo: "https://api.dicebear.com/9.x/initials/svg?seed=BSK&backgroundColor=0f766e",
    location: "Bandra West, Mumbai",
  };

  const MANAGER = {
    name: "Rajesh Kumar",
    role: "Manager",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Rajesh&backgroundColor=e5eeff",
  };

  const DEMO_PAGES = [
    {
      id: "page_bsk_fb",
      name: "Bombay Spice Kitchen",
      category: "Indian Restaurant",
      platform: "facebook",
      followers: 12400,
      access_token: "demo_page_token",
      instagram_business_account: {
        id: "ig_bsk",
        username: "bombayspicekitchen",
        followers: 18700,
      },
    },
    {
      id: "page_bsk_events",
      name: "Bombay Spice — Events",
      category: "Event Venue",
      platform: "facebook",
      followers: 3200,
      access_token: "demo_page_token_2",
      instagram_business_account: null,
    },
  ];

  const DEMO_USER = {
    id: "fb_demo_user_1",
    name: MANAGER.name,
    email: "rajesh@bombayspicekitchen.in",
    picture: { data: { url: MANAGER.avatar } },
    userAccessToken: "demo_user_token",
  };

  const METRICS = {
    mentions: { value: 247, delta: "+12%" },
    cashback: { value: "₹14,250", sub: "₹1.2k today" },
    activeDiners: { value: 89, delta: "Live" },
    pendingRewards: { value: 12, delta: "3 urgent" },
  };

  const ACTIVITY_TABLE = [
    { name: "Priya Sharma", activity: "Tagged you in a Story", reward: "₹50 cashback", rewardClass: "bg-green-100 text-green-800", time: "2 mins ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya" },
    { name: "Arjun Singh", activity: "Posted a review on Google", reward: "Free Dessert", rewardClass: "bg-blue-100 text-blue-800", time: "15 mins ago", initials: "AS" },
    { name: "Vikram Mehta", activity: "Shared your post to Facebook", reward: "₹25 cashback", rewardClass: "bg-green-100 text-green-800", time: "42 mins ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram" },
    { name: "Ananya Rao", activity: "Mentioned in a Reel", reward: "Awaiting Verification", rewardClass: "bg-yellow-100 text-yellow-800", time: "1 hour ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya" },
    { name: "Rahul Kapoor", activity: "Tagged in a static post", reward: "₹40 cashback", rewardClass: "bg-green-100 text-green-800", time: "2 hours ago", initials: "RK" },
    { name: "Sneha Gupta", activity: "Uploaded bill and story", reward: "₹120 cashback", rewardClass: "bg-green-100 text-green-800", time: "3 hours ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha" },
  ];

  const ACTIVITY = [
    { id: "a1", type: "mention", text: "@priya.sharma tagged Bombay Spice in a Reel", time: Date.now() / 1000 - 900, platform: "instagram" },
    { id: "a2", type: "cashback", text: "₹150 cashback issued to Ananya Patel", time: Date.now() / 1000 - 3600, platform: "system" },
    { id: "a3", type: "comment", text: "New comment on weekend brunch post", time: Date.now() / 1000 - 7200, platform: "facebook" },
    { id: "a4", type: "dm", text: "DM from Vikram Mehta — table booking inquiry", time: Date.now() / 1000 - 10800, platform: "messenger" },
    { id: "a5", type: "mention", text: "@foodie_mumbai mentioned you in a Story", time: Date.now() / 1000 - 86400, platform: "instagram" },
    { id: "a6", type: "cashback", text: "₹200 cashback issued to Rohan Desai", time: Date.now() / 1000 - 172800, platform: "system" },
  ];

  const ACTIVITY_LOG = [
    {
      id: "al1",
      type: "mention",
      icon: "share",
      iconWrap: "bg-blue-100 text-blue-600",
      customerName: "Arjun Singh",
      description: "tagged Bombay Spice Kitchen in an Instagram Story",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun",
      status: "₹50 Cashback credited",
      statusClass: "bg-green-50 text-green-700 border-green-100",
      action: "View Post",
      time: Date.now() / 1000 - 120,
    },
    {
      id: "al2",
      type: "system",
      icon: "settings_suggest",
      iconWrap: "bg-orange-100 text-orange-600",
      customerName: "System",
      description: "Monthly analytics report for August is now ready",
      systemAvatar: true,
      status: "Ready for Review",
      statusClass: "bg-blue-50 text-blue-700 border-blue-100",
      action: "Open Report",
      time: Date.now() / 1000 - 900,
    },
    {
      id: "al3",
      type: "cashback",
      icon: "currency_rupee",
      iconWrap: "bg-emerald-100 text-emerald-600",
      customerName: "Priya Kapoor",
      description: "redeemed a loyalty voucher at Bandra West outlet",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=PriyaK",
      status: "₹250 Discount applied",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
      action: "Receipt Details",
      time: Date.now() / 1000 - 2520,
    },
    {
      id: "al4",
      type: "account",
      icon: "person_add",
      iconWrap: "bg-purple-100 text-purple-600",
      customerName: "Rahul Khanna",
      description: "joined the Platinum tier loyalty programme",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=RahulK",
      status: "New VIP Member",
      statusClass: "bg-purple-50 text-purple-700 border-purple-100",
      action: "View Profile",
      time: Date.now() / 1000 - 3600,
    },
    {
      id: "al5",
      type: "comment",
      icon: "forum",
      iconWrap: "bg-blue-100 text-blue-600",
      customerName: "Sara D'Souza",
      description: "left a 5-star review on your weekend brunch post",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sara",
      status: "Excellent Rating",
      statusClass: "bg-yellow-50 text-yellow-700 border-yellow-100",
      action: "Respond",
      time: Date.now() / 1000 - 7200,
    },
    {
      id: "al6",
      type: "dm",
      icon: "mail",
      iconWrap: "bg-surface-container text-on-surface-variant",
      customerName: "Vikram Mehta",
      description: "asked about table booking for 4 on Saturday 8pm",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram",
      status: "Awaiting reply",
      statusClass: "bg-amber-50 text-amber-800 border-amber-100",
      action: "Open Inbox",
      time: Date.now() / 1000 - 10800,
    },
    {
      id: "al7",
      type: "mention",
      icon: "photo_camera",
      iconWrap: "bg-pink-100 text-pink-600",
      customerName: "Ananya Patel",
      description: "mentioned @bombayspicekitchen in a Sunday family lunch Reel",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya",
      status: "₹150 Cashback pending",
      statusClass: "bg-yellow-50 text-yellow-700 border-yellow-100",
      action: "Verify mention",
      time: Date.now() / 1000 - 86400,
    },
    {
      id: "al8",
      type: "cashback",
      icon: "payments",
      iconWrap: "bg-emerald-100 text-emerald-600",
      customerName: "Rohan Desai",
      description: "cashback approved for Facebook post share",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rohan",
      status: "₹200 Cashback credited",
      statusClass: "bg-green-50 text-green-700 border-green-100",
      action: "View details",
      time: Date.now() / 1000 - 172800,
    },
  ];

  const ACTIVITY_STATS = {
    total: 1284,
    totalDelta: "12% from yesterday",
    newMentions: 42,
    mentionsDelta: "8 new since login",
    cashbackDisbursed: "₹8,450",
    cashbackNote: "Daily budget: 82%",
    systemHealth: "Optimal",
    healthNote: "All nodes active",
  };

  const MENTIONS = [
    {
      id: "m1",
      platform: "instagram",
      type: "STORY",
      user: { name: "Priya Sharma", handle: "priya.sharma", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya" },
      text: "Best butter chicken in Mumbai! @bombayspicekitchen 🍛",
      media: "Weekend brunch spread",
      likes: 342,
      comments: 28,
      reach: 4200,
      eligible: true,
      time: Date.now() / 1000 - 3600,
    },
    {
      id: "m2",
      platform: "facebook",
      type: "POST",
      user: { name: "Vikram Mehta", handle: "vikram.mehta", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram" },
      text: "Celebrated my anniversary at Bombay Spice Kitchen. Impeccable service!",
      media: "Anniversary dinner",
      likes: 89,
      comments: 12,
      reach: 1800,
      eligible: true,
      time: Date.now() / 1000 - 14400,
    },
    {
      id: "m3",
      platform: "instagram",
      type: "REEL",
      user: { name: "Foodie Mumbai", handle: "foodie_mumbai", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Foodie" },
      text: "",
      media: "Top 5 Bandra restaurants — #3 is a hidden gem",
      likes: 2100,
      comments: 156,
      reach: 45000,
      eligible: false,
      time: Date.now() / 1000 - 86400,
    },
    {
      id: "m4",
      platform: "instagram",
      type: "POST",
      user: { name: "Ananya Patel", handle: "ananya.patel", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya" },
      text: "Sunday family lunch done right ✨ @bombayspicekitchen",
      media: "Family thali photo",
      likes: 156,
      comments: 9,
      reach: 2900,
      eligible: true,
      time: Date.now() / 1000 - 172800,
    },
  ];

  const POSTS = [
    { id: "p1", title: "Weekend brunch — book your table", platform: "facebook", comments: 24 },
    { id: "p2", title: "New seasonal menu launch", platform: "instagram", comments: 18 },
    { id: "p3", title: "Diwali special thali preview", platform: "facebook", comments: 31 },
  ];

  const COMMENTS = [
    {
      id: "c1",
      post_id: "p1",
      user: { name: "Sneha Reddy", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha" },
      text: "Is the brunch buffet still ₹899 per person?",
      likes: 5,
      time: Date.now() / 1000 - 1800,
      replied: false,
      platform: "facebook",
    },
    {
      id: "c2",
      post_id: "p1",
      user: { name: "Arjun Nair", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun" },
      text: "We came last Sunday — absolutely worth it!",
      likes: 12,
      time: Date.now() / 1000 - 7200,
      replied: true,
      reply: { text: "Thank you Arjun! We're glad you enjoyed it. See you again soon 🙏", time: Date.now() / 1000 - 6000 },
      platform: "facebook",
    },
    {
      id: "c3",
      post_id: "p2",
      user: { name: "Meera Iyer", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Meera" },
      text: "Do you have Jain options on the new menu?",
      likes: 3,
      time: Date.now() / 1000 - 3600,
      replied: false,
      platform: "instagram",
    },
  ];

  const CONVERSATIONS = [
    {
      id: "dm1",
      platform: "messenger",
      user: { name: "Vikram Mehta", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram" },
      last_message: "Table for 4 this Saturday 8pm?",
      updated_at: Date.now() / 1000 - 600,
      unread_count: 2,
      messages: [
        { from: "them", text: "Hi, I'd like to book a table for 4.", time: Date.now() / 1000 - 3600 },
        { from: "us", text: "Namaste! We'd love to host you. Which date and time?", time: Date.now() / 1000 - 3400 },
        { from: "them", text: "Table for 4 this Saturday 8pm?", time: Date.now() / 1000 - 600 },
      ],
    },
    {
      id: "dm2",
      platform: "instagram",
      user: { name: "Priya Sharma", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya" },
      last_message: "Thank you for the cashback! 🙏",
      updated_at: Date.now() / 1000 - 7200,
      unread_count: 0,
      messages: [
        { from: "them", text: "I posted about my visit — how do I claim cashback?", time: Date.now() / 1000 - 14400 },
        { from: "us", text: "We've approved your post! ₹150 cashback will reflect in 24 hrs.", time: Date.now() / 1000 - 12000 },
        { from: "them", text: "Thank you for the cashback! 🙏", time: Date.now() / 1000 - 7200 },
      ],
    },
  ];

  const ANALYTICS = {
    reach_7d: 128400,
    engagement_7d: 6.2,
    mentions_7d: 247,
    cashback_7d: 14250,
    chart_weekly: [42, 58, 51, 72, 65, 80, 89],
    top_cities: [
      { city: "Mumbai", pct: 68 },
      { city: "Pune", pct: 14 },
      { city: "Thane", pct: 10 },
      { city: "Other", pct: 8 },
    ],
    platform_split: { facebook: 38, instagram: 62 },
  };

  function createDemoSession() {
    return {
      user: DEMO_USER,
      pages: DEMO_PAGES,
      restaurant: RESTAURANT,
      manager: MANAGER,
      platforms: ["facebook", "instagram"],
      grantedAt: new Date().toISOString(),
      demo: true,
    };
  }

  function relativeTime(ts) {
    const sec = Math.floor(Date.now() / 1000 - ts);
    if (sec < 60) return "just now";
    if (sec < 3600) return Math.floor(sec / 60) + "m ago";
    if (sec < 86400) return Math.floor(sec / 3600) + "h ago";
    if (sec < 604800) return Math.floor(sec / 86400) + "d ago";
    return new Date(ts * 1000).toLocaleDateString("en-IN");
  }

  function formatCount(n) {
    if (typeof n === "string") return n;
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
  }

  function formatInr(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function getActivityTable() {
    return Promise.resolve(
      ACTIVITY_TABLE.map((row) => {
        let avatarHtml;
        if (row.avatar) {
          avatarHtml = '<img class="w-8 h-8 rounded-full object-cover" src="' + row.avatar + '" alt="">';
        } else {
          avatarHtml =
            '<div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">' +
            row.initials +
            "</div>";
        }
        return {
          name: row.name,
          activity: row.activity,
          time: row.time,
          avatarHtml,
          rewardHtml:
            '<span class="px-3 py-1 ' + row.rewardClass + ' rounded-full text-[11px] font-bold">' + row.reward + "</span>",
        };
      })
    );
  }

  window.FBData = {
    RESTAURANT,
    MANAGER,
    METRICS,
    createDemoSession,
    getMetrics: () => Promise.resolve(METRICS),
    getActivity: () => Promise.resolve(ACTIVITY),
    getActivityLog: (type) => {
      const list =
        !type || type === "all"
          ? ACTIVITY_LOG
          : ACTIVITY_LOG.filter((a) => a.type === type);
      return Promise.resolve(list);
    },
    getActivityStats: () => Promise.resolve(ACTIVITY_STATS),
    getActivityTable,
    getMentions: () => Promise.resolve(MENTIONS),
    getPosts: () => Promise.resolve(POSTS),
    getComments: (postId) =>
      Promise.resolve(COMMENTS.filter((c) => !postId || c.post_id === postId)),
    replyComment: (id, text) => Promise.resolve({ success: true, id, text }),
    getConversations: () => Promise.resolve(CONVERSATIONS),
    sendMessage: (id, text) => Promise.resolve({ success: true, id, text }),
    getAnalytics: () => Promise.resolve(ANALYTICS),
    getAccounts: () => Promise.resolve(DEMO_PAGES),
    relativeTime,
    formatCount,
    formatInr,
  };
})();
