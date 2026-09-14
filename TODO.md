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
- [x] Deployment target decided: GitHub Pages (no git needed — browser upload)
- [ ] User creates GitHub account (first step of deployment) — when ready
- [ ] Upload folder via GitHub web UI (drag & drop)
- [ ] Enable Pages (branch main) in repo settings
- [ ] Open the live link on a real phone (Shams-test)

## Phase 9 — Shams-test
- [ ] User opens on a real phone and reports what works/feels wrong