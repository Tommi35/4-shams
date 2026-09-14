# PROJECT_STATE — 4 Shams virtual CD player

> Single source of truth. Read this first at the start of every session. If anything here contradicts the files on disk, STOP and reconcile before changing code.

## Current phase / task
**Deployed and LIVE** at https://tommi35.github.io/4-shams/ (HTTP 200 verified; index, app.js, audio all served). Remaining: the real-phone Shams-test (Phase 9). Rough completion: ~90%.

## What's done (VERIFIED by me this session)
- Project folder `C:\Users\xale\Desktop\4 Shams` — self-contained.
- Audio: 17 mp3 tracks encoded at 160 kbps into `/audio` (`01-…` … `17-…`), order per user's typed list, id3 title/artist embedded. ~98 MB total. Source files untouched in `C:\Users\xale\Desktop\disco Shams`.
- `index.html` — top-loading portable CD player: flip-up lid over a disc, LCD, transport buttons (prev/play/next/eject), volume + mute, track booklet, footer.
- `css/styles.css` — plain CSS; mobile-first; warm cream/brass palette; no external fonts/services.
- `js/app.js` — plain JS: power state machine (off → open → closing → reading → ready → playing/paused), audio engine, direct track select, volume/mute, LCD marquee (measured Web Animations, reduced-motion aware), graceful error/stall hints.
- `robots.txt` (Disallow /) + `<meta name="robots" content="noindex,nofollow">`.

## Testing I actually ran (real headless Chrome, DevTools Protocol)
- 23-check end-to-end suite: lid open → disc load → play → time advances → disc spins → next/prev → pause freeze → direct track select → volume → eject-pauses. **All PASS, zero console errors / uncaught exceptions.**
- Marquee animation running in ready & playing; progress bar updates (0:02 / 3:48, 1%).
- Layout audit at 320/375/390/768(width)/1280: no horizontal scroll; tap targets 54–61 px; device fits viewport.
- Screenshots saved for the user (this model cannot view images):
  `C:\Users\xale\AppData\Local\Temp\opencode\shot-mobile-{off,open,ready,playing}.png`, `shot-desktop-ready.png`

## What is NOT yet verified — needs the USER
- Aesthetics / real-phone feel + real audio playback on a phone browser & mobile data (the Shams-test).

## Known bugs / limitations
- Audio errors show a hint and return to ready (last-resort; not provoked in tests).
- Netlify Drop 100 MB limit: irrelevant now — GitHub Pages in use (no such limit).
- GitHub web-UI upload refused a ~49 MB audio batch with "file too large" (no single file >25 MB); solved by `git clone` + `git push` from this machine instead.
- Single shared <audio> element: no crossfade (by design, keeps it simple).

## Decisions made
- English interface. Names: folder/site/disc = `4 Shams`. No personal note. The `.webp` in Downloads is unrelated (ignored).
- Typed 17-track list is the authoritative order (numbers on 3 source filenames are stale).
- Re-encoded to 160 kbps mp3. Originals untouched.
- Design: portable top-loading CD player, flip-up lid, warm cream/brass, LCD marquee, spin-on-play, autoplay-safe flow.
- Single <audio> element, no frameworks, no build step, no external requests.

## Needs my input (open decisions)
1. **Access control:** DECIDED — keep the site **unlisted** (robots.txt + noindex; open to anyone with the link; not indexed, not private). No password gate.
2. **Deploy target:** DECIDED — **GitHub Pages** (browser-based upload, no git skills needed, no size concerns for ~98 MB). Deploy step needs the user's free GitHub account → guided one step at a time.

## Files in the project (current)
- `index.html` — page + player + booklet markup
- `css/styles.css` — all styling
- `js/app.js` — all logic + track list
- `audio/01-walking-into-sunshine.mp3` … `audio/17-apocalypse.mp3`
- `robots.txt` — no-index
- `PROJECT_STATE.md`, `TODO.md` — state files

## Preview / deploy
- Preview: double-click `index.html` in the folder (verified working over `file://`). For best fidelity serve it: `python -m http.server` inside the folder, open `http://127.0.0.1:8000/`.
- **LIVE: https://tommi35.github.io/4-shams/** — GitHub Pages, unlisted (robots.txt + noindex), open to anyone with the link.
- How it got there (for reference): user created GitHub account (Tommi35); web-UI upload failed on audio batch → used git already installed on this machine: `git clone` repo in Temp, copied files, `git add -A && git commit && git push` (one-time browser sign-in), then Settings → Pages → Deploy from branch `main` / root.
- Future updates: same temp clone at `C:\Users\xale\AppData\Local\Temp\opencode\deploy-4shams` (copy new files → commit → push), or simply re-do via GitHub web UI for small changes.

## Progress log
- 2026-09-14 — Read prompt; asked section-3 questions; got names/lang/order; found track-order conflict; user confirmed typed order.
- 2026-09-14 — Encoded 17 tracks to /audio (160 kbps); scaffold + TODO + PROJECT_STATE created.
- 2026-09-14 — Block 1 (structure/CSS) built; served locally OK.
- 2026-09-14 — Block 2/3/4/5 built (JS audio engine, spin, opening sequence, marquee); 23-check headless-Chrome suite PASS; marquee/progress verified; layout audit clean; robots.txt added.
- 2026-09-14 — `file://` (double-click) verified. Decisions: unlisted + GitHub Pages. Ready for user hand-off.
- 2026-09-14 — DEPLOYED: user created account (Tommi35) + repo `4-shams`; web upload failed on audio ("file too large", irrelevant to real sizes) → pushed via git; Pages enabled on `main`; live at https://tommi35.github.io/4-shams/, HTTP 200, app.js + audio verified. Next: real-phone Shams-test.