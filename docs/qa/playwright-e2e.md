# Playwright E2E Tests

Location

- Tests: `e2e/tests/`
- Config: `e2e/playwright.config.ts`
- Fixtures: `e2e/fixtures/`

Install Playwright (once):

```powershell
pnpm add -D @playwright/test
npx playwright install --with-deps
```

Scripts

- Add these scripts to `package.json` to run tests locally:

```jsonc
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:headed": "playwright test --headed"
}
```

How to run

1. Start the dev server:

```powershell
pnpm dev
```

2. In another terminal, run Playwright tests:

```powershell
pnpm exec playwright test
```

Notes

- The test suite is a skeleton and uses soft assertions and mocked assumptions.
- For CI, ensure a test URL is available and backend endpoints are mocked or a test database is provisioned.
- Test files are intentionally conservative to avoid brittle selectors; adapt selectors to match actual component labels.
