import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card"
import {Heart, AlertCircle, MapPin, HandMetalIcon, Link} from 'lucide-react'
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import useProfileStore from "@/lib/store/profile.modal";
import {Illustration} from "@/components/custom/illustration";
import {useEffect, useState} from "react";
import {ExtractInformation} from "@/lib/helpers/extract-information";

export const ProfileCompletionProgress = () => {
    const router = useRouter();
    const {profile} = useProfileStore()
    const [link, setLink] = useState<string | undefined>(undefined)
    useEffect(() => {
        let socialLink = undefined;
        if (profile.tiktokLink && profile.tiktokLink?.trim() !== "") socialLink = profile.tiktokLink;
        else if (profile.facebookLink && profile.facebookLink?.trim() !== "") socialLink = profile.facebookLink;
        else if (profile.youtubeLink && profile.youtubeLink?.trim() !== "") socialLink = profile.youtubeLink;
        else if (profile.instagramLink && profile.instagramLink?.trim() !== "") socialLink = profile.tiktokLink;
        setLink(socialLink);
    }, [profile.facebookLink, profile.instagramLink, profile.tiktokLink, profile.youtubeLink]);

    return (
        <div className="mx-auto space-y-4">
            <div className="grid gap-6  lg:grid-cols-3">
                {/* Progress Section */}
                <Card className="p-6 col-span-1">
                    <div className="space-y-6">
                        <div
                            className="rounded-xl flex p-4 items-center gap-3 border-[#DC6803] text-warning text-[#E57A00] bg-[#E57A0033]"
                            style={{border: "1px dashed"}}>
                            <AlertCircle className="h-5 w-5" style={{color: "#DC6803"}}/>
                            <span className="responsive-text-16">Trang cá nhân và Portfolio chưa hoàn thiện</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-medium responsive-text-20">Trang cá nhân</p>
                            <Button variant="dark" size="sm" className="px-4 py-2 h-10 responsive-text-16"
                                    onClick={() => {
                                        router.push("/freelancer/profile/update")
                                    }}> Hoàn thiện</Button>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="font-medium responsive-text-20">Portfolio</p>
                            <Button variant="dark" size="sm" className="px-4 py-2 h-10 responsive-text-16"
                                    onClick={() => {
                                        router.push("/freelancer/portfolio/template")
                                    }}> Hoàn thiện</Button>
                        </div>

                        {/*<div className="flex items-center gap-5">*/}
                        {/*    <div>*/}
                        {/*        /!*<span className="text-sm font-medium">40%</span>*!/*/}
                        {/*        /!*<CircularProgressbar className="w-11 h-11" styles={buildStyles({*!/*/}
                        {/*        /!*    pathColor: "#D86603",*!/*/}
                        {/*        /!*    textColor: "#D86603",*!/*/}
                        {/*        /!*    textSize: "18px"*!/*/}
                        {/*        /!*})} value={0} text="0%"/>*!/*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <span className="text-sm font-medium">Hoàn thiện Portfolio</span>*/}
                        {/*        <p className="text-sm text-muted-foreground">*/}
                        {/*            Gây ấn tượng với doanh nghiệp và các nhà tuyển dụng*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>
                </Card>

                {/* Profile Banner */}
                <Card className="relative flex justify-center items-center overflow-hidden col-span-2 p-4 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-900/70 z-0"/>
                    <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-50"/>

                    <CardContent className="relative z-10 p-6 w-full h-full m-auto" style={{backdropFilter: 'blur(20px)'}}>
                        <div className="flex flex-col justify-between  sm:flex-row items-start sm:items-center gap-8">
                            <div className="flex gap-6">
                                <Avatar className="w-[136px] h-[136px] border-2 border-white">
                                    <AvatarImage alt="User 1" src={String(profile?.avatar) || ""}/>
                                    <AvatarFallback
                                        className="text-3xl">{profile?.name?.substring(0, 1) || "P"}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 text-white space-y-3">
                                    <div className="flex space-x-3 items-center">
                                        <h2 className="responsive-text-28 font-bold">{profile?.name}</h2>
                                        <Illustration className="w-5 h-5 object-cover cursor-pointer"
                                                      url="/freelancer/home/info/info1.svg"/>
                                        <Illustration className="w-5 h-5 object-cover cursor-pointer"
                                                      url="/freelancer/home/info/info2.svg"/>
                                    </div>

                                    <div className="flex responsive-text-16 gap-3 items-center text-[#DDDDDD]">
                                        {profile.occupation || "Thông tin về nghề nghiệp của bạn"}
                                    </div>


                                    {/*<p className="text-gray-200 responsive-text-16">Người mẫu - Diễn viên Phim hành động</p>*/}
                                    <div className="text-[#DDDDDD] responsive-text-16 flex flex-col gap-2 mt-2">
                                        <div className="flex gap-3 items-center">
                                            <MapPin className="h-4 w-4"/>
                                            {profile.address || "Nơi sinh sống"}
                                        </div>

                                        <div className="flex gap-3 items-center cursor-pointer hover:text-gray-300"
                                             onClick={() => {
                                                 if (!link) return;
                                                 window.open(link, "_blank");
                                             }}>
                                            <Link className="h-4 w-4 items-center"/>
                                            {link && ExtractInformation.getUsernameFromURL(link) || "Đường link cá nhân"}
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-col gap-12 sm:self-start items-end">
                                <div
                                    className="flex items-center text-red-500  hover:bg-white/20 rounded-xl border-2 border-white py-2 px-3 w-fit">
                                    <Heart className="h-4 w-4 mr-2 text-red-500 fill-red-500"/>
                                    000
                                </div>
                                <div className="flex gap-4">
                                    <div
                                        className="flex items-center text-white  hover:bg-white/20 rounded-xl border-2 border-white py-2 px-3 w-fit">
                                        <HandMetalIcon className="h-4 w-4 mr-2 text-blue-500 fill-blue-500"/>
                                        Meta
                                    </div>
                                    <div
                                        className="flex items-center text-white  hover:bg-white/20 rounded-xl border-2 border-white py-2 px-3 w-fit">
                                        Instagram
                                    </div>
                                </div>

                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}