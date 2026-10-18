# Electrical Training Pro — Project checkpoint (2026-10-18)

## Current working baseline
- Main entry: index.html; motor control schematic simulator: simulator.js; standalone LOTO immersion: vr-loto.html.
- Dedicated immersive LOTO page is linked from Home, Courses, Simulators and 3D Lab.
- Three.js LOTO prototype has industrial cabinet, hinged door, disconnect handle, lock indicator, and basic contactor/terminal geometry.
- LOTO practice follows eight guided steps; meter mode and open-door checks are rudimentary, not yet realistic probe-to-terminal interaction.
- Mobile 3D gestures: one-finger orbit with vertical angle, two-finger pan and pinch zoom; desktop drag orbit and wheel zoom. Physical-device validation still needed.
- Motor wiring simulator has schematic components, mobile touch wire deletion improvements, exclusive tools, attempt tracking baseline, progressive troubleshooting hints. Complete solution diagram remains hidden from student page source.
- Vercel is connected to GitHub main for deployments.

## Approved direction
- Winn-Marion oilfield imagery, logos and brand treatment across the site; approved Viking feedback artwork for incorrect attempts and celebratory feedback for successful connections.
- Dedicated full-page simulators rather than all simulators sharing one crowded screen.
- Mobile-first Android/iPhone support and desktop Chrome access. No VR headset required now; architecture should permit WebXR/headset support in approximately a year.
- Keep browser-native Three.js lightweight and modular. Do not rewrite the full stack; modify only affected files/components.
- Geometric placeholders are acceptable *only while navigation and interactions are being stabilized*. Replace with realistic, appropriately licensed 3D models/textures of actual MCC cabinets, breakers, disconnects, contactors, terminals, lockout devices and digital multimeters. Customer-provided photos may follow.
- LOTO should include identifying energy sources, shutdown, isolation, personal locks/tags, stored energy, safe try-start, and live-dead-live verification with individual probe placement on required terminals.
- Training scenarios need qualified-instructor safety validation before formal use; no simulated sequence should be represented as field-ready procedure.
- Student profiles should persist attempts and errors and support instructor dashboards; not yet fully implemented.
- Future training scope includes motor controls/HOA, transformers, automation, basic wiring, ABB training links, and realistic equipment scenes.

## Next work
1. Validate pinch/pan/orbit on Samsung and iPhone; improve camera target bounds and collision handling.
2. Replace geometry with realistic equipment assets, ensuring licensing and good mobile performance.
3. Build object picking, disconnect operation, lock/tag placement, meter lead manipulation, and individual test-point validation.
4. Improve procedural state machine and record graded attempts to authenticated student profiles.
5. Integrate with full employee login, instructor views and branded course navigation.

This checkpoint records decisions and status; it is not a claim that planned features are complete.
