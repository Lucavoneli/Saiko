SAIKO — HABBO COMMISSION PORTFOLIO — HOW TO EDIT
========================================

FILES
  index.html    your main page
  library.html  the full room library (all builds, with filters)
  terms.html    the terms of service page
  rooms.js      YOUR ROOMS LIVE HERE (shared by both pages)
  images/       put all your screenshots in here

--------------------------------------------------
EDITING EVERYTHING FROM THE ADMIN PANEL
--------------------------------------------------
Go to  yoursite/admin  and log in. You can now edit:

  Room builds   -> add/edit/reorder/delete your builds,
                   upload screenshots, set featured, type
                   ANY tag you want (Casino, Maze, etc.)

  Site content  -> the homepage wording and pricing:
                   - Top section (headline, intro, tags,
                     button labels, favourite-build photo)
                   - Gallery section headings
                   - Pricing tiers (names, prices, features,
                     which tier is highlighted, ribbon text)
                   - Process steps
                   - Commission section text

  Contact links -> your Discord link and email.

Edit, click Save, then Publish. The live site updates in
about a minute. No code, ever.

--------------------------------------------------
EDITING TEXT & CONTENT (the easy part)
--------------------------------------------------
Open index.html in any text editor (Notepad, VS Code, TextEdit).
Scroll to the bottom until you see:

      ★★★  EDIT YOUR CONTENT HERE  ★★★

Everything you'd want to change lives in that one block:

  HERO   -> your headline photo + the tag chips
  ROOMS  -> every room in the gallery
  TIERS  -> your pricing
  STEPS  -> the "how it works" steps

--------------------------------------------------
ADDING A ROOM TO THE GALLERY
--------------------------------------------------
1. Put your screenshot in the images/ folder.
2. In the ROOMS list, copy one whole { ... } block.
3. Paste it, then change the values:

   {
     img:   "images/my-room.png",
     name:  "My Room Name",
     size:  "wide",                   <- tile size in the bento grid
     tag:   "CASINO",                 <- the little yellow label
     about: "A sentence or two about the build.",
     meta: {
       "Room size":  "Large",
       "Built for":  "Event night",
       "Mechanics":  "Wired games",
       "Build time": "4 days",
       "Tier":       "Standard"
     }
   },

The meta rows are free-form: rename them, add more, remove some.
Whatever you write shows up in the popup when someone clicks the room.

To REMOVE a room, delete its whole { ... } block (including the comma).
To REORDER rooms, cut and paste the blocks into a different order.

HOW THE GALLERY LAYOUT WORKS
You do NOT choose tile sizes. The gallery measures each image's real
width and height, then gives it a tile of exactly that shape.

  - A wide panoramic screenshot becomes a wide tile.
  - A tall multi-floor shot becomes a tall tile.
  - Nothing is ever cropped, squashed or stretched.

Tiles are then sorted into columns so the bottom edge stays as even
as possible. The number of columns adapts automatically:

  3 columns   on desktop
  2 columns   on tablets (and small galleries)
  1 column    on phones (and when you only have a few rooms)

So you can add rooms in any shape, in any order, and the layout
sorts itself out. Just drop the screenshot in images/ and point
"img" at it.

Tip: screenshot your rooms at whatever size looks best for each
build. You do not need to crop them to a consistent shape first.

--------------------------------------------------
THE ROOM LIBRARY (index vs library page)
--------------------------------------------------
All your rooms live in ONE file now: rooms.js
Both the homepage and the library page read from it, so you
only ever edit rooms in one place.

Each room has a "featured" flag:

   featured: true   -> shows on the HOMEPAGE gallery (your
                       highlights) AND in the full library
   featured: false  -> shows ONLY in the full library

So the homepage stays a tight, curated set of your best work,
and library.html holds everything. The "View the full library"
button on the homepage links people to library.html.

The library page automatically builds filter tabs from your
room "tag" values (CASINO, EVENT, RUNWAY, etc.). Add a room with
a new tag and a new filter tab appears on its own. Nothing to
wire up.

To add a room: open rooms.js, copy a { ... } block, edit it,
set featured true or false. Done. Both pages update.

--------------------------------------------------
CHANGING PRICES + THE SIZE GUIDE IMAGES
--------------------------------------------------
In the TIERS list, each tier has:

   sizeImg:   "images/size-large.png"   <- the visual size guide
   sizeLabel: "LARGE ROOM"              <- black tag on that image
   price:     "60"
   features:  ["thing one", "thing two"]

