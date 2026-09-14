# REFINEMENT_PLAN — 4 Shams boombox restyle

> What we are changing and how. Read together with TODO.md and PROJECT_STATE.md.
> Legend: `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[?]` needs decision
> Rule: ONE block at a time, one message per block, verified before claiming done.
> Every change stays self-contained: plain CSS/JS + inline SVG, NO external fonts, images, or requests.

## Decisions (locked with the user)
- Reference model: **Sony boombox style** (CFD-class). The **player** carries the brand → badge `SONY` + model `CFD-330`.
- The **disc** (and album/booklet/footer/site title) is **4 SHAMS**.
- Remove 3 tracks; remaining **14** renumbered `01`–`14`, booklet says `14 TRACKS · 51 MIN` (verified total 51 min 33 s).
- Sticker theme: pastel floral/cute (daisies, clover, tiny sun, heart), tilted + worn look, `pointer-events: none`. My design; user can veto.
- All playback logic/state machine unchanged — visuals/labels/catalog only.

## Final 14-track order (file name → title)
| #  | file | title | artist |
|----|------|-------|--------|
| 01 | 01-walking-into-sunshine | Walking Into Sunshine | Central Line |
| 02 | 02-lovely-day | Lovely Day | Bill Withers |
| 03 | 03-in-your-eyes | In Your Eyes | Johnny Osbourne |
| 04 | 04-can-i-call-you-rose | Can I Call You Rose | Thee Sacred Souls |
| 05 | 05-parking-lot | Parking Lot | Anderson .Paak |
| 06 | 06-one-in-a-million | One In A Million | Half Pint |
| 07 | 07-see-you-again | See You Again | Tyler, The Creator |
| 08 | 08-butterflies | Butterflies | Brent Faiyaz |
| 09 | 09-sfiorivano-le-viole | Sfiorivano le viole | Rino Gaetano |
| 10 | 10-is-this-love | Is This Love | Bob Marley & The Wailers |
| 11 | 11-window | Window | Still Woozy |
| 12 | 12-amore-che-vieni-amore-che-vai | Amore che vieni, amore che vai | Fabrizio De André |
| 13 | 13-kiss-of-life | Kiss of Life | Sade |
| 14 | 14-apocalypse | Apocalypse | Cigarettes After Sex |

---

## Phase A — Catalog cleanup (14 tracks)
- [x] A1. `js/app.js` — replace the 17-item TRACKS array with the 14 rows above (order + file names as in the table).
- [x] A2. `/audio` — delete `10-here-comes-the-sun.mp3`, `12-weak-for-your-love.mp3`, `14-masterpiece.mp3`; rename `11-is-this-love`→`10-is-this-love`, `13-window`→`11-window`, `15-amore-che-vieni-amore-che-vai`→`12-amore-che-vieni-amore-che-vai`, `16-kiss-of-life`→`13-kiss-of-life`, `17-apocalypse`→`14-apocalypse`. (In the deploy clone use `git mv` to keep history; on Desktop rename freely.) — DONE on Desktop; clone rename deferred to E2 via `git mv`.
- [x] A3. `index.html` — booklet sub line: `17 TRACKS &middot; 65 MIN` → `14 TRACKS &middot; 51 MIN`.
- [x] A4. Verify: headless Chrome — tracklist renders 14 rows; direct select jumps to the right track; no 404s on audio. — 14 checks PASS: 14 rows, counter chain 01–14 verified, direct-select all 14 → correct src + playback, every audio URL 200/206, removed tracks never requested, no console errors.

## Phase B — Boombox identity & realism
### B1 — Branding split (`index.html` + small JS text)
- [x] Player body nameplate: `SONY` + model `CFD-330`.
- [x] Lid printed mark: `SONY` (was `4 SHAMS`).
- [x] LCD top line `#lcdName`: `SONY` (was `4 SHAMS`).
- [x] Disc label `.disc-label`: stays `4 SHAMS`.
- [x] Booklet `<h1>`, footer, `<title>`: stay `4 SHAMS`.
- [x] `aria-label` on `#device` → `4 Shams CD boombox`; lid/disc/hint copy re-worded for a boombox.
- [x] `HINTS` copy in `js/app.js` where it names actions (Open door, Insert disc…). — off → `Press OPEN to lift the lid`.

