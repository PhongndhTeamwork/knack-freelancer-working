import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {Heart, AlertCircle, MapPin, HandMetalIcon} from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ProfileCompletionProgress =() => {
    return (
        <div className="mx-auto space-y-4">
            <div className="grid gap-10 md:grid-cols-[300px,1fr] lg:grid-cols-3">
                {/* Progress Section */}
                <div>
                    <div className="space-y-6">
                        <div
                            className="p-3 rounded-xl flex items-center gap-3 border-[#E57A00] text-warning text-[#E57A00] bg-[#E57A0033]"
                            style={{border: "1px dashed"}}>
                            <AlertCircle className="h-5 w-5" style={{color: "#E57A00"}}/>
                            <span>Bạn chưa hoàn thiện Hồ sơ cá nhân và Portfolio</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div>
                                {/*<span className="text-sm font-medium">40%</span>*/}
                                <CircularProgressbar className="w-11 h-11" styles={buildStyles({
                                    pathColor: "#D86603",
                                    textColor: "#D86603",
                                    textSize: "18px"
                                })} value={40} text="40%"/>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Hoàn thiện Hồ sơ cá nhân</span>
                                <p className="text-sm text-muted-foreground">
                                    Cho chúng tôi biết rõ hơn về bạn và công việc bạn đang làm
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <div>
                                {/*<span className="text-sm font-medium">40%</span>*/}
                                <CircularProgressbar className="w-11 h-11" styles={buildStyles({
                                    pathColor: "#D86603",
                                    textColor: "#D86603",
                                    textSize: "18px"
                                })} value={0} text="0%"/>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Hoàn thiện Portfolio</span>
                                <p className="text-sm text-muted-foreground">
                                    Gây ấn tượng với doanh nghiệp và các nhà tuyển dụng
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Profile Banner */}
                <Card className="relative overflow-hidden col-span-2 p-4 h-fit">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-900 z-0"/>
                    <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-50"/>

                    <CardContent className="relative z-10 p-6" style={{backdropFilter : 'blur(20px)'}}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Avatar className="w-20 h-20 border-2 border-white">
                                <AvatarImage src="/placeholder.svg" alt="Trinh Văn Quyền"/>
                                <AvatarFallback>TVQ</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-white">
                                <h2 className="text-2xl font-bold">Trinh Văn Quyền</h2>
                                <p className="text-gray-200">Người mẫu - Diễn viên Phim hành động</p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-200">
                                    <MapPin className="h-4 w-4" />
                                    Hà Nội, Việt Nam
                                    <span className="mx-2">•</span>
                                    175 cm | 72 kg
                                </div>
                            </div>

                            <div className="flex flex-col gap-12 sm:self-start items-end">
                                <div className="flex items-center text-red-500  hover:bg-white/20 rounded-xl border-2 border-white py-2 px-3 w-fit">
                                    <Heart className="h-4 w-4 mr-2 text-red-500 fill-red-500" />
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