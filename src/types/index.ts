export type SkillLevel = "intermediate" | "advanced";

export type SkillInfo = {
    name: string;
    level: SkillLevel;
    experience: string;
    description: string;
    projects: string[];
};

export type ExperienceDetail = {
    period: string;
    role: string;
    description: string;
    highlights: string[];
};

export type TechCategory = {
    name: string;
    items: string[];
};

export type CommitmentValue = {
    title: string;
    description: string;
};

export type StatsInfo = {
    experience: {
        title: string;
        icon: string;
        subtitle: string;
        details: ExperienceDetail[];
    };
    technologies: {
        title: string;
        icon: string;
        subtitle: string;
        categories: TechCategory[];
        description: string;
    };
    commitment: {
        title: string;
        icon: string;
        subtitle: string;
        values: CommitmentValue[];
    };
};

export type ModalType = "projects" | "contact" | null;
