# Winn-Marion Immersive LOTO progress — 2026-10-18

## Integrated
- Dedicated VR LOTO page linked from the training website; browser-first Three.js, no headset required.
- Centered cabinet, phone joystick and mouse/keyboard movement, camera orbit and pinch zoom.
- Navigation controls relocated away from tool belt.
- Hand, meter, lock, tag and hasp tool belt.
- First-person gloved hand overlay with reaching motion and visible selected-tool carry icon.
- 3D padlock body/shackle, identification tag and multi-hole hasp, placed by tapping the cabinet isolation target.
- Training steps guard isolation before lock/tag; reset clears placed items.

## Still needed
- Replace stylized hand and tool icons with properly rigged 3D hand and tool models.
- Improve cabinet door selection hit-testing, animations, lockout point realism and equipment textures.
- Implement actual simulated meter probe placement, live-dead-live verification, multiple energy sources and instructor-reviewed LOTO scoring.
- Test Android/iOS touch hit targets, hand overlay spacing and all steps end-to-end.
- Link progress to authenticated employee records when account system is built.

Training prototype only: qualified instructor must validate procedures before field use.

## 3D hand iteration
- Replaced flat first-person hand overlay with a lightweight camera-attached 3D gloved hand.
- Modeled carried padlock, tag, hasp and meter geometry in the hand; reach motion triggered by cabinet interaction.
- Existing mobile movement and toolbelt retained. Verify on Samsung, especially correct placement detection, visual alignment and safety gating.
