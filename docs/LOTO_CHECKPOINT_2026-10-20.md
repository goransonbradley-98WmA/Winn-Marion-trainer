# Winn-Marion Electrical Training Pro — Saved Milestone (2026-10-20)

## Preserved working baseline
- Production site: https://electrical-training-pro.vercel.app/
- LOTO practice: https://electrical-training-pro.vercel.app/vr-loto.html
- Main production commit at checkpoint: `40e4ac9bf4ddb5b516e2b1670d4e8e271b0b0f1b`.
- User confirmed current LOTO lock-placement exercise works well on their phone.
- Keep unobstructed 3D scene; movement and tools below viewport on mobile and desktop.
- Directly touch the black disconnect handle to operate it.
- Allow selecting a padlock and placing it on the modeled handle lockout point, with correct/incorrect feedback.
- NO prerequisite LOTO procedure checklist or mandatory step sequence in this practical module; separate written module handles that training.
- Preserve visual progress and existing training website routes and other simulators.

## Next requested development — NOT YET IMPLEMENTED IN THE CONFIRMED BASELINE
- Open/close the cabinet door interactively, using the 3D door/handle and phone touch.
- Build recognizable interior disconnect, contactor, terminals, grounding, and associated conductors.
- Introduce a training-only voltage-test meter with simulated red and black leads and selectable points.
- Include line-side and load-side test locations; teach that line side may remain energized after an OFF disconnect.
- Model appropriate live-dead-live instrument verification, phase-phase and phase-ground checks, and feedback, subject to instructor approval and qualified-person safety procedures.
- Keep controls below viewport and the lock-placement flow unchanged. Do not reintroduce mandatory procedure checklist.
- Model and validate true manufacturer's lockout opening/handle geometry against supplied photos before formal training use.
- Use modular updates and verify Android mobile interactions plus desktop behavior before replacing the production baseline.

## Guardrails
- This branch is a recovery/checkpoint branch. Develop on a separate feature branch or main; do not overwrite checkpoint code.
- Do not imply that the currently modeled test points or padlocking provision are field-validated.
- Changes to the door/meter are future work; avoid claiming them shipped until tested and deployed.
