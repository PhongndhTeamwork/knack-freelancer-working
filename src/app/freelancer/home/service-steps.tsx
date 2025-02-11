import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkles } from 'lucide-react'
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

interface Step {
    number: number
    title: string
    description: string
    isDark?: boolean
    showIcon?: boolean
}
const freelancerSteps: Step[] = [
    {
        number: 1,
        title: "Đăng kí tài khoản",
        description: "Tạo tài khoản với email, số điện thoại hoặc đăng nhập qua các nền tảng như Google/Facebook.",
        isDark: true
    },
    {
        number: 2,
        title: "Hoàn thiện hồ sơ cá nhân/Portfolio",
        description: "Hãy cho chúng tôi và doanh nghiệp biết thêm về bạn thông qua kinh nghiệm làm việc và kỹ năng bạn đang có.",
        isDark: true
    },
    {
        number: 3,
        title: "Tìm kiếm và đăng tin",
        description: "Tìm kiếm cơ hội việc làm phù hợp theo lĩnh vực của bạn (ví dụ: người mẫu, stylist, sự kiện).",
        isDark: true
    },
    {
        number: 4,
        title: "Kết nối và thương lượng",
        description: "Trò chuyện với chính khách hàng của bạn ngay trên nền tảng, cùng thảo luận về yêu cầu công việc, chi phí và thời hạn.",
        isDark: true,
        showIcon: true
    }
]
const clientSteps: Step[] = [
    {
        number: 1,
        title: "Đăng kí tài khoản",
        description: "Tạo tài khoản với email, số điện thoại hoặc đăng nhập qua các nền tảng như Google/Facebook.",
        isDark: true
    },
    {
        number: 2,
        title: "Hoàn thiện hồ sơ cá nhân/Portfolio",
        description: "Hãy cho chúng tôi và doanh nghiệp biết thêm về bạn thông qua kinh nghiệm làm việc và kỹ năng bạn đang có.",
        isDark: true
    },
    {
        number: 3,
        title: "Tìm kiếm và đăng tin",
        description: "Tìm kiếm cơ hội việc làm phù hợp theo lĩnh vực của bạn (ví dụ: người mẫu, stylist, sự kiện).",
        isDark: true
    },
    {
        number: 4,
        title: "Kết nối và thương lượng",
        description: "Trò chuyện với chính khách hàng của bạn ngay trên nền tảng, cùng thảo luận về yêu cầu công việc, chi phí và thời hạn.",
        isDark: true,
        showIcon: true
    }
]
export const ServiceSteps = () => {
    const [steps, setSteps] = useState<Step[]>([]);

    const [selectedType, setSelectedType] = useState<"freelancer" | "business">("freelancer")

    useEffect(() => {
        if (selectedType === "freelancer") setSteps(freelancerSteps)
        else setSteps(clientSteps)
    },[selectedType])

    return (
        <div className="mx-auto space-y-8">
            <div className="flex justify-between w-full items-start">
                <h2 className="responsive-text-40 font-bold">Các bước sử dụng dịch vụ</h2>
                <div className="w-full max-w-md flex justify-end">
                    <div className="inline-flex rounded-[8px] bg-black p-1 space-x-2">
                        <Button
                            variant="ghost"
                            className={`rounded-[8px] font-medium px-6 py-2 responsive-text-16 h-10 transition-colors ${
                                selectedType === "freelancer" ? "bg-white text-black" : "text-white hover:text-white active:bg-gray-700 hover:bg-gray-800"
                            }`}
                            onClick={() => setSelectedType("freelancer")}
                        >
                            Dành cho Freelancers
                        </Button>
                        <Button
                            variant="ghost"
                            className={`rounded-[8px] font-medium px-6 py-2 responsive-text-16 h-10 transition-colors ${
                                selectedType === "business" ? "bg-white text-black" : "text-white hover:text-white active:bg-gray-700 hover:bg-gray-800"
                            }`}
                            onClick={() => setSelectedType("business")}
                        >
                            Dành cho doanh nghiệp
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                {steps.map((step) => (
                    <Card
                        key={step.number}
                        className={`relative overflow-hidden rounded-3xl p-8 ${
                            step.isDark ? 'bg-zinc-900 text-white' : ''
                        }`}
                    >
                        <CardHeader className="p-0">
                            <Button
                                variant="outline"
                                className="w-fit"
                            >
                                Bước {step.number}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4 p-0" style={{marginTop:"113px"}}>
                            <h3 className="responsive-text-28 font-semibold">{step.title}</h3>
                            <p className={`responsive-text-16 ${
                                step.isDark ? 'text-zinc-300' : 'text-zinc-600'
                            }`}>
                                {step.description}
                            </p>
                            {step.showIcon && (
                                <div className="absolute right-6 bottom-6">
                                    <Sparkles className="h-12 w-12 text-white/20" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}