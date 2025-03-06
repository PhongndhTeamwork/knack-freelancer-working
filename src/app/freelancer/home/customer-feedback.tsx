import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card"
import {Illustration} from "@/components/custom/illustration";
import {useEffect, useState} from "react";
import axios from "axios";
import useAuthStore from "@/lib/store/user.modal";
import {PortfolioCustomerFeedbackForm} from "@/lib/types/portfolio.type";

export const CustomerFeedback = () => {
    const [feedback, setFeedback] = useState<PortfolioCustomerFeedbackForm>({});
    const {token} = useAuthStore();

    useEffect(() => {
        if (!token) return;
        axios.get(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/feedback`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({data}) => {
            setFeedback(data.data);
        }).catch(() => {
        })
    }, [token]);

    return (
        <div className="mx-auto">
            <div className="space-y-3 mb-8">
                <h2 className="responsive-text-40 font-bold">Feedback từ Khách hàng</h2>
                <p className="text-[#545454] max-w-3xl responsive-text-24">
                    Our services are loved by founders around the all world. We are proud to work with emerging talents,
                    innovative startups and companies. So you are Our Customers
                </p>
            </div>

            {feedback && <Card className="relative overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                <div className="absolute inset-0">
                    <Illustration
                        url="/freelancer/profile/feedback/feedback1.jpg"
                        className="w-full h-full object-cover aspect-[16/9] md:aspect-[21/9]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"/>
                </div>

                <CardContent className="relative h-full p-6 flex flex-col justify-end">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-16 w-16 border-2 border-white">
                                <AvatarImage src={feedback.image || ""} alt="Nguyễn Phú Anh"/>
                                <AvatarFallback>{feedback?.companyName?.substring(0, 1) || "P"}</AvatarFallback>
                            </Avatar>
                            <div className="text-white">
                                <h3 className="font-semibold text-3xl">{feedback.customerName}</h3>
                                <p className="text-white/80 text-xl">{feedback.customerPosition} in {feedback.companyName}</p>
                            </div>
                        </div>

                    </div>
                    <div
                        className="absolute top-16 right-16 bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-3xl max-w-md p-8">
                        <h4 className="text-white font-medium text-2xl mb-2">{feedback.customerName}</h4>
                        <p className="text-sm text-[#D8D8D8]">
                            {feedback.comment}
                        </p>
                    </div>
                </CardContent>
            </Card>}
        </div>
    )
}