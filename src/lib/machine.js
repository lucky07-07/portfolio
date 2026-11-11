import { useReducer } from "react";

// A tiny finite-state-machine runner. Every piece of UI that moves through
// named states (a menu, a dialog, a typewriter…) is described as a table in
// ./machines.js and driven through here, so its states and legal transitions
// can be read in one place instead of being inferred from booleans.
//
// A machine is a plain object:
//
//   { initial: "closed",
//     context: { … },                       // optional extra data
//     states: {
//       closed: { OPEN: "open" },           // EVENT: target state
//       open:   { CLOSE: "closed",
//                 PICK: (ctx, event) => ({ to: "open", ctx: { …ctx, id: event.id } }) },
//     } }
//
// A rule is a target state name, or a function returning a target name,
// { to, ctx } (either part optional), or null to ignore the event.
// An event a state does not list is ignored: illegal transitions cannot happen.

const isDev = Boolean(import.meta.env?.DEV);

/** Pure transition: (machine, snapshot, event) → next snapshot. Safe to call outside React. */
export function transition(machine, snap, event) {
    const ev = typeof event === "string" ? { type: event } : event;
    const rule = machine.states[snap.state]?.[ev.type];

    if (rule === undefined) {
        if (isDev && !Object.values(machine.states).some((s) => ev.type in s)) {
            console.warn(`[machine] unknown event "${ev.type}" (state "${snap.state}")`);
        }
        return snap;
    }

    const out = typeof rule === "function" ? rule(snap.ctx, ev) : rule;
    if (out == null) return snap;

    const next = typeof out === "string"
        ? { state: out, ctx: snap.ctx }
        : { state: out.to ?? snap.state, ctx: out.ctx ?? snap.ctx };

    if (isDev && !(next.state in machine.states)) {
        console.warn(`[machine] "${ev.type}" leads to undefined state "${next.state}"`);
        return snap;
    }
    return next.state === snap.state && next.ctx === snap.ctx ? snap : next;
}

export const start = (machine, { initial, context } = {}) => ({
    state: initial ?? machine.initial,
    ctx: context ?? machine.context ?? {},
});

/**
 * React binding. Returns [state, send, ctx].
 * `send("EVENT")` or `send({ type: "EVENT", …payload })`.
 * Put `data-state={state}` on the element the machine controls so the state is
 * visible to CSS, tests and anyone inspecting the page.
 */
export function useMachine(machine, options) {
    const [snap, send] = useReducer(
        (s, e) => transition(machine, s, e),
        undefined,
        () => start(machine, options),
    );
    return [snap.state, send, snap.ctx];
}
