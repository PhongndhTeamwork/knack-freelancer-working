export type BasicProfileForm = {
    id?: number;
    name?: string;
    avatar?: string | File,
    phone?: string;
    role?: number;
    gender?: number;
    email?: string;
    biography?: string;
    address?: string;
    occupation?: string;
    facebookLink?: string;
    instagramLink?: string;
    youtubeLink?: string;
    tiktokLink?: string;
    profileWorkExperiences : ProfileWorkExperienceForm[],
    profileAchievements : ProfileAchievement[],
    profileProminentWorks : ProfileProminentWork[]
};

export type ProfileWorkExperienceForm = {
    id ?: number
    name?: string;
    description?: string;
    from ?: string;
    to ?: string;
    fromMonth ?: string;
    toMonth ?: string;
    fromYear ?: string;
    toYear ?: string;
    isCurrent ?: boolean;
}

export type ProfileAchievement = {
    id ?: number
    name?: string;
    description?: string;
    from ?: string;
    to ?: string;
    fromMonth ?: string;
    toMonth ?: string;
    fromYear ?: string;
    toYear ?: string;
    isCurrent ?: boolean;
}

export type ProfileProminentWork = {
    id ?: number;
    name?: string;
    description?: string;
    from ?: string;
    to ?: string;
    wage?: number;
    fromMonth ?: string;
    toMonth ?: string;
    fromYear ?: string;
    toYear ?: string;
    isCurrent ?: boolean;
}
