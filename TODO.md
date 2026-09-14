# TODO — 4 Shams virtual CD player

Legend: `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[?]` needs decision

## Phase 0 — Setup
- [x] Create project folder `4 Shams` + `/audio` subfolder
- [x] Create TODO.md and PROJECT_STATE.md
- [x] Confirm authoritative track order (typed list is correct)
- [x] Encode all 17 tracks into `/audio` at 160 kbps, correct order, id3 titles

## Phase 1 — Structure & markup
- [x] index.html: closed player shell (top-loading portable CD player)
- [x] Markup: CD tray + flip-up lid, LCD, transport buttons, eject, volume
- [x] Link CSS + JS, no external assets
- [x] Structure verified by serving locally (HTTP 200 on index/css/audio)

## Phase 2 — Audio engine
- [x] Load playlist from central track list (JS TRACKS)
- [x] play / pause / next / prev
- [x] progress (time, duration, bar + LCD segments)
- [x] volume control (+ mute)
- [x] track direct selection (tracklist)
- [x] graceful failure handling (error/stalled hints)
- [x] Verified end-to-end in real headless Chrome (audio plays, time advances, volume applies, last-resort error path)

## Phase 3 — CD playback animation
- [x] Disc spins while playing, freezes when paused
- [x] Verified via animationPlayState in headless Chrome

## Phase 4 — Opening sequence
- [x] Closed player → OPEN → flip-up lid → INSERT DISC → tap disc → CLOSING… → READING… → READY(play enabled)
- [x] Re-open tray pauses playback
- [x] Autoplay-safe: playback only after explicit user gesture
- [x] Verified full sequence in headless Chrome

## Phase 5 — LCD marquee
- [x] Scrolling title + artist, measured px (enters right, exits left), reduced-motion aware
- [x] Verified animation running in ready & playing states

## Phase 6 — Responsive polish
- [x] Mobile-first; tap targets 54–61 px; no horizontal scroll (320/375/390/768/1280 checked)
- [?] Human visual check still needed (this model cannot judge aesthetics — screenshots saved for the user)
- [ ] Apply tweaks from user's real-phone check

## Phase 7 — Privacy / discoverability
- [x] robots.txt + <meta name="robots"> noindex
- [x] Decision: keep site unlisted (link-based), no password gate

## Phase 8 — Deployment prep
- [x] Local preview double-check (double-click index.html verified via file://)
- [x] Deployment target decided: GitHub Pages (no git needed — browser upload)  →  *NOTE: web-UI upload failed on audio ("file too large"); deployed via local git push instead*
- [x] User creates GitHub account (username: Tommi35) and repo `4-shams`
- [x] Upload all files (git clone + push from this machine, one-time browser sign-in)
- [x] Enable Pages (branch main) in repo settings → LIVE at https://tommi35.github.io/4-shams/
- [x] Open the live link and verify (HTTP 200; index/app.js/audio all fetched OK — done headless, not yet on a phone)

## Phase 9 — Shams-test
- [ ] User opens https://tommi35.github.io/4-shams/ on a real phone (Wi-Fi + mobile data) and reports what works/feels wrong

## Phase 10 — Refinement: SONY CFD-330 boombox restyle (see REFINEMENT_PLAN.md)
- [x] A1. TRACKS array → 14 rows (3 removed, renumbered 01–14)
- [x] A2. /audio: deleted here-comes-the-sun, weak-for-your-love, masterpiece; renamed 5 to new numbers
- [x] A3. Booklet sub → `14 TRACKS · 51 MIN`
- [x] A4. Verified headless Chrome: 14 rows, direct-select all 14 = right src + plays, all audio 200/206, no 404s, no console errors; counter chain (01–14) verified
- [x] B. Boombox identity & realism (brand split, anatomy, CSS pass) — 49-check headless suite all PASS
- [x] C. Pastel floral sticker decor (inline SVG) — 6 stickers (daisy×2, clover, sun, heart, star), aria-hidden + pointer-events:none, cluster on deck plate right edge + heart wrapping grille top + star on lid corner; 42-check headless suite PASS at 320→1280 (no overlaps, no h-scroll, state machine unchanged)
- [x] D. Local verification: full combined E2E + layout audit + screenshots — 62-check suite PASS (A+B+C together, incl. `file://` double-click check); `shot-2-{off,open,ready,playing,desktop-ready,file}.png` saved
- [x] E1. Docs updated (TODO / PROJECT_STATE / REFINEMENT_PLAN progress logs) + REFINEMENT_PLAN.md added to repo
- [x] E2. Temp clone synced: `git rm` deleted 3 removed tracks, `git mv` renamed 5 (100% similarity = history kept); copied index/css/js/robots/docs; commit `c34ee5a` → pushed `main`
- [x] E3. Live verified: index/css/js 200, renamed audio 200, removed tracks all 404; headless render of live URL 11/11 PASS (14 rows, 6 stickers, ready→playing); `shot-live.png`
- [ ] E4. User: real-phone Shams-test v2 on live URL (Wi-Fi + mobile data) → report → apply tweaks