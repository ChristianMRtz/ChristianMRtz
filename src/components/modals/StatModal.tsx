import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Modal } from "../Modal";
import { statsInfo } from "../../data/stats";
import type { ExperienceDetail, TechCategory, CommitmentValue } from "../../types";

type StatModalProps = {
    statType: "experience" | "technologies" | "commitment";
    onClose: () => void;
};

type TranslatedExperience = {
    title: string;
    subtitle: string;
    details: ExperienceDetail[];
};

type TranslatedTechnologies = {
    title: string;
    subtitle: string;
    description: string;
    categories: TechCategory[];
};

type TranslatedCommitment = {
    title: string;
    subtitle: string;
    values: CommitmentValue[];
};

export const StatModal: React.FC<StatModalProps> = ({ statType, onClose }) => {
    const { t } = useTranslation();
    const statData = statsInfo[statType];

    // Get translated data
    const translatedData = t(`about.stats.${statType}`, { returnObjects: true }) as
        TranslatedExperience | TranslatedTechnologies | TranslatedCommitment;

    return (
        <Modal onClose={onClose} title={translatedData.title}>
            <div className="stat-modal-content">
                <motion.div
                    className="stat-modal-header"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="stat-icon">{statData.icon}</span>
                    <h4>{translatedData.subtitle}</h4>
                </motion.div>

                {statType === "experience" && (
                    <>
                        {(translatedData as TranslatedExperience).details.map((item, idx) => (
                            <motion.div
                                key={`${item.role}-${item.period}-${idx}`}
                                className="timeline-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 + (idx * 0.15) }}
                            >
                                <div className="timeline-period">{item.period}</div>
                                <h5 className="timeline-role">{item.role}</h5>
                                <p className="timeline-description">
                                    {item.description}
                                </p>
                                <ul className="timeline-highlights">
                                    {item.highlights.map((highlight, hIdx) => (
                                        <motion.li
                                            key={`${highlight.substring(0, 20)}-${hIdx}`}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.2 + (idx * 0.15) + (hIdx * 0.1) }}
                                        >
                                            ✓ {highlight}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </>
                )}

                {statType === "technologies" && (
                    <>
                        <motion.p
                            className="tech-description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            {(translatedData as TranslatedTechnologies).description}
                        </motion.p>

                        {(translatedData as TranslatedTechnologies).categories.map((category, idx) => (
                            <motion.div
                                key={`${category.name}-${idx}`}
                                className="tech-category"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                            >
                                <h5 className="tech-category-name">{category.name}</h5>
                                <div className="tech-items">
                                    {category.items.map((item, iIdx) => (
                                        <motion.span
                                            key={`${item}-${iIdx}`}
                                            className="tech-tag"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.4 + (idx * 0.1) + (iIdx * 0.05) }}
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </>
                )}

                {statType === "commitment" && (
                    <>
                        {(translatedData as TranslatedCommitment).values.map((value, idx) => (
                            <motion.div
                                key={`${value.title}-${idx}`}
                                className="value-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 + (idx * 0.15) }}
                            >
                                <h5 className="value-title">✨ {value.title}</h5>
                                <p className="value-description">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </>
                )}
            </div>
        </Modal>
    );
};