Take a screenshot of an actual empty room at each size, drop it in
images/, and point sizeImg at it. That's what shows customers
visually what each price covers.


--------------------------------------------------
IMAGE SIZES — WHAT TO EXPORT FROM FIGMA
--------------------------------------------------
GALLERY ROOMS ............ any ratio you like
   The gallery measures each image and fits the tile to it, so
   nothing is cropped. For the tidiest columns, reuse 2-3 ratios
   rather than a different one every time. Good picks:
       16:9  ->  1600 x 900   (wide rooms, panoramas)
        4:3  ->  1600 x 1200  (standard room shot)
        3:4  ->  1200 x 1600  (tall / multi-floor builds)

HERO POLAROID ............ 4:3   ->  1200 x 900
   This one is a FIXED frame. Other ratios will be cropped
   to fit, so export at 4:3.

PRICING SIZE GUIDES ...... 16:9  ->  1280 x 720
   Also a fixed frame. One per tier, showing the room size
   that price covers.

Export as PNG. Keep files under ~500KB each so the page stays fast
(Figma: Export > PNG > 1x is usually fine).

--------------------------------------------------
ADDING AN IMAGE — THE SHORT VERSION
--------------------------------------------------
1. Export from Figma into the images/ folder.
2. Open index.html, scroll to the EDIT YOUR CONTENT block.
3. Point the right line at your file:

   Gallery room ->  img: "images/casino.png",
   Hero photo   ->  photo: "images/best-build.png",
   Price guide  ->  sizeImg: "images/size-large.png",

That is the whole process. The filename must match exactly,
including capital letters and the .png ending.

--------------------------------------------------
SPACING SYSTEM (if you edit the CSS)
--------------------------------------------------
All spacing uses an 8-point scale. Use these tokens instead of
typing raw pixel values, so everything stays aligned:

   var(--s1)    4px     hairline
   var(--s2)    8px     tight
   var(--s3)   12px     snug
   var(--s4)   16px     base
   var(--s5)   24px     comfy
   var(--s6)   32px     roomy
   var(--s7)   48px     card / section inner
   var(--s8)   64px     section
   var(--s9)   96px     large section
   var(--s10) 128px     hero

   var(--gutter)  page side margin (steps 16 > 24 > 48 > 64)
   var(--sec)     section rhythm   (steps 64 > 96)

--------------------------------------------------
CHANGING COLOURS OR FONT
--------------------------------------------------
At the very TOP of index.html, in the ":root{ }" block:
  --orange, --teal, --yellow, --blue   your accent colours
  --bg, --paper, --ink                 background / cards / text
  --shadowc                            colour of the chunky drop shadows
  --font                               the typeface

The block just below it, :root[data-theme="dark"], is the dark mode
version of those same colours (a neutral greyscale palette).

Note: in dark mode --shadowc is set to black so the chunky shadows
read as depth. In light mode it follows --ink. If you change one
palette, remember to check the other.

Do the same edits in terms.html to keep both pages matching.

--------------------------------------------------
SETTING UP COMMISSIONS (the important part)
--------------------------------------------------
Your site shows your work; this makes people able to HIRE you.
There are two ways people can reach you, and both should work:

1) THE REQUEST FORM (main way)
   a. Go to tally.so and sign up (free).
   b. Make a form with fields like:
        - Habbo name
        - Discord tag
        - Room type (Casino / Event / Runway / Game / RP / Social)
        - Size or tier (Basic / Standard / Premium)
        - What's the room for?
        - Theme & references
        - Reference images (file upload)
        - Deadline
        - Budget (credits)
   c. In Tally, turn ON email notifications so every request
      emails you.
   d. Click Share > Embed > copy the <iframe ...> code.
   e. Open index.html, search for:  PASTE YOUR TALLY
      Replace the whole <div class="form-placeholder">...</div>
      block with the <iframe> code you copied.
      The form now shows right on your page.

2) DIRECT CONTACT (backup)
   In index.html, search for:  put your real Discord
   - Change the Discord button href="#" to your Discord invite
     link (e.g. https://discord.gg/xxxx)
   - Change you@email.com to your real email.

That's the whole commission workflow:
   visitor fills form -> you get an email -> you reply.
Plus Discord/email for people who'd rather just message you.

TIP: test it yourself after publishing. Submit your own form
once and make sure the email lands.

--------------------------------------------------
PUTTING IT ONLINE (free)
--------------------------------------------------
Go to  https://app.netlify.com/drop
Drag this whole folder onto the page. Done, it's live.

Keep index.html, terms.html and images/ together in the same folder.
