# Effects Lab

SheCanCode Advanced Frontend – Week 8, Day 1: `useEffect`, side effects and the component lifecycle.

A React + Vite page with small widgets. Each one syncs with something outside React:

| Widget | External system | Dependency array |
|--------|-----------------|------------------|
| Title Mirror | `document.title` | `[title]` |
| Saved Note | `localStorage` | `[note]` |
| Live Clock | `setInterval` timer (with cleanup) | `[]` |
| Window Width | `resize` event (with cleanup) | `[]` |
| Reminders | `localStorage` with JSON | `[reminders]` |

`App.jsx` also has three logging Effects (A: no array, B: `[]`, C: `[showClock]`)
so you can see in the Console when each kind of Effect runs.

## Run it

```bash
npm install
npm run dev
```

Open the link that Vite prints, then open the Console (F12).

Written answers for Part A (classification) and Part E (tests) are in [ANSWERS.md](ANSWERS.md).