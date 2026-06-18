import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {

    const { scrollYProgress } = useScroll();

    return (

        <motion.div
            className="
                fixed
                top-0
                left-0
                right-0
                h-[3px]
                z-[9999]
                origin-left
                bg-gradient-to-r
                from-lime-300/70
                via-lime-400/95
                to-lime-300/70
            "
            style={{
                scaleX: scrollYProgress,
            }}
        />

    );
}