### B2 — Markup: boombox anatomy (`index.html`)
- [x] Add body nameplate block (SONY / CFD-330) — top of the body, under the carry-handle recess.
- [x] Add carry-handle recess bar above the CD compartment (decorative).
- [x] Wrap LCD + transport keys in a "deck plate" section; add keypad well around the 4 transport keys.
- [x] Add front speaker-grille strip at the bottom with end caps + `STEREO` marking.
- [x] Add small `VOL` label + tick marks near the volume slider.

### B3 — CSS realism pass (`css/styles.css`)
- [x] Body: dark charcoal gradient with subtle plastic grain, beveled edges, seam highlight, rubber feet line at the bottom. Keep off-state grayscale filter + transitions.
- [x] Lid: smoked translucent (mostly clear window with tint so the disc is faintly visible closed), ring trim, hinge nubs on the back edge, latch nib at the front, printed `SONY` line. Keep flip-up rotation + timing.
- [x] Tray recess: keep dark; slightly warmer inner shadow.
- [x] LCD: black bezel, green dot-matrix feel, diagonal glass glare (pseudo-element), `SONY` top line styled small, keep marquee/progress LCF untouched.
- [x] Transport keys: recessed chamfered keycaps (keep tap targets ≥54px), engraved glyph hints; keep play/pause swap behavior.
- [x] Volume: knurled thumb feel, tick labels.
- [x] Grille: perforated pattern via CSS gradients (small dots) + end caps; `STEREO` lettering.
- [x] Responsive: re-check 320/375/390/768/1280 — no horizontal scroll; device fits viewport; tap targets ≥54px; reduced-motion preserved. — Headless audit: all widths clean (49-check suite).

## Phase C — Sticker decor (inline SVG, my design)
- [x] C1. Build sticker set (`.sticker` spans holding inline SVGs, `aria-hidden="true"`):
      pastel daisy (×2), clover, tiny sun, heart, one tiny star; soft palette (pink, mint, peach, sky, cream); 1–3° tilt, worn drop-shadow (slight dark under-edge), matte paper feel via subtle color noise/gradient.
- [x] C2. Placement: cluster on the deck plate (front-right of device body), one corner sticker wrapping onto the grille top edge, one small on the lid's left corner. `pointer-events: none; user-select: none;` so they never block controls.
- [x] C3. Verify stickers don't overlap buttons/LCD, don't add scroll, look intentional at 320–1280.

## Phase D — Local verification
- [x] D1. Serve with `python -m http.server`, run the headless-Chrome end-to-end suite (power → open → load → ready → play → time advances → next/prev → pause-freeze → direct select → volume → eject) + layout audit (320→1280) + no horizontal scroll. — DONE: merged 62-check suite re-runs A+B+C together, all PASS.
- [x] D2. `file://` double-click check (no browser-assumed paths). — PASS: renders off + 14 rows + no script errors.
- [x] D3. Screenshots saved for the user: `C:\Users\xale\AppData\Local\Temp\opencode\shot-2-*.png` (off/open/ready/playing, desktop). — saved `shot-2-{off,open,ready,playing,desktop-ready,file}.png`.

## Phase E — Deploy & handoff
- [x] E1. Update `TODO.md` (new Phase 10 rows) + `PROJECT_STATE.md` (phase, decisions, progress log entry). — done per-block A–D; REFINEMENT_PLAN.md itself added to the repo.
- [x] E2. Sync the temp clone at `C:\Users\xale\AppData\Local\Temp\opencode\deploy-4shams` (rm removed audio, rename, copy changed files), `git add -A` → commit → push. — `git rm` ×3, `git mv` ×5 (100% similarity, history preserved), copied index/css/js/robots/all-docs, commit `c34ee5a`, pushed `main` (4335140..c34ee5a).
- [x] E3. Verify live URL HTTP 200 + one audio file fetch; confirm removed tracks 404 on the live copy. — index/css/js 200; `10-is-this-love` + `14-apocalypse` 200; `10-here-comes-the-sun` / `12-weak-for-your-love` / `14-masterpiece` all 404. Headless render of live URL 11/11 PASS (14 rows, 6 stickers, SONY CFD-330, ready→playing, audio 200/206, zero console errors); `shot-live.png`.
- [ ] E4. User: real-phone Shams-test v2 on the live URL (Wi-Fi + mobile data) → report → apply tweaks.

