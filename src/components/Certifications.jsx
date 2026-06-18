import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Certifications() {

    const certs = [
        {
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services (AWS)",
            href: "https://www.linkedin.com/posts/anil-kumar-29884a17a_aws-certified-cloud-practitioner-was-issued-share-7464999106919239680-kZ9L",
        },
        {
            title: "Deep Learning Onramp",
            issuer: "MathWorks · MATLAB Academy",
            href: "https://matlabacademy.mathworks.com/",
        },
        {
            title: "Image Processing Onramp",
            issuer: "MathWorks · MATLAB Academy",
            href: "https://matlabacademy.mathworks.com/",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
            {/* Header */}
            <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-5 bg-white/[0.08] rounded-full" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f0c674]">Credentials</p>
                </div>
                <h2 className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#f5f5f5]">
                    Certifications
                </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {certs.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2, transition: { duration: 0.18 } }}
                        className="futuristic-card neon-hover p-4 flex flex-col gap-3 relative overflow-hidden"
                    >
                        {/* Left accent */}
                        <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-[#f0c674]/30 to-[#f0c674]/05" />

                        <div className="pl-4">
                            <p className="text-[9px] uppercase tracking-[0.28em] text-[#9f9f9f] mb-2">
                                {c.issuer}
                            </p>
                            <h3 className="text-sm font-semibold text-[#f5f5f5] leading-snug">
                                {c.title}
                            </h3>
                        </div>

                        <div className="pl-4">
                            <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#9f9f9f] hover:text-[#f0c674] transition-colors duration-200 cursor-pointer group w-fit"
                            >
                                <span className="text-[10px] uppercase tracking-[0.2em]">
                                    View credential
                                </span>
                                <ArrowUpRight
                                    size={10}
                                    className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
                                />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
