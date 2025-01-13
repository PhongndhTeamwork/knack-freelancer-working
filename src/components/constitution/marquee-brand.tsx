import Marquee from "react-fast-marquee";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import React from "react";


export const MarqueeBrand = () => {
    const brands = [
        {
            url : "/partner/brand1.png"
        },
        {
            url : "/partner/brand2.png"
        },
        {
            url : "/partner/brand3.png"
        },
        {
            url : "/partner/brand4.png"
        },
        {
            url : "/partner/brand5.png"
        },
        {
            url : "/partner/brand6.png"
        },
        {
            url : "/partner/brand7.png"
        },
    ]

    return (
        <div className="relative flex items-center">
            <div className="h-[200px] left-0 absolute bg-gradient-to-r from-white to-transparent z-10" style={{
                width: "calc((100vw - 1700px) / 2)"
            }}/>
            <Marquee className="">
                {brands.map((brand, index) =>
                    <Button key={index} className="w-[240px] h-[120px] mx-6" variant="ghost">
                        <Image src={brand.url} alt="Image" width={200} height={100}
                               layout="intrinsic"
                               className="mx-12"/>
                    </Button>
                )}
            </Marquee>
            <div className="h-[200px] right-0 absolute bg-gradient-to-l from-white to-transparent z-10" style={{
                width: "calc((100vw - 1700px) / 2)"
            }}/>
        </div>
    )
}