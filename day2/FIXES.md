# Fix the Leaky Effects – Answers (Week 8, Day 2)

## Round A: Predict cleanup order when `roomId` changes

`Room` has `useEffect(..., [roomId])` that logs `START` in setup and `STOP` in cleanup.

| Action | Console (production-like) |
|--------|---------------------------|
| First mount | `START room 1` |
| Click **Next room** | `STOP room 1` → `START room 2` |
| Click again | `STOP room 2` → `START room 3` |
| Type in the unrelated input | nothing (roomId did not change) |
| Component unmounts | `STOP room 3` |

React always cleans up the **old** room before starting the **new** one. In
development with root StrictMode there is one extra `STOP room 1` → `START room 1`
on first mount. Seen in the dashboard: **Room (cleanup order)**.

---

## The six broken snippets

### A – Timer keeps logging after unmount

**Broken**
```jsx
useEffect(() => {
  setInterval(() => console.log('tick'), 1000);
}, []);
```
**Bug:** the interval ID is never saved and never cleared. After the component
unmounts the browser keeps calling the callback. In StrictMode two intervals run.

**Fixed**
```jsx
useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(id);
}, []);
```
Seen in: `SafeTimer.jsx`.

### B – This cleanup does not remove the listener

**Broken**
```jsx
useEffect(() => {
  window.addEventListener('resize', () => console.log('width'));
  return () => window.removeEventListener(
    'resize', () => console.log('width')
  );
}, []);
```
**Bug:** the two arrow functions look the same, but they are two different function
objects. `removeEventListener` looks for the second one, which was never added,
so the original listener stays attached.

**Fixed**
```jsx
useEffect(() => {
  function handleResize() {
    console.log('width', window.innerWidth);
  }
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```
Seen in: `WidthLabel.jsx`.

### C – Counter stops increasing

**Broken**
```jsx
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []);
```
**Bug:** stale closure. The interval callback was created on the first render, when
`count` was `0`. It keeps calculating `0 + 1`, so the counter stays at 1.

**Fixed** (functional updater – no dependency on `count` needed)
```jsx
useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  return () => clearInterval(id);
}, []);
```
Adding `[count]` would also work, but it would stop and restart the interval every
second. The updater is simpler and keeps one interval. Seen in: `SafeTimer.jsx`.

### D – Tab title never follows a changed product name

**Broken**
```jsx
useEffect(() => {
  document.title = productName;
}, []);
```
**Bug:** the Effect reads `productName` but the dependency array is empty, so the Effect
runs only on mount. When the prop changes the title is stale.

**Fixed**
```jsx
useEffect(() => {
  document.title = productName;
}, [productName]);
```

### E – Old request can update a new user view

**Broken**
```jsx
useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => setUser(data));
}, [userId]);
```
**Bug:** race condition. If User 1 is slow and User 2 is fast, User 2 shows first, then
User 1's late response overwrites it. There is also no cleanup, no error handling
and no `response.ok` check.

**Fixed** (AbortController + guarded state updates)
```jsx
useEffect(() => {
  const controller = new AbortController();
  async function load() {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      if (!controller.signal.aborted) setUser(data);
    } catch (err) {
      if (!controller.signal.aborted) setError(err.message);
    }
  }
  load();
  return () => controller.abort();
}, [userId]);
```
When `userId` changes, cleanup aborts the old request, so its result is never used.
Seen in: `UserDetails.jsx`.

### F – A new options object causes needless restarts

**Broken**
```jsx
const options = { roomId };
useEffect(() => {
  console.log('Connect with', options);
}, [options]);
```
**Bug:** `options` is a new object on every render. React compares dependencies with
`Object.is`, so `{ roomId } !== { roomId }` and the Effect reruns after
**every** render, even when only unrelated state changed.

**Fixed** (move the object inside the Effect, depend on the primitive)
```jsx
useEffect(() => {
  const options = { roomId };
  console.log('Connect with', options);
}, [roomId]);
```
Seen in: `RoomDemo.jsx` (typing in the unrelated input does not restart the room).

---

## Round F: StrictMode, fast changes and every dependency

**StrictMode.** `main.jsx` wraps `<App />` in `<StrictMode>`. In development React runs
setup → cleanup → setup once on mount. On first load the Console shows, for example:
`Timer setup` → `Timer cleanup` → `Timer setup`. Because cleanup is correct, the
user sees exactly one timer counting once per second. If cleanup were missing
(snippet A), the counter would go up by 2 each second, so the bug shows up straight
away in development instead of later in production.

**Fast changes.** Clicking User 1 → User 2 → User 3 quickly logs
`abort request for user 1`, `abort request for user 2`. In the Network tab the
old requests show as *(canceled)*. Only User 3's response updates the view.

**Show/Hide.** Hiding logs `Timer cleanup` and `Width cleanup`. After that,
resizing the window does nothing and no ticks continue. Showing again starts
fresh setups.

**Every dependency explained**

| Component | Array | Why it is honest |
|-----------|-------|------------------|
| `SafeTimer` | `[running]` | Reads `running`; uses an updater, so `seconds` is not read. |
| `WidthLabel` | `[]` | Reads no props/state; `setWidth` is a stable setter. |
| `UserDetails` | `[userId]` | Each new user must start a new request and cancel the old one. |
| `Room` | `[roomId]` | `options` is built inside the Effect from `roomId`. |
| `MessageViewer` | `[]` | `messageBus` is outside the component, so it is not reactive. |

No lint warning was suppressed.