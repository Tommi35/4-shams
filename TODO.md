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

## Visual revamp (VISUAL_REVAMP_PLAN.md)
- [x] BLOCK 1. Silhouette & proportions — 3-zone boombox grid [spk-l | center | spk-r], center column wraps tray+deck+vol, landscape body at 375/390/768/1280 (1.07–1.22:1) + squat near-square at 320 (0.91:1), disc 96–100px scaled, grille hidden, stickers re-anchored inside device, `.grille` kept for Block 4; 10-check layout audit all PASS + 18-check state-machine smoke all PASS (incl. full off→open→closing→reading→ready→playing, next/prev/pause/mute/eject/direct-select), zero console errors. Screenshots `shot-4-{off,ready,playing,desktop}-b1.png`. Tap floor = 44px (documented). Block 4 next (also run in same pass if allowed).
- [x] BLOCK 2. CD disc rainbow realism — `.disc` base rebuilt as layered full-spectrum conic gradients (violet→red, desaturated) over the kept groove texture + second low-opacity rainbow conic at a different start angle (40° vs 168°) so bands moiré/sweep while spinning; spindle ring (`.disc::before`) kept/retuned as a clear-plastic ring around the label; `.disc-label` redesigned as a printed cream sticker (wordmark "4 SHAMS" + "14 TRACKS · 51 MIN", concentric tint + paper grain, die-cut shadow, charcoal ink, aria-hidden + pointer-events:none); spin on play + reverse spin moved onto the label, reduced-motion → 9s. Behavior invariant (click disc→load, spin/freeze, power state machine untouched, `js/app.js` not modified). Verified headless: disc anatomy (2 conics, grooves, spindle, label art/a11y), 14-check state-machine smoke (off→open→ready→playing, next/prev/pause-freeze/mute/eject/direct-select all unchanged), reduced-motion 9s on both layers, layout audit 320/375/390/768/1280 (no h-scroll, disc inside tray, label inside disc, stickers inside device + clear of controls, controls ≥44px, lid covers tray), zero console/page/network errors + all css/js/mp3 200. Screenshots `shot-2-b2-{off,open,ready,playing,desktop}.png`. **Block 4 SKIPPED for this pass (user: "skip Block 4"); Block 3 next.**
- [x] BLOCK 3. Buttons/controls material — glossy cream circles → matte charcoal pill keys (~30–34px tall, fine ~10% top bevel, NO sheen) on ≥44px tap boxes; `.ctrl-play` keeps no brass — distinguished by size + solid printed-white glyph only (48×46, svg 24px `--glyph-solid`); prev/play/pause/next/eject icons redrawn as printed-white svg glyphs (22px `--glyph`, opacity .88, soft drop-shadow), `aria-label` + `:disabled` logic untouched (dim 0.4); volume → black/white slider, fill `--track-on→--track-off` via `--vol`, matte charcoal 16px thumb with vertical grip ridge + notched track, mute matches, `.vol-range:disabled` dimmed; all brass/gold swept off device surfaces — tray-recess glow, open recess + well now neutral charcoal (`--brass*` kept defined, used ONLY by booklet/tracklist). Verified headless: 7 material checks (pill keys, no sheen/brass on device, printed-white glyphs, black/white slider, matte notched thumb) + state-machine smoke (off/open → prev/play/next/vol/mute disabled, eject ALWAYS enabled; ready/playing → all enabled, scrub, mute, pause-freeze — all unchanged; `js/app.js` not modified) + 5-viewport layout audit (320/375/390/768/1280: no h-scroll, tap ≥44px, pill 30–34px, no overlaps) + zero console/page/network errors + css/js/mp3 all 200. Screenshots `shot-2-b3-{off,open,ready,playing,desktop}.png`. Deployed with Block 2 (both live). **Block 4 still SKIPPED; next = BLOCK 5 (flanking round speakers).**
- [x] BLOCK 4. Speakers, handle & antenna — `.spk` placeholders → real flanking speakers (dot-matrix mesh cloth over a dark centre cone, wrapped in a fine plastic bezel ring via 4 concentric inset shadows, 3 screw dots on the rim, printed "STEREO" micro-label centred on each grill, all `aria-hidden`); old full-width `.grille` strip **deleted** (markup + CSS, STEREO merged onto the speaker bezels); handle recess → **foldable metal carry bar** arcing across the top (`border-radius: 50% / 100% 100% …` = arched top edge) hinged in two chrome brackets at the top corners, `pointer-events:none` + `aria-hidden`, z-index above the antenna; **telescoping back antenna** at the top-right corner (thin chrome mast, 3 segments with 2 seam bands, chrome tip ball + base stud, rotated ~-14°/16° leaning slightly inward so it never causes h-scroll, `pointer-events:none`, `aria-hidden`, z-index 0 behind the handle). `js/app.js` untouched; no JS edits. Verified headless: 21 material checks (count/round/mesh/ring/screws/STEREO×2, handle bar+brackets+arc+metal, antenna rotate+seams+tip+base, grille fully gone from markup AND stylesheet, all `aria-hidden` + `pointer-events:none`) + 21-check state-machine smoke (off→open→ready→playing→paused, next/prev/scrub→84%/mute/eject/direct-select, disc spin, eject always enabled) + 5-viewport layout audit (320/375/390/768/1280: no h-scroll, device fits, speakers≤136px round & clear of center controls, antenna inside viewport, handle/speakers/antenna clear of lid, controls ≥44px, pills 34px tall, stickers inside & clear of controls) + zero console/page/network errors + css/js/mp3 all 200. Screenshots `shot-2-b4-{off,open,ready,playing,desktop}.png`. **Next = BLOCK 5 (stickers: placement & style), then (6), 7.**
- [x] BLOCK 5. Stickers — placement & style — cut 6 → **3** (kept the pastel flower/star/heart art language), re-anchored onto real surfaces of the post-Block-4 geometry: `.s1-daisy` (flower) on the front panel's lower-left flat area (clear of the left speaker, low on the face); `.s6-star` stays in the lid's front-left corner (child of `#lid`, keeps rotating with the flip, fully inside the lid); `.s5-heart` moved INSIDE `.spk-r` anchored to the right speaker's outer bezel edge (sized via `calc(var(--spk) * .30)` so it scales with the speaker, `right:-9% bottom:-5%` hug the rim). Old absolute-px cluster `.s3-clover`/`.s2-daisy-mini`/`.s4-sun` deleted from markup AND stylesheet incl. their pre-Block-1 `@media` overrides; the optional 4th (moon/music note) was **skipped** — the deck column has no empty flat surface at ≤640 (LCD + full-width keypad fill it), so a 4th would crowd (the plan's own "only if it doesn't crowd" gate). `.sticker` recipe kept unchanged (tilt −3°…+3°, worn drop-shadow, matte paper gradient, `pointer-events:none` + `aria-hidden`, `user-select:none`). Verified headless (PORT 9232): 18 material checks (3 stickers exactly, old cluster gone from markup + CSS, heart anchored in `.spk-r` + touching bezel, flower lower-left + clear of left speaker, star child of lid, tilts −1.5/1.8/−2°, paper gradient + drop-shadow + pe:none + no-select + aria-hidden on all) + 21-check state-machine smoke (off→open→ready→playing→paused, next/prev/scrub→84%/mute/eject/direct-select, disc spin, eject always enabled — **ALL PASS**) + 5-viewport layout audit (320/375/390/768/1280: no h-scroll, stickers inside device & clear of LCD/keys/vol/mute, star inside lid front-left corner, controls ≥44px, pills ~30-40px) + zero console/page/network errors + css/js/mp3 all 200. Screenshots `shot-2-b5-{off,open,ready,playing,desktop}.png`. `js/app.js` untouched. **Next = BLOCK 6 (optional decorative cassette deck, awaiting go-ahead) then BLOCK 7 (full regression + redeploy + file:// check).**
- [x] BLOCK 6. Decorative double cassette deck (OPTIONAL, done — kept it low-risk, purely decor) — below the LCD, inside the command stack (`.deck`), a `.cassette` row of **two smoked windows side by side** mirroring the real CFD-330's cassette doors: each `.cass-door` = dark smoked glass (translucent charcoal gradients + faint parallel grain), rounded door outline (`inset 0 0 0 1px` dark ring), thin bezel (`inset 0 0 0 3px` light ring), a tape-hub reel dot (`.cass-hub`, dark spindle + metallic ring) + a tiny pinch-roller dot (`.cass-pinch`) — all `aria-hidden`, `pointer-events:none`, `user-select:none`, **zero JS** (`js/app.js` untouched). Never intercepts play/prev/next/eject/volume (verified: every `.cass-door` clear of LCD/keys/vol/mute at 320/375/390/768/1280). Height budget respected — 24–32px row on mobile (20px doors at ≤359, 42px doors at ≥640); the keypad moved down only a few px, all tap targets still ≥44px, pills 30–40px. The optional-4th-sticker note stays SKIPPED (the cassette sits below the LCD; still no flat surface beside it at ≤640). Verified headless (PORT 9234): 15 cassette material checks (2 windows side by side, smoked glass, outline + bezel, hub + pinch dots, below the LCD, inside the device, clear of controls, aria-hidden + pe:none) + 20-check state-machine smoke (off→open→ready→playing→paused, next/prev/scrub→84%/mute/eject/reload/direct-select, disc spin, eject ALWAYS enabled, disabled arrays `[true,true,true,false,true,true]` → all-enabled — `js/app.js` untouched) + 5-viewport layout audit (320/375/390/768/1280: no h-scroll, device fits, controls ≥44px, pills ~30-40px tall, stickers/speakers/antenna unchanged) + zero console/page/network errors + css/js/mp3 all 200. Screenshots `shot-2-b6-{off,open,ready,playing,desktop}.png`. Deployed + live verified. **Next = BLOCK 7 (full regression + redeploy + file:// check).**

## Refinement — SONY CFD-330 boombox restyle (see REFINEMENT_PLAN.md)
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