`addEventListener()` can listen to **many event types**. The easiest way to learn them is by category.

# Syntax

```js
element.addEventListener("eventName", callback);
```

Example:

```js
button.addEventListener("click", () => {
  console.log("Clicked");
});
```

---

# 🖱️ Mouse Events

| Event       | When it fires                    |
| ----------- | -------------------------------- |
| click       | Single click                     |
| dblclick    | Double click                     |
| mousedown   | Mouse button pressed             |
| mouseup     | Mouse button released            |
| mousemove   | Mouse moves                      |
| mouseenter  | Mouse enters element             |
| mouseleave  | Mouse leaves element             |
| mouseover   | Mouse enters (includes children) |
| mouseout    | Mouse leaves (includes children) |
| contextmenu | Right click                      |

Example:

```js
box.addEventListener("mouseenter", () => {
  console.log("Mouse entered");
});
```

---

# ⌨️ Keyboard Events

| Event    | When it fires |
| -------- | ------------- |
| keydown  | Key pressed   |
| keyup    | Key released  |
| keypress | Deprecated    |

Example:

```js
document.addEventListener("keydown", (e) => {
  console.log(e.key);
});
```

Pressing `A`:

```text
a
```

---

# 📝 Input / Form Events

| Event   | When it fires           |
| ------- | ----------------------- |
| input   | Value changes instantly |
| change  | Value committed         |
| submit  | Form submitted          |
| reset   | Form reset              |
| focus   | Input gets focus        |
| blur    | Input loses focus       |
| invalid | Validation fails        |

Example:

```js
input.addEventListener("input", (e) => {
  console.log(e.target.value);
});
```

---

# 📋 Clipboard Events

| Event | When it fires |
| ----- | ------------- |
| copy  | User copies   |
| cut   | User cuts     |
| paste | User pastes   |

Example:

```js
input.addEventListener("paste", () => {
  console.log("Pasted");
});
```

---

# 🎯 Focus Events

| Event    | When it fires     |
| -------- | ----------------- |
| focus    | Element focused   |
| blur     | Element unfocused |
| focusin  | Focus bubbles     |
| focusout | Blur bubbles      |

Example:

```js
input.addEventListener("focus", () => {
  console.log("Focused");
});
```

---

# 🪟 Window Events

| Event            | When it fires     |
| ---------------- | ----------------- |
| load             | Page loaded       |
| DOMContentLoaded | HTML parsed       |
| resize           | Window resized    |
| scroll           | User scrolls      |
| beforeunload     | User leaving page |

Example:

```js
window.addEventListener("resize", () => {
  console.log(window.innerWidth);
});
```

---

# 📱 Touch Events (Mobile)

| Event       | When it fires     |
| ----------- | ----------------- |
| touchstart  | Finger touches    |
| touchmove   | Finger moves      |
| touchend    | Finger removed    |
| touchcancel | Touch interrupted |

Example:

```js
box.addEventListener("touchstart", () => {
  console.log("Touched");
});
```

---

# 🎨 Drag & Drop Events

| Event     | When it fires      |
| --------- | ------------------ |
| dragstart | Start dragging     |
| drag      | Dragging           |
| dragend   | Drag finished      |
| dragenter | Drag enters target |
| dragover  | Drag over target   |
| dragleave | Drag leaves target |
| drop      | Item dropped       |

Example:

```js
box.addEventListener("drop", () => {
  console.log("Dropped");
});
```

---

# 🎥 Media Events

| Event        | When it fires             |
| ------------ | ------------------------- |
| play         | Video starts              |
| pause        | Video pauses              |
| ended        | Video ends                |
| volumechange | Volume changed            |
| timeupdate   | Playback position changes |

Example:

```js
video.addEventListener("play", () => {
  console.log("Playing");
});
```

---

# 🌐 Network Events

| Event   | When it fires     |
| ------- | ----------------- |
| online  | Internet restored |
| offline | Internet lost     |

Example:

```js
window.addEventListener("offline", () => {
  console.log("No internet");
});
```

---

# 📄 Document Events

| Event            | When it fires          |
| ---------------- | ---------------------- |
| visibilitychange | Tab hidden/visible     |
| selectionchange  | Text selection changes |

Example:

```js
document.addEventListener("visibilitychange", () => {
  console.log(document.hidden);
});
```

---

# Most Common Events (Use Daily)

| Category  | Event            |
| --------- | ---------------- |
| Mouse     | click            |
| Keyboard  | keydown          |
| Form      | input            |
| Form      | submit           |
| Focus     | focus            |
| Focus     | blur             |
| Clipboard | paste            |
| Window    | DOMContentLoaded |
| Window    | resize           |
| Window    | scroll           |
| Network   | online           |
| Network   | offline          |

For beginner-to-junior JavaScript projects (CRUD apps, dashboards, notes apps, student management systems), you'll use these 10–15 events about 90% of the time.