---

## Progress log
- 2026-09-14 — Plan written; locked: SONY CFD-330 boombox body, disc = 4 SHAMS, remove the 3 tracks, renumber 01–14, sticker theme pastel floral. Blocks A–E defined. Awaiting execution, one block per message.
- 2026-09-14 — **Block A DONE + verified.** A1–A4 checked. 14 audio files on Desktop (removed 3, renamed 5), TRACKS=14, booklet `14 TRACKS · 51 MIN`. Headless-Chrome suite PASS (14 checks; details in A4). Screenshot `shot-2-ready-a.png` saved. STATE/TODO updated. Awaiting go-ahead for Block B.
- 2026-09-14 — **Block B DONE + verified.** B1/B2/B3 checked. Boombox anatomy in markup, SONY/CFD-330 nameplate, smoked translucent lid + printed SONY, LCD glare, chamfered keycaps + engraved glyphs, VOL label + knurled thumb + ticks, grille with STEREO, rubber feet, charcoal plastic-grain body. State machine behaviour unchanged (full smoke: off→open→closing→ready→playing→paused→eject→open; play/next/prev/direct-select/vol/mute all PASS). 49-check headless suite — 49 PASS, zero console errors/exceptions, no h-scroll or viewport overflow at 320/375/390/768/1280, tap targets ≥54 all widths, audio 200/206. Screenshots `shot-2-{ready,playing,desktop-ready}.png`. Block C next (needs go-ahead).
- 2026-09-14 — **Block C DONE + verified.** C1/C2/C3 checked. 6 self-contained inline-SVG pastel stickers added in `index.html` + CSS in `styles.css` — daisies ×2, clover, tiny sun, heart, tiny star (pink/mint/peach/sky/cream), each with paper gradient + grain dots + worn drop-shadow + 1–3° tilt, all `aria-hidden` / `pointer-events: none` / `user-select: none`, `focusable="false"`. Placement: cluster down the deck plate's blank right column, heart wrapping the grille top edge (right cap column straddling the seam), sky star on the lid's left corner (rides the flip; lid stays clickable). JS untouched. 42-check headless suite — 42 PASS: all 6 stickers present & non-interactive; zero sticker-rect intersections with LCD/prev/play/next/eject/slider/mute; star inside lid, all inside device; no h-scroll + device fits + tap targets ≥54 at 320/375/390/768/1280; full state-machine smoke unchanged; audio 200/206; zero console errors. Screenshots `shot-3-{ready,playing,desktop}.png`. Block D next.
- 2026-09-14 — **Block D DONE + verified.** D1/D2/D3 checked. Merged 62-check headless suite re-running A+B+C together — 62 PASS: catalog (14 rows, conclusive CSS counter-chain, 14-TRACKS booklet, direct-select all 14 = right src + plays, removed tracks never requested), boombox brand/anatomy split, 6 stickers non-interactive + zero rect overlap incl. star-in-lid, full state-machine smoke unchanged, layout audit 320/375/390/768/1280 (no h-scroll, device fits, tap targets ≥54), audio 200/206, zero console errors. D2 `file://` double-click PASS (renders, 14 rows, no script errors). D3 screenshots `shot-2-{off,open,ready,playing,desktop-ready,file}.png`. All local work done — Block E (deploy + live verify + phone test) next.
- 2026-09-14 — **Block E1–E3 DONE + verified.** Temp clone synced: `git rm` removed `10-here-comes-the-sun`, `12-weak-for-your-love`, `14-masterpiece`; `git mv` renamed the 5 (100% similarity → history kept); index/css/js/robots/docs copied; REFINEMENT_PLAN.md added to repo; commit `c34ee5a`; pushed (4335140..c34ee5a). Live HTTP verified: index/css/js 200, renamed audio 200, all 3 removed tracks 404. Headless render of the live URL 11/11 PASS (14 rows, 6 stickers, SONY CFD-330, opens→ready→playing, audio 200/206, zero console errors); `shot-live.png`. **E4 (real-phone Shams-test v2) is the user's handoff.**