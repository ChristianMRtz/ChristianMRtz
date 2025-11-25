import React from "react";
import { useTranslation } from "react-i18next";

type NavbarProps = {
    theme: "light" | "dark";
    onToggleTheme: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="#home" className="nav-logo">CM</a>
                <div className="nav-links">
                    <a href="#about" className="nav-link">{t('nav.about')}</a>
                    <a href="#skills" className="nav-link">{t('nav.skills')}</a>
                    <a href="#experience" className="nav-link">{t('nav.experience')}</a>
                    <a href="#projects" className="nav-link">{t('nav.projects')}</a>
                    <a href="#contact" className="nav-link">{t('nav.contact')}</a>
                </div>
                <div className="nav-actions">
                    <button className="language-toggle" onClick={toggleLanguage} title="Change language">
                        {i18n.language === 'en' ? '🇪🇸' : '🇺🇸'}
                    </button>
                    <button className="theme-toggle" onClick={onToggleTheme}>
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </div>
            </div>
        </nav>
    );
};
