# charlieallanholmes.com

Source for the site, built as plain HTML/CSS/JS — no build step, no framework,
so there's nothing to install or compile.

## Editing content (videos, tracks, photos, contact info)

Open **`assets/js/site-content.js`**. That's the only file you should need to
touch day-to-day. It has one array per content type — copy an existing block,
paste it, change the values, save. Comments in the file explain each field.

- New video → add a block to `videos`
- New Spotify album/playlist → add a block to `spotifyAlbums`
- New track → add a block to `tracks`
- New photo → add a block to `photos`
- Contact email / social links → edit the `site` object

Once you save and push to GitHub, Cloudflare Pages rebuilds and deploys
automatically — usually within a minute.

## Project structure

```
index.html                 → homepage
video-production/index.html
music-production/index.html
photography/index.html
assets/css/style.css       → all styling
assets/js/site-content.js  → EDIT THIS for new content
assets/js/main.js          → page behavior (rendering, lightbox, audio player)
_headers                   → Cloudflare Pages caching rules
```

## Deploying on Cloudflare Pages

1. Push this folder to a GitHub repository (see commands below).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select this repository.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**. Cloudflare gives you a `*.pages.dev` URL immediately.
6. Add your custom domain: in the Pages project → **Custom domains** → add
   `www.charlieallanholmes.com` (and `charlieallanholmes.com` with a redirect
   to `www`, or vice versa). Follow the DNS prompts — if your domain's
   nameservers are already on Cloudflare this is just a couple of clicks.

From then on, every `git push` to your main branch redeploys the site
automatically. Pull requests / other branches get their own preview URLs.

### Pushing this folder to GitHub for the first time

```bash
cd path/to/this/folder
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Notes on current content

- Video/photo/audio URLs are currently pointed at your existing WordPress
  media library (`charlieallanholmes.com/wp-content/uploads/...`) so the site
  works immediately without re-uploading anything. When convenient, download
  those files and reference local copies instead (e.g. an `assets/img/` and
  `assets/audio/` folder in this repo) so the new site doesn't depend on the
  old WordPress hosting staying online.
- Video thumbnails are pulled automatically from YouTube; Vimeo videos show a
  plain placeholder tile since Vimeo doesn't allow no-auth thumbnail fetching.
- Update the placeholder email in `site-content.js` and uncomment/add your
  social links.
