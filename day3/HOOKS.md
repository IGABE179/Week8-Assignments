# Hooks Toolkit – Answers and Documentation (Week 8, Day 3)

## Part A: Component, plain function, custom Hook

- **Component:** a function that returns JSX to describe what appears on screen, e.g. `SavedName`.
- **Plain function:** a normal JavaScript helper that turns inputs into a result and calls no Hooks, e.g. `formatName(first, last)`.
- **Custom Hook:** a function whose name starts with `use` and that calls other Hooks to package reusable stateful logic. It returns data, not JSX, e.g. `useToggle`.

## Hook reference

| Hook | Input | Returns | State | Effect / subscription | Cleanup |
|------|-------|---------|-------|-----------------------|---------|
| `useToggle(initial = false)` | starting boolean | `[value, toggle, setValue]` | boolean | – | – |
| `useLocalStorage(key, initial)` | storage key, default | `[value, setValue]` | stored value | writes JSON on `[key, value]` | – |
| `useDebounce(value, delay = 350)` | changing value, ms | delayed value | delayed copy | `setTimeout` on `[value, delay]` | `clearTimeout` |
| `useWindowSize()` | – | `{ width, height }` | size object | `resize` listener, `[]` | `removeEventListener` |
| `useOnlineStatus()` | – | `true` / `false` | – (browser owns it) | `useSyncExternalStore` with `online`/`offline` | returned by `subscribe` |
| `useDocumentTitle(title)` | text | nothing | – | sets `document.title` on `[title]` | not needed |
| `useKeyPress(targetKey)` | key name, e.g. `'Shift'` | `true` while held | boolean | `keydown`, `keyup`, `blur` on `[targetKey]` | removes all three |
| `useClickOutside(ref, onOutside)` | element ref, callback | nothing | – | `pointerdown` on document, `[ref, onOutside]` | `removeEventListener` |

**Why the return styles differ**
- **Array** for `useToggle` / `useLocalStorage`: a small pair in a natural order, like `useState`. The caller picks the names.
- **Object** for `useWindowSize`: named values, so order does not matter and the caller can take only `width`.
- **Single value** for `useDebounce`, `useOnlineStatus`, `useKeyPress`: read-only information.
- **Nothing** for `useDocumentTitle`, `useClickOutside`: they only perform a side effect.

## Part E: Checks

- **Cleanup:** every listener and timer is removed in cleanup (`useDebounce`, `useWindowSize`, `useOnlineStatus`, `useKeyPress`, `useClickOutside`).
- **Names:** all eight start with `use` + a capital letter and are named exports in files with the same name.
- **Dependency arrays:** each lists every reactive value the Effect reads. State setters are stable, so they are left out. No lint rule is disabled.
- **Console warnings:** `npm run lint` and `npm run build` finish with no warnings.
- **Mobile layout:** below 480px wide, buttons stack full width (`index.css`).
- **Only one title owner:** only `ScorePage` calls `useDocumentTitle`, so no two components compete for the tab title.

## Part F: Explaining one Hook – `useDebounce`

- **Input:** the value that changes quickly (search text) and a delay in ms.
- **Return value:** a copy of the value that updates only after typing pauses.
- **State:** `debounced` stores the delayed copy.
- **Effect:** every time `value` changes, it starts a timer that will copy `value` into `debounced` after `delay` ms.
- **Cleanup:** if another key is pressed before the timer finishes, cleanup clears the old timer. Only the last value is applied.

## Hooks share logic, not state

`Light` and `Sound` both call `useToggle(false)`, but clicking `Light` does not change
`Sound`. Each component that calls a Hook gets its own `useState` storage. To
share state you lift it to a common parent or use context.