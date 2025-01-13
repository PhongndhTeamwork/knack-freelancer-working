"use client"

import {WelcomeBanner} from "@/components/constitution/welcome-banner";
import {ProfileCompletionProgress} from "@/components/constitution/profile-completion-progress";
import useProfileStore from "@/lib/store/profile.modal";

export const FreelancerProgress = () => {
    const {profile} = useProfileStore()
    return (
        <div className="bg-[#F2F2F280] max-width-suitable px-14 mx-auto py-16 space-y-8">
            <WelcomeBanner userName={profile?.username + " 🎉"}
                           supportingText="Chúng mình có một số gợi ý nhỏ cho bạn đó!"/>
            <ProfileCompletionProgress/>
        </div>
    )
}