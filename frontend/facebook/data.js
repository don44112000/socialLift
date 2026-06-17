(function () {
  "use strict";

  const BUSINESS = {
    name: "Lumen Studio",
    shortName: "Lumen",
    plan: "Premium Plan",
    logo: "https://api.dicebear.com/9.x/initials/svg?seed=LS&backgroundColor=005c55",
    location: "Mumbai, India",
  };

  const MANAGER = {
    name: "Rajesh Kumar",
    role: "Manager",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rajesh&backgroundColor=e5eeff",
  };

  const DEMO_PAGES = [
    {
      id: "page_lumen_ig",
      name: "Lumen Studio Instagram",
      category: "Design Studio",
      platform: "instagram",
      username: "lumenstudio",
      followers: 18700,
      posts: 142,
      engagement: "4.8%",
      access_token: "demo_ig_token",
      instagram_business_account: {
        id: "ig_lumen",
        username: "lumenstudio",
        followers: 18700,
      },
    },
    {
      id: "page_lumen_fb",
      name: "Lumen Studio Facebook",
      category: "Design Studio",
      platform: "facebook",
      username: "lumenstudio.fb",
      followers: 12400,
      posts: 96,
      engagement: "3.2%",
      access_token: "demo_fb_token",
      instagram_business_account: null,
    },
  ];

  const DEMO_USER = {
    id: "fb_demo_user_1",
    name: MANAGER.name,
    email: "rajesh@lumenstudio.in",
    picture: { data: { url: MANAGER.avatar } },
    userAccessToken: "demo_user_token",
  };

  const METRICS = {
    mentions: { value: 247, delta: "+18% vs last month" },
    engagement: { value: "8,420", delta: "+12%" },
    followers: { value: "142", delta: "+8%" },
    reach: { value: "3,420", delta: "Avg. reach per post" },
  };

  const RECENT_ACTIVITY = [
    { name: "Priya Sharma", activity: "tagged you in a Story", time: "2 min ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya" },
    { name: "Rahul Mehta", activity: "mentioned you in a comment", time: "14 min ago", initials: "RM" },
    { name: "Aanya Kapoor", activity: "posted a feed photo tagging you", time: "1 hr ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Aanya" },
    { name: "Vikram Singh", activity: "shared your recent post on Facebook", time: "2 hr ago", initials: "VS" },
    { name: "Neha Iyer", activity: "commented on your Instagram post", time: "3 hr ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Neha" },
    { name: "Amit Patel", activity: "tagged you in an Instagram Reel", time: "4 hr ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Amit" },
    { name: "Karan Johar", activity: "mentioned you in a Facebook post", time: "6 hr ago", initials: "KJ" },
    { name: "Rohan Gupta", activity: "sent you a direct message", time: "8 hr ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rohan" },
    { name: "Meera Joshi", activity: "replied to your comment", time: "10 hr ago", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Meera" },
    { name: "Siddharth Malhotra", activity: "tagged you in a photo", time: "12 hr ago", initials: "SM" }
  ];

  const ACTIVITY_LOG = [
    { id: "a1", actor: "Priya Sharma", channel: "Instagram", action: "Tagged @lumenstudio in a Story about the spring studio refresh.", status: "New mention", time: "2 min ago" },
    { id: "a2", actor: "Rahul Mehta", channel: "Facebook", action: "Left a comment asking about a branding discovery call.", status: "Needs reply", time: "14 min ago" },
    { id: "a3", actor: "Aanya Kapoor", channel: "Instagram", action: "Shared your Reel to her followers and mentioned the visual direction.", status: "High reach", time: "1 hr ago" },
    { id: "a4", actor: "Vikram Singh", channel: "Messenger", action: "Sent a direct message asking for your latest case study deck.", status: "Unread", time: "2 hr ago" },
    { id: "a5", actor: "Neha Iyer", channel: "Instagram", action: "Reacted to your carousel and saved the post for later.", status: "Positive", time: "3 hr ago" },
    { id: "a6", actor: "Amit Patel", channel: "Facebook", action: "Shared your launch update to a local founder group.", status: "Shared", time: "4 hr ago" },
    { id: "a7", actor: "Karan Johar", channel: "Instagram", action: "Mentioned Lumen Studio in a photo from a creator meetup.", status: "New mention", time: "6 hr ago" },
    { id: "a8", actor: "Rohan Gupta", channel: "Instagram", action: "Sent a direct message asking for a callback next week.", status: "Follow up", time: "8 hr ago" }
  ];

  const MENTIONS = [
    {
      id: "m1",
      platform: "instagram",
      type: "Instagram Story",
      user: { name: "Priya Sharma", handle: "priya_sharma", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya" },
      text: "Obsessed with the new design details from @lumenstudio! Absolutely stunning work. ✨",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design1&backgroundColor=005c55",
      reach: 4200,
      likes: 342,
      comments: 28,
      time: Date.now() / 1000 - 120,
    },
    {
      id: "m2",
      platform: "facebook",
      type: "FB Post",
      user: { name: "Rahul Mehta", handle: "rahul.mehta", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul" },
      text: "Highly recommend Lumen Studio for their professional branding services. Seamless experience!",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design2&backgroundColor=0f766e",
      reach: 1800,
      likes: 89,
      comments: 12,
      time: Date.now() / 1000 - 840,
    },
    {
      id: "m3",
      platform: "instagram",
      type: "Instagram Post",
      user: { name: "Aanya Kapoor", handle: "aanya_k", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Aanya" },
      text: "Collaborated with @lumenstudio on our latest summer collection launch. Look at this branding! 🌈",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design3&backgroundColor=1a5a57",
      reach: 2900,
      likes: 156,
      comments: 9,
      time: Date.now() / 1000 - 3600,
    },
    {
      id: "m4",
      platform: "instagram",
      type: "Instagram Story",
      user: { name: "Vikram Singh", handle: "vikram_s", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram" },
      text: "Can't get over how clean this workspace layout is. @lumenstudio nailed it.",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design4&backgroundColor=37736f",
      reach: 3500,
      likes: 120,
      comments: 14,
      time: Date.now() / 1000 - 7200,
    },
    {
      id: "m5",
      platform: "instagram",
      type: "Instagram Post",
      user: { name: "Neha Iyer", handle: "neha_iyer", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Neha" },
      text: "Beautiful aesthetics and top-notch packaging design by @lumenstudio.",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design5&backgroundColor=094f4c",
      reach: 5100,
      likes: 412,
      comments: 32,
      time: Date.now() / 1000 - 10800,
    },
    {
      id: "m6",
      platform: "facebook",
      type: "FB Post",
      user: { name: "Amit Patel", handle: "amit.patel", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Amit" },
      text: "Lumen Studio did an amazing job on our rebranding campaign. Highly recommended!",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design6&backgroundColor=95d1cd",
      reach: 2200,
      likes: 95,
      comments: 8,
      time: Date.now() / 1000 - 14400,
    },
    {
      id: "m7",
      platform: "instagram",
      type: "Instagram Story",
      user: { name: "Karan Johar", handle: "karan_j", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Karan" },
      text: "Love their design philosophy. Clean, minimal, modern. @lumenstudio",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design7&backgroundColor=eff4ff",
      reach: 8400,
      likes: 980,
      comments: 75,
      time: Date.now() / 1000 - 21600,
    },
    {
      id: "m8",
      platform: "instagram",
      type: "Instagram Post",
      user: { name: "Rohan Gupta", handle: "rohan_g", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rohan" },
      text: "New studio setup is looking great! Congrats to @lumenstudio.",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design8&backgroundColor=dce9ff",
      reach: 1900,
      likes: 84,
      comments: 5,
      time: Date.now() / 1000 - 28800,
    },
    {
      id: "m9",
      platform: "facebook",
      type: "FB Post",
      user: { name: "Meera Joshi", handle: "meera.j", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Meera" },
      text: "A beautiful portfolio of work. Inspiring design inspiration from Lumen Studio.",
      thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=design9&backgroundColor=a3faef",
      reach: 1400,
      likes: 62,
      comments: 4,
      time: Date.now() / 1000 - 36000,
    }
  ];

  const COMMENTS = [
    {
      id: "c1",
      post_id: "p1",
      user: { name: "Sneha Reddy", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha" },
      text: "Love this!",
      likes: 5,
      time: Date.now() / 1000 - 1800,
      replied: false,
      platform: "facebook",
      post_thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=post1&backgroundColor=005c55"
    },
    {
      id: "c2",
      post_id: "p1",
      user: { name: "Arjun Nair", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun" },
      text: "When's the next launch?",
      likes: 12,
      time: Date.now() / 1000 - 7200,
      replied: true,
      reply: { text: "We are tracking a mid-July release. Stay tuned! 🚀", time: Date.now() / 1000 - 6000 },
      platform: "facebook",
      post_thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=post1&backgroundColor=005c55"
    },
    {
      id: "c3",
      post_id: "p2",
      user: { name: "Meera Iyer", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Meera" },
      text: "Where can I buy this?",
      likes: 3,
      time: Date.now() / 1000 - 3600,
      replied: false,
      platform: "instagram",
      post_thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=post2&backgroundColor=0f766e"
    },
    {
      id: "c4",
      post_id: "p2",
      user: { name: "Varun Verma", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Varun" },
      text: "@lumenstudio I'm a huge fan!",
      likes: 22,
      time: Date.now() / 1000 - 14400,
      replied: false,
      platform: "instagram",
      mentioned_you: true,
      post_thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=post2&backgroundColor=0f766e"
    },
    {
      id: "c5",
      post_id: "p3",
      user: { name: "Deepika Sen", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Deepika" },
      text: "Looks amazing 🔥",
      likes: 9,
      time: Date.now() / 1000 - 18000,
      replied: false,
      platform: "facebook",
      post_thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=post3&backgroundColor=1a5a57"
    },
    {
      id: "c6",
      post_id: "p3",
      user: { name: "Rohan Shah", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=RohanS" },
      text: "Please ship to India",
      likes: 15,
      time: Date.now() / 1000 - 25200,
      replied: false,
      platform: "instagram",
      post_thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=post3&backgroundColor=1a5a57"
    },
    {
      id: "c7",
      post_id: "p4",
      user: { name: "Kunal Gupta", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Kunal" },
      text: "Is it available in Delhi?",
      likes: 4,
      time: Date.now() / 1000 - 32400,
      replied: true,
      reply: { text: "Yes! We ship nationwide across India. Order link in bio.", time: Date.now() / 1000 - 30000 },
      platform: "instagram",
      post_thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=post4&backgroundColor=37736f"
    },
    {
      id: "c8",
      post_id: "p4",
      user: { name: "Pooja Roy", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Pooja" },
      text: "Beautiful collection!",
      likes: 18,
      time: Date.now() / 1000 - 43200,
      replied: false,
      platform: "facebook",
      post_thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=post4&backgroundColor=37736f"
    }
  ];

  const CONVERSATIONS = [
    {
      id: "dm1",
      platform: "instagram",
      user: { name: "Priya Sharma", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya" },
      last_message: "Where can I find your latest collection?",
      updated_at: Date.now() / 1000 - 120,
      unread_count: 1,
      messages: [
        { from: "them", text: "Hi, just discovered your brand. Love your work!", time: Date.now() / 1000 - 3600 },
        { from: "us", text: "Thank you so much, Priya! 🙌 Glad you found us.", time: Date.now() / 1000 - 3400 },
        { from: "them", text: "Where can I find your latest collection?", time: Date.now() / 1000 - 120 },
      ],
    },
    {
      id: "dm2",
      platform: "messenger",
      user: { name: "Rahul Mehta", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul" },
      last_message: "Do you offer branding consults?",
      updated_at: Date.now() / 1000 - 1800,
      unread_count: 2,
      messages: [
        { from: "them", text: "Do you offer branding consults?", time: Date.now() / 1000 - 1800 }
      ],
    },
    {
      id: "dm3",
      platform: "instagram",
      user: { name: "Aanya Kapoor", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Aanya" },
      last_message: "Thank you for the fast delivery!",
      updated_at: Date.now() / 1000 - 7200,
      unread_count: 0,
      messages: [
        { from: "them", text: "Hey! Can you share the invoice?", time: Date.now() / 1000 - 14400 },
        { from: "us", text: "Sure, sent it over to your email. Check it out!", time: Date.now() / 1000 - 12000 },
        { from: "them", text: "Thank you for the fast delivery!", time: Date.now() / 1000 - 7200 }
      ],
    },
    {
      id: "dm4",
      platform: "messenger",
      user: { name: "Vikram Singh", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram" },
      last_message: "Loved the UI package!",
      updated_at: Date.now() / 1000 - 14400,
      unread_count: 0,
      messages: [
        { from: "them", text: "Hi, when is the UI package launching?", time: Date.now() / 1000 - 18000 },
        { from: "us", text: "It's live now on our website! Enjoy coding.", time: Date.now() / 1000 - 16000 },
        { from: "them", text: "Loved the UI package!", time: Date.now() / 1000 - 14400 }
      ],
    },
    {
      id: "dm5",
      platform: "instagram",
      user: { name: "Neha Iyer", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Neha" },
      last_message: "Great portfolio, sent an inquiry.",
      updated_at: Date.now() / 1000 - 28800,
      unread_count: 0,
      messages: [
        { from: "them", text: "Hi, sent a design project inquiry.", time: Date.now() / 1000 - 28800 }
      ],
    },
    {
      id: "dm6",
      platform: "instagram",
      user: { name: "Amit Patel", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Amit" },
      last_message: "Let's plan the collab next week.",
      updated_at: Date.now() / 1000 - 43200,
      unread_count: 0,
      messages: [
        { from: "them", text: "Collab sounds great!", time: Date.now() / 1000 - 45000 },
        { from: "us", text: "Awesome, let's schedule a Zoom call.", time: Date.now() / 1000 - 44000 },
        { from: "them", text: "Let's plan the collab next week.", time: Date.now() / 1000 - 43200 }
      ],
    },
    {
      id: "dm7",
      platform: "messenger",
      user: { name: "Karan Johar", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Karan" },
      last_message: "Perfect! Thanks a lot.",
      updated_at: Date.now() / 1000 - 86400,
      unread_count: 0,
      messages: [
        { from: "them", text: "Are you open on weekends?", time: Date.now() / 1000 - 90000 },
        { from: "us", text: "Yes, our team is active. DMs are open.", time: Date.now() / 1000 - 88000 },
        { from: "them", text: "Perfect! Thanks a lot.", time: Date.now() / 1000 - 86400 }
      ],
    },
    {
      id: "dm8",
      platform: "instagram",
      user: { name: "Rohan Gupta", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rohan" },
      last_message: "Can we set up a call?",
      updated_at: Date.now() / 1000 - 172800,
      unread_count: 0,
      messages: [
        { from: "them", text: "Can we set up a call?", time: Date.now() / 1000 - 172800 }
      ],
    }
  ];

  const ANALYTICS = {
    followers_total: "31.1K",
    following_total: "408",
    posts_total: "238",
    views_total: "248.5K",
    profile_visits: "12,450",
    chart_growth: [120, 140, 190, 220, 247],
    chart_weekly: [4.2, 5.8, 5.1, 7.2, 6.5, 8.0, 8.9],
    top_cities: [
      { city: "Mumbai", pct: 68 },
      { city: "Pune", pct: 14 },
      { city: "Thane", pct: 10 },
      { city: "Other", pct: 8 },
    ],
    platform_split: { facebook: 38, instagram: 62 },
    top_posts: [
      { id: "tp1", title: "New Studio Workspace Reveal 🖥", platform: "instagram", likes: 2100, comments: 156, views: "45K", thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=tpost1&backgroundColor=005c55" },
      { id: "tp2", title: "Branding Case Study: TechStart 🚀", platform: "facebook", likes: 890, comments: 42, views: "18K", thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=tpost2&backgroundColor=0f766e" },
      { id: "tp3", title: "Summer Color Palette Inspiration 🎨", platform: "instagram", likes: 1200, comments: 88, views: "29K", thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=tpost3&backgroundColor=1a5a57" },
      { id: "tp4", title: "UI Design Workflow Secrets 🤫", platform: "instagram", likes: 1750, comments: 112, views: "38K", thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=tpost4&backgroundColor=37736f" },
      { id: "tp5", title: "Behind the Scenes at Lumen Studio 🎥", platform: "facebook", likes: 450, comments: 23, views: "9K", thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=tpost5&backgroundColor=094f4c" },
      { id: "tp6", title: "Typography Trends in 2026 ✍️", platform: "instagram", likes: 1560, comments: 95, views: "34K", thumbnail: "https://api.dicebear.com/9.x/shapes/svg?seed=tpost6&backgroundColor=95d1cd" }
    ],
    demographics: {
      gender: { male: 42, female: 55, other: 3 },
      age: [
        { group: "18-24", pct: 28 },
        { group: "25-34", pct: 45 },
        { group: "35-44", pct: 18 },
        { group: "45+", pct: 9 }
      ]
    },
    top_followers: [
      { name: "Priya Sharma", handle: "@priya_sharma", engagement: "High", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya" },
      { name: "Rahul Mehta", handle: "@rahul.mehta", engagement: "High", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul" },
      { name: "Aanya Kapoor", handle: "@aanya_k", engagement: "Medium", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Aanya" }
    ],
    heatmap: {
      bestDay: "Wednesday",
      bestTime: "6:00 PM - 8:00 PM"
    }
  };

  function createDemoSession() {
    return {
      user: DEMO_USER,
      pages: DEMO_PAGES,
      business: BUSINESS,
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

  async function apiFetch(path, options = {}) {
    const cfg = window.WOUCHH_CONFIG || {};
    const backendBaseUrl = cfg.BACKEND_BASE_URL || "https://sociallift-backend-production.up.railway.app";
    const url = `${backendBaseUrl}${path}`;
    
    const opt = {
      ...options,
      credentials: "include"
    };
    
    if (options.body && typeof options.body === "object") {
      opt.headers = {
        ...opt.headers,
        "Content-Type": "application/json"
      };
      opt.body = JSON.stringify(options.body);
    }
    
    const res = await fetch(url, opt);
    if (res.status === 401) {
      window.location.href = "/facebook/connect.html";
      throw new Error("Unauthorized");
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${res.status}`);
    }
    return res.json();
  }

  async function getAccounts() {
    const cfg = window.WOUCHH_CONFIG || {};
    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");
    if (!hasFb) return DEMO_PAGES;
    
    try {
      const raw = await apiFetch("/api/accounts");
      const accounts = [];
      raw.forEach((p) => {
        accounts.push({
          id: p.page_id,
          name: p.page_name,
          platform: "facebook",
          username: p.page_name.toLowerCase().replace(/\s+/g, ""),
          followers: 12400,
          posts: 96,
          engagement: "3.2%",
          ig_business_account_id: null
        });
        if (p.ig_business_account_id) {
          accounts.push({
            id: p.ig_business_account_id,
            name: p.page_name + " Instagram",
            platform: "instagram",
            username: p.ig_username || "lumenstudio",
            followers: 18700,
            posts: 142,
            engagement: "4.8%",
            ig_business_account_id: p.ig_business_account_id
          });
        }
      });
      return accounts;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async function getComments() {
    const cfg = window.WOUCHH_CONFIG || {};
    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");
    if (!hasFb) return COMMENTS;
    
    try {
      const raw = await apiFetch("/api/accounts");
      const promises = raw
        .filter((p) => p.ig_business_account_id)
        .map(async (p) => {
          try {
            const data = await apiFetch(`/api/comments?account_id=${p.ig_business_account_id}`);
            return data.map((c) => {
              const timeInSeconds = c.timestamp ? Math.floor(new Date(c.timestamp).getTime() / 1000) : (Date.now() / 1000);
              return {
                id: c.id,
                post_id: c.media_id,
                user: {
                  name: c.username || "Instagram User",
                  avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${c.username || "User"}&backgroundColor=e5eeff`
                },
                text: c.text,
                likes: c.like_count || 0,
                time: timeInSeconds,
                replied: false,
                platform: "instagram",
                post_thumbnail: `https://api.dicebear.com/9.x/shapes/svg?seed=${c.media_id || "post"}&backgroundColor=005c55`,
                account_id: p.ig_business_account_id,
                hidden: !!c.hidden
              };
            });
          } catch (err) {
            console.error("Failed to fetch comments for " + p.ig_business_account_id, err);
            return [];
          }
        });
      const results = await Promise.all(promises);
      return results.flat();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async function replyComment(commentId, text, accountId) {
    const cfg = window.WOUCHH_CONFIG || {};
    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");
    if (!hasFb) return { success: true, id: commentId, text };
    
    return apiFetch(`/api/comments/${commentId}/reply`, {
      method: "POST",
      body: { message: text, account_id: accountId }
    });
  }

  async function hideComment(commentId, hide, accountId) {
    const cfg = window.WOUCHH_CONFIG || {};
    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");
    if (!hasFb) return { success: true, id: commentId, hide };
    
    return apiFetch(`/api/comments/${commentId}/hide`, {
      method: "POST",
      body: { hide: hide, account_id: accountId }
    });
  }

  async function getMentions() {
    const cfg = window.WOUCHH_CONFIG || {};
    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");
    if (!hasFb) return MENTIONS;
    
    try {
      const raw = await apiFetch("/api/accounts");
      const promises = raw
        .filter((p) => p.ig_business_account_id)
        .map(async (p) => {
          try {
            const data = await apiFetch(`/api/mentions?account_id=${p.ig_business_account_id}`);
            return data.map((m) => {
              const timeInSeconds = m.timestamp ? Math.floor(new Date(m.timestamp).getTime() / 1000) : (Date.now() / 1000);
              return {
                id: m.id,
                platform: "instagram",
                type: m.media_type === "VIDEO" || m.media_type === "REEL" ? "Instagram Reel" : "Instagram Post",
                user: {
                  name: m.username || "Instagram User",
                  handle: m.username || "instagram_user",
                  avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${m.username || "User"}&backgroundColor=e5eeff`
                },
                text: m.caption || "",
                thumbnail: m.media_url || `https://api.dicebear.com/9.x/shapes/svg?seed=${m.id || "mention"}&backgroundColor=0f766e`,
                reach: (m.like_count || 0) * 12 + 100,
                likes: m.like_count || 0,
                comments: m.comments_count || 0,
                time: timeInSeconds
              };
            });
          } catch (err) {
            console.error("Failed to fetch mentions for " + p.ig_business_account_id, err);
            return [];
          }
        });
      const results = await Promise.all(promises);
      return results.flat();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async function getMetrics() {
    const cfg = window.WOUCHH_CONFIG || {};
    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");
    if (!hasFb) return METRICS;
    
    try {
      const raw = await apiFetch("/api/accounts");
      const fbCount = raw.length;
      const igCount = raw.filter((a) => a.ig_business_account_id).length;
      return {
        mentions: { value: igCount + fbCount, delta: "Connected Accounts" },
        engagement: { value: igCount, delta: "Instagram Profiles" },
        followers: { value: fbCount, delta: "Facebook Pages" },
        reach: { value: "Synced", delta: "Just now" }
      };
    } catch (e) {
      console.error(e);
      return METRICS;
    }
  }

  window.FBData = {
    BUSINESS,
    MANAGER,
    METRICS,
    createDemoSession,
    getMetrics,
    getActivity: () => Promise.resolve(RECENT_ACTIVITY),
    getActivityLog: () => Promise.resolve(ACTIVITY_LOG),
    getMentions,
    getComments,
    replyComment,
    hideComment,
    getConversations: () => Promise.resolve(CONVERSATIONS),
    sendMessage: (id, text) => Promise.resolve({ success: true, id, text }),
    getAnalytics: () => Promise.resolve(ANALYTICS),
    getAccounts,
    relativeTime,
    formatCount,
  };
})();
