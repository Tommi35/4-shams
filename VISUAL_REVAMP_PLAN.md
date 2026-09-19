# VISUAL_REVAMP_PLAN — make the player look like a real Sony CFD-330

> **PLAN ONLY — no code changed yet.** This document describes the work. Nothing in
> `index.html`, `css/styles.css` or `js/app.js` has been touched.
> Execute one block at a time (`"esegui BLOCK n"`), test it, update `PROJECT_STATE.md`
> and `TODO.md`, report back, then wait.

Legend (same markers as `TODO.md`): `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[?]` needs decision

---

## [?] Decisions to confirm before executing

- [ ? ] The real photo bytes did **not** come through in this chat — only the written
       description. This plan is based on the description above. If the user can attach the
       actual image later, re-baseline colours/proportions from it (cheap to do mid-flight).
- [ ? ] Tap targets: the previous audit suite demanded ≥54px. A scaled-down boombox with two
       flanking speakers cannot keep 54px on a 320px screen. Proposal: keep every real control
       ≥44px (WCAG AA) and relax the internal audit threshold with a documented exception.
       Confirm before Block 1 and Block 3 verification.

---

## What the real device shows vs. what we have now

Current implementation (from `index.html` / `styles.css`):
- Tall near-square card (~420px wide, roughly 560–600px tall): handle recess → nameplate →
  CD tray (180px) → deck plate (LCD + 4 round keys) → volume → full-width 58px grille strip → feet.
- Disc: cold silver/grey conic sheen with fine grooves; a small cream "4 SHAMS" badge in the middle.
- Keys: glossy 54px cream circles, gold/brass PLAY key; brass slider fill + knurled gold thumb.
- Grille: one horizontal strip across the whole width, not two flanking circles.
- Handle: a recess notch with a short bar — doesn't read as a hinged bar.
- No antenna. 6 stickers pinned at hardcoded px anchored to the old right-edge layout.

