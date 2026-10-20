# LOTO training workflow — approved design (2026-10-20)

## Keep existing working 3D lab
Preserve current disconnect handle, mobile controls, cabinet, meter, and branding. Do not replace the existing 3D lab with the simplified guide preview.

## Shared session state
The checklist is the master training record. Checklist and 3D simulator share a persisted session (student, scenario, stage, timestamps, attempts, completed actions, meter readings, errors). Returning between pages resumes progress. Physical actions automatically check off corresponding checklist tasks; never allow manual bypass for simulated actions.

## Phase 1: Pre-work checklist
Student starts on a separate procedure page: identify equipment and isolation points; notify affected personnel; clear work area; review stored energy and approved isolation procedure. Proceed to 3D lab after prerequisites.

## Phase 2: 3D physical isolation and verification
Shutdown, disconnect OFF, apply hasp/lock/tag, open cabinet only under appropriate safe procedure, verify meter on known live source, test incoming line side as appropriate for qualified simulated procedure, verify absence of voltage at all required load/work points including phase-phase and phase-ground, then reverify meter. Mark each physical action automatically. Unexpected voltage blocks progression. Do not assume OFF means de-energized.

## Phase 3: Work completion checklist
Return to checklist, record satisfactory completion of simulated work while LOTO remains applied.

## Phase 4: 3D restoration
Return to lab: clear work area, restore covers and guards, account for personnel, remove personal lock/tag/hasp only under proper authorization, restore power and verify operation.

## Phase 5: Final sign-off
Return to checklist for satisfactory operation confirmation, student sign-off and instructor review.

## Instructor troubleshooting
Advanced backfeed and fault scenarios are instructor-controlled and locked until standard LOTO training passed. Student must recognize hazardous readings and stop safely.

## Safety and implementation
Training simulation is not authorization for live work. Actual procedures require qualified personnel, PPE, approved energy control, and live-dead-live testing. Implement staged shared-session integration and test on Android, iPhone and desktop. Keep changes modular; don't overwrite stable working components.
