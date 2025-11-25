import React, { useEffect } from "react";
import { motion } from "framer-motion";

type ModalProps = {
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        
        // Prevent body scroll when modal is open
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const scrollY = window.scrollY;
        
        // Lock scroll on both html and body
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
        
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        
        globalThis.addEventListener("keydown", handleEscape);
        
        return () => {
            // Restore scroll
            document.documentElement.style.overflow = '';
            document.documentElement.style.height = '';
            
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.paddingRight = '';
            
            window.scrollTo(0, scrollY);
            globalThis.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <motion.div
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </motion.div>
        </div>
    );
};
