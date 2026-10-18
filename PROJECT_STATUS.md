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
