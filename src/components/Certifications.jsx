import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export default function Certifications() {

    const certs = [
        {
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            logo: devicon("amazonwebservices/amazonwebservices-original-wordmark.svg"),
            featured: true,
            href: "https://www.linkedin.com/posts/anil-kumar-29884a17a_aws-certified-cloud-practitioner-was-issued-share-7464999106919239680-kZ9L",
        },
        {
            title: "Deep Learning Onramp",
            issuer: "MathWorks · MATLAB Academy",
            logo: devicon("matlab/matlab-original.svg"),
            href: "https://matlabacademy.mathworks.com/",
        },
        {
            title: "Image Processing Onramp",
            issuer: "MathWorks · MATLAB Academy",
            logo: devicon("matlab/matlab-original.svg"),
            href: "https://matlabacademy.mathworks.com/",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
            <p className="eyebrow"><span className="text-ink4">//</span> credentials</p>
            <h2 className="mb-5 mt-2 text-xl font-bold">Certifications</h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {certs.map((c, i) => (
                    <motion.a
                        key={c.title}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className={`panel panel-hover group flex items-center gap-4 p-4 ${c.featured ? "border-warn/30" : ""}`}
                    >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.92] p-2">
                            <img src={c.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
                        </span>
                        <div className="min-w-0">
                            <p className="flex items-center gap-1.5 text-[14px] font-semibold leading-snug text-ink">
                                {c.title}
                                {c.featured && <BadgeCheck size={14} className="shrink-0 text-warn" />}
                            </p>
                            <p className="mt-0.5 font-mono text-[10.5px] text-ink4">{c.issuer}</p>
                            <span className="link-mono mt-1.5 group-hover:text-cyan">
                                verify <ArrowUpRight size={10} />
                            </span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.section>
    );
}
