/**
 * data.js — single source of truth for every number, brand, and video on the site.
 * Edit values here; the page reads from this object and re-renders everywhere.
 */

const DATA = {
  handle: "@jessicasyaps",
  email: "jessica.downes839@gmail.com",
  location: "London, UK",

  hero: {
    name: "Jessica",
    role: "Creator: London life, travel, comedy, and learning Romanian for fun",
    tagline:
      "London chaos, budget travel, and a boyfriend who corrects my Romanian on camera.",
    photo: "assets/photos/hero-cutout.jpg",
  },

  about: {
    photo: "assets/photos/about.jpg",
    bio: [
      "Hi, I'm Jessica. I make videos about London life, travel, couple content, and learning Romanian for fun.",
      "Expect everyday London moments, budget travel chaos, real couple content with cultural mix ups, and me attempting Romanian in public.",
      "If it's funny, a little chaotic, and true to real life, that's probably one of mine.",
    ],
    calloutNote:
      "Small following, huge reach: brands get more attention per follower here than on most bigger accounts.",
    romanianWords: [
      { word: "Bună", meaning: "hello, the first word I properly learned" },
      {
        word: "Mulțumesc",
        meaning: "thank you, said with far too much enthusiasm",
      },
      { word: "Pupici", meaning: "little kisses, I say this constantly" },
      { word: "Noroc", meaning: "good luck, my favourite one word answer" },
      {
        word: "Scumpo",
        meaning: "sweetheart, also means expensive, so context matters",
      },
      { word: "Hai noroc", meaning: "cheers, the toast I never get wrong" },
      {
        word: "Nu înțeleg",
        meaning: "I don't understand, my most useful phrase",
      },
      { word: "Te iubesc", meaning: "I love you, saved for special occasions" },
      {
        word: "Poftă bună",
        meaning: "enjoy your meal, said before every dinner",
      },
      {
        word: "Da",
        meaning: "yes, easy to remember, harder to say with confidence",
      },
      { word: "Nu", meaning: "no, useful in markets and arguments alike" },
      { word: "Sănătate", meaning: "to your health, a toast for celebrations" },
      { word: "Prieten", meaning: "friend, a word I use a lot in Romania" },
      {
        word: "Frumos",
        meaning: "beautiful, my go to compliment for everything",
      },
      {
        word: "Casă",
        meaning: "home, what London and Romania both feel like now",
      },
    ],
  },

  updatedOn: "2 September 2026",
  period: { label: "Last 60 days", range: "4 July to 2 September 2026" },

  headline: {
    totalFollowers: 64400, // 41,800 TikTok + 22,600 Instagram
    combinedViews: 14000000, // 8.9M TikTok + 5.1M Instagram
    combinedInteractions: 1040100, // TikTok likes+comments+shares + Instagram interactions
    newFollowers60d: 4300, // +2,900 TikTok, +1,400 Instagram
  },

  tiktok: {
    handle: "@jessicasyaps",
    url: "https://www.tiktok.com/@jessicasyaps",

    followers: {
      total: 41800,
      netNew60d: 2900,
      netNewChangePct: 7.5,
      growthChart: {
        yAxisMax: 50000,
        yAxisTicks: [10000, 20000, 30000, 40000, 50000],
        xStart: "4 July 2026",
        xEnd: "2 September 2026",
        points: [
          15200, 17700, 20000, 22350, 24650, 26050, 32050, 34850, 36700, 41800,
        ], // approximate; +26,600 over the period to 41,800
      },
      gender: { female: 57, male: 43 },
      age: {
        "18-24": 18.8,
        "25-34": 40.1,
        "35-44": 22.3,
        "45-54": 12.5,
        "55+": 6.3,
      },
      locations: {
        Romania: 55.9,
        UK: 21.2,
        Germany: 3.9,
        Italy: 2.1,
        "United States": 1.3,
        "Rest of the world": 15.6,
      },
    },

    performance: {
      postViews: { value: 8900000, change: -4000000, changePct: -31.0 },
      profileViews: { value: 171000, change: -100400, changePct: -37.0 },
      likes: { value: 648000, change: -278000, changePct: -30.0 },
      comments: { value: 11700, change: -5200, changePct: -30.8 },
      shares: { value: 24400, change: -8700, changePct: -26.3 },
    },

    traffic: { forYou: 88.2, personalProfile: 11.1 },
  },

  instagram: {
    handle: "@jessicasyaps",
    url: "https://www.instagram.com/jessicasyaps",

    followers: {
      total: 22600,
      netNew60d: 1400,
      growthChart: {
        yAxisMax: 30000,
        yAxisTicks: [10000, 20000, 30000],
        xStart: "4 July 2026",
        xEnd: "2 September 2026",
        points: [
          8800, 9650, 10800, 12100, 13550, 14950, 16400, 17800, 19050, 22600,
        ], // approximate; +13,800 over the period to 22,600
      },
    },

    performance: {
      views: 5100000,
      viewersReached: 829000,
      interactions: 356000,
      viewsFromFollowers: 9.7,
      viewsFromNonFollowers: 90.3,
      byContentType: {
        Reels: 4857000,
        Posts: 304000,
        Stories: 39000,
        "Live videos": null,
      }, // TODO: live video views
    },

    gender: { male: 57.9, female: 42.1 },
    age: {
      "18-24": 18.0,
      "25-34": 30.9,
      "35-44": 26.2,
      "45-54": 16.0,
      "55+": 8.8,
    },
    locations: {
      Romania: 57.8,
      UK: 17.2,
      Germany: 4.9,
      Italy: 3.2,
      "United States": 2.5,
      "Rest of the world": 14.4,
    },
  },

  youtube: {
    handle: "@jessicasyaps",
    url: "https://www.youtube.com/@jessicasyaps",
    subscribers: null, // TODO: e.g. 4200
    views: null, // TODO: e.g. 320000
  },

  // Real brand logo files — drop the actual logo assets into /assets/brands/
  // using these exact filenames (svg or png). Placeholders are wordmark stand-ins.
  // `video`: a real exported mp4 in /assets/brands/videos/ — plays natively with
  // no TikTok chrome (no likes/comments/share, click-to-play). Takes priority
  // over `videoUrl` (TikTok embed fallback) when both are set.
  // TODO: fill in poster and website for each brand.
  brands: [
    {
      name: "Trip.com",
      logo: "assets/brands/trip.webp",
      video: "assets/brands/videos/trip.mp4",
      videoUrl:
        "https://www.tiktok.com/@jessicasyaps/video/7657242603070508310",
      poster: null,
      website: null,
    },
    {
      name: "Temu",
      logo: "assets/brands/temu.png",
      video: "assets/brands/videos/temu.mp4",
      videoUrl:
        "https://www.tiktok.com/@jessicasyaps/video/7665374361783667970",
      poster: null,
      website: null,
    },
    {
      name: "Tocobo",
      logo: "assets/brands/tocobo.png",
      video: "assets/brands/videos/tocobo.mp4",
      videoUrl:
        "https://www.tiktok.com/@jessicasyaps/video/7650916444204453142",
      poster: null,
      website: null,
    },
  ],

  // "What I make" — one card per content pillar. `video`: a real exported mp4
  // in /assets/content/videos/ — plays natively, autoplays muted on scroll
  // (tap to unmute), no TikTok chrome. Takes priority over `url` (TikTok
  // embed fallback) when both are set.
  content: [
    {
      title: "Travel",
      video: "assets/content/videos/travel.mp4",
      url: "https://www.tiktok.com/@jessicasyaps/video/0000000000000000003",
      caption:
        "Exploring Madeira's natural pools & surviving a bumblebee attack",
      poster: "assets/photos/work-3.jpg", // PLACEHOLDER thumbnail
    },
    {
      title: "Couple",
      video: "assets/content/videos/couple.mp4",
      url: "https://www.tiktok.com/@jessicasyaps/video/0000000000000000002",
      caption:
        "Going and playing (or at least attempting) badminton with my boyfriend",
      poster: "assets/photos/work-2.jpg", // PLACEHOLDER thumbnail
    },
    {
      title: "Language",
      video: "assets/content/videos/language.mp4",
      url: "https://www.tiktok.com/@jessicasyaps/video/0000000000000000001",
      caption: "Attempting a romanian tongue twister (nailed it of course)",
      poster: "assets/photos/work-1.jpg", // PLACEHOLDER thumbnail
    },
  ],
};
