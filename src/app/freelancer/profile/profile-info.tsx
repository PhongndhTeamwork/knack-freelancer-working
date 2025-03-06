"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Illustration} from "@/components/custom/illustration";
import useProfileStore from "@/lib/store/profile.modal";
import {FormatHelper} from "@/lib/helpers/format.helper";



export const ProfileInfo = () => {
    const {profile} = useProfileStore();
    return (
        <div className="space-y-6 w-full">
            {/* Introduction */}
            <Card className="py-6 space-y-4">
                <CardHeader className="px-6 py-0 flex flex-row items-center gap-2">
                    {/*<Info className="h-5 w-5 text-muted-foreground"/>*/}
                    <Illustration className="w-8 object-cover aspect-[1/1]"
                                  url="/freelancer/profile/UserCircle.svg"/>
                    <CardTitle style={{marginTop: 0}} className="responsive-text-20 font-semibold">Giới thiệu</CardTitle>
                </CardHeader>
                {profile.biography && <CardContent className="py-0">
                    <p className="text-[#333333] text-justify responsive-text-16" style={{lineHeight: "24px"}}>
                        {profile?.biography}
                    </p>
                </CardContent>}


            </Card>

            {/* Achievement Experience */}
            <Card className="py-6 space-y-4">
                <CardHeader className="px-6 py-0  flex flex-row items-center gap-2">
                    <Illustration className="w-8 object-cover aspect-[1/1]"
                                  url="/freelancer/profile/UserList.svg"/>
                    <CardTitle style={{marginTop: 0}} className="responsive-text-20 font-semibold">Kinh nghiệm làm việc</CardTitle>
                </CardHeader>
                {profile.profileWorkExperiences?.length > 0 && <CardContent className="space-y-4 py-0">
                    {profile.profileWorkExperiences.map((experience, index) => (
                        <div key={index} className="space-y-2 responsive-text-16">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold responsive-text-16 max-w-[50%] 2xl:max-w-[67%]">{experience.name}</h3>
                                <span
                                    className="">{FormatHelper.formatDateToMonthYear(experience.from || "")} {experience.to ? " - " + FormatHelper.formatDateToMonthYear(experience.to || "") : " đến nay"}</span>
                            </div>
                            <p className="text-[#333333] text-justify responsive-text-16" style={{lineHeight: "24px"}}>{experience.description}</p>
                        </div>
                    ))}
                </CardContent>}
            </Card>

            {/* Personal Achievements */}
            <Card className="py-6 space-y-4">
                <CardHeader className="px-6 py-0  flex flex-row items-center gap-2">
                    <Illustration className="w-8 object-cover aspect-[1/1]"
                                  url="/freelancer/profile/UserList.svg"/>
                    <CardTitle style={{marginTop: 0}} className="responsive-text-20 font-semibold">Thành tích cá nhân</CardTitle>
                </CardHeader>
                {profile.profileAchievements?.length > 0 && <CardContent className="space-y-4 py-0">
                    {profile.profileAchievements.map((experience, index) => (
                        <div key={index} className="space-y-2 responsive-text-16">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold responsive-text-16 max-w-[50%] 2xl:max-w-[67%]">{experience.name}</h3>
                                <span
                                    className="">{FormatHelper.formatDateToMonthYear(experience.from || "")} - {experience.to ? FormatHelper.formatDateToMonthYear(experience.to || "") : " đến nay"}</span>
                            </div>
                            <p className="text-[#333333] text-justify" style={{lineHeight: "24px"}}>{experience.description}</p>
                        </div>
                    ))}
                </CardContent>}
            </Card>
        </div>
    )
}