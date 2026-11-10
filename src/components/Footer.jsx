import { profile } from "../data/portfolio";

export default function Footer() {
    return (
        <footer className="mt-10 pb-16 lg:pb-10">
            <p aria-hidden="true" className="select-none text-center font-display text-[19vw] italic leading-[0.8] text-ink/[0.06] lg:text-[13.5rem]">
                Anil Kumar
            </p>
            <div className="mt-8 flex justify-center border-t border-line2 pt-5">
                <p className="font-mono text-[11px] text-ink4">
                    © 2026 {profile.name} · <span className="text-ink3">built with React + Tailwind</span>
                </p>
            </div>
        </footer>
    );
}
