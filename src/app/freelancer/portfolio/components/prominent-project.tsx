import { Badge } from "@/components/ui/badge"
import { CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// type Props = {
//     index : number
// }

export const ProminentProject = () => {
    return (
        <div className="container mx-auto max-width-suitable" >
            <div className="grid lg:grid-cols-[40%_1fr] gap-12 w-full">
                <div className="space-y-5">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full h-14 responsive-text-20 py-1 px-6 border border-black">
                            Dự án
                        </Badge>
                        {/*<Badge variant="outline">Đơn dự án</Badge>*/}
                    </div>

                    <div className="border-none shadow-none text-xl space-y-4">
                        <div className="px-0 pt-0 space-y-4">
                            <CardTitle className="font-semibold responsive-text-36">Tên Dự án #1 - Chút mô tả ngắn về Dự án của bạn</CardTitle>
                            <CardDescription className="mt-2 text-xl font-normal">
                                Evolo is a Framer Template made for digital marketing agencies and SaaS businesses. It features multiple pages, and tons of unique sections to help build your new website.
                            </CardDescription>
                            <CardDescription className="text-xl">
                                It&#39;s built to help you showcase your business&#39;s services or products, you can also use the contact form as an easy way to get in touch with you through the Calendly embed.
                            </CardDescription>
                        </div>
                        <div className="px-0">
                            <dl className="space-y-4">
                                <div className="flex justify-between border-b-2 pb-2">
                                    <dt className="font-medium text-muted-foreground flex items-center">Vai trò</dt>
                                    <dd className="mt-1">Lorem Ipsum</dd>
                                </div>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <dt className="text font-medium text-muted-foreground flex items-center">Thời gian tham gia</dt>
                                    <dd className="mt-1">Lorem Ipsum</dd>
                                </div>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <dt className="text font-medium text-muted-foreground flex items-center">Công ty</dt>
                                    <dd className="mt-1">Lorem Ipsum</dd>
                                </div>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <dt className="text font-medium text-muted-foreground flex items-center">Chi tiết dự án</dt>
                                    <dd className="mt-1">Lorem Ipsum</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full h-14 responsive-text-20 py-1 px-6 border border-black">
                            Ảnh dự án
                        </Badge>
                        {/*<Badge variant="outline">Đơn dự án</Badge>*/}
                    </div>
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="relative aspect-[2/1] space-y-5 overflow-hidden rounded-lg">
                            <Image
                                src="/portfolio/portfolio1.svg"
                                alt={`Project image ${index}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}