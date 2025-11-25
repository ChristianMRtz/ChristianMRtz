import React, { useEffect, useState } from "react";
// Count-up hook for stat numbers
function useCountUp(target: number, duration: number = 1200, decimals: number = 0) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const start = 0;
        const startTime = performance.now();
        function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = start + (target - start) * progress;
            setCount(Number(value.toFixed(decimals)));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
        // eslint-disable-next-line
    }, [target, duration, decimals]);
    return count;
}
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HoverText } from "./HoverText";

type AboutSectionProps = {
    hoveredStat: string | null;
    onStatHover: (stat: string | null) => void;
    onStatClick: (stat: string) => void;
};

export const AboutSection: React.FC<AboutSectionProps> = ({
    hoveredStat,
    onStatHover,
    onStatClick
}) => {
    const { t } = useTranslation();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.4 }
        }
    };

    // Stat values
    const experience = useCountUp(3.5, 1200, 1);
    const technologies = useCountUp(10, 1200, 0);
    const commitment = useCountUp(100, 1200, 0);

    return (
        <motion.section
            id="about"
            className="section about-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <motion.h2 variants={itemVariants}>{t('about.title')}</motion.h2>

            <motion.div className="stats-grid" variants={containerVariants}>
                <motion.div className="stat-card-wrapper" variants={itemVariants}>
                    <button
                        className="stat-card stat-card-clickable"
                        onClick={() => onStatClick("experience")}
                        onMouseEnter={() => onStatHover("experience")}
                        onMouseLeave={() => onStatHover(null)}
                    >
                        <div className="stat-number">{experience}+</div>
                        <div className="stat-label">{t('about.yearsExperience')}</div>
                    </button>
                    {hoveredStat === "experience" && (
                        <motion.div
                            className="stat-tooltip"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="tooltip-hint">🚀 Click to see journey</div>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div className="stat-card-wrapper" variants={itemVariants}>
                    <button
                        className="stat-card stat-card-clickable"
                        onClick={() => onStatClick("technologies")}
                        onMouseEnter={() => onStatHover("technologies")}
                        onMouseLeave={() => onStatHover(null)}
                    >
                        <div className="stat-number">{technologies}+</div>
                        <div className="stat-label">{t('about.technologiesMastered')}</div>
                    </button>
                    {hoveredStat === "technologies" && (
                        <motion.div
                            className="stat-tooltip"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="tooltip-hint">⚙️ Click to see tech stack</div>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div className="stat-card-wrapper" variants={itemVariants}>
                    <button
                        className="stat-card stat-card-clickable"
                        onClick={() => onStatClick("commitment")}
                        onMouseEnter={() => onStatHover("commitment")}
                        onMouseLeave={() => onStatHover(null)}
                    >
                        <div className="stat-number">{commitment}%</div>
                        <div className="stat-label">{t('about.codeCommits')}</div>
                    </button>
                    {hoveredStat === "commitment" && (
                        <motion.div
                            className="stat-tooltip"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="tooltip-hint">🎯 Click to see values</div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            <motion.div className="about-content" variants={itemVariants}>
                <p>
                    <HoverText>
                        {t('about.bio.p1')}
                    </HoverText>
                </p>
                <p>
                    <HoverText>
                        {t('about.bio.p2')}
                    </HoverText>
                </p>
                <p>
                    <HoverText>
                        {t('about.bio.p3')}
                    </HoverText>
                </p>
            </motion.div>
        </motion.section>
    );
};
