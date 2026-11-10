import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { devicon } from "../data/logos";

const AWS_LOGO = devicon("amazonwebservices/amazonwebservices-original-wordmark.svg");
const MATLAB_LOGO = devicon("matlab/matlab-original.svg");

export default function Certifications() {

    const certs = [
        {
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            logo: AWS_LOGO,
            featured: true,
            href: "https://www.linkedin.com/posts/anil-kumar-29884a17a_aws-certified-cloud-practitioner-was-issued-share-7464999106919239680-kZ9L",
        },
        {
            title: "AWS Academy Graduate — Cloud Foundations",
            issuer: "Amazon Web Services · Feb 2026",
            logo: AWS_LOGO,
        },
        {
            title: "Deep Learning Onramp",
            issuer: "MathWorks · MATLAB Academy",
            logo: MATLAB_LOGO,
            href: "https://matlabacademy.mathworks.com/",
        },
        {
            title: "Image Processing Onramp",
            issuer: "MathWorks · MATLAB Academy",
            logo: MATLAB_LOGO,
            href: "https://matlabacademy.mathworks.com/",
        },
    ];

    return (
        <div className="mt-20">
            <p className="eyebrow !text-accent">Certifications</p>
            <h3 className="mb-8 mt-3 text-[2.2rem] leading-none sm:text-[2.6rem]">Credentials</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {certs.map((c) => {
                    const Tag = c.href ? "a" : "div";
                    return (
                        <Tag
                            key={c.title}
                            {...(c.href ? { href: c.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                            className={`card card-hover group flex items-center gap-5 p-5 sm:p-6 ${c.featured ? "!border-ink/40" : ""}`}
                        >
                            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-white p-2.5">
                                <img src={c.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="flex items-center gap-1.5 font-display text-[1.35rem] leading-[1.15] text-ink">
                                    {c.title}
                                    {c.featured && <BadgeCheck size={16} className="shrink-0 text-accent" />}
                                </p>
                                <p className="mt-1.5 font-mono text-[11px] text-ink3">{c.issuer}</p>
                            </div>
                            {c.href && (
                                <span className="link-mono shrink-0 group-hover:text-accent">
                                    verify <ArrowUpRight size={11} />
                                </span>
                            )}
                        </Tag>
                    );
                })}
            </div>
        </div>
    );
}
