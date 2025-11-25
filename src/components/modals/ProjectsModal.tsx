import React from "react";
import { motion } from "framer-motion";
import { Modal } from "../Modal";

type ProjectsModalProps = {
    onClose: () => void;
};

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Selected Projects">
            <div className="projects-modal-content">
                <motion.div
                    className="project-card-modal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <div className="project-header">
                        <div className="project-icon">⚡</div>
                        <h4>Automated Dispute Resolution System</h4>
                    </div>
                    <p>
                        Automated PDF generation system for chargeback disputes that integrates with multiple microservices to compile evidence, user history, and transaction data. Successfully enabled the fraud team to win disputes and recover significant financial losses.
                    </p>
                    <div className="project-stats">
                        <span className="project-stat">🚀 Production</span>
                        <span className="project-stat">📊 High Impact</span>
                    </div>
                    <p className="card-meta">Kotlin · Vert.x · React · PDF Generation · Microservices</p>
                </motion.div>

                <motion.div
                    className="project-card-modal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <div className="project-header">
                        <div className="project-icon">📊</div>
                        <h4>BackOffice - Fraud Prevention Platform</h4>
                    </div>
                    <p>
                        Full-stack React application that orchestrates multiple microservices to implement fraud detection rules, account blocks, and automated actions. Integrates with third-party services like Cybersource and Incode for biometric verification and risk scoring. Used daily by 500+ fraud analysts across operations.
                    </p>
                    <div className="project-stats">
                        <span className="project-stat">⚡ Real-time</span>
                        <span className="project-stat">👥 500+ Users</span>
                    </div>
                    <p className="card-meta">React.js · TypeScript · REST APIs · Microservices</p>
                </motion.div>
            </div>
        </Modal>
    );
};
