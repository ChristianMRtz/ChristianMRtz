import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const projectVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" as const }
    }
};

const hoverVariants = {
    scale: 1.05,
    y: -8,
    transition: {
        duration: 0.3,
        ease: "easeOut" as const
    }
};

type ProjectCardProps = {
    icon: string;
    title: string;
    description: string;
    stats: Array<{ icon: string; text: string }>;
    tech: string;
    githubUrl?: string;
};

const ProjectCard = React.memo<ProjectCardProps>(({ icon, title, description, stats, tech, githubUrl }) => (
    <motion.article
        className="project-card"
        variants={projectVariants}
        whileHover={hoverVariants}
    >
        <div className="project-header">
            <div className="project-icon">{icon}</div>
            <h3>{title}</h3>
        </div>
        <p>{description}</p>
        <div className="project-stats">
            {stats.map((stat, idx) => (
                <span key={idx} className="project-stat">{stat.icon} {stat.text}</span>
            ))}
        </div>
        <p className="card-meta">{tech}</p>
        {githubUrl && (
            <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
            >
                View on GitHub →
            </a>
        )}
    </motion.article>
));

export const ProjectsSection: React.FC = () => {
    const { t } = useTranslation();

    const projects = useMemo(() => [
        {
            icon: "⚡",
            title: t('projects.list.disputeResolution.title'),
            description: t('projects.list.disputeResolution.description'),
            stats: [
                { icon: "🚀", text: t('projects.production') },
                { icon: "📊", text: t('projects.highImpact') }
            ],
            tech: t('projects.list.disputeResolution.tech')
        },
        {
            icon: "📊",
            title: t('projects.list.backoffice.title'),
            description: t('projects.list.backoffice.description'),
            stats: [
                { icon: "⚡", text: t('projects.realtime') },
                { icon: "👥", text: `500+ ${t('projects.users')}` }
            ],
            tech: t('projects.list.backoffice.tech')
        },
        {
            icon: "💰",
            title: t('projects.list.expensable.title'),
            description: t('projects.list.expensable.description'),
            stats: [
                { icon: "⭐", text: `2 ${t('projects.stars')}` },
                { icon: "📱", text: t('projects.fullStack') }
            ],
            tech: t('projects.list.expensable.tech'),
            githubUrl: "https://github.com/ChristianMRtz/Expensable"
        },
        {
            icon: "✅",
            title: t('projects.list.doable.title'),
            description: t('projects.list.doable.description'),
            stats: [
                { icon: "⭐", text: `1 ${t('projects.stars')}` },
                { icon: "🎯", text: t('projects.vanillaJS') }
            ],
            tech: t('projects.list.doable.tech'),
            githubUrl: "https://github.com/ChristianMRtz/Doable"
        },
        {
            icon: "🐦",
            title: t('projects.list.twitterClone.title'),
            description: t('projects.list.twitterClone.description'),
            stats: [
                { icon: "⭐", text: `2 ${t('projects.stars')}` },
                { icon: "🔄", text: t('projects.realtime') }
            ],
            tech: t('projects.list.twitterClone.tech'),
            githubUrl: "https://github.com/ChristianMRtz/Clone-Twiter"
        },
        {
            icon: "📈",
            title: t('projects.list.statisticsAPI.title'),
            description: t('projects.list.statisticsAPI.description'),
            stats: [
                { icon: "⭐", text: `2 ${t('projects.stars')}` },
                { icon: "🔌", text: t('projects.restAPI') }
            ],
            tech: t('projects.list.statisticsAPI.tech'),
            githubUrl: "https://github.com/ChristianMRtz/api-statistics"
        },
        {
            icon: "🎮",
            title: t('projects.list.cliviaGenerator.title'),
            description: t('projects.list.cliviaGenerator.description'),
            stats: [
                { icon: "⭐", text: `1 ${t('projects.stars')}` },
                { icon: "🎯", text: t('projects.interactive') }
            ],
            tech: t('projects.list.cliviaGenerator.tech'),
            githubUrl: "https://github.com/ChristianMRtz/Clivia-Generator"
        },
        {
            icon: "🎮",
            title: t('projects.list.pokemonChallenge.title'),
            description: t('projects.list.pokemonChallenge.description'),
            stats: [
                { icon: "⚡", text: t('projects.apiIntegration') },
                { icon: "🎨", text: t('projects.interactive') }
            ],
            tech: t('projects.list.pokemonChallenge.tech'),
            githubUrl: "https://github.com/ChristianMRtz/pokemon-challenge"
        },
        {
            icon: "👥",
            title: t('projects.list.socialNetworkFrontend.title'),
            description: t('projects.list.socialNetworkFrontend.description'),
            stats: [
                { icon: "💻", text: t('projects.frontend') },
                { icon: "📱", text: t('projects.responsive') }
            ],
            tech: t('projects.list.socialNetworkFrontend.tech'),
            githubUrl: "https://github.com/ChristianMRtz/front-social-network"
        },
        {
            icon: "🔌",
            title: t('projects.list.socialNetworkAPI.title'),
            description: t('projects.list.socialNetworkAPI.description'),
            stats: [
                { icon: "🔒", text: t('projects.auth') },
                { icon: "🔌", text: t('projects.restAPI') }
            ],
            tech: t('projects.list.socialNetworkAPI.tech'),
            githubUrl: "https://github.com/ChristianMRtz/api_sn_challenge"
        },
        {
            icon: "⚔️",
            title: t('projects.list.battleship.title'),
            description: t('projects.list.battleship.description'),
            stats: [
                { icon: "🤖", text: t('projects.aiOpponent') },
                { icon: "🎮", text: t('projects.gameLogic') }
            ],
            tech: t('projects.list.battleship.tech'),
            githubUrl: "https://github.com/ChristianMRtz/battleship"
        },
        {
            icon: "🎨",
            title: t('projects.list.sunnyside.title'),
            description: t('projects.list.sunnyside.description'),
            stats: [
                { icon: "📱", text: t('projects.responsive') },
                { icon: "✨", text: t('projects.animations') }
            ],
            tech: t('projects.list.sunnyside.tech'),
            githubUrl: "https://github.com/ChristianMRtz/challenge_sunnyside"
        },
        {
            icon: "📱",
            title: t('projects.list.expoContext.title'),
            description: t('projects.list.expoContext.description'),
            stats: [
                { icon: "⭐", text: `1 ${t('projects.stars')}` },
                { icon: "📱", text: t('projects.reactNative') }
            ],
            tech: t('projects.list.expoContext.tech'),
            githubUrl: "https://github.com/ChristianMRtz/expo-context"
        }
    ], [t]);

    return (
        <motion.section
            id="projects"
            className="section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
            >
                {t('projects.title')}
            </motion.h2>
            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.01 }}
            >
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </motion.div>
        </motion.section>
    );
};
