import SectionHeader from "./SectionHeader";

export default function Education() {

    const education = [
        {
            degree: "M.Tech — Data Science",
            university: "Amrita Vishwa Vidyapeetham, Bengaluru",
            score: "8.16",
            scale: "/10 CGPA",
            year: "2025 — Present",
        },
        {
            degree: "B.Tech — Computer Science",
            university: "Vel Tech R&D Institute of Science and Technology, Chennai",
            score: "7.44",
            scale: "/10 CGPA",
            year: "2017 — 2021",
        },
        {
            degree: "Class XII (Intermediate)",
            university: "Sri Chaitanya Junior College, Tirupati",
            score: "94.4",
            scale: "%",
            year: "2017",
        },
    ];

    return (
        <div>
            <SectionHeader index="07" tag="education" title={<>Education<span className="em">.</span></>} />

            {/* newest first, like positions in a sequence */}
            <ol className="border-b border-line2">
                {education.map((item, i) => (
                    <li
                        key={item.degree}
                        className="group grid items-baseline gap-x-10 gap-y-3 border-t border-line2 py-8 transition-colors hover:bg-raised/70 sm:grid-cols-[170px_1fr_auto] sm:px-4"
                    >
                        <p className="font-mono text-[11.5px] text-ink3">
                            <span className={i === 0 ? "text-accent" : "text-ink4"}>pos={i}</span> · {item.year}
                        </p>
                        <div>
                            <h3 className="text-[1.75rem] leading-[1.1] sm:text-[2.1rem]">{item.degree}</h3>
                            <p className="mt-2 text-[15.5px] text-ink3">{item.university}</p>
                        </div>
                        <p className="font-display text-[2.6rem] leading-none text-ink transition-colors group-hover:text-accent">
                            {item.score}<span className="ml-1.5 font-mono text-[11px] text-ink4">{item.scale}</span>
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
