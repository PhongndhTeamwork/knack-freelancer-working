"use client"

import {WelcomeBanner} from "@/components/constitution/welcome-banner";
import {ProfileCompletionProgress} from "@/components/constitution/profile-completion-progress";

type Props = {
    userName : string;
    supportingText : string;
    message : string
}
export const FreelancerProgress = ({userName,supportingText, message}:Props) => {

    return (
        <div className="px-[60px] mx-auto py-0 space-y-8">
            <WelcomeBanner userName={ userName}
                           supportingText={supportingText}
                           message={message}/>
                <ProfileCompletionProgress/>

        </div>
    )
}