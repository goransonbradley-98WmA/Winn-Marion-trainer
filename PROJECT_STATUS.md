# Winn-Marion Electrical Training Pro — project status

## 2026-11-05 — motor supply-short state regression tests
- Added two focused regression tests in `tests/motor-validation.test.js` to assert rejection of an L1-L2 short that occurs only when START is pressed, and a short that occurs when the AUX holding contact closes. Both use the existing known-good three-wire circuit with one additional unsafe wire.
- Ran four isolated evaluator probes against the exact current GitHub `motor-validation.js`: valid reference circuit passed, START-dependent short rejected, AUX-dependent short rejected, and malformed-wire signature returned a string (4/4). This is not a full Node suite or rendered browser test.
- Test commit on `main`: `1994a40995b6a7388f283dae6bee09e7ba9f9f6d`.
- Vercel production deployment `dpl_61sXpHH8cFbjWNymgSQR7h4hRY5v` was INITIALIZING on first check; readiness must be confirmed separately. Versioned test URL: https://electrical-training-9ze3mak4x-winn-marion.vercel.app/motor.html
- Only test coverage changed. Samsung touch interactions, guided hints, saved circuits, Basic Wiring, progress tracking, motor visuals and LOTO remain untouched. Actual Samsung testing and secure instructor gradebook remain pending.

## 2026-11-04 — expanded motor device-ID regression coverage
- Added three regression tests in `tests/motor-validation.test.js` covering malformed START/coil/AUX identifiers with terminal rewiring, valid numeric-string IDs, and numeric/string duplicate IDs. This extends the prior STOP-ID coverage without changing evaluator or UI logic.
- Ran focused evaluator probes against the fetched current GitHub source in an isolated JavaScript runtime: blank START, fractional coil and duplicate string IDs were rejected; valid numeric-string IDs passed (4/4). The full Node suite was not run because the container could not resolve github.com and no repository checkout was available.
- Test commit on `main`: `e8a8ac78cc35929c4da7f95490813767dc92edd3`. No changes to Samsung touch interactions, hints, saved circuits, Basic Wiring, student progress, or LOTO.
- Vercel production deployment `dpl_4RLkwYvkXPhLbbRvU7wsxgGKgdpa` verified READY with matching GitHub commit `e8a8ac78cc35929c4da7f95490813767dc92edd3`. Versioned test URL: https://electrical-training-e24r3y8dw-winn-marion.vercel.app/motor.html. This is deployment status, not a rendered browser or Samsung test.
- Stable site: https://electrical-training-pro-winn-marion.vercel.app/motor.html
- Limitations: Vercel READY does not verify browser load or physical Samsung behavior. Employee authentication and shared instructor reporting remain pending.


## 2026-11-03 — reject malformed motor device identifiers
- Hardened `motor-validation.js` to reject null, missing, fractional, non-finite, unsafe numeric, and whitespace-only device IDs before circuit graph evaluation. Valid integer and nonblank string IDs remain supported. This closes the same malformed-ID class addressed in Basic Wiring on November 2.
- Added regression coverage to `tests/motor-validation.test.js` for seven malformed IDs, including rewired terminals so the invalid-circuit result cannot be explained by dangling wires.
- Executed eight focused checks directly against the exact fetched GitHub evaluator in an isolated JavaScript runtime: seven malformed ID cases rejected, and one valid reference circuit passed (8/8). The full Node test suite and rendered-browser/Samsung checks were not run: container could not resolve raw.githubusercontent.com.
- GitHub main commits: evaluator `a8f1d34d985ca2318076b295030c7a95fb19f8f7`, regression tests `5106555e00e72e5077b6b43fb7206345b3d767c1`.
- Vercel production deployment `dpl_4RG9zJnUwJa6GzpViuBmqe3ktAcX` confirmed READY with matching test commit `5106555e00e72e5077b6b43fb7206345b3d767c1`.
- Versioned test URL: https://electrical-training-2aedr8157-winn-marion.vercel.app/motor.html
- Stable URL for existing browser-local history: https://electrical-training-pro-winn-marion.vercel.app/motor.html
- Only the motor evaluator, its tests, and this checkpoint changed. Samsung touch modes, hints, saved circuits, Basic Wiring, progress pages, and LOTO were not modified. Vercel READY is not a browser or real-device test; secure employee progress and instructor reporting remain pending.

## 2026-11-02 — reject malformed basic wiring device IDs
- Hardened only `basic-validation.js`: Basic Wiring now rejects null/non-object device entries and IDs that are not safe integers, rather than allowing fractional or unsafe-number IDs to form a passing circuit. This protects the educational circuit evaluator against malformed imported/saved circuit data without changing valid wiring behavior.
- Added five regression cases to `tests/basic-validation.test.js` (null devices, missing ID, fractional ID and unsafe integer ID), retaining all ten existing cases. Reproduced the previous evaluator passing two otherwise correctly wired circuits with invalid numeric IDs, then ran the updated exact GitHub source and test files in Node 22: **15 passed, 0 failed**. Local git blob hashes matched the GitHub blobs for both files (`4fecd226074f307ccc08107f6ff84aab19d5c64d`, `7ed3968fb97a85727e1267c1a44dad37454266ea`). These are isolated evaluator tests, not rendered browser tests.
- Application commits on `main`: validator `9469e28b3c87011cead72ba80b2b613ca5950fdd`, regression tests `1e413a39ac0fd01fee2168463bdab819881021ff`.
- Vercel production deployment `dpl_62tygiBBEqkowZSvbVtK39m7kMzc` confirmed **READY** with matching test commit `1e413a39ac0fd01fee2168463bdab819881021ff`.
- Versioned test URL: https://electrical-training-9vorwe3m4-winn-marion.vercel.app/basic-wiring.html
- Stable URL (retains browser-local saved practice data): https://electrical-training-pro-winn-marion.vercel.app/basic-wiring.html
- No changes to `simulator.js`, Samsung touch controls, guided hints, saved circuits, motor green/smoking feedback, student progress, motor evaluator, or LOTO. Browser/Samsung end-to-end testing remains outstanding; Vercel READY is deployment status, not a device test. Employee accounts and instructor gradebook remain future work.

## 2026-11-01 — motor practice history resilience
- Updated only `student-progress.html` to parse motor-control attempt history separately from the saved motor workspace. A corrupt workspace no longer hides otherwise valid motor test counts/history; corrupt or non-array attempt history now reports an explicit error while leaving a valid saved-workspace status visible.
- Clarified the dashboard introduction to cover both Motor Controls and Basic Wiring. No existing browser-local keys or records were changed.
- Verified the actual updated inline JavaScript compiled and passed four simulated-DOM cases: valid motor attempts plus corrupt workspace, corrupt attempts plus valid workspace, non-array motor history with unaffected Basic Wiring history, and empty storage with both export actions still attached.
- Motor/basic circuit validators, `simulator.js`, approved Samsung touch modes, guided hints, saved circuits, green/smoking motor feedback, separate trainer pages, and LOTO were not modified.
- Application commit on `main`: `76be2cdfd0d9c48b8f52cdd804f0ba908f8727a6`.
- Vercel production deployment `dpl_G7h6Zb572HwQG53Dpsu1YdmoCd7o` verified READY with matching application commit and stable alias.
- Versioned test URL: https://electrical-training-10ct4ee3k-winn-marion.vercel.app/student-progress.html
- Stable URL for existing browser-local history: https://electrical-training-pro-winn-marion.vercel.app/student-progress.html
- Limitations: direct page retrieval via the available web tool was inaccessible. Simulated DOM checks and Vercel READY do not establish real Samsung/browser functionality. Employee accounts, shared instructor reporting and certified electrical validation remain unimplemented.


## 2026-10-31 — basic wiring practice history and resilient workspace reading
- Updated only `student-progress.html`: Basic Wiring now shows pass rate and a recent 10-attempt table (date/time, result, troubleshooting reason) alongside the existing basic summary and JSON export. Rows are constructed with textContent, not injected HTML.
- Separated Basic Wiring saved-workspace parsing from attempt-history parsing. A corrupted saved workspace now displays its own error without hiding otherwise valid test totals and history.
- Verified the actual updated inline dashboard JavaScript compiles and passed four simulated-DOM scenarios: mixed valid basic/motor attempts with both exports still wired, corrupt basic workspace with valid attempts, corrupt basic attempt history, and empty storage. This is not a full browser or Samsung device test.
- No changes to circuit evaluators, `simulator.js`, Samsung touch modes, guided hints, saved circuits, motor outcome animations, LOTO, or separate trainer pages.
- Application commit on `main`: `958477c42354935fcf06de21b8a3895506ffb192`.
- Vercel production deployment `dpl_RoreH1xD3vQ8W8iVn8aVmC2Ynw1t` verified READY with matching application SHA and stable production alias.
- Versioned test URL: https://electrical-training-k4nbougbg-winn-marion.vercel.app/student-progress.html
- Stable URL for browser-local records: https://electrical-training-pro-winn-marion.vercel.app/student-progress.html
- Limitations: deployment READY is not proof of a successful browser page load; no actual Samsung verification in this run. Student history remains local to each browser, without authenticated accounts or instructor gradebook.


## 2026-10-30 — separate basic wiring practice JSON export
- Added an explicit **Export basic wiring results (JSON)** action to the Basic Wiring Practice section of `student-progress.html`. It downloads only the current browser's basic-wiring practice attempts (up to the newest 200 valid pass/fail entries) with `wm-basic-practice-v1` format, trainer identifier, export timestamp and browser-local source label.
- This complements, but does not change, the existing motor-control JSON export. No records are uploaded or changed; instructor accounts, grading and cross-device synchronization remain pending.
- Verified the actual modified inline dashboard script compiled successfully and passed four isolated simulated-DOM checks: valid basic export with invalid entries filtered, malformed basic storage safely rejected, empty history exported as an empty array, and legacy motor export still functioning. This was not a real rendered browser or Samsung device test.
- Existing motor and basic wiring evaluators, Samsung touch modes, guided hints, saved circuits, trainer animations, LOTO, and separate simulator pages were not modified.
- Application commit on main: `22f10dbd7cbedde1fe7bcc10b13b8c9aa07ed6aa`.
- Vercel production deployment `dpl_Cgkiwvh3skFM3u4GpW6gpMhF4T4v` confirmed READY with matching application SHA and stable production alias.
- Versioned test URL: https://electrical-training-altk77ii8-winn-marion.vercel.app/student-progress.html
- Stable URL (recommended to retain browser-local records): https://electrical-training-pro-winn-marion.vercel.app/student-progress.html
- Limitations: direct web retrieval of the deployment URL was inaccessible; READY verifies deployment/build status, not page load or download behavior on Samsung. Practice exports are user-controlled informal records, not verified employee training grades.



## 2026-10-29 — student progress now includes separate basic wiring results
- Updated `student-progress.html` to show a separate Basic Wiring Practice section with locally recorded tests, passes, failures, distinct signed circuit count and saved basic workspace status. Added a direct link to the basic wiring trainer.
- The motor-control summary, existing practice export (motor records only), localStorage keys, circuit evaluator, motor/LOTO simulators, mobile wiring controls, hints and saved circuit functionality remain unchanged. Basic records use `wm-training-basic-attempts-v1` and `wm-training-basic-workspace-v1`; no merging or rewriting of existing records.
- Validated the dashboard inline JavaScript syntax and simulated DOM rendering against mixed motor/basic records (3 basic attempts, 2 passes, 1 failure, 2 distinct signatures, 2-device saved circuit), empty storage and corrupt basic attempt data. All three scenarios matched expected results.
- Application commit on main: `ebaebda7c087a3e8fec21b895aef6a7a9541a43a`.
- Vercel production deployment `dpl_6fiHgYhPq3a52ZHx41nQVNM26Q5d` confirmed READY with matching application SHA; stable alias assigned.
- Versioned test link: https://electrical-training-7qugjty0w-winn-marion.vercel.app/student-progress.html
- Stable URL (recommended for existing browser-local data): https://electrical-training-pro-winn-marion.vercel.app/student-progress.html
- Limitations: JavaScript tests used a simulated DOM, not rendered browser or real Samsung verification for this dashboard change. Data is still local to the browser and cannot be used as authenticated employee training grades. The basic trainer and motor outcomes were previously browser-tested in the preceding release; this run did not repeat those browser regressions.


## 2026-10-29 — motor outcomes and separate basic wiring trainer
- Continued from approved main checkpoint f1f3a5e. Motor Test uses the existing unchanged topology evaluator; only a full pass displays a green rotating motor. Failed tests display a stationary smoking motor and original SVG storybook-lord artwork with “You don't know the Muffin Man!” No uploaded or third-party image is assumed. Smoke is explicitly comic feedback, not predicted equipment damage.
- New dedicated basic-wiring.html reuses the approved schematic interaction engine with its own source / maintained switch / motor-load evaluator. Tests verify a complete switched load path, open-switch interruption, shorts, bypasses, malformed terminals and unsupported devices. Motor-control and basic pages link to each other and the catalog. Basic circuits and attempts have separate browser-local keys; the existing progress dashboard still reports motor-control history only.
- Outcomes return to idle on redraw/edit, load, undo, reset or board pointer interaction, preventing a stale running animation after wiring changes. Reduced-motion preference disables animation. Responsive outcome layout, readable colors and mobile header handling added.
- Existing motor evaluator, guided hints, motor save/history keys, freehand pointer geometry, explicit draw/pan/device/delete modes and LOTO files preserved. simulator.js only changes storage-key selection for the basic page.
- Verification: node --test tests/motor-validation.test.js tests/basic-validation.test.js passed 38/38 (28 existing motor, 10 basic). Headless Edge browser-regression.cjs passed both pages at 1440x1000 and 390x844 with touch emulation: fail/pass animation states, no running on short, edit invalidation, save/load, undo, freehand desktop drawing, touch terminal connections, one-tap wire deletion away from components, mutually exclusive modes, catalog navigation and no page errors / horizontal document overflow. Screenshots visually inspected; contrast and mobile header corrected.
- Limitations: emulated touch is not a real Samsung test. Basic motor load is a simplified educational two-terminal model, not a direct-wired industrial installation or safety certification. Authenticated grading and cross-device progress remain pending. Browser tests use synthetic circuit fixtures for verdict cases plus actual pointer/touch drawing/deletion checks.
- Application commit on main: c13908ed3e59bcc027db1d49a4ffe7646f42f072. Vercel production deployment dpl_C1H3wPxpxzSxtB4qa4k6K4eXxDsH confirmed READY with matching GitHub SHA; stable alias confirmed assigned. Static project (no framework build); Vercel build phase approximately 2.5 seconds.
- Live production browser verification passed the same four desktop/touch-emulation flows with no page errors, including catalog navigation, outcomes, save/load, undo, drawing, deletion and mode selection. Tested stable origin: https://electrical-training-pro-winn-marion.vercel.app . Versioned release: https://electrical-training-c8b0c09w4-winn-marion.vercel.app .
- Test pages: https://electrical-training-pro-winn-marion.vercel.app/motor.html and https://electrical-training-pro-winn-marion.vercel.app/basic-wiring.html . Real Samsung device testing remains outstanding; no runtime-log scan or monitoring/drain audit was performed (static client-side feature).


