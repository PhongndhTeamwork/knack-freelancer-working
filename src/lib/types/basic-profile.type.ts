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
    profileAchievements : ProfileAchievementForm[],
    profileProminentWorks : ProfileProminentWorkForm[]
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

export type ProfileAchievementForm = {
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
    wage?: number;
}

export type ProfileProminentWorkForm = {
    id ?: number;
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
