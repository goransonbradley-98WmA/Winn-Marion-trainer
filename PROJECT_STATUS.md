# Winn-Marion Electrical Training Pro — project status

## 2026-10-26 — independent STOP contact safety validation
- Hardened `motor-validation.js` so the motor-control evaluator tests each STOP NC device independently, both with START released and held. Previously, testing all STOP contacts as pressed together could incorrectly pass a parallel STOP arrangement where pressing only one STOP failed to release the coil.
- Added two deterministic regression cases: two STOP contacts in series pass; two STOP contacts in parallel fail as `unsafe stop`. The 21 prior cases also passed, for 23/23 total, executed against the committed source and tests in an isolated JavaScript harness (not a rendered browser test).
- Application commits on `main`: evaluator `f9297f1b649bc40648550e7f44f5ccc952965187`; tests `e40457e9a02662028c8bf8f9b8bad069e808bc8a`.
- Vercel production deployment `dpl_EYs8YGvuLdgpF327c63hHZntCHa7` confirmed READY with GitHub source SHA `e40457e9a02662028c8bf8f9b8bad069e808bc8a`.
- Test link: https://electrical-training-81y452mzt-winn-marion.vercel.app/motor.html
- Preserved existing `simulator.js`, Samsung-approved touch controls, guided hints, saved circuits, browser-local student progress and export, and separate LOTO/course pages without edits.
- Limitations: direct HTTP retrieval of the preview through the available web tool failed, and no real Samsung or rendered browser test was completed. READY is deployment/build status, not end-to-end UI verification. This is an educational circuit model, not field-grade safety certification. Employee authentication, cross-device progress and instructor gradebook remain pending.


## 2026-10-25 — optional student practice history export
- Updated `student-progress.html` to add an explicit, user-triggered JSON download of up to 200 valid locally stored motor-control attempts, with export timestamp and format version. No upload, backend, or instructor access is implied.
- Existing browser-local data, simulator scripts, Samsung-approved touch modes, guided hints, save/load, motor evaluator and LOTO modules were not changed.
- Application commit: `e9c25c77a697ce1ea5d1107c6e9970ddaaa7d4be` on main.
- Vercel production deployment `dpl_BwGa6wXxuxra2KDjoQ6CLH7TzQuC` confirmed READY with matching GitHub SHA.
- Verified deployment URL: https://electrical-training-3dr5sb4zm-winn-marion.vercel.app/student-progress.html
- Stable origin URL (recommended for existing browser-local history): https://electrical-training-pro-winn-marion.vercel.app/student-progress.html
- Limitations: READY and source review do not constitute a rendered browser or Samsung export/download test. JSON is an informal practice record, not an authenticated grade or certification. Future instructor reporting requires secure accounts and consented server-side storage.


## 2026-10-25 — reproducible motor validation tests and clearer student progress
- Added `tests/motor-validation.test.js` on main (commit `dbce911af140299542db24a42e6fcd0aad7f6795`), a dependency-free Node test suite covering valid equivalent three-wire circuits, STOP bypass, supply short, missing seal-in, open circuits, malformed device/wire references, missing devices, stable wiring signatures and input immutability.
- Ran all 21 scenarios against the current `motor-validation.js` source in an isolated JavaScript harness: 21 passed, 0 failed. The committed test suite can also be run with `node --test tests/motor-validation.test.js`. This is evaluator-level testing, not a browser/device integration test.
- Improved `student-progress.html` (commit `5cc76e2178114e4a591290b4feb54d160d44e4ba`): shows count of distinct circuits among newer signature-bearing attempts, clarifies that older attempts may contain duplicates, and links directly to `motor.html` rather than the home page. Existing practice data remains unchanged and browser-local.
- Validated the progress-page JavaScript syntax and exercised a simulated DOM with mixed legacy/new attempt records (four tests, two distinct signed circuits) and an empty record set. Displayed counts matched expectations.
- Existing `simulator.js`, `motor-validation.js`, `motor-validation-adapter.js`, Samsung-approved touch controls, guided hints, saved circuits, LOTO and course pages were not modified in this run.
- Vercel deployment `dpl_pyidVLufRnCSc2VvSTWW836g13e8` confirmed READY in production, with Git source `main` at application commit `5cc76e2178114e4a591290b4feb54d160d44e4ba`. Stable alias is mapped to this deployment.
- Verified test URL: https://electrical-training-263jrqq1w-winn-marion.vercel.app/student-progress.html
- Stable URL (recommended for preserving browser-local progress across deployments): https://electrical-training-pro-winn-marion.vercel.app/student-progress.html
- Limitations: Vercel READY was verified, but direct HTTP/browser access and real Samsung touch regression were not independently verified. Employee authentication, cross-device progress, and instructor gradebook are still unimplemented. The evaluator is an educational training model, not field-grade electrical validation.


## 2026-10-24 — reject invalid motor wiring graph references
- Hardened `motor-validation.js` on main: the evaluator now rejects wires connected to nonexistent terminals or to themselves, as well as duplicate device IDs and unsupported device types. This prevents phantom terminals from being silently treated as electrical junctions in the training graph.
- Ran 13 isolated JavaScript regression scenarios against the updated evaluator: valid three-wire, reversed coil terminals, missing seal-in, open circuit, L1/L2 short, STOP bypass, unexpected energization, nonexistent terminal, self-wire, duplicate device ID, unsupported device, dangling terminal, and missing coil. All 13 matched expected results.
- Only `motor-validation.js` was modified in the application. Existing Samsung touch controls, `simulator.js`, guided hints, saved circuits, local attempt tracking, portal and separate simulator pages were not changed.
- Application commit: `cdcd8be962b72e70eefcb2201db0c0705c093a1e` on main.
- Vercel deployment `dpl_2WHbtEZVNNP63oNixKQvcRewewHV` confirmed READY and matched that application commit.
- Test URL: https://electrical-training-n20d3ders-winn-marion.vercel.app/motor.html
- Limitations: tests exercised the pure JavaScript evaluator, not the full DOM/browser or a Samsung device. The evaluator is a simplified educational model, not a certified safety check. Practice data is still browser-local and role navigation is a public preview.

## 2026-10-23 — motor Test integration activated
- Connected the previously committed `motor-validation-adapter.js` after `motor-validation.js` and unchanged `simulator.js` in `motor.html`. The existing motor-control Test button now uses topology-based evaluation, including STOP-held safety checks and seal-in checks, on the dedicated motor simulator page.
- The adapter records only one local practice attempt per exact device-ID/connection signature. Retesting the same topology still shows feedback without increasing the attempt count; rewiring changes the signature and can create a new attempt. Legacy records are retained and are not retroactively deduplicated.
- Preserved `simulator.js`, approved Samsung touch controls, guided hints, saved circuits, portal routes, student-progress page, and LOTO pages unchanged.
- Verified via isolated JavaScript adapter test: attached Test handler, valid 3-wire circuit passes, identical retest does not add an attempt, and changed wiring adds a second attempt. Confirmed HTML scripts load in dependency order. This is not a full DOM/browser or real-Samsung regression test.
- Application commit: `7a8e1d0a1d30b37687f9a828ffcab4c6a78366f3` on main.
- Vercel deployment `dpl_2nLuLXKVizzU1RA2aLddnwMwr21C` confirmed READY, matching application commit.
- Test URL: https://electrical-training-pt92jl286-winn-marion.vercel.app/motor.html
- Limitations: circuit evaluation is a training model, not field-grade simulation or certification; no actual employee accounts, cross-device records or instructor gradebook. Deployment readiness and isolated tests do not prove all touch interactions work on a Samsung. New browser origin may have no previous localStorage attempts.

## Current release — 2026-10-21
Source: https://github.com/goransonbradley-98WmA/Winn-Marion-trainer
Baseline: feature/loto-guided-training-oct20 at 07831cc787ed4150f66c8c7e796a743d1f7ceb56 (four commits ahead of main, no missing main commits).
Vercel: electrical-training-pro / Winn-Marion.

## Implemented
- Cohesive responsive landing page, six-module catalog and individual course/trainer routes.
- Student, instructor/trainer and administrator public preview workspaces. Login explicitly says real authentication pending; no passwords collected, session or protected permissions claimed.
- Dedicated motor.html uses the existing motor workspace markup and unchanged simulator.js, preserving Samsung-approved modes, freehand wiring, one-tap deletion, hints, save/load and practice-history keys.
- Existing guided LOTO, standalone 3D cabinet, guide preview and student-progress pages linked from the new experience.
- Transformer connections, basic wiring and automation marked unfinished. Expanded 3D lab, grading, certificates and instructor assignments pending.
- No instructor names or credentials invented. Training tools are described as trainers; human instructor assignments pending.

## Verification
- Portal JavaScript parsed and all 15 route render cases exercised in an isolated DOM stub; local file destinations checked against repository tree.
- Existing simulator logic, LOTO files, CSS and student progress preserved byte-for-byte from feature baseline.
- Desktop/mobile CSS breakpoints included. Actual rendered mobile/desktop browser tests could not run: local shell, JavaScript runtime and browser-control runtime time out. Real Samsung/device regression testing remains required.
- Application commit: fbd3933c4d416cf62a820bdb2f5c3da95be87bb2; saved on main and feature/loto-guided-training-oct20.
- Vercel deployment dpl_FzptTRW2SKyPkDd1Av1ZmZ7U63ro confirmed READY, target production, matching application commit.
- Test URL: https://electrical-training-jmp0a37m5-winn-marion.vercel.app
- Stable URL: https://electrical-training-pro-winn-marion.vercel.app
- Live HTTP checks returned 200 for home, portal.js, motor.html, loto-procedure.html, vr-loto.html and student-progress.html. No rendered browser/device verification was possible. READY and HTTP responses do not establish simulator correctness.

## Authentication and data limits
Static source contains no application identity provider or backend. Public role navigation is a preview, not authentication. Student progress and circuits remain on the same browser/origin; deployment-specific URLs do not share localStorage. Instructor rosters, shared reporting and administrator actions are not implemented.

## Preserved historical baseline
# Winn-Marion Electrical Training Pro — persistent project baseline

## Source of truth
Repository: https://github.com/goransonbradley-98WmA/Winn-Marion-trainer
Branch: main
Vercel project: electrical-training-pro (Winn-Marion team)
Latest verified ready preview: https://electrical-training-fs8m2uy49-winn-marion.vercel.app
Verified deployment commit: 83e5cf561b3d16e6e844464e082122f33f2b118e

## Saved implementation (as of 2026-10-18)
- index.html: responsive training site, home, courses, simulator selection, motor-control workspace, and 3D lab placeholder.
- styles.css: blue industrial responsive styling, simulator workspace and reference schematic layout.
- simulator.js: schematic STOP NC / START NO / coil / auxiliary devices; simulated L1/L2 terminals; touch/pointer wire dragging with snapping; tap-to-connect fallback; device repositioning and double-tap deletion; wire deletion, undo, reset, zoom and pan; simplified START/STOP/seal-in checks.
- Reference 3-wire motor control ladder schematic displayed above workspace.
- GitHub commits preserve source; latest preview deployed on Vercel.

- Two-finger pinch zoom support and basic direct L1/L2 short detection added; phone behavior still needs user testing.

- Freehand pointer-traced wire geometry is now saved per connection; snaps to target terminals. Samsung device testing pending.

- Explicit Draw wires / Move screen / Move devices interaction modes added to prevent accidental panning while tracing; Samsung confirmation pending.

- User approved separated draw/pan/device modes as a good baseline on Samsung.
- Added Save circuit / Load circuit via device-local browser storage, preserving devices, freehand wires and view. Not cross-device or employee-account sync.

- Added explicit one-tap Delete wire mode; double-tap remains fallback.
- Reference schematic is hidden until three failed tests, with unlock status and toggle.
- Test attempt outcomes, reasons and timestamps saved in browser localStorage (not student accounts); counts persist locally. Assessment engine is simplified and must be strengthened before grading.

- User reported Delete wire tap reliability and draw-mode interference. Enlarged invisible wire hit areas, made tools mutually exclusive and togglable off; phone validation pending.
- Removed completed reference drawing from student HTML. After 3 failed tests, show contextual hints only, not a copyable solution. Practice/assessment mode separation planned, not implemented.

- User confirmed on Samsung that the improved touch/deletion controls work well and that guided hints after failed attempts are more useful than a full schematic. Treat this as the approved UX baseline; do not regress.

## Known limitations / do not claim complete
- Actual Winn-Marion logo and approved oilfield background artwork not yet integrated (current WM mark is a placeholder).
- Circuit evaluator is simplified and needs testing for equivalent wiring, faults, and alternate circuits.
- Freehand path capture implemented; smoothing and waypoint editing still pending.
- Mobile pinch zoom and multi-wire terminal interactions require real-device testing.
- Transformer, LOTO/meter, lessons, administrator login and Three.js lab are planned, not implemented.
- The old Vercel-only previews are not the source of truth. Do not overwrite newer GitHub code with older deployment files.

## Non-regression requirements
1. Before each edit, fetch latest GitHub file and SHA.
2. Update only files/modules needed; never replace project with an older prototype.
3. Keep working wiring, reference schematic, device deletion, zoom, navigation and simulator page separation.
4. Commit changes to GitHub, verify the commit, deploy from main to Winn-Marion Vercel, and check READY status.
5. Maintain this file with implemented features, known limitations, latest verified commit and test link.
6. No unverified claims about phone behavior, branding assets or simulation correctness.
7. Favor lightweight Three.js for 3D; no VR headset requirement.
8. Prioritize actual Winn-Marion images and accurate schematic symbols in future modules.

## Next work
- User test touch-drawn wiring on Samsung and report any issues.
- Integrate approved Winn-Marion brand assets.
- Improve true freehand wiring, pinching, terminal snap and electrically equivalent circuit evaluation.
- Build individual transformer and LOTO modules, then Three.js training room.
