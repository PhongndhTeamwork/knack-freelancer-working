"use client"

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Illustration} from "@/components/custom/illustration";
import {Separator} from "@/components/ui/separator";
import useProfileStore from "@/lib/store/profile.modal";
import {cn} from "@/lib/utils";
import {FormatHelper} from "@/lib/helpers/format.helper";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import * as React from "react";
import {useRouter} from "next/navigation";


export const WorkSection = () => {
    const {profile} = useProfileStore();
    const {basicPortfolios} =usePortfolioStore();
    const router = useRouter();


    return (
        <div className="space-y-6 w-full">
            <Card className="p-6">
                <div className={cn("space-y-5", profile.profileProminentWorks.length ===0 && "mb-4")}>
                    <div className="flex flex-row items-center gap-2">
                        <Illustration className="w-8 object-cover aspect-[1/1]"
                                      url="/freelancer/profile/Briefcase.png"/>
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
                </div>
            </Card>

            <Card className="py-6 space-y-4">
                <CardHeader className="px-6 py-0 flex flex-row items-center gap-2">
                    <Illustration className="w-8 object-cover aspect-[1/1]"
                                  url="/freelancer/profile/Briefcase.png"/>
                    <CardTitle style={{marginTop: 0}} className="responsive-text-20">Portfolio của bạn</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3">
                    {basicPortfolios.map((item, index) => (
                        <Card key={index} className="overflow-hidden col-span-1 cursor-pointer" onClick={() => {
                            router.push("/freelancer/portfolio?id="+item.id);
                        }}>
                            <CardContent className="p-0 bg-gray-800 border-b-2">
                                <div className="aspect-[6/5] relative">
                                    <Illustration className="w-full object-cover aspect-[6/5]"
                                                  url="/freelancer/portfolio/portfolio1.png"/>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4">
                                <h3 className="text-xl font-medium">{item?.name || "Portfolio"}</h3>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>


    )
}