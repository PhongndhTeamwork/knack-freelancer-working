"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Illustration} from "@/components/custom/illustration";
import {motion} from "framer-motion"

export const Banner = () => {

    return (
        <div className="pt-12 overflow-hidden mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-[72px] font-semibold">
                        Phát huy tài năng,{" "}
                        <span className="block mt-3">Khám phá cơ hội.</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl">
                        Thỏa chí sáng tạo, bùng cháy đam mê. <span className="font-semibold">Knack</span> là đối tác
                        đáng
                        tin cậy cho sự thành công của bạn!
                    </p>
                    <Button
                        size="lg"
                        variant="dark"
                    >
                        Bắt Đầu Hành Trình
                    </Button>
                </div>

                {/* Right Column - Image and Cards */}
                <div className="relative flex justify-center mr-16">
                    {/* Main Profile Image */}
                    <div className="w-[300px] h-[394px]">
                        {/*<Image*/}
                        {/*    src="/placeholder.svg?height=600&width=600"*/}
                        {/*    alt="Professional smiling man with glasses"*/}
                        {/*    fill*/}
                        {/*    className="object-cover rounded-2xl"*/}
                        {/*    priority*/}
                        {/*/>*/}
                        <Illustration width={300} height={394} url="/home/banner1.svg"/>
                    </div>

                    {/* Van Nguyen Card */}
                    <motion.div
                        initial={{y: -100, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 1, ease: 'easeOut'}}
                        className="absolute bottom-[40%] left-28 transform -translate-x-1/2"
                    >
                        <Card
                            className="bg-white shadow-lg border-black">
                            <CardContent className="p-4">
                                <div className="flex flex-col items-center justify-between">
                                    <div className="flex flex-col items-center">
                                        <Avatar>
                                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Van Nguyen"/>
                                            <AvatarFallback>VN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-center">Van Nguyen</p>
                                            <p className="text-sm text-gray-500 text-center text-[12px]">UX/UI
                                                Designer</p>
                                        </div>
                                    </div>
                                    <Button variant="dark" size="sm" className="mt-[8px]">
                                        Kết nối
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    {/* Applied Status Card */}
                    <motion.div
                        initial={{x: 100, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{duration: 1, ease: 'easeOut'}}
                        className="absolute  top-[35%] -right-0 transform -translate-y-1/2"
                    >
                        <Card
                            className="bg-white shadow-lg border-black">
                            <CardContent className="p-4 space-y-2">
                                <p className="font-semibold">Đã ứng tuyển</p>
                                <div className="space-y-3 w-[217px]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Avatar className="border border-gray-300 w-6 h-6">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User 1"
                                                             className="w-full h-full"/>
                                                <AvatarFallback className="text-[12px]">U1</AvatarFallback>
                                            </Avatar>
                                            <p className="ml-2 text-[12px]">Hùng Lê</p>
                                        </div>
                                        <div>
                                            <Badge variant="secondary"
                                                   className="bg-green-100 text-green-800 rounded-xl text-[12px]">
                                                Đã xác thực
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3 w-[217px]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Avatar className="border border-gray-300 w-6 h-6">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User 1"
                                                             className="w-full h-full"/>
                                                <AvatarFallback className="text-[12px]">Q</AvatarFallback>
                                            </Avatar>
                                            <p className="ml-2 text-[12px]">Quyền Văn</p>
                                        </div>
                                        <div>
                                            <Badge variant="secondary"
                                                   className="bg-red-100 text-red-800 rounded-xl text-[12px]">
                                                Đã từ chối
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    {/* Testimonial Card */}
                    <motion.div
                        initial={{y: 100, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 1, ease: 'easeOut'}}
                        className="absolute -bottom-8 w-2/3"
                    >
                        <div
                            className="bg-black text-white p-4 rounded-2xl w-full">
                            <p className="italic">
                                “Chúng tôi tin rằng Knack là một giải pháp có thể giúp hai bên đáp ứng nhu cầu tìm kiếm
                                thông tin <span className="font-semibold">đơn giản, đầy đủ, dễ chọn lọc</span> và nhu
                                cầu
                                làm việc <span className="font-semibold">chuyên nghiệp, hiệu quả</span>”
                            </p>
                        </div>
                    </motion.div>
                    {/* Template Card */}
                    <motion.div
                        initial={{y: -100, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 1, ease: 'easeOut'}}
                        className="absolute -top-10 right-10 w-32"
                    >
                        <Card className="absolute top-0 right-10 w-32 border-black">
                            <CardContent className="p-4">
                                <div className="flex flex-col items-center justify-between">
                                    <div className="flex flex-col items-center">
                                        <Avatar>
                                            <AvatarImage src="/placeholder.svg?height=40&width=40"
                                                         alt="Van Nguyen"/>
                                            <AvatarFallback>D</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-center">Mẫu ảnh</p>
                                            <p className="text-sm text-gray-500 text-center">DEGREY</p>
                                        </div>
                                    </div>
                                    <Button variant="dark" size="sm" className="mt-[8px]">
                                        Ứng tuyển
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
            <div className="mt-20">
                <h2 className="text-[40px] font-bold mb-0">
                    Đối tác của chúng tôi.
                </h2>
                <p className="text-[40px] font-bold text-[#8A8A8A]">
                    tin tưởng và trách nhiệm.
                </p>
            </div>
        </div>
    )
}