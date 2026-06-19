# 001 — Replace the fake LinkedIn "password gate"

Base commit: `7f9169e`
Category: Security / Correctness · Impact: High · Effort: Small · Risk: Low

## Problem

`app/projects/linkedin/page.tsx` gates "private" content behind a client-side check:

```tsx
const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(() => {
  setIsAuthenticated(localStorage.getItem("linkedinAuth") === "true");
}, []);
// ...
if (password === "growth") {          // hardcoded secret, line ~39
  setIsAuthenticated(true);
  localStorage.setItem("linkedinAuth", "true");
} else {
  alert("Incorrect password");        // line ~43
}
```

Three problems:
1. **Security theater.** The password `"growth"` ships in the client bundle, and the entire
   "protected" article markup is rendered into the JS payload regardless of auth state. Anyone can
   read the password in DevTools or set `localStorage.linkedinAuth = "true"`. It is fully public.
2. **Needless `useEffect`** to read `localStorage` (project convention avoids `useEffect`), causing a
   visible flash of the locked form for returning visitors.
3. **`alert()`** for the error is inaccessible and jarring.

## Decision required (pick one, then implement)

This plan does not assume which the author wants. The executor should implement **Option A** unless
the repo owner has stated the content is genuinely confidential, in which case escalate for Option C.

- **Option A — Drop the gate (recommended).** The content isn't actually private; remove the gate
  entirely and render the case study like every other project page. Simplest, removes dead security.
- **Option B — Honest "soft" reveal.** Keep a click-to-reveal UX but stop calling it a password /
  private. Replace `alert` with an inline message. (Still public; only do this if the gate is
  decorative.)
- **Option C — Real protection.** Move the gated markup out of the client bundle and behind a server
  check (Route Handler or middleware comparing against a server-only env var; never `NEXT_PUBLIC_`).
  Only worth it if the content must not be publicly accessible. Larger; coordinate with plan 003.

## Steps (Option A)

1. Read `app/projects/linkedin/page.tsx` in full.
2. Remove `isAuthenticated` state, the `useEffect` that reads `localStorage`, the password `useState`,
   the submit handler, and the locked-form JSX branch.
3. Render the previously-gated sections unconditionally (the `getTransition(4)`…`(12)` blocks).
4. Delete the `alert(...)` call and the password `<input>`/form.
5. If `localStorage`/the form were the only reason this file needs `"use client"` beyond breadcrumbs,
   note it for plan 003 (RSC conversion) but do not block on it.

## Verification gate

- `npm run build` succeeds.
- Grep confirms no remaining references: `grep -rn "linkedinAuth\|=== \"growth\"\|alert(" app/projects/linkedin/`
  returns nothing.
- Manual: `/projects/linkedin` renders the full case study with no password prompt.

## Scope boundary

Only touch `app/projects/linkedin/page.tsx`. Do not alter other project pages, the breadcrumb
component, or routing. Image alt-text fixes on this page are handled in plan 006 — leave them.
