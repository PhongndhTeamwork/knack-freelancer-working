import {ImageForm} from "@/lib/types/image.type";

export type BasicPortfolioForm = {
    id: number;
    name?: string;
}

export type PortfolioForm = {
    id: number;
    name?: string;
    skillDescription?: string;
    avatar ?:string;
    overview ?:string;
    detail ?:string;
    portfolioProminentProjects: PortfolioProminentProjectForm[];
    portfolioCustomerFeedbacks: PortfolioCustomerFeedbackForm[];
    portfolioWorkExperiences: PortfolioWorkExperienceForm[];
    portfolioSkills: PortfolioSkillForm[];
}

export type PortfolioProminentProjectForm = {
    id?: number;
    description?: string
    role?: string;
    name ?: string;
    company?: string;
    detail?: string;
    from?: string;
    to?: string;
    images?: ImageForm[];
    fromMonth?: string;
    toMonth?: string;
    fromYear?: string;
    toYear?: string;
    isCurrent?: boolean;
};

export type PortfolioCustomerFeedbackForm = {
    id?: number;
    star?: number;
    // role?: string;
    comment?: string;
    customerName?: string;
    companyName?: string;
    customerPosition?: string;
    image?: string;
}

export type PortfolioAboutSectionForm = {
    id?: number;
    avatar?: string;
    overview?: string;
    detail?: string;
}

export type PortfolioWorkExperienceForm = {
    id?: number;
    role?: string;
    company?: string;
    image?: string;
    from?: string;
    to?: string;
    fromMonth?: string;
    toMonth?: string;
    fromYear?: string;
    toYear?: string;
    isCurrent?: boolean;
}

export type PortfolioSkillForm = {
    id?: number;
    name?: string;
}