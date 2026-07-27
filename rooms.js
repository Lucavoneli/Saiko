/* ============================================================
   SAIKO — room loader
   Your builds are managed visually in the admin panel
   (yoursite/admin), which saves to content/rooms.json.

   This file loads that content. It also keeps an embedded
   FALLBACK copy below so the site still previews when you
   open index.html directly from your computer (where the
   browser blocks reading the json file). On the live site,
   content/rooms.json is always the source of truth.

   You do not need to edit this file. If you ever edit rooms
   by hand instead of the admin panel, edit content/rooms.json.
   ============================================================ */
(function () {
  // ---- fallback copy (used only for local preview) ----
  var FALLBACK_ROOMS = {
  "rooms": [
    {
      "name": "Neon Casino Floor",
      "tag": "CASINO",
      "featured": true,
      "image": "",
      "about": "A full casino floor with working wired games, a cashier desk and a VIP mezzanine. Built for a weekly event night with room for around 40 players at once.",
      "room_size": "Large (max)",
      "built_for": "Weekly casino night",
      "mechanics": "Wired dice games, teleports",
      "build_time": "5 days",
      "tier": "Premium"
    },
    {
      "name": "Winter Event Lobby",
      "tag": "EVENT",
      "featured": true,
      "image": "",
      "about": "A seasonal welcome lobby with a stage area, host podium and queue flow into the main event room. Snow effects and layered lighting throughout.",
      "room_size": "Large",
      "built_for": "Christmas event week",
      "mechanics": "Teleport gates, effect triggers",
      "build_time": "4 days",
      "tier": "Standard"
    },
    {
      "name": "Fashion Runway",
      "tag": "RUNWAY",
      "featured": true,
      "image": "",
      "about": "A catwalk stage with seating on both sides, backstage prep area and a judges' booth. Lighting rig built to spotlight the walking lane.",
      "room_size": "Medium",
      "built_for": "Fashion competition",
      "mechanics": "Spotlight wired effects",
      "build_time": "3 days",
      "tier": "Standard"
    },
    {
      "name": "Trivia Maze",
      "tag": "GAME",
      "featured": true,
      "image": "",
      "about": "A multi-path maze where each wrong turn drops you back to the start. Fully wired question gates and a prize room at the centre.",
      "room_size": "Large",
      "built_for": "Game night series",
      "mechanics": "Wired gates, fall-through floors",
      "build_time": "5 days",
      "tier": "Premium"
    },
    {
      "name": "RP Mansion",
      "tag": "ROLEPLAY",
      "featured": false,
      "image": "",
      "about": "A three-floor mansion interior with distinct rooms for roleplay scenes, hidden passages and a working lift between floors.",
      "room_size": "Large (max)",
      "built_for": "Roleplay group",
      "mechanics": "Lift teleports, hidden doors",
      "build_time": "6 days",
      "tier": "Premium"
    },
    {
      "name": "Rooftop Lounge",
      "tag": "SOCIAL",
      "featured": false,
      "image": "",
      "about": "A relaxed rooftop hangout with a bar, seating clusters and a skyline backdrop. Designed for chill social use rather than events.",
      "room_size": "Medium",
      "built_for": "Casual hangout",
      "mechanics": "Ambient lighting only",
      "build_time": "2 days",
      "tier": "Basic"
    }
  ]
};
  var FALLBACK_SETTINGS = {
  "discord": "",
  "email": "you@email.com"
};

  function toRoom(r) {
    return {
      img: r.image || "",
      name: r.name || "",
      featured: !!r.featured,
      tag: (r.tag || "").toUpperCase(),
      about: r.about || "",
      meta: {
        "Room size": r.room_size || "",
        "Built for": r.built_for || "",
        "Mechanics": r.mechanics || "",
        "Build time": r.build_time || "",
        "Tier": r.tier || ""
      }
    };
  }
  function mapList(data) {
    var list = (data && Array.isArray(data.rooms)) ? data.rooms : [];
    return list.filter(function (r) { return r && r.name; }).map(toRoom);
  }

  window.ROOMS = [];
  window.ROOMS_READY = fetch("content/rooms.json", { cache: "no-store" })
    .then(function (res) { return res.json(); })
    .then(function (data) { window.ROOMS = mapList(data); return window.ROOMS; })
    .catch(function () { window.ROOMS = mapList(FALLBACK_ROOMS); return window.ROOMS; });

  window.SETTINGS = FALLBACK_SETTINGS;
  window.SETTINGS_READY = fetch("content/settings.json", { cache: "no-store" })
    .then(function (res) { return res.json(); })
    .then(function (s) { window.SETTINGS = s || FALLBACK_SETTINGS; return window.SETTINGS; })
    .catch(function () { window.SETTINGS = FALLBACK_SETTINGS; return window.SETTINGS; });

  // ---- site content (hero, pricing, process, etc.) ----
  var FALLBACK_SITE = {
  "hero": {
    "eyebrow": "Habbo room builder · Open for commissions",
    "title_before": "I build rooms people ",
    "title_highlight": "never",
    "title_after": " want to leave.",
    "lead": "Casinos, event halls, mazes, RP maps, you name the vibe. Custom Habbo rooms with working wired mechanics, delivered on time and built to be walked around in.",
    "photo": "",
    "photo_caption": "★ FAVOURITE BUILD ★",
    "tags": [
      "WIRED GAMES",
      "EVENT SPACES",
      "RP MAPS",
      "FAST TURNAROUND"
    ],
    "cta_primary": "Commission a room →",
    "cta_secondary": "Peek the builds"
  },
  "gallery": {
    "kicker": "The gallery",
    "heading": "Rooms I've built",
    "subtext": "A few favourites."
  },
  "pricing": {
    "kicker": "The prices",
    "heading": "Pick your build",
    "subtext": "Each tier shows the room size it covers, so you can see exactly what you're getting.",
    "tiers": [
      {
        "name": "BASIC",
        "price": "25",
        "unit": "cr",
        "blurb": "One themed room, done properly.",
        "size_label": "SMALL – MEDIUM ROOM",
        "features": [
          "1 room, up to medium size",
          "Layout + full theming",
          "1 revision round",
          "2–3 day turnaround"
        ],
        "featured": false,
        "ribbon": ""
      },
      {
        "name": "STANDARD",
        "price": "60",
        "unit": "cr",
        "blurb": "A full room with working mechanics.",
        "size_label": "LARGE ROOM",
        "features": [
          "Large custom-themed room",
          "Wired games & teleports",
          "Lighting + effects pass",
          "2 revision rounds",
          "4–5 day turnaround"
        ],
        "featured": true,
        "ribbon": "★ MOST BOOKED"
      },
      {
        "name": "PREMIUM",
        "price": "120",
        "unit": "cr",
        "blurb": "A multi-room space or full event.",
        "size_label": "MULTI-ROOM / MAX",
        "features": [
          "Multiple linked rooms",
          "Complex wired logic",
          "Event flow + host area",
          "Unlimited in-scope revisions",
          "Priority queue"
        ],
        "featured": false,
        "ribbon": ""
      }
    ]
  },
  "process": {
    "kicker": "How it works",
    "heading": "Four steps, zero stress",
    "steps": [
      {
        "title": "Brief",
        "text": "Send theme, room size, references and deadline via the form or Discord."
      },
      {
        "title": "Quote",
        "text": "I confirm scope, price and timeline. A 50% deposit locks your slot."
      },
      {
        "title": "Build",
        "text": "I build it and send a preview. Your revisions happen right here."
      },
      {
        "title": "Deliver",
        "text": "Final payment, then the room is handed over and it's yours."
      }
    ]
  },
  "commission": {
    "heading": "Ready to commission a room?",
    "subtext": "Fill in the request form below with your brief, or reach out directly. I usually reply within 24 hours.",
    "alt_label": "Or reach me directly",
    "discord_btn": "Message on Discord",
    "email_btn": "Email me"
  }
};
  window.SITE = FALLBACK_SITE;
  window.SITE_READY = fetch("content/site.json", { cache: "no-store" })
    .then(function (res) { return res.json(); })
    .then(function (s) { window.SITE = s || FALLBACK_SITE; return window.SITE; })
    .catch(function () { window.SITE = FALLBACK_SITE; return window.SITE; });
})();
