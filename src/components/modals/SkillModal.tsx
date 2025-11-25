import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Modal } from "../Modal";
import type { SkillInfo } from "../../types";

type SkillModalProps = {
    skill: SkillInfo;
    onClose: () => void;
};

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {
    const { t } = useTranslation();
    
    // Get translated skill data
    const skillData = t(`skills.data.${skill.name}`, { returnObjects: true }) as {
        experience: string;
        description: string;
        projects: string[];
    };
    
    return (
        <Modal onClose={onClose} title={skill.name}>
            <div className="skill-modal-content">
                <motion.div
                    className="skill-modal-header"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <span className={`skill-badge ${skill.level}`}>
                        {skill.level === "advanced" ? t('skills.modal.advanced') : t('skills.modal.intermediate')}
                    </span>
                    <span className="skill-experience">🕒 {skillData.experience}</span>
                </motion.div>

                <motion.div
                    className="skill-description"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <h4>{t('skills.modal.about')}</h4>
                    <p>{skillData.description}</p>
                </motion.div>

                <motion.div
                    className="skill-projects"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <h4>{t('skills.modal.projectsApplications')}</h4>
                    <ul>
                        {skillData.projects.map((project, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                            >
                                <span className="project-bullet">▸</span>
                                {project}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="skill-footer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                >
                    <div className="skill-progress">
                        <div className="progress-bar">
                            <motion.div
                                className={`progress-fill ${skill.level}`}
                                initial={{ width: "0%" }}
                                animate={{ width: skill.level === "advanced" ? "90%" : "70%" }}
                                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                            />
                        </div>
                        <motion.span
                            className="progress-label"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 1.5 }}
                        >
                            {skill.level === "advanced" ? t('skills.modal.expertLevel') : t('skills.modal.proficient')}
                        </motion.span>
                    </div>
                </motion.div>
            </div>
        </Modal>
    );
};
