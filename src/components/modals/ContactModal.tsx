import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Modal } from "../Modal";

type ContactModalProps = {
    onClose: () => void;
};

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
    const { t } = useTranslation();
    
    return (
        <Modal onClose={onClose} title={t('contact.title')}>
            <div className="contact-modal-content">
                <motion.p
                    className="contact-intro"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {t('contact.description')}
                </motion.p>

                <div className="contact-methods">
                    <motion.a
                        href="mailto:christianmr268@gmail.com"
                        className="contact-method"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div className="contact-icon">📧</div>
                        <div className="contact-details">
                            <div className="contact-label">{t('contact.email')}</div>
                            <div className="contact-value">christianmr268@gmail.com</div>
                        </div>
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/christian-martos26/"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-method"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <div className="contact-icon">👤</div>
                        <div className="contact-details">
                            <div className="contact-label">{t('contact.linkedin')}</div>
                            <div className="contact-value">christian-martos26</div>
                        </div>
                    </motion.a>

                    <motion.a
                        href="https://github.com/ChristianMRtz"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-method"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    >
                        <div className="contact-icon">💻</div>
                        <div className="contact-details">
                            <div className="contact-label">{t('contact.github')}</div>
                            <div className="contact-value">ChristianMRtz</div>
                        </div>
                    </motion.a>
                </div>

                <motion.div
                    className="contact-footer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    <p>{t('contact.footer')}</p>
                </motion.div>
            </div>
        </Modal>
    );
};
