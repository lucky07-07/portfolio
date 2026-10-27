import { ArrowUpRight, BadgeCheck } from "lucide-react";

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;
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
            <p className="font-mono text-[12px] text-ember">certifications</p>
            <h3 className="mb-8 mt-3 text-[1.8rem] font-bold">Credentials</h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {certs.map((c) => {
                    const Tag = c.href ? "a" : "div";
                    return (
                        <Tag
                            key={c.title}
                            {...(c.href ? { href: c.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                            className={`panel panel-hover group flex items-center gap-5 p-6 ${c.featured ? "border-warn/30" : ""}`}
                        >
                            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.92] p-2.5">
                                <img src={c.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
                            </span>
                            <div className="min-w-0">
                                <p className="flex items-center gap-1.5 text-[16px] font-semibold leading-snug text-ink">
                                    {c.title}
                                    {c.featured && <BadgeCheck size={15} className="shrink-0 text-warn" />}
                                </p>
                                <p className="mt-1 font-mono text-[11.5px] text-ink4">{c.issuer}</p>
                                {c.href && (
                                    <span className="link-mono mt-2 group-hover:text-ember">
                                        verify <ArrowUpRight size={11} />
                                    </span>
                                )}
                            </div>
                        </Tag>
                    );
                })}
            </div>
        </div>
    );
}
