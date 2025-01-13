import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {Illustration} from "@/components/custom/illustration";

export const CustomerFeedback = () => {
    return (
        <div className="mx-autopy-12">
            <div className="space-y-4 mb-8">
                <h2 className="text-4xl font-bold">Feedback từ Khách hàng</h2>
                <p className="text-[#545454] max-w-3xl text-xl">
                    Our services are loved by founders around the all world. We are proud to work with emerging talents, innovative startups and companies. So you are Our Customers
                </p>
            </div>

            <Card className="relative overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                <div className="absolute inset-0">
                    <Illustration
                        url="/placeholder.svg?height=600&width=1200"
                        className="w-full h-full object-cover aspect-[16/9] md:aspect-[21/9]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>

                <CardContent className="relative h-full p-6 flex flex-col justify-end">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-16 w-16 border-2 border-white">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Nguyễn Phú Anh" />
                                <AvatarFallback>NPA</AvatarFallback>
                            </Avatar>
                            <div className="text-white">
                                <h3 className="font-semibold text-3xl">Nguyễn Phú Anh</h3>
                                <p className="text-white/80 text-xl">Người mẫu, City Studio</p>
                            </div>
                        </div>

                    </div>
                    <div className="absolute top-16 right-16 bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-3xl max-w-md p-8">
                        <h4 className="text-white font-medium text-2xl mb-2">Nguyễn Hồng Anh</h4>
                        <p className="text-sm text-[#D8D8D8]">
                            If our services is a good fit, start your subscription. Access your project board, and
                            we&#39;ll reach out the same day for a introductory discussion. Plans & Pricing ↓
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}