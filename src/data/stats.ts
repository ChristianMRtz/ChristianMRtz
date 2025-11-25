import type { StatsInfo } from "../types";

export const statsInfo: StatsInfo = {
    experience: {
        title: "3.5+ Years Experience",
        icon: "🚀",
        subtitle: "Professional Journey",
        details: [
            {
                period: "June 2022 - Present",
                role: "Full Stack Developer at Rappi",
                description: "Leading fraud automation initiatives, building microservices with Kotlin + Vert.x, and developing React dashboards for fraud analysts.",
                highlights: [
                    "Reduced manual review time by 60%",
                    "Built systems handling millions of transactions",
                    "Led cross-team technical initiatives"
                ]
            },
            {
                period: "2021 - 2022",
                role: "Early Career & Learning",
                description: "Focused on mastering modern tech stack, contributing to open source, and building personal projects.",
                highlights: [
                    "Completed advanced courses in React and Kotlin",
                    "Built multiple full-stack projects",
                    "Contributed to developer communities"
                ]
            }
        ]
    },
    technologies: {
        title: "10+ Technologies",
        icon: "⚙️",
        subtitle: "Technical Arsenal",
        categories: [
            {
                name: "Backend",
                items: ["Kotlin", "Vert.x", "Ruby on Rails", "Java"]
            },
            {
                name: "Frontend",
                items: ["React.js", "TypeScript", "CSS/Tailwind"]
            },
            {
                name: "Data & Infrastructure",
                items: ["Kafka", "Redis", "PostgreSQL", "MongoDB", "Docker", "AWS S3"]
            },
            {
                name: "Testing & Tools",
                items: ["Jest", "Mockito", "Git", "CI/CD"]
            }
        ],
        description: "Proficient across the full stack with deep expertise in event-driven architectures, real-time systems, and modern cloud-native development."
    },
    commitment: {
        title: "100% Commitment",
        icon: "🎯",
        subtitle: "Work Philosophy",
        values: [
            {
                title: "Quality First",
                description: "Every line of code is written with maintainability, performance, and security in mind. Comprehensive testing and code reviews are non-negotiable."
            },
            {
                title: "Continuous Learning",
                description: "Technology evolves rapidly. I stay current through courses, documentation, and hands-on experimentation with emerging tools and patterns."
            },
            {
                title: "Team Collaboration",
                description: "Great software is built by great teams. I actively mentor juniors, share knowledge, and contribute to a positive engineering culture."
            },
            {
                title: "Problem Solver",
                description: "I thrive on complex challenges. Whether it's optimizing a slow query or architecting a new service, I'm driven to find elegant solutions."
            }
        ]
    }
};
