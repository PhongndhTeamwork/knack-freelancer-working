import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card"
import {Heart, AlertCircle, MapPin, HandMetalIcon, Link} from 'lucide-react'
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import useProfileStore from "@/lib/store/profile.modal";
import {Illustration} from "@/components/custom/illustration";

export const ProfileCompletionProgress = () => {
    const router = useRouter();
    const {profile} = useProfileStore()

    return (
        <div className="mx-auto space-y-4">
            <div className="grid gap-10 md:grid-cols-[300px,1fr] lg:grid-cols-3">
                {/* Progress Section */}
                <Card className="p-6">
                    <div className="space-y-6">
                        <div
                            className="p-3 rounded-xl flex items-center gap-3 border-[#E57A00] text-warning text-[#E57A00] bg-[#E57A0033]"
                            style={{border: "1px dashed"}}>
                            <AlertCircle className="h-5 w-5" style={{color: "#E57A00"}}/>
                            <span>Trang cá nhân và Portfolio chưa hoàn thiện</span>
                        </div>

                        {/*<div onClick={() => {*/}
                        {/*    router.push("/freelancer/profile/update")*/}
                        {/*}} className="cursor-pointer">*/}
                        {/*    <span className="text-sm font-medium">40%</span>*/}
                        {/*    <CircularProgressbar className="w-11 h-11" styles={buildStyles({*/}
                        {/*        pathColor: "#D86603",*/}
                        {/*        textColor: "#D86603",*/}
                        {/*        textSize: "18px"*/}
                        {/*    })} value={40} text="40%"/>*/}
                        {/*</div>*/}
                        <div className="flex justify-between items-center">
                            {/*<span className="text-sm font-medium">Hoàn thiện Hồ sơ cá nhân</span>*/}
                            {/*<p className="text-sm text-muted-foreground">*/}
                            {/*    Cho chúng tôi biết rõ hơn về bạn và công việc bạn đang làm*/}
                            {/*</p>*/}
                            <p className="font-bold text-[16px]">Trang cá nhân</p>
                            <Button variant="dark" size="sm" className="h-8 text-[16px]" onClick={() => {
                                router.push("/freelancer/profile/update")
                            }}> Hoàn thiện</Button>
                        </div>

                        <div className="flex justify-between items-center">
                            {/*<span className="text-sm font-medium">Hoàn thiện Hồ sơ cá nhân</span>*/}
                            {/*<p className="text-sm text-muted-foreground">*/}
                            {/*    Cho chúng tôi biết rõ hơn về bạn và công việc bạn đang làm*/}
                            {/*</p>*/}
                            <p className="font-bold text-[16px]">Portfolio</p>
                            <Button variant="dark" size="sm" className="h-8 text-[16px]" onClick={() => {
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
                <Card className="relative overflow-hidden col-span-2 p-4 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-900/70 z-0"/>
                    <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-50"/>

                    <CardContent className="relative z-10 p-6" style={{backdropFilter: 'blur(20px)'}}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Avatar className="w-30 h-30 border-2 border-white">
                                <AvatarImage alt="User 1" src={profile.avatar}/>
                                <AvatarFallback>{profile.username?.substring(0, 1) || "P"}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-white space-y-2">
                                <div className="flex space-x-3 items-center">
                                    <h2 className="text-2xl font-bold">{profile.username}</h2>
                                    <Illustration className="w-5 h-5 object-cover cursor-pointer"
                                                  url="/freelancer/home/info/info1.svg"/>
                                    <Illustration className="w-5 h-5 object-cover cursor-pointer"
                                                  url="/freelancer/home/info/info2.svg"/>
                                </div>

                                <p className="text-gray-200">Người mẫu - Diễn viên Phim hành động</p>
                                <div className="flex flex-col gap-2 mt-2 text-sm text-gray-200">
                                    <div className="flex gap-2 items-center">
                                        <MapPin className="h-4 w-4"/>
                                        Hà Nội, Việt Nam
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Link className="h-4 w-4 items-center"/>
                                        phunguyenkoc.billard.com
                                    </div>


                                </div>
                            </div>

                            <div className="flex flex-col gap-12 sm:self-start items-end">
                                <div
                                    className="flex items-center text-red-500  hover:bg-white/20 rounded-xl border-2 border-white py-2 px-3 w-fit">
                                    <Heart className="h-4 w-4 mr-2 text-red-500 fill-red-500"/>
                                    410
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