import React from "react";
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
                        <div className="stat-number">3.5+</div>
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
                        <div className="stat-number">10+</div>
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
                        <div className="stat-number">100%</div>
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