Real Sony CFD-330 (user's reference):
- Wide horizontal boombox; two big round mesh speakers flank the middle control bay.
- Deep matte black/charcoal plastic with visible fine texture — not glossy gradients.
- Foldable metal carry handle hinged at both ends on top; thin telescoping antenna back-right.
- Top-loading CD bay with a real silver CD showing rainbow-iridescent diffraction sheen;
  printed disc label/sticker, not floating text on bare metal.
- Small LCD + a row of matte rectangular/oval keys with printed white glyphs; "SONY" printed
  white left of the display; minimal neutral palette (no heavy gold/brass).
- (Optional) decorative double-cassette windows below the LCD.

---

## BLOCK 1 — Silhouette & proportions

Goal: read as a **wide horizontal boombox**, not a tall card; still usable on a phone — scale down, never crop. ✅ BLOCK 1 DONE + verified headlessly (aspect 1.07–1.22 across 320/375/390/768/1280, all zones/control/sticker/lid checks PASS, zero console errors, shots `shot-4-*.png`).

- [x] Restructure the `.device` interior into a landscape 3-zone grid: **left speaker zone /
       center command stack / right speaker zone** (add full/empty slots in markup; styled in Block 4).
- [x] Wrap the existing tray+deck+vol markup into the center column; keep every `[data-state]`,
       `.disc`, `#lid`, `#tray`, level of id/class hooks intact so the JS state machine is untouched.
- [x] New proportions (tuned during execution, verified against viewports): mobile ≈ 300–380 wide
       × ≈ 250–320 tall landscape rect (measured 1.07–1.15:1 at 375/390); ≥640px grows proportionally
       (≈ 520–600 wide × ≈ 300–340 tall observed → 1.22:1 at 1280, 1.12 at 768).
- [x] Scale down the moving parts to fit the new rect: tray 180px → ~110–120px, disc 128px →
       ~96–104px, LCD, keys and slider. Lid flip, disc spin, marquee and progress must keep working.
- [x] Narrow-screen fallback: if the three zones cannot coexist at ≤340px, shrink the speaker
       diameter (to ~20–25% of device width) first; never clip or crop the device box. (320 check:
       speakers 52px ≈ 17%, buttons 44/48px — no crop, no h-scroll.)
- [x] Update the `@media (min-width: 640px)` overrides and every absolute-px child (stickers,
       grille, hint, feet) to the new geometry — no stale px offsets left over.
- [x] Verify at 320/375/390/768/1280: no horizontal scroll, device fully inside viewport,
       no zone overlaps, tap targets ≥44px; capture screenshots (`shot-4-*.png`).

---

## BLOCK 2 — CD disc rainbow realism

Goal: replace the cold silver conic sheen with a **real iridescent CD diffraction** look and turn
"4 SHAMS" into a **printed disc label/sticker**. ✅ BLOCK 2 DONE + verified headlessly (full-spectrum
desaturated conic bands + second low-opacity rainbow at 40° vs 168° moiré layer, grooves kept,
spindle ring retained, cream printed label with wordmark + "14 TRACKS · 51 MIN" in charcoal ink,
reverse spin on label, reduced-motion 9s; state machine + layout invariant, zero console errors).

- [x] Rebuild `.disc` base: layered conic gradients with full-spectrum bands
       (violet → blue → cyan → green → yellow → orange → red), slightly desaturated so it still
       reads matte-plastic; **keep** the existing fine repeating-radial groove texture.
- [x] Add a second, low-opacity rainbow layer with a different start angle so rings/flecks shift
       as the disc rotates; keep `.device[data-playing] .disc` spin and the reverse spin on the label.
- [x] Keep/retune the centre hub hole (`.disc::before`) — real CDs have a clear plastic spindle ring.
- [x] Redesign `.disc-label` as a printed sticker: full-bleed cream/beige circular label, crisp
       "4 SHAMS" wordmark, a small secondary line (e.g. "14 TRACKS · 51 MIN"), subtle concentric
       tint + paper grain, soft die-cut shadow; still centered, still non-interactive.
- [x] Neutral accents on the disc: warm charcoal label ink instead of the current brass text colour.
- [x] Preserve behaviour: click disc-to-load, spin on play, freeze on pause, `prefers-reduced-motion`.

---

## BLOCK 3 — Buttons & controls material

Goal: glossy cream circles + brass PLAY → **matte charcoal rectangular/oval pill keys** with simple
printed white glyphs; strip the gold accents.

- [ ] `.ctrl-btn`: circular 54px glossy → matte pill keys (~30–34px tall; width per key), recessed
       in the keypad well, fine top bevel, near-zero sheen; keep the greyed `:disabled` style.
- [ ] PLAY key: remove brass/gold gradient → same matte charcoal as siblings, distinguished only by
       slightly larger size + white glyph; keep the play/pause glyph swap bound to `[data-playing]`.
- [ ] Icons: redraw SVGs as printed-white glyphs (solid, low-opacity white/light-grey on charcoal,
       slight texture) — prev / play / pause / next / eject semantics, `aria-label`s and disabled
       logic unchanged (purely a CSS/SVG pass).
- [ ] Volume: brass fill → neutral charcoal/white; knurled gold thumb → matte charcoal with a fine
       grip ridge; mute key icon restyled as a printed glyph.
- [ ] Sweep remaining brass/gold off the **device** surfaces (vol fill, thumb, label ink, panel
       highlights). The booklet (paper manual) may keep its cream notes — it's outside the device.
- [ ] Keep `--brass*` variables defined (booklet still uses them) but stop applying them to device
       layers; add new matte key/panel variables to `:root`.
- [ ] Verify all 5 keys + slider + mute still follow the power state machine exactly; no JS edits.

---

## BLOCK 4 — Speakers, handle, antenna

- [ ] **Two large round speakers** flanking the center column (slots reserved in Block 1): circular
       dot-matrix mesh cloth (reuse/adapt the existing `.grille-main` dot technique), darker centre,
       fine plastic bezel ring, 3 small screw dots; one left, one right at the outer ends.
- [ ] Remove the full-width horizontal grille strip (`.grille`, caps, mains, STEREO mark) or merge
       "STEREO" onto a speaker bezel only if it fits naturally.
- [ ] **Handle**: replace the recess-notch with a **foldable metal carry bar hinged at both ends** —
       two chrome/grey hinge brackets mounted to the top edge + a rounded metal bar (subtle vertical
       gradient), resting arced above the device; decorative, `pointer-events: none`.
- [ ] **Antenna**: thin telescoping antenna at the back-right corner, angled up ~40°, 2–3 segments
       with a metal gradient + tiny tip, drawn behind/above the device; decorative, `pointer-events:
       none`; limit its length on small screens so it never causes horizontal scroll.
- [ ] Keep speakers/handle/antenna strictly `aria-hidden`; never overlap the lid's click/tap area.

---

## BLOCK 5 — Stickers: placement and style

Goal: fewer (3–4 max), stuck to **real flat surfaces**, still simple and cute. ✅ BLOCK 5 DONE + verified headlessly (trimmed 6→3, re-anchored on the post-Block-4 geometry, old absolute-px cluster deleted, state machine + layout invariant, zero console errors).

- [x] Reduce to max 4 stickers, keeping the existing pastel flower/star/heart art language
       (add a tiny moon or music note as an optional 4th).
- [x] Re-anchor positions onto real surfaces of the new (post-Block 1) geometry:
       - one flower on the front panel's lower-left flat area (`.s1-daisy`, clear of the
         left speaker, low on the face);
       - the tiny star on the lid's front-left corner (`.s6-star`, child of `#lid`, keeps
         rotating with the flip; fully inside the lid at 320/375/390/768/1280);
       - one small heart at a speaker bezel edge (`.s5-heart` moved INSIDE `.spk-r`, hugs
         the right speaker's outer lower bezel via `right:-9% bottom:-5%`, sized
         `calc(var(--spk)*.30)` so it scales with the speaker);
       - (4th, only if it doesn't crowd) a tiny moon/music note on the deck inside the
         column — **SKIPPED**: the deck column has no empty flat surface at ≤640 (LCD +
         full-width keypad fill it), so a 4th would crowd; re-evaluate after Block 6 if
         the cassette deck adds surface.
- [x] Keep the existing `.sticker` recipe: slight random tilt (−3°…+3°), worn drop-shadow, matte
       paper gradient — all `pointer-events: none` + `aria-hidden` (+ `user-select:none`).
- [x] Delete the old absolute-px cluster (`.s1-daisy`…`.s5-heart` `right:3px; top:NNNpx`) and the
       `@media` overrides pinned to the pre-Block-1 layout; re-wire class names to new anchors
       (`.s3-clover`/`.s2-daisy-mini`/`.s4-sun` removed from markup AND stylesheet).
- [x] Nothing branded, symbolic or political; 3 total (flower + heart + star).

---

## BLOCK 6 — OPTIONAL (flag: only if it stays low-risk) — decorative double cassette deck

- [ ] Below the LCD (inside the command stack) add two small smoked windows side by side, mirroring
       the real CFD-330's cassette doors.
- [ ] Each window: dark smoked glass, rounded door outline, two small hub/pinch dots, thin bezel;
       purely decorative — `aria-hidden`, `pointer-events: none`, no JS.
- [ ] Must not intercept clicks on play/prev/next/eject/volume; must fit the Block 1 height budget
       (shrink elsewhere if needed).
- [ ] Decision gate: if this adds meaningful complexity/risk to the working audio flow, skip it —
       it is decorative only and listed here as **optional**.

---

## BLOCK 7 — Wrap-up: full regression + redeploy (after all chosen blocks)

- [ ] Combined verification pass (mirroring the earlier 62-check suite): state machine
       off→open→closing→reading→ready→playing→paused, next/prev/direct-select/vol/mute/eject,
       disc spin/freeze, marquee, lid flip, booklet links unchanged.
- [ ] Layout audit at 320/375/390/768/1280 (no h-scroll, no overlaps, controls ≥44px) + screenshots
       `shot-4-*` in the temp screenshot dir.
- [ ] `file://` double-click check + update `TODO.md` / `PROJECT_STATE.md`.
- [ ] Redeploy to GitHub Pages via the existing temp clone
       (`C:\Users\xale\AppData\Local\Temp\opencode\deploy-4shams`): copy changed files → commit →
       push → live URL verify (HTTP 200, CSS/JS fetched, no console errors).

---

## Execution order & dependencies

Suggested order: **BLOCK 1 → BLOCK 4 → BLOCK 2 → BLOCK 3 → BLOCK 5 → (BLOCK 6) → BLOCK 7**.

- Block 4 builds on Block 1's speaker slots; run them as one visual pass if the user allows.
- Block 5 depends on Block 1's final geometry (sticker anchors are px-based today).
- Blocks 2, 3, 6 are self-contained and safe in any order after Block 1.
- Each block is tested and reported individually before the next begins.

## Global constraints (never regress)

- Plain CSS + plain JS, no frameworks, no external fonts/services/assets.
- Decorative elements: `aria-hidden` + `pointer-events: none` (stickers, speakers, handle, antenna,
  cassette). Real controls stay focusable/tappable with `aria-label`s.
- All `[data-state]` attribute hooks, lid-flip timing, disc spin/freeze, LCD marquee and the power
  state machine keep their current behaviour — the revamp is visual only.
- `prefers-reduced-motion` support retained.