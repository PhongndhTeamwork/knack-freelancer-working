import { Card, CardContent } from "@/components/ui/card"
import {  Plus } from "lucide-react"
import {Illustration} from "@/components/custom/illustration";

const features = [
    {
        icon: <Plus className="h-[24px] w-[24px]" />,
        title: "Hệ sinh thái toàn diện",
        description: "Knack giúp kết nối mọi người đã đăng hóa, tạo ra một không gian chia sẻ kiến thức và kinh nghiệm, cùng như thúc đẩy sự phát triển chung trong cộng đồng giải trí."
    },
    {
        icon: <Illustration width={24} height={24} url="/social/sailboat.svg" />,
        title: "Giúp freelancer bộc lộ cái tôi",
        description: ""
    },
    {
        icon: <Illustration width={24} height={24} url="/social/map-pin.svg" />,
        title: "Hỗ trợ tìm công sự tiềm năng",
        description: ""
    }
]

// const talents = [
//     { image: "/placeholder.svg?height=600&width=400", alt: "Fashion model with sunglasses" },
//     { image: "/placeholder.svg?height=600&width=400", alt: "Model in red outfit" },
//     { image: "/placeholder.svg?height=600&width=400", alt: "Artist performer" },
//     { image: "/placeholder.svg?height=600&width=400", alt: "Glamour model" },
//     { image: "/placeholder.svg?height=600&width=400", alt: "Model with blonde hair" },
//     { image: "/placeholder.svg?height=600&width=400", alt: "Portrait of female model" }
// ]

export const RecruitmentFeatures = () => {
    return (
        <div className="mx-auto py-12">
            <div className="space-y-0 mb-8">
                <h2 className="text-[40px] font-bold mb-0">
                    Tương lai của tuyển dụng.
                </h2>
                <p className="text-[40px] font-bold text-[#8A8A8A]">
                    Trải nghiệm tinh gọn.
                </p>
            </div>

            <div className="grid justify-between md:grid-cols-[40%_1fr] space-x-12">
                {/* Features List */}
                <div className="space-y-4">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className={index === 0 ? "bg-black text-white" : "bg-transparent border-none"}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className={`mt-1 ${index === 0 ? "text-white" : "text-black"} w-[24px] h-[24px]`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-0">{feature.title}</h3>
                                        {feature.description && (
                                            <p className="text-sm leading-relaxed mb-0">
                                                {feature.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Talent Grid */}
                <div>
                    <Illustration className="w-full object-cover aspect-[12/5]" url="/home/recuitment1.svg"/>
                </div>
            </div>
        </div>
    )
}