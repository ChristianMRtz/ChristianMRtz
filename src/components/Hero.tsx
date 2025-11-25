import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ThreeHero from "./ThreeHero";
import { HoverText } from "./HoverText";
import type { ModalType } from "../types";

type HeroProps = {
    onOpenModal: (modal: ModalType) => void;
};

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
    const { t } = useTranslation();

    return (
        <header id="home" className="hero">
            <motion.div
                className="hero-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <p className="hero-tag">{t('hero.tag')}</p>
                <h1 className="hero-title">{t('hero.title')}</h1>
                <p className="hero-subtitle">
                    <HoverText>
                        {t('hero.subtitle')}
                    </HoverText>
                </p>
                <p className="hero-body">
                    <HoverText>
                        {t('hero.body')}
                    </HoverText>
                </p>

                <div className="hero-buttons">
                    <button
                        className="btn primary"
                        type="button"
                        onClick={() => onOpenModal("projects")}
                    >
                        {t('hero.viewProjects')}
                    </button>
                    <button
                        className="btn ghost"
                        type="button"
                        onClick={() => onOpenModal("contact")}
                    >
                        {t('hero.getInTouch')}
                    </button>
                </div>
            </motion.div>

            <motion.div
                className="hero-right"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
                <ThreeHero />
            </motion.div>
        </header>
    );
};