## 2026-10-28 — resilient motor-control practice signatures
- Hardened `motor-validation.js` signature generation so malformed circuit arrays, null devices/wires, and unsupported extra devices cannot crash the motor Test handler after the evaluator returns a failure. Valid circuit signatures retain their existing format, preserving deduplication for previously saved valid circuits.
- Invalid extra devices now contribute to the signature, so changing a malformed circuit is not silently treated as the same practice attempt.
- Added three regression cases to `tests/motor-validation.test.js` for malformed inputs, invalid-device signature differences, and valid signature compatibility. Ran the complete 28-case suite in an isolated JavaScript harness against the updated source: 28 passed, 0 failed. This is not a rendered browser or real Samsung device test.
- Application commits on `main`: evaluator `4cd98f7378532e3cd21f5213b170d798edab52b9`, tests `617959e0625b47712a30c5348f2883d43b75debb`.
- Vercel production deployment `dpl_9XB4rADGejLrdZJiC7xUpWmQVzfr` confirmed READY with matching GitHub SHA `617959e0625b47712a30c5348f2883d43b75debb`.
- Deployment URL: https://electrical-training-8rdtqym6r-winn-marion.vercel.app/motor.html
- Stable URL for browser-local progress: https://electrical-training-pro-winn-marion.vercel.app/motor.html
- `simulator.js`, Samsung-approved touch drawing/pan/delete modes, hints, saved circuits, progress/export, LOTO and separate course pages were not modified.
- Limitations: Vercel READY confirms deployment status, not successful page load or touchscreen functionality. No rendered browser or Samsung regression test completed. Circuit evaluation remains educational only; secure employee accounts and shared instructor gradebook are pending.


## 2026-10-27 — independent START pushbutton validation
- Updated `motor-validation.js` to verify each START NO pushbutton can energize the motor coil independently, while preserving the existing all-START, individual-STOP, AUX seal-in, idle and short-circuit checks. This prevents two START buttons incorrectly wired in series from passing merely because the previous model pressed all START buttons together.
- Added two regression tests: parallel START buttons pass; incorrectly series-wired START buttons fail with `open circuit`. The new series case failed against the previous evaluator (`passed`) and passed after the fix. All 25 isolated regression tests passed against the updated evaluator; the previous 23 tests still pass.
- Application commits on `main`: evaluator `052b583e1a10f7b362c86e6e1310a051bd795b00`; regression tests `e6f9f579e4034ddf2bb4455fabee4ddfab73d4b6`.
- Vercel production deployment `dpl_26ypd76usb53o5rNRW87iX6qFPRo` verified READY with matching GitHub SHA `e6f9f579e4034ddf2bb4455fabee4ddfab73d4b6`.
- Deployment test URL: https://electrical-training-qrosgi7yn-winn-marion.vercel.app/motor.html
- Stable URL for browser-local student history: https://electrical-training-pro-winn-marion.vercel.app/motor.html
- Only evaluator and test files changed; `simulator.js`, Samsung-approved drawing/pan/delete interactions, guided hints, saved circuits, progress/export, LOTO and separate course pages were not edited.
- Limitations: regression tests ran in an isolated JavaScript harness, not a rendered browser. The direct HTTP check was unsuccessful (web retrieval inaccessible and container DNS resolution failed), so page load and Samsung interaction remain unverified. Vercel READY confirms deployment/build status only. The evaluator is an educational training model, not field-grade electrical certification.


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
