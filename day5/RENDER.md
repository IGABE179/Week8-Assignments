# Render Detective – Answers (Week 8, Day 5)

Use the buttons at the top of the app to open one experiment at a time.
Logs below are production-like. In development, root `<StrictMode>` calls each
component twice, so every line can appear twice. That is normal.

## Part A: Explain

- **Trigger:** something asks React to check the UI again: the first mount, or a
  state setter such as `setCount`.
- **Render:** React calls the component functions to work out what the JSX should be.
  Nothing on the page changes yet.
- **Commit:** React compares the new result with the old one and changes only the
  DOM nodes that are different. Sometimes that is zero nodes.

**The three re-render paths:**
1. The component's **own state** changes.
2. Its **parent renders**.
3. A **context** value it reads changes.

**What does not cause a re-render:** changing `ref.current`, changing an ordinary
variable, or mutating an object in place.

## Part B: Observe Examples 1 and 2

**Example 1 – Counter**

| Action | Console | Screen |
|--------|---------|--------|
| Mount | `Counter rendered with: 0` | "Current value: 0" |
| Click Add one | `Counter rendered with: 1` | text node changes to 1 |
| Click again | `Counter rendered with: 2` | text node changes to 2 |

Each click triggers → Counter renders → React commits only the changed number.

**Example 2 – Parent and child**

| Action | Console | Screen |
|--------|---------|--------|
| Mount | `Parent rendered`, `Greeting rendered` | button + "Hello, Aline." |
| Click | `Parent rendered`, `Greeting rendered` | only the button number changes |

`Greeting` is called again because its parent rendered. Its output is identical,
so React leaves the `<p>` in the DOM untouched. **Render ≠ DOM update.**

## Part C: Preserve or reset (Example 6)

- **Checkbox off:** the key is always `'shared'`. Same component, same position, same
  key, so React keeps the instance and the typed draft **is preserved** when switching
  contact. Only the `name` prop changes.
- **Checkbox on:** the key becomes the contact name (`'Aline'` / `'Eric'`). Switching
  changes the key, so React unmounts the old `Draft` and mounts a new one, and the
  draft **resets** to empty.
- **Toggling the checkbox itself** changes the key from `'shared'` to `'Aline'`, so the
  draft resets once.

## Part D: Reduce work (Example 4A vs 4B)

| Click | Console |
|-------|---------|
| 4A Counter | `StudentList rendered (4A)` every click |
| 4B Counter | nothing – StudentList is not called |

In 4A the state lives in the parent, so the parent renders and so does its child
`StudentList`. In 4B the state lives inside `Counter`, so only `Counter` renders.
The parent and the sibling list are not involved. This needed no `memo`.

## Part E: Build – Render Detective

| Test | Console | Why |
|------|---------|-----|
| Change theme | `RenderDetective rendered`, `ContactList rendered`, no `ContactCard` logs | `visible` (useMemo) and `toggleFavorite` (useCallback) keep the same references, so memoized cards skip |
| Type "a" in Search | parent, list, then cards for matches whose position or reference changed | `query` changed, so `visible` is recalculated |
| Save Aline | parent, list, `ContactCard: Aline` only | the updater makes a new object only for Aline. The others keep their references |
| Favorites only on | parent, list, cards that enter the list | cards enter/leave the list. With no favorites, "No contacts match." shows |

**Every state variable:** `contacts` (the data), `query` (controlled search),
`onlyFavorites` (filter checkbox), `dark` (theme, which does not touch contact data).
**Keys:** `contact.id`, stable and unique among siblings, never the index or `Math.random()`.
**`memo(ContactCard)`:** skips a card when `contact` and `onToggle` are the same references.
**`useCallback` updater:** `setContacts(items => ...)` reads the latest array, so the
dependency list can honestly be `[]` and the function identity stays stable.
**No mutation:** `.filter()` returns a new array before `.sort()`.

## Part F: Profiler

`<Profiler id="ContactList">` logs, for example:
`[Profiler] ContactList update: 0.20 ms` after **Change theme**.

**One unnecessary render:** `ContactList` renders when the theme changes, even though
its props are identical (`visible` and `toggleFavorite` are both stable).

**Is fixing it worthwhile?** No. It takes a fraction of a millisecond, and the
expensive part (the cards) is already skipped. We could wrap `ContactList` in
`memo`, but that adds code and a comparison for no measurable gain. Measure first,
and optimise only a real slowdown.

In React DevTools → Profiler, record while clicking **Change theme**. ContactCard
shows as "did not render", which confirms what the Console shows.