import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {

    const contacts = [
        {
            label: "Email",
            value: "anilkumarlucky07@gmail.com",
            href: "mailto:anilkumarlucky07@gmail.com",
        },
        {
            label: "LinkedIn",
            value: "linkedin.com/in/anil-kumar-29884a17a",
            href: "https://www.linkedin.com/in/anil-kumar-29884a17a/",
        },
        {
            label: "GitHub",
            value: "github.com/lucky07-07",
            href: "https://github.com/lucky07-07",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            {/* Header */}
            <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-5 bg-white/[0.08] rounded-full" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f0c674]">Contact</p>
                </div>
                <h2 className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#f5f5f5]">
                    Get in Touch
                </h2>
                <p className="mt-2 text-sm text-[#c8c8c8]">
                    Available for full-stack and AI engineering work. Open to collaboration.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {contacts.map((item, i) => (
                    <motion.a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.07 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2, transition: { duration: 0.18 } }}
                        className="futuristic-card neon-hover p-5 flex flex-col gap-2 group cursor-pointer"
                    >
                        <p className="text-[9px] uppercase tracking-[0.28em] text-[#9f9f9f]">
                            {item.label}
                        </p>
                        <p className="text-sm text-[#f5f5f5] break-all leading-snug">
                            {item.value}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-[#9f9f9f] group-hover:text-[#f0c674] transition-colors duration-200">
                            <span className="text-[10px] uppercase tracking-[0.2em]">Connect</span>
                            <ArrowUpRight
                                size={10}
                                className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
                            />
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.section>
    );
}
