# Day 3, Exercise 6 — Diagnose Four Broken Tests

Four tests. **Two fail. Two pass.** All four are wrong.

The component (`EmployeeCard.tsx`) is correct. Every bug is in the tests.
Do not change the component except where a file explicitly tells you to.

## Setup

Copy these files into your project under `src/exercises/day-03/`, then:

```bash
npx vitest run src/exercises/day-03
```

Expected starting state — confirm you see this before you begin:

```text
✓ 03-query-by-class.test.tsx  (1 test)
✓ 04-asserts-nothing.test.tsx (3 tests)
× 01-missing-await.test.tsx
× 02-getby-vs-findby.test.tsx

Test Files  2 failed | 2 passed (4)
     Tests  2 failed | 4 passed (6)
```

If you get `ReferenceError: React is not defined`, your JSX transform is not
configured. Set `"jsx": "react-jsx"` in `tsconfig.json` and make sure your
Vite config uses the automatic runtime. This is a real setup bug, not part
of the exercise.

## The four

| File | Symptom | The harder question |
|---|---|---|
| `01-missing-await` | Fails: call count is 0 | Why did the click not happen? |
| `02-getby-vs-findby` | Fails: element not found | The element *does* appear. When? |
| `03-query-by-class` | **Passes** | What is it actually asserting? |
| `04-asserts-nothing` | **Passes** | Three separate problems. Find all three. |

The two that pass are the more important pair. A failing test tells you it is
wrong. A passing test that asserts nothing tells you nothing at all, and it
will sit in the suite for years being counted as coverage.

## Deliverable

For each file, in your PR description:

1. **What was wrong** — one sentence, naming the mechanism.
2. **What you changed** — and why that fix rather than an easier one.
3. For 03 and 04: **what would have to break in the app** for the original
   test to fail. If the answer is "nothing," say so.

## Rules

```text
No setTimeout. No arbitrary delays. No increased timeouts.
No act() wrapping.
No weakening an assertion to make it pass.
```

If a fix makes the test pass by asserting less, it is not a fix.
