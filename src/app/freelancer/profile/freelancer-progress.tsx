"use client"

import {WelcomeBanner} from "@/components/constitution/welcome-banner";
import {ProfileCompletionProgress} from "@/components/constitution/profile-completion-progress";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

type Props = {
    userName: string;
    supportingText: string;
    message: string
}
export const FreelancerProgress = ({userName, supportingText, message}: Props) => {
    const router = useRouter();
    return (
        <div className="px-[60px] mx-auto py-0 space-y-8">
            <div className="flex justify-between items-start">
                <WelcomeBanner userName={userName}
                               supportingText={supportingText}
                               message={message}/>
                <Button variant="dark" size="sm" onClick={() => {
                    router.push("/freelancer/profile/update")
                }}>Chỉnh sửa</Button>
            </div>

            <ProfileCompletionProgress/>

        </div>
    )
}