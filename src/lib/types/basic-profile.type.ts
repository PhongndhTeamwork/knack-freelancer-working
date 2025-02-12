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
    name?: string;
    description?: string;
    from ?: string;
    to ?: string;
}

export type ProfileAchievement = {
    name?: string;
    description?: string;
    from ?: string;
    to ?: string;
}

export type ProfileProminentWork = {
    name?: string;
    description?: string;
    from ?: string;
    to ?: string;
    wages?: number
}
