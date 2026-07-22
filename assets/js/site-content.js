/**
 * SITE CONTENT
 * ============
 * This is the ONLY file you need to edit to add or remove work.
 * Don't touch the .html files unless you're changing layout/design.
 *
 * To add a new video:      copy a block inside `videos`, paste it, change the values.
 * To add a new track:      copy a block inside `tracks`, paste it, change the values.
 * To add a new photo:      copy a block inside `photos`, paste it, change the values.
 * To add a Spotify embed:  copy a block inside `spotifyAlbums`, paste it, change the id.
 *
 * After editing, commit + push to GitHub — Cloudflare Pages rebuilds automatically.
 */

window.SITE_CONTENT = {

  site: {
    name: "Charlie Allan Holmes",
    tagline: "Video. Music. Photography.",
    about: "Multidisciplinary creative working across music production, video storytelling, and photography. Each project is built on the same idea: technical precision in service of a good story.",
    email: "charlie@charlieallanholmes.com", // <-- update to your real contact email
    socials: [
      // { "label": "YouTube", "url": "https://youtube.com/@hopeprisonministries" },
      // { "label": "FaceBook", "url": "https://www.facebook.com/profile.php?id=61587004205440" },
    ]
  },

  // ---- VIDEO PRODUCTION -----------------------------------------------
  // "platform" is "youtube" or "vimeo".
  // "id" is the video ID from the URL.
  //   YouTube: youtube.com/watch?v=THIS_PART  or youtu.be/THIS_PART
  //   Vimeo:   vimeo.com/THIS_PART
  videos: [
    { platform: "youtube", id: "DdxVZu6qfTw", title: "Political Campain Demo" },
    { platform: "youtube", id: "NqjCPSHIs10", title: "Fund Raising Ad" },
    { platform: "youtube", id: "ScAEfNXG1dk", title: "Fund Raising Ad" },
    { platform: "youtube", id: "P70dvybJYCg", title: "Ronnie Fades Barber" },
    { platform: "youtube", id: "Pin-b_cU3Ts", title: "Prison Ministry" },
    { platform: "youtube", id: "Beqa3dLnL2E", title: "Interview" },
    { platform: "youtube", id: "mXdUa64PurY", title: "Interview" },
    { platform: "youtube", id: "vHl_5d49bZ8", title: "Christian Movie Preview" },
    { platform: "youtube", id: "jO_gjj_qYOk", title: "Interview" },
    { platform: "youtube", id: "kT7Xwmtdvgg", title: "Interview" },
    { platform: "youtube", id: "tTd3xcLFSSc", title: "Interview" },
    { platform: "youtube", id: "9NUpzccT-mE", title: "Interview" },
    { platform: "vimeo",   id: "1075196763", title: "Interview" },
  ],

  // ---- MUSIC PRODUCTION -------------------------------------------------
  // Spotify albums/playlists to embed. Get the id from the share link:
  // open.spotify.com/album/THIS_PART
  spotifyAlbums: [
    { id: "3rQR3lOSCky1xtndKlY107" },
    { id: "66MpGiwJKiZ0D2EHxkmqrZ" },
  ],

  // Individual tracks with a simple audio player.
  // "src" can be a link to an mp3 hosted anywhere (including your old WordPress
  // media library) or a file you've added to /assets/audio/ in this repo.
  tracks: [
    { title: "8am in Tulsa", src: "../assets/audio/8am-in-Tulsa.mp3" },
    { title: "At The Buzzer", src: "../assets/audio/At-The-Buzzer-short.mp3" },
    { title: "God Is Real", src: "../assets/audio/God-Is-Real.mp3" },
    { title: "Immortalized (Unmastered)", src: "../assets/audio/Immortalized-Unmastered-7777.mp3" },
    { title: "No Matter What", src: "../assets/audio/No-Matter-What.mp3" },
    { title: "Noodles and Coolaid (Mastered)", src: "../assets/audio/Noodles-and-Coolaid-Mastered.mp3" },
    { title: "Now I Know (Mastered)", src: "../assets/audio/Now-I-Know-Mastered.mp3" },
    { title: "OK", src: "../assets/audio/OK.mp3" },
    { title: "Outta My Face (ft. Ben Sommers)", src: "../assets/audio/Outta-My-Face-Mastered-With-Youtube-Trax-Ben-Sommers.mp3" },
    { title: "This Or That (Mastered)", src: "../assets/audio/This-Or-That-Mastered.mp3" },
  ],

  // ---- PHOTOGRAPHY -------------------------------------------------------
  // "src" is the image URL. "alt" is a short description (good for SEO + accessibility).
  photos: [
    { src: "../assets/img/IMG_0276-1536x1024.jpg", alt: "Portrait photography" },
    { src: "../assets/img/Nancy-1536x1024.jpg", alt: "Portrait photography" },
    { src: "../assets/img/Screenshot-2026-04-14-125827.png", alt: "Photography work" },
    { src: "../assets/img/Screenshot-2026-03-07-at-7.34.49-PM-1024x575.png", alt: "Photography work" },
    { src: "../assets/img/Jackson-1-1024x683.jpg", alt: "Portrait photography" },
    { src: "../assets/img/Screenshot-2026-04-14-125904.png", alt: "Photography work" },
    { src: "../assets/img/Screenshot-2026-03-30-170639-1024x578.png", alt: "Photography work" },
    { src: "../assets/img/IMG_0283-1024x683.jpg", alt: "Portrait photography" },
  ],

};
