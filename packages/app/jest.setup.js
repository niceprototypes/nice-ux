import { TextDecoder, TextEncoder } from "node:util"

// jsdom lacks TextEncoder (React Router reads it at import), scrollTo (TanStack Router restores scroll)
// and ResizeObserver (the sidebar footer measures its content; this one reports once, on observe).
Object.assign(globalThis, { TextDecoder, TextEncoder })
window.scrollTo = () => {}
globalThis.ResizeObserver = class {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    this.callback([], this)
  }
  unobserve() {}
  disconnect() {}
}

// jsdom's window is 1024px wide, below laptop, where the sidebar is a drawer; tests start at a laptop
// width and resize for the drawer themselves.
window.innerWidth = 1440
