# Safe Effects Dashboard

SheCanCode Advanced Frontend – Week 8, Day 2: `useEffect` cleanup, race conditions,
stale closures and honest dependency arrays.

| Widget | What it shows | Cleanup |
|--------|---------------|---------|
| Timer | One-second counter with pause/resume; continues past 5 | `clearInterval` |
| Window width | Live width while visible | `removeEventListener` (same function) |
| User selector | Loading / Error / Success; user 999 shows the error state | `controller.abort()` |
| Room | Cleanup order when `roomId` changes | logs `STOP` before `START` |
| Subscription | Simulated message bus with `EventTarget` | unsubscribe |

The **Hide timer and width** button unmounts the timer and the width listener.

## Run it

```bash
npm install
npm run dev
```

Open the Console and the Network tab (F12). The user selector needs internet
(it uses jsonplaceholder.typicode.com).

Explanations and fixes for the six broken snippets, Round A and Round F are in
[FIXES.md](FIXES.md).