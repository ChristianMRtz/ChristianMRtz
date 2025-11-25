import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HoverText } from "./HoverText";

export const ExperienceSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <motion.section
            id="experience"
            className="section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
        >
            <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 }}
            >
                {t('experience.title')}
            </motion.h2>

            <motion.div
                className="card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 }}
            >
                <h3>{t('experience.jobs.clip.title')} · {t('experience.jobs.clip.company')}</h3>
                <p className="card-meta">{t('experience.jobs.clip.period')}</p>
                <p>
                    <HoverText>
                        {t('experience.jobs.clip.description')}
                    </HoverText>
                </p>
                
                <h4>{t('experience.responsibilities')}</h4>
                <ul className="card-list">
                    {(t('experience.jobs.clip.responsibilities', { returnObjects: true }) as string[]).map((resp, index) => (
                        <li key={index}>
                            <HoverText>{resp}</HoverText>
                        </li>
                    ))}
                </ul>

                <h4>{t('experience.achievements')}</h4>
                <ul className="card-list">
                    {(t('experience.jobs.clip.achievements', { returnObjects: true }) as string[]).map((achievement, index) => (
                        <li key={index}>
                            <HoverText>{achievement}</HoverText>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.section>
    );
};