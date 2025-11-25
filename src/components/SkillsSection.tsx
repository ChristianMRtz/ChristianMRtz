import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skillsData } from "../data/skills";
import type { SkillInfo } from "../types";

type SkillsSectionProps = {
    hoveredSkill: string | null;
    onSkillHover: (skill: string | null) => void;
    onSkillClick: (skill: SkillInfo) => void;
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
    hoveredSkill,
    onSkillHover,
    onSkillClick
}) => {
    const { t } = useTranslation();

    const skillCategories = useMemo(() => [
        {
            key: 'backend',
            title: t('skills.categories.backend'),
            skills: ["Kotlin", "Vert.x", "Ruby", "Ruby on Rails", "Java"]
        },
        {
            key: 'frontend',
            title: t('skills.categories.frontend'),
            skills: ["React.js", "TypeScript", "JavaScript", "CSS/Tailwind"]
        },
        {
            key: 'cloud',
            title: t('skills.categories.cloud'),
            skills: ["Kafka", "Redis", "PostgreSQL", "MongoDB", "AWS S3", "Docker"]
        },
        {
            key: 'tools',
            title: t('skills.categories.tools'),
            skills: ["Mockito", "Jest", "Git", "AI-assisted development"]
        }
    ], [t]);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06
            }
        }
    };

    const categoryVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.35 }
        }
    };

    return (
        <motion.section
            id="skills"
            className="section skills-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <motion.h2 variants={categoryVariants}>{t('skills.title')}</motion.h2>
            <motion.p className="skills-subtitle" variants={categoryVariants}>
                Click on any skill to see details
            </motion.p>

            {skillCategories.map((category) => (
                <motion.div key={category.key} className="skills-category" variants={categoryVariants}>
                    <h3 className="category-title">{category.title}</h3>
                    <div className="chips">
                        {category.skills.map(skill => (
                            <div key={skill} className="chip-wrapper">
                                <button
                                    className="chip chip-clickable"
                                    onClick={() => onSkillClick(skillsData[skill])}
                                    onMouseEnter={() => onSkillHover(skill)}
                                    onMouseLeave={() => onSkillHover(null)}
                                >
                                    <span className="chip-name">{skill}</span>
                                    <span className={`chip-level ${skillsData[skill].level}`}>
                                        {skillsData[skill].level === "advanced" ? "Advanced" : "Intermediate"}
                                    </span>
                                </button>
                                {hoveredSkill === skill && (
                                    <motion.div
                                        className="skill-tooltip"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="tooltip-level">
                                            {skillsData[skill].level === "advanced" ? "⭐ Advanced" : "📚 Intermediate"}
                                        </div>
                                        <div className="tooltip-exp">🕒 {skillsData[skill].experience}</div>
                                        <div className="tooltip-hint">Click for details</div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </motion.section>
    );
};
