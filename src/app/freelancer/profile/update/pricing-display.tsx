"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ChevronDownCircle, ChevronUpCircle} from "lucide-react";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

export const PricingDisplayForm = () => {
    const [active, setActive] = useState<number>(1);
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="responsive-text-20 font-medium">
                    Lựa chọn hình thức hiển thị
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-5">
                    <div className="space-y-4">
                        <div
                            className={cn(`w-full border shadow rounded-md py-[10px] px-[14px] flex justify-between items-center cursor-pointer responsive-text-16`, active === 1 && "bg-black text-white")}
                            onClick={() => {
                                setActive(1)
                            }}>Hiển thị biểu giá
                            {active === 2 ? <ChevronDownCircle className="w-4 h-4"/> :
                                <ChevronUpCircle className="w-4 h-4"/>}
                        </div>

                        <div>
                            <div className="w-full mx-auto p-4 shadow border rounded-md">
                                <div className="space-y-6">
                                    {/* Service Type */}
                                    <div className="space-y-2">
                                        <Label htmlFor="serviceType" className="responsive-text-16">Lĩnh vực 1</Label>
                                        <Input id="serviceType" placeholder="Người mẫu" className="responsive-text-16 h-11"/>
                                    </div>

                                    {/* Service Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                        {/* Service Name */}
                                        <div className="md:col-span-3 space-y-2">
                                            <Label htmlFor="serviceName" className="responsive-text-16">Dịch vụ</Label>
                                            <Input id="serviceName" className="responsive-text-16 h-11"/>
                                        </div>

                                        {/* Service Fee */}
                                        <div className="md:col-span-3 space-y-2">
                                            <Label htmlFor="serviceFee" className="responsive-text-16">Phí dịch vụ</Label>
                                            <Input id="serviceFee" className="responsive-text-16 h-11"/>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-6 space-y-2">
                                            <Label htmlFor="description" className="responsive-text-16">Mô tả</Label>
                                            <Input id="description" className="responsive-text-16 h-11"/>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-4">
                                        <Button variant="dark-outline" className="w-fit h-9 ">
                                            Thêm dịch vụ
                                        </Button>
                                        <Separator/>
                                        <Button variant="dark-outline" className="w-fit h-9 ">
                                            Thêm lĩnh vực
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div
                            className={cn(`w-full border shadow rounded-md py-[10px] px-[14px] flex justify-between items-center cursor-pointer responsive-text-16`, active === 2 && "bg-black text-white")}
                            onClick={() => {
                                setActive(2)
                            }}>Không hiển thị biểu giá
                            {active === 1 ? <ChevronDownCircle className="w-4 h-4"/> :
                                <ChevronUpCircle className="w-4 h-4"/>}
                        </div>
                        <div className="flex gap-8 mt-6 p-4 shadow border rounded-md">
                            <div className="space-y-2 w-full">
                                <Label htmlFor="description1" className="responsive-text-16">Mô tả</Label>
                                <Input
                                    id="description1"
                                    placeholder=""
                                    className="responsive-text-16 h-11"
                                />
                            </div>
                            <div className="space-y-2 w-full">
                                <Label htmlFor="pricingLink1" className="responsive-text-16">Link đến biểu giá của bạn</Label>
                                <Input
                                    id="pricingLink1"
                                    placeholder=""
                                    className="responsive-text-16 h-11"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

