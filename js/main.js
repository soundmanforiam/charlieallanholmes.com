// =========================================================
// Small helpers
// =========================================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const C = window.SITE_CONTENT || { videos: [], tracks: [], photos: [], spotifyAlbums: [], site: {} };

// =========================================================
// Nav toggle (mobile)
// =========================================================
function initNav() {
  const toggle = $('.nav-toggle');
  const links = $('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('is-open');
  });
  // Mark current page link active
  const path = window.location.pathname.replace(/index\.html$/, '');
  $$('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      a.classList.add('is-active');
    }
  });
}

// =========================================================
// Live timecode in header (subtle signature detail)
// =========================================================
function initTimecode() {
  const el = $('[data-timecode]');
  if (!el) return;
  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss}`;
  }
  tick();
  setInterval(tick, 1000);
}

// =========================================================
// Video grid + lightbox
// =========================================================
function embedUrlFor(video) {
  if (video.platform === 'youtube') {
    return `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;
  }
  if (video.platform === 'vimeo') {
    return `https://player.vimeo.com/video/${video.id}?autoplay=1`;
  }
  return '';
}

function thumbUrlFor(video) {
  if (video.platform === 'youtube') {
    return `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  }
  return null; // vimeo: no-key thumbnail isn't reliable, we show a styled placeholder instead
}

function renderVideoGrid() {
  const grid = $('[data-video-grid]');
  if (!grid) return;
  const limit = grid.dataset.limit ? parseInt(grid.dataset.limit, 10) : C.videos.length;

  grid.innerHTML = C.videos.slice(0, limit).map((v, i) => {
    const thumb = thumbUrlFor(v);
    const num = String(i + 1).padStart(2, '0');
    return `
      <div class="video-card" data-video-index="${i}" tabindex="0" role="button" aria-label="Play ${v.title}">
        <div class="video-thumb">
          ${thumb
            ? `<img src="${thumb}" alt="${v.title}" loading="lazy">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1B1A22,#232129);color:#93909f;font-family:var(--font-mono);font-size:0.75rem;letter-spacing:.1em;">VIMEO</div>`}
          <div class="play-btn"><span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></div>
        </div>
        <div class="video-meta">
          <span class="idx">REEL ${num}</span>
          <span class="title">${v.title}</span>
        </div>
      </div>
    `;
  }).join('');

  $$('[data-video-index]', grid).forEach(card => {
    const open = () => openVideoLightbox(C.videos[parseInt(card.dataset.videoIndex, 10)]);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

function openVideoLightbox(video) {
  const lb = $('#video-lightbox');
  if (!lb) return;
  const frame = $('.lightbox-frame', lb);
  frame.innerHTML = `<iframe src="${embedUrlFor(video)}" title="${video.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  lb.classList.add('is-open');
}

function closeVideoLightbox() {
  const lb = $('#video-lightbox');
  if (!lb) return;
  lb.classList.remove('is-open');
  $('.lightbox-frame', lb).innerHTML = ''; // stop playback
}

// =========================================================
// Photography masonry + lightbox
// =========================================================
function renderPhotoGrid() {
  const grid = $('[data-photo-grid]');
  if (!grid) return;
  const limit = grid.dataset.limit ? parseInt(grid.dataset.limit, 10) : C.photos.length;

  grid.innerHTML = C.photos.slice(0, limit).map((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `
      <div class="masonry-item" data-photo-index="${i}" tabindex="0" role="button" aria-label="View photo ${num}">
        <img src="${p.src}" alt="${p.alt || ''}" loading="lazy">
        <span class="frame-tag">FRAME ${num}</span>
      </div>
    `;
  }).join('');

  $$('[data-photo-index]', grid).forEach(item => {
    const open = () => openPhotoLightbox(C.photos[parseInt(item.dataset.photoIndex, 10)]);
    item.addEventListener('click', open);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

function openPhotoLightbox(photo) {
  const lb = $('#photo-lightbox');
  if (!lb) return;
  $('.lightbox-photo', lb).innerHTML = `<img src="${photo.src}" alt="${photo.alt || ''}">`;
  lb.classList.add('is-open');
}

function closePhotoLightbox() {
  const lb = $('#photo-lightbox');
  if (!lb) return;
  lb.classList.remove('is-open');
}

function initLightboxes() {
  $$('.lightbox').forEach(lb => {
    lb.addEventListener('click', e => {
      if (e.target === lb) { closeVideoLightbox(); closePhotoLightbox(); }
    });
  });
  $$('.lightbox-close').forEach(btn => {
    btn.addEventListener('click', () => { closeVideoLightbox(); closePhotoLightbox(); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeVideoLightbox(); closePhotoLightbox(); }
  });
}

// =========================================================
// Spotify embeds
// =========================================================
function renderSpotify() {
  const grid = $('[data-spotify-grid]');
  if (!grid) return;
  grid.innerHTML = C.spotifyAlbums.map(a => `
    <iframe src="https://open.spotify.com/embed/album/${a.id}?utm_source=generator&theme=0"
      width="100%" height="352" frameborder="0" loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
  `).join('');
}

// =========================================================
// Track list with single shared audio player
// =========================================================
function renderTracklist() {
  const list = $('[data-tracklist]');
  if (!list) return;

  list.innerHTML = C.tracks.map((t, i) => `
    <div class="track" data-track-index="${i}">
      <span class="num">${String(i + 1).padStart(2, '0')}</span>
      <span class="track-title">${t.title}</span>
      <button class="play" aria-label="Play ${t.title}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <audio src="${t.src}" preload="none"></audio>
    </div>
  `).join('');

  let currentlyPlaying = null;

  $$('.track', list).forEach(trackEl => {
    const btn = $('.play', trackEl);
    const audio = $('audio', trackEl);

    btn.addEventListener('click', () => {
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        const prevBtn = currentlyPlaying.parentElement.querySelector('.play');
        if (prevBtn) setPlayIcon(prevBtn, false);
      }
      if (audio.paused) {
        audio.play();
        currentlyPlaying = audio;
        setPlayIcon(btn, true);
      } else {
        audio.pause();
        setPlayIcon(btn, false);
      }
    });

    audio.addEventListener('ended', () => setPlayIcon(btn, false));
  });

  function setPlayIcon(btn, playing) {
    btn.classList.toggle('is-playing', playing);
    btn.innerHTML = playing
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>`
      : `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  }
}

// =========================================================
// Contact + site meta injection
// =========================================================
function renderSiteMeta() {
  $$('[data-site-name]').forEach(el => el.textContent = C.site.name);
  $$('[data-site-tagline]').forEach(el => el.textContent = C.site.tagline);
  $$('[data-site-about]').forEach(el => el.textContent = C.site.about);
  $$('[data-site-email]').forEach(el => { el.textContent = C.site.email; el.href = `mailto:${C.site.email}`; });

  const socialsEl = $('[data-site-socials]');
  if (socialsEl && C.site.socials && C.site.socials.length) {
    socialsEl.innerHTML = C.site.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('');
  }
}

// =========================================================
// Init
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTimecode();
  renderVideoGrid();
  renderPhotoGrid();
  renderSpotify();
  renderTracklist();
  renderSiteMeta();
  initLightboxes();
});
