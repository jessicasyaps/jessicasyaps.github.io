# jessicasyaps.com: Media Kit Website

A one-page, animated media kit for Jessica Syaps. Vanilla HTML/CSS/JS, no build step, deploys straight to GitHub Pages.

## File structure

```
index.html      — page markup
styles.css      — all styling (pink scrapbook aesthetic, responsive, animations)
script.js       — renders data.js into the page, charts, scroll reveals, toggles
data.js         — every number, brand, and video URL, edit this file to update the site
assets/
  favicon.svg
  photos/       — hero photo, about photo, work thumbnails (see photos/README.txt)
  brands/       — brand logo files (see brands/README.txt)
CNAME           — custom domain for GitHub Pages
.nojekyll       — tells GitHub Pages not to run Jekyll processing
```

## Editing the content

### Numbers & stats
Everything (follower counts, viewer demographics, 60 day performance, traffic sources)
lives in **`data.js`** as one big `DATA` object, organized under `tiktok`, `instagram`,
`youtube`, and `headline`. Change a value there and it updates everywhere it's used on the
page (stat tiles, charts, count-up numbers). Nothing is hardcoded in `index.html`.

The reporting window lives in `DATA.period` (`label` and `range`) and shows up on the Reach
& Performance section automatically.

### Photos
Drop files into `assets/photos/` using the exact names already referenced in `data.js`:
- `hero-cutout.png`: hero section cutout photo
- `about.jpg`: About section photo
- `work-1.jpg`, `work-2.jpg`, `work-3.jpg`: thumbnails for the "What I make" section

Until a photo is added, the site shows a friendly "add photo" placeholder, nothing breaks.

### What I make (pillars + videos)
Edit the `content` array in `data.js`, one entry per card:

```js
content: [
  {
    title: "Travel", emoji: "✈️", desc: "London day trips, Romania visits, and the chaos of budget flights.",
    url: "https://www.tiktok.com/@jessicasyaps/video/REAL_ID",
    caption: "London vs. Romania: grocery shop edition.",
    poster: "assets/photos/work-1.jpg"
  },
]
```

Each card shows the pillar's emoji/title/description up top, then the video underneath.
Paste a real TikTok video URL in `url` and the site will automatically lazy-load TikTok's
official embed player once that card scrolls into view (keeps first paint fast on mobile).
Until a real URL is added, the card shows a "video coming soon" placeholder in that space;
once added, the poster image (or a "tap to watch" fallback) links out to TikTok until the
embed script takes over.

**Video format**: no file upload needed, everything runs off the TikTok URL. Just replace
the placeholder link (the ones ending in a long string of `0`s) with the real
`https://www.tiktok.com/@jessicasyaps/video/…` link for that post. For the optional
`poster` fallback image, use a portrait photo matching TikTok's 9:16 shape (roughly
600×1067px, JPG or PNG, ideally under 300KB, since it is only shown briefly before the
real embed loads).

### Brand logos, videos, and websites
Each entry in the `brands` array has four optional fields:

```js
{ name: "Trip.com", logo: "assets/brands/trip.webp", videoUrl: null, poster: null, website: null }
```

- `logo`: the real logo file lives in `assets/brands/` (`trip.webp`, `temu.png`,
  `tocobo.avif`). Any image format works, just make sure the path matches the actual
  filename and extension. Until a logo file exists, that tile falls back to a clean text
  wordmark of the brand name.
- `videoUrl` / `poster`: same as the "What I make" cards above, paste the TikTok video URL
  made for that brand and the tile will lazy-load the embed underneath the brand name.
  Leave both `null` and the tile shows a "video coming soon" placeholder instead.
- `website`: the brand's site. When set, a "Visit website" link appears at the bottom of the
  tile, opening in a new tab. Leave it `null` to hide the link.

### YouTube
Fill in the `youtube` object in `data.js` (handle, channel URL, `subscribers`, and `views`)
once the channel has real numbers. The hero button and contact link already point at
`youtube.url`. A YouTube stat tile is intentionally left out of Reach & Performance until
real numbers exist, so the site never shows an invented or blank metric.

### Adding/removing a brand or video
Just add or remove an entry from the `brands` or `content` array in `data.js`, the grid
re-renders automatically, no HTML edits needed.

## Running locally

No build step, just open `index.html` in a browser, or serve it locally:

```
npx serve .
```

(A local server is only needed if you want TikTok embeds to load, browsers block some
embed behavior on `file://` URLs. Everything else works by double-clicking `index.html`.)

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `jessicasyaps-media-kit`) and push all of these
   files to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch", branch
   `main`, folder `/ (root)`. Save.
4. GitHub will publish the site at `https://<username>.github.io/<repo-name>/` within a
   minute or two.

### Pointing jessicasyaps.com at GitHub Pages

1. In the same repo, the `CNAME` file already contains `jessicasyaps.com`, GitHub Pages
   reads this automatically once you add the custom domain in **Settings → Pages →
   Custom domain**.
2. At your domain registrar (wherever `jessicasyaps.com` is registered), add these DNS
   records:

   **For the root domain (`jessicasyaps.com`)**: add four `A` records pointing to GitHub's
   IPs:
   ```
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   ```

   **For `www.jessicasyaps.com`** (optional, recommended): add a `CNAME` record:
   ```
   CNAME    www    <username>.github.io.
   ```
3. Back in **Settings → Pages**, enter `jessicasyaps.com` as the custom domain and wait
   for DNS to propagate (can take a few minutes to a few hours). Once verified, tick
   **Enforce HTTPS**.

That's it, the site is fully static, so there's nothing else to configure server-side.

## Notes

- All metrics come from `data.js` only, no backend, no analytics API, no invented numbers.
- The Audience section has platform tabs (TikTok / Instagram). Only TikTok has a
  Followers ⇄ Viewers toggle, since Instagram's data is a single audience set. Each
  platform's age chart uses its own real brackets, they don't match on purpose.
- The Reach & Performance section pairs each platform's numbers side by side (stat grids
  and traffic sources), so no card sits stranded without its counterpart.
- Full `prefers-reduced-motion` support: scroll reveals, count-ups, and parallax are all
  disabled in favor of final states when the user's OS requests reduced motion.
- The print/PDF A4 version (if you have one) can live alongside this as a separate file,
  this website is the primary deliverable.
