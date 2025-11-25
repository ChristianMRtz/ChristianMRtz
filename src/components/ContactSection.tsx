import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const ContactSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <motion.section
            id="contact"
            className="section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
        >
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
            >
                {t('contact.title')}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 }}
            >
                {t('contact.description')}
            </motion.p>
            <motion.p
                className="contact-links"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15, staggerChildren: 0.05 }}
            >
                <motion.a
                    href="mailto:christianmr268@gmail.com"
                    className="link"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                >
                    christianmr268@gmail.com
                </motion.a>
                <motion.a
                    href="https://www.linkedin.com/in/christian-martos26/"
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {t('contact.linkedin')}
                </motion.a>
                <motion.a
                    href="https://github.com/ChristianMRtz"
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {t('contact.github')}
                </motion.a>
            </motion.p>
        </motion.section>
    );
};
