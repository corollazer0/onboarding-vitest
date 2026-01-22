# Testing Guide

## Goals
- Keep tests readable, stable, and behavior-focused.
- Prefer public behavior over implementation details.
- Follow Arrange-Act-Assert for clarity.

## Structure
- `tests/unit/`: isolated unit and component tests.
- `tests/integration/`: cross-module flows (API + store + router).
- `tests/helpers/`: shared test utilities.
- `tests/mocks/`: MSW handlers and server setup.
- `tests/setup.js`: global test setup (Pinia, MSW, Vue Test Utils).

## Naming
- Use `*.spec.js` for test files.
- Name `describe` blocks with the subject under test (component/module).
- Keep `it` statements as behavior sentences.

## Environments
- Default environment is `jsdom` for UI/component tests.
- Use `// @vitest-environment node` when tests must run in Node.

## Setup and Helpers
- Global setup runs in `tests/setup.js` and resets Pinia for each test.
- Helpers live in `tests/helpers/`:
  - `createWrapper`: mounts Vue components with shared defaults.
  - `createTestPinia`: creates and activates a Pinia instance.
  - `loadApiClient`: reloads API client modules for clean interceptor tests.
  - `createLocalStorage`: provides a localStorage stub for Node tests.

## Mocking Rules
- Prefer MSW for API integration tests.
- Use `vi.stubGlobal` for `location` or `localStorage`, and clean up with
  `vi.unstubAllGlobals` in `afterEach`.
- If a test is temporary or incomplete, add a `TODO` with next steps.

## Test Patterns
- One behavior per test; keep assertions focused.
- Avoid snapshot tests for dynamic UI unless there is a clear need.
- Use `await` for Vue updates (`wrapper.find().trigger`, `setValue`).

## Commands
- `npm run test`: run all tests.
- `npm run test:watch`: watch mode while iterating.
- `npm run test:ui`: Vitest UI.
- `npm run test:coverage`: generate coverage report.

## Checklist (per commit)
- Tests pass locally.
- New spec files are executed at least once.
- Mocks and globals are reset between tests.
