# KIT.md — App Run, Journey Test and Handover Kit

**Status:** discovery-first; the README currently provides generic AI Studio application instructions, not a verified feature specification.

## Read first
- `README.md`
- `package.json`, lockfile, source entry points and existing tests
- app-specific configuration, licence and deployment workflow

## Requirements artefacts
Identify the actual user journey from source and interface. Write one normal journey, expected output, empty/invalid state, failure state, external dependency, privacy boundary and measurable acceptance criteria before making changes.

## Setup
The README states Node.js, `npm install`, `.env.local` containing `GEMINI_API_KEY`, and `npm run dev`. Verify runtime and scripts first. Use the lockfile, if present. Keep secrets local and confirm the environment file is ignored. Never expose an API key in client-side code.

## Procedure
1. Inspect scripts and dependencies.
2. Start the app using documented steps.
3. Execute the main journey once and record the exact result.
4. Test invalid input, empty state and unavailable network/API.
5. Inspect browser console and network behaviour for errors and unintended data exposure.
6. Record any manual setup or procurement requirement.
7. Keep changes scoped and provide rollback/handover instructions.

## Acceptance
- [ ] Main journey is identified and repeatable.
- [ ] Expected and actual results are recorded.
- [ ] Failure cases are tested or marked not run.
- [ ] API costs and data flow are documented.
- [ ] No secret is committed or exposed.
- [ ] Setup and known limitations are clear.