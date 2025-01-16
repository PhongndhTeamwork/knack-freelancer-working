"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ChevronDownCircle, ChevronUpCircle} from "lucide-react";
import {useState} from "react";
import {cn} from "@/lib/utils";

export const PricingDisplayForm = () => {
    const [active, setActive] = useState<number>(1);
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Lựa chọn hình thức hiển thị
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <div
                        className={cn(`w-full border shadow rounded-md p-2 flex justify-between items-center cursor-pointer`, active === 1 && "bg-black text-white")}
                        onClick={() => {
                            setActive(1)
                        }}>Hiển thị biểu giá
                        {active === 2 ? <ChevronDownCircle className="w-4 h-4"/> :
                            <ChevronUpCircle className="w-4 h-4"/>}
                    </div>
                    <div
                        className={cn(`w-full border shadow rounded-md p-2 flex justify-between items-center cursor-pointer mt-6`, active === 2 && "bg-black text-white")}
                        onClick={() => {
                            setActive(2)
                        }}>Không hiển thị biểu giá
                        {active === 1 ? <ChevronDownCircle className="w-4 h-4"/> :
                            <ChevronUpCircle className="w-4 h-4"/>}
                    </div>
                    <div className="flex gap-8 mt-6 p-4 shadow border rounded-md">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="description1">Mô tả</Label>
                            <Input
                                id="description1"
                                placeholder=""
                            />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="pricingLink1">Link đến biểu giá của bạn</Label>
                            <Input
                                id="pricingLink1"
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

