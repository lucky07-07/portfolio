// Every state machine in the app, in one file. See ./machine.js for the format.
// Components own the timers and DOM events; these tables own what may happen next.

// ── Mobile navigation menu (Navbar) ────────────────────────────────────
//   closed ⇄ open
export const disclosure = {
    initial: "closed",
    states: {
        closed: { OPEN: "open", TOGGLE: "open" },
        open:   { CLOSE: "closed", TOGGLE: "closed" },
    },
};

// ── Project details dialog (Projects) ──────────────────────────────────
//   closed → open(item) → closed. The item is kept after closing so the
//   exit animation still has something to draw.
export const dialog = {
    initial: "closed",
    context: { item: null },
    states: {
        closed: { OPEN: (_, e) => ({ to: "open", ctx: { item: e.item } }) },
        open:   { CLOSE: "closed" },
    },
};

// ── Hero role typewriter (Hero) ────────────────────────────────────────
//   typing → holding → deleting → typing (next word)
//   One TICK per timer; the component picks the delay from the state.
export const typewriter = (words) => ({
    initial: "typing",
    context: { word: 0, chars: 0 },
    states: {
        typing: {
            TICK: (c) => {
                const chars = c.chars + 1;
                return { to: chars >= words[c.word].length ? "holding" : "typing", ctx: { ...c, chars } };
            },
        },
        holding: { TICK: "deleting" },
        deleting: {
            TICK: (c) => (c.chars > 1
                ? { ctx: { ...c, chars: c.chars - 1 } }
                : { to: "typing", ctx: { word: (c.word + 1) % words.length, chars: 0 } }),
        },
    },
});

// ── Ask-me console answer stream (AskConsole) ──────────────────────────
//   waiting → streaming → done; ASK restarts from waiting at any point.
//   REVEAL jumps straight to the full answer (reduced motion).
const ask = (c, e) => (e.question === c.question ? null : { to: "waiting", ctx: { question: e.question, shown: 0 } });
const reveal = (c, e) => ({ to: "done", ctx: { ...c, shown: e.total } });

export const stream = {
    initial: "waiting",
    context: { question: 0, shown: 0 },
    states: {
        waiting: {
            TICK: (c) => ({ to: "streaming", ctx: { ...c, shown: 1 } }),
            ASK: ask,
            REVEAL: reveal,
        },
        streaming: {
            TICK: (c, e) => {
                const shown = c.shown + 1;
                return { to: shown >= e.total ? "done" : "streaming", ctx: { ...c, shown } };
            },
            ASK: ask,
            REVEAL: reveal,
        },
        done: { ASK: ask },
    },
};

// ── Copy-to-clipboard button (Contact) ─────────────────────────────────
//   idle → copied | failed → idle
const settled = { RESET: "idle", COPIED: "copied", FAILED: "failed" };
export const clipboard = {
    initial: "idle",
    states: {
        idle:   { COPIED: "copied", FAILED: "failed" },
        copied: settled,
        failed: settled,
    },
};

// ── Self-attention strip (AttentionViz) ────────────────────────────────
//   touring: the query token advances by itself.
//   pinned:  the visitor holds a token, by pointer and/or keyboard focus.
//   It returns to touring only when both holds are released.
const release = (ctx) => ({ to: ctx.hover || ctx.keyboard ? "pinned" : "touring", ctx });

export const attention = (order, first) => ({
    initial: "touring",
    context: { focus: first, hover: false, keyboard: false },
    states: {
        touring: {
            STEP:  (c) => ({ ctx: { ...c, focus: order[(order.indexOf(c.focus) + 1) % order.length] } }),
            HOVER: (c, e) => ({ to: "pinned", ctx: { ...c, focus: e.token, hover: true } }),
            FOCUS: (c, e) => ({ to: "pinned", ctx: { ...c, focus: e.token, keyboard: true } }),
        },
        pinned: {
            HOVER:   (c, e) => ({ ctx: { ...c, focus: e.token, hover: true } }),
            FOCUS:   (c, e) => ({ ctx: { ...c, focus: e.token, keyboard: true } }),
            UNHOVER: (c) => release({ ...c, hover: false }),
            BLUR:    (c) => release({ ...c, keyboard: false }),
        },
    },
});

// ── Remote image (Logo) ────────────────────────────────────────────────
//   loading → loaded | failed. Start in "failed" when there is no source.
export const asset = {
    initial: "loading",
    states: {
        loading: { LOADED: "loaded", FAILED: "failed" },
        loaded:  { FAILED: "failed" },
        failed:  {},
    },
};
