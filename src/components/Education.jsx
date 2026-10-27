import { GraduationCap } from "lucide-react";
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
            <SectionHeader index="06" tag="education" title="Education" />

            {/* timeline, newest first, like positions in a sequence */}
            <ol className="relative flex flex-col gap-6 border-l border-line pl-8 sm:pl-12">
                {education.map((item, i) => (
                    <li key={item.degree} className="relative">
                        <span className="absolute -left-[41px] top-8 flex h-4 w-4 items-center justify-center rounded-full border-2 border-ember bg-void sm:-left-[57px]">
                            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                        </span>

                        <div className="panel panel-hover flex flex-wrap items-center justify-between gap-6 p-7 sm:p-8">
                            <div className="flex items-start gap-5">
                                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ember/25 bg-ember/[0.07] sm:flex">
                                    <GraduationCap size={20} className="text-ember" />
                                </span>
                                <div>
                                    <p className="font-mono text-[12px] text-ink4">pos={i} · {item.year}</p>
                                    <h3 className="mt-2 text-xl font-semibold">{item.degree}</h3>
                                    <p className="mt-1.5 text-[15px] text-ink3">{item.university}</p>
                                </div>
                            </div>
                            <p className="font-display text-3xl font-bold text-grad">
                                {item.score}<span className="ml-1 font-mono text-[12px] font-normal text-ink4">{item.scale}</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
