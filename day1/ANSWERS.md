# Effects Lab – Answers (Week 8, Day 1)

## Part A: Identify side effects

| # | Example | Category | Why |
|---|---------|----------|-----|
| 1 | `const total = price * quantity` | Pure calculation | Uses inputs only; changes nothing outside. Do it during render. |
| 2 | `contacts.filter(c => c.name.includes(search))` | Pure calculation | Derived from state/props; no outside system involved. |
| 3 | Saving a contact when the user clicks **Submit** | Event handler | It happens because of a specific user action, so it belongs in `onSubmit`. |
| 4 | Keeping `document.title` equal to a state value | Effect | The tab title is controlled by the browser, outside React. |
| 5 | Listening for the window `resize` event | Effect | The browser owns the listener; it needs setup and cleanup. |
| 6 | Writing a note to `localStorage` as it changes | Effect | localStorage is an external system that must stay in sync with state. |

## Part E: Required tests and explanations

**1. Title input changed three times.**
`document.title` changes because the `TitleMirror` Effect has `[title]` as its
dependency. After each committed render where `title` changed, React runs the
Effect, which writes the new title. No DOM code runs during render, so rendering
stays pure.

**2. Note written and page refreshed.**
After refreshing, the note is still in the textarea. The lazy initialiser
`useState(() => localStorage.getItem('lab-note') ?? '')` reads the saved value
when the component is created. It can be confirmed in DevTools → Application →
Local Storage → key `lab-note`.

**3. Clock hidden.**
When the clock is hidden, `LiveClock` unmounts and React calls its cleanup,
`clearInterval(id)`. Without cleanup, the browser timer would keep running and
calling `setTime` for a component that is no longer on screen. That wastes work
and, if the clock is shown and hidden repeatedly, stacks up many timers. The
Console shows `Clock cleanup: interval cleared`.

**4. Console with and without StrictMode.**
With `<StrictMode>` in `main.jsx` (development), the Console shows on first load:
`Clock setup` → `Clock cleanup` → `Clock setup`, and Effects A, B and C log
twice. React does an extra setup → cleanup → setup cycle to check that cleanup
works. Without StrictMode, each Effect logs once on mount. This only happens in
development and does not happen in production.

**5. Unrelated state changed.**
Clicking **Clicked N times** changes `clicks`, which no Effect depends on:
- Effect A (no array) **reruns** – it runs after every render.
- Effect B (`[]`) does **not** rerun – it runs only on mount.
- Effect C (`[showClock]`) does **not** rerun – `showClock` did not change.
- The `LiveClock` timer is **not** restarted – its Effect uses `[]`.

**Dependency arrays in one line each:**
- `useEffect(fn)` – after every committed render.
- `useEffect(fn, [])` – once on mount (plus the StrictMode dev check).
- `useEffect(fn, [value])` – on mount and whenever `value` changes.

## Optional extensions completed
- **Clear saved note** button: sets state to `''`; the Effect saves the empty string.
- **Window width**: a `resize` listener, removed in cleanup.
- **Reminders**: a list of three reminders saved to localStorage with `JSON.stringify` and loaded back with `JSON.parse`.