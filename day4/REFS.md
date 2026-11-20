# Refs Lab – Answers (Week 8, Day 4)

## Part A: Local variable vs useState vs useRef

| | Local `let` variable | `useState` | `useRef` |
|---|---|---|---|
| Survives new renders? | No – recreated every render | Yes | Yes |
| Changing it causes a re-render? | No | Yes | No |
| Best use | Temporary calculation | Data the user must see | DOM node, timer ID, previous value |

**Why RefCounter's display stays unchanged:** `recordClick` only changes
`clicksRef.current`. Changing a ref does not ask React to render, so
"Shown count" keeps its old value. Clicking **Show recorded count** calls
`setShown(clicksRef.current)`. That is a state update, so React renders
and the number appears. After 3 Record clicks + Show, it displays 3.

The local-variable counter is deliberately broken: the Console logs 1, 2, 3, but
the button keeps showing 0. Nothing asks React to render, and `count` resets to `0`
whenever the component renders again.

## Why each example needs a ref

| Demo | Ref holds | Why a ref (not state/JSX) |
|------|-----------|---------------------------|
| Focus search / Focus name | `<input>` DOM node | `focus()` is a DOM method; JSX cannot express it |
| Go to details | `<section>` DOM node | `scrollIntoView()` is a DOM method |
| Measure | `<div>` DOM node | `getBoundingClientRect()` reads real layout; the result goes into **state** to display |
| Live width | `<div>` DOM node | `ResizeObserver.observe()` needs the node; `disconnect()` in cleanup |
| Dialog | `<dialog>` DOM node | `showModal()` is a native method that gives a real modal with Escape and focus handling |
| Stopwatch | interval ID | Not shown on screen; prevents duplicate timers; cleared on unmount |
| Video | `<video>` DOM node | `play()` / `pause()` are media methods |
| Callback refs | `Map` of `<li>` nodes | One object ref cannot point to many items; cleanup removes entries |
| Previous value | last `count` | Remembered between renders without causing another render |

## Part D: role of `showModal()`

`showModal()` opens the `<dialog>` as a **modal**: it appears above the page, the rest
of the page cannot be used, focus moves into the dialog, and Escape closes it.
`<form method="dialog">` closes it when a button is clicked, and the button's
`value` becomes `dialog.returnValue` (shown as "Result"). The code checks
`!dialog.open` before calling `showModal()` so it is never called twice.

## Part F: React 19 ref prop

`MyInput` receives `ref` like any other prop and puts it on its real
`<input>`. The parent's `nameRef.current` is therefore the input element, so
`nameRef.current.focus()` works. `forwardRef` is not needed in React 19.

## Part G: Tests

1. **Unmounting:** start the stopwatch, then click **Unmount stopwatch**. The cleanup
   Effect clears the interval, so no timer keeps running.
2. **Repeated Start clicks:** clicking Start 3 times still counts 1 per second.
   `start()` returns early when `intervalRef.current !== null`.
3. **Missing nodes:** every DOM call uses optional chaining (`ref.current?.focus()`)
   or an `if (!ref.current) return` guard, so a missing element does not crash the page.
   DOM refs are only used in event handlers or Effects, never during render.
4. **StrictMode:** in development React mounts, cleans up, and mounts again. The
   stopwatch cleanup sets `intervalRef.current = null`, so after the test cycle Start
   still works and no extra timer exists. Callback refs also run cleanup → setup,
   and the Map still ends up with exactly 3 entries. No "has mounted" ref is used to hide this.

**Two situations where state is better than a ref**
1. A number or text the user must see change (a visible counter, the seconds in the
   stopwatch, the measurement result).
2. A value that decides what JSX shows, such as whether a menu is open or which
   class an element has. React must re-render to update the screen.