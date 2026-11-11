import { useMachine } from "../lib/machine";
import { asset } from "../lib/machines";

// A remote image that never shows a broken-image icon: while it loads or once
// it has loaded the <img> is shown; if it fails (or there is no source) the
// fallback is rendered instead.
export default function Logo({ src, alt = "", className, fallback = null, ...rest }) {
    const [state, send] = useMachine(asset, { initial: src ? "loading" : "failed" });

    if (state === "failed") return fallback;

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            data-state={state}
            onLoad={() => send("LOADED")}
            onError={() => send("FAILED")}
            className={className}
            {...rest}
        />
    );
}
