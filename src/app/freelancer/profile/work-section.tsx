import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ArrowDownCircle} from 'lucide-react'
import {Button} from "@/components/ui/button";
import {Illustration} from "@/components/custom/illustration";

interface FeaturedWork {
    title: string
    company: string
    price: number
    date: string
}

interface PriceItem {
    title: string
    type: string
    price: number
    description: string
}

export const WorkSection = () => {
    const featuredWork: FeaturedWork[] = [
        {
            title: "Mẫu ảnh",
            company: "Insasta Clothing Brand",
            price: 1600000,
            date: "Từ 3/4/2024 đến nay"
        },
        {
            title: "Diễn viên võ thuật",
            company: "Action C Youtube",
            price: 30400000,
            date: "Từ 3/4/2024 đến nay"
        }
    ]

    const priceList: PriceItem[] = [
        {
            title: "Mẫu ảnh",
            type: "IG Post",
            price: 30000000,
            description: "Tôi là một người khá hòa đồng, làm việc nghiêm túc, luôn tuân thủ về thời gian, timeline cũng như yêu cầu của bên đơn vị booking hoặc khách hàng."
        },
        {
            title: "Stylish",
            type: "Make Up khổ",
            price: 1600000,
            description: "Tôi là một người khá hòa đồng, làm việc nghiêm túc, luôn tuân thủ về thời gian, timeline cũng như yêu cầu của bên đơn vị booking hoặc khách hàng."
        },
        {
            title: "Make Up Artist",
            type: "Make Up khổ",
            price: 1600000,
            description: "Tôi là một người khá hòa đồng, làm việc nghiêm túc, luôn tuân thủ về thời gian, timeline cũng như yêu cầu của bên đơn vị booking hoặc khách hàng."
        }
    ]

    return (
        <div className="space-y-6 w-full">
            <Card className="p-6 space-y-6">
                <div className="flex flex-row items-center gap-2">
                    <Illustration className="w-7 object-cover aspect-[1/1]"
                                  url="/freelancer/profile/BriefCase.svg"/>
                    <h3 className="font-bold">Công việc nổi bật</h3>
                </div>

                <div className="grid md:grid-cols-2 md:gap-4">
                    {
                        featuredWork.map((work, index) => (
                            <Card key={index} className="col-span-1 p-0">
                                <CardContent className="p-4">
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{work.title}</h3>
                                                <p className="text-sm text-muted-foreground">{work.company}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{work.price.toLocaleString('vi-VN')} VND</p>
                                                <p className="text-sm text-muted-foreground">{work.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Illustration className="w-7 object-cover aspect-[1/1]"
                                  url="/freelancer/profile/Coins.svg"/>
                    <h3 className="font-bold">Bảng giá</h3>
                </div>
                <div className="grid md:grid-cols-2 md:gap-4">
                    <Card className="p-4 space-y-4 h-fit">
                        <h3 className="font-bold">Mẫu ảnh</h3>
                        {priceList.map((p, index) => (<div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Button variant="secondary" size="sm" className="rounded-md border shadow text-[#333333]">
                                    {p.type}
                                    <ArrowDownCircle className="h-5 w-5"/>
                                </Button>
                                <span className="font-bold text-[#333333]">
                                {p.price} VNĐ
                            </span>
                            </div>
                            <div className="text-[#545454]">
                                {p.description}
                            </div>

                        </div>))}
                    </Card>
                    <div className="space-y-4">
                        <Card className="p-4 space-y-4">
                            <h3 className="font-bold">Stylish</h3>
                            {priceList.map((p, index) => (<div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Button variant="secondary" size="sm"
                                            className="rounded-md border shadow text-[#333333]">
                                        {p.type}
                                        <ArrowDownCircle className="h-5 w-5"/>
                                    </Button>
                                    <span className="font-bold text-[#333333]">
                                {p.price} VNĐ
                            </span>
                                </div>
                                <div className="text-[#545454]">
                                    {p.description}
                                </div>

                            </div>))}
                        </Card>
                        <Card className="p-4 space-y-4">
                            <h3 className="font-bold">Makeup Artist</h3>
                            {priceList.map((p, index) => (<div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Button variant="secondary" size="sm"
                                            className="rounded-md border shadow text-[#333333]">
                                        {p.type}
                                        <ArrowDownCircle className="h-5 w-5"/>
                                    </Button>
                                    <span className="font-bold text-[#333333]">
                                {p.price} VNĐ
                            </span>
                                </div>
                                <div className="text-[#545454]">
                                    {p.description}
                                </div>

                            </div>))}
                        </Card>
                    </div>
                </div>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                    <Illustration className="w-7 object-cover aspect-[1/1]"
                                  url="/freelancer/profile/BriefCase.svg"/>
                    <CardTitle style={{marginTop : 0}}>Portfolio của bạn</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {/*<div className="flex justify-between items-start">*/}
                        {/*    <h3 className="font-medium">Người mẫu triển vọng</h3>*/}
                        {/*    <span className="text-sm text-muted-foreground">7/2024 - 12/2025</span>*/}
                        {/*</div>*/}
                        {/*<p className="text-sm text-muted-foreground">*/}
                        {/*    Làm việc ở đây tốt nhưng mà không có sướng. Sếp không trả lương đúng hạn. Tóm lại là không*/}
                        {/*    cần nhắc làm ở đây thì khi vì quá.*/}
                        {/*</p>*/}
                    </div>
                </CardContent>
            </Card>
        </div>


    )
}