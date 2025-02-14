"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Illustration} from "@/components/custom/illustration";
import {Separator} from "@/components/ui/separator";
import useProfileStore from "@/lib/store/profile.modal";
import {cn} from "@/lib/utils";
import {FormatHelper} from "@/lib/helpers/format.helper";


export const WorkSection = () => {
    const {profile} = useProfileStore();



    return (
        <div className="space-y-6 w-full">
            <Card className="p-6">
                <div className={cn("space-y-5", profile.profileProminentWorks.length ===0 && "mb-4")}>
                    <div className="flex flex-row items-center gap-2">
                        <Illustration className="w-8 object-cover aspect-[1/1]"
                                      url="/freelancer/profile/BriefCase.svg"/>
                        <h3 className="font-bold responsive-text-20">Công việc nổi bật</h3>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-4">
                        {
                            profile.profileProminentWorks.map((work, index) => (
                                <Card key={index} className="col-span-1 p-0">
                                    <CardContent className="p-4">
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between responsive-text-16 items-start">
                                                <div className="w-1/2 2xl:w-3/5 space-y-2">
                                                    <h3 className="= responsive-text-16 font-semibold">{work.name}</h3>
                                                    <p className="responsive-text-16 text-[#333333] text-justify">{work.description}</p>
                                                </div>
                                                <div className="text-right space-y-2">
                                                    <p className="responsive-text-16 font-semibold">{work.wage?.toLocaleString('vi-VN')} VND</p>
                                                    <p className="responsive-text-16 text-[#333333] text-justify">{FormatHelper.formatDateToMonthYear(work.from || "")} {work.to ? " - " +FormatHelper.formatDateToMonthYear(work.to || "") : " đến nay"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
                {profile.profileProminentWorks.length ===0 && <Separator style={{marginTop : "0"}} />}
                <div className={cn("space-y-5", profile.profileProminentWorks.length ===0 ? "mt-9" : "mt-6")}>
                    <div className="flex flex-row items-center gap-2">
                        <Illustration className="w-8 object-cover aspect-[1/1]"
                                      url="/freelancer/profile/Coins.svg"/>
                        <h3 className="font-bold responsive-text-20">Bảng giá</h3>
                    </div>
                    {/*<div className="grid md:grid-cols-2 md:gap-4">*/}
                    {/*    <Card className="p-4 space-y-5 h-fit">*/}
                    {/*        <h3 className="font-bold responsive-text-16">Mẫu ảnh</h3>*/}
                    {/*        {priceList.map((p, index) => (*/}
                    {/*            <div key={index} className="space-y-2">*/}
                    {/*                <div className="flex justify-between items-center">*/}
                    {/*                    <Button variant="secondary" size="sm"*/}
                    {/*                            className="rounded-md h-8 border shadow text-[#333333]">*/}
                    {/*                        {p.type}*/}
                    {/*                        <ArrowDownCircle className="h-5 w-5"/>*/}
                    {/*                    </Button>*/}
                    {/*                    <span className="font-bold text-[#333333]">*/}
                    {/*                        {p.price.toLocaleString("de-DE")} VNĐ*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*                <div className="text-[#545454] responsive-text-16" style={{lineHeight : "24px"}}>*/}
                    {/*                    {p.description}*/}
                    {/*                </div>*/}
                    {/*            </div>))}*/}
                    {/*    </Card>*/}
                    {/*    <div className="space-y-4">*/}
                    {/*        <Card className="p-4 space-y-5 h-fit">*/}
                    {/*            <h3 className="font-bold responsive-text-16">Stylish</h3>*/}
                    {/*            {priceList.map((p, index) => (<div key={index} className="space-y-2">*/}
                    {/*                <div className="flex justify-between items-center">*/}
                    {/*                    <Button variant="secondary" size="sm"*/}
                    {/*                            className="rounded-md border h-8 shadow text-[#333333]">*/}
                    {/*                        {p.type}*/}
                    {/*                        <ArrowDownCircle className="h-5 w-5"/>*/}
                    {/*                    </Button>*/}
                    {/*                    <span className="font-bold text-[#333333] responsive-text-16" style={{lineHeight : "24px"}}>*/}
                    {/*            {p.price.toLocaleString("de-DE")} VNĐ*/}
                    {/*        </span>*/}
                    {/*                </div>*/}
                    {/*                <div className="text-[#545454]">*/}
                    {/*                    {p.description}*/}
                    {/*                </div>*/}

                    {/*            </div>))}*/}
                    {/*        </Card>*/}
                    {/*        <Card className="p-4 space-y-5 h-fit">*/}
                    {/*            <h3 className="font-bold responsive-text-16">Makeup Artist</h3>*/}
                    {/*            {priceList.map((p, index) => (<div key={index} className="space-y-2">*/}
                    {/*                <div className="flex justify-between items-center">*/}
                    {/*                    <Button variant="secondary" size="sm"*/}
                    {/*                            className="rounded-md h-8 border shadow text-[#333333]">*/}
                    {/*                        {p.type}*/}
                    {/*                        <ArrowDownCircle className="h-5 w-5"/>*/}
                    {/*                    </Button>*/}
                    {/*                    <span className="font-bold text-[#333333]">*/}
                    {/*            {p.price.toLocaleString("de-DE")} VNĐ*/}
                    {/*        </span>*/}
                    {/*                </div>*/}
                    {/*                <div className="text-[#545454]">*/}
                    {/*                    {p.description}*/}
                    {/*                </div>*/}

                    {/*            </div>))}*/}
                    {/*        </Card>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </Card>

            <Card className="py-6 space-y-4">
                <CardHeader className="px-6 py-0 flex flex-row items-center gap-2">
                    <Illustration className="w-8 object-cover aspect-[1/1]"
                                  url="/freelancer/profile/BriefCase.svg"/>
                    <CardTitle style={{marginTop: 0}} className="responsive-text-20">Portfolio của bạn</CardTitle>
                </CardHeader>
                {/*<CardContent>*/}
                {/*    <div className="space-y-2">*/}
                {/*        /!*<div className="flex justify-between items-start">*!/*/}
                {/*        /!*    <h3 className="font-medium">Người mẫu triển vọng</h3>*!/*/}
                {/*        /!*    <span className="text-sm text-muted-foreground">7/2024 - 12/2025</span>*!/*/}
                {/*        /!*</div>*!/*/}
                {/*        /!*<p className="text-sm text-muted-foreground">*!/*/}
                {/*        /!*    Làm việc ở đây tốt nhưng mà không có sướng. Sếp không trả lương đúng hạn. Tóm lại là không*!/*/}
                {/*        /!*    cần nhắc làm ở đây thì khi vì quá.*!/*/}
                {/*        /!*</p>*!/*/}
                {/*    </div>*/}
                {/*</CardContent>*/}
            </Card>
        </div>


    )
}