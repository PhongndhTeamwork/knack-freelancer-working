import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkles } from 'lucide-react'
import {Button} from "@/components/ui/button";

interface Step {
    number: number
    title: string
    description: string
    isDark?: boolean
    showIcon?: boolean
}

export const ServiceSteps = () => {
    const steps: Step[] = [
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

    return (
        <div className="mx-auto">
            <h2 className="text-4xl font-bold mb-6">Các bước sử dụng dịch vụ</h2>

            <div className="grid gap-4 md:grid-cols-2">
                {steps.map((step) => (
                    <Card
                        key={step.number}
                        className={`relative overflow-hidden rounded-3xl p-4 ${
                            step.isDark ? 'bg-zinc-900 text-white' : ''
                        }`}
                    >
                        <CardHeader>
                            <Button
                                variant="outline"
                                className="w-fit"
                            >
                                Bước {step.number}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4 mt-20">
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                            <p className={`text-sm ${
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