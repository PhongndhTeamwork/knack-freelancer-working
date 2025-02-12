"use client"
import { Button } from "@/components/ui/button"
import {useEffect, useRef, useState} from "react";
import {Illustration} from "@/components/custom/illustration";

export const PortfolioFooter = () => {
    const infoRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        setHeight(infoRef.current?.offsetHeight || 0);
    }, [infoRef])

    return (
        <div className="w-full mx-auto">
            <div className="relative overflow-hidden bg-black rounded-3xl">
                <div className="grid md:grid-cols-5 gap-8 p-12 md:p-12">
                    {/* Content */}
                    <div className="md:col-span-3" ref={infoRef}>
                        <h2 className="responsive-text-48 font-bold text-white">Have a Project in Mind?</h2>
                        <p className="text-gray-300 responsive-text-24 mt-4">
                            I&apos;d love to hear from you! Whether you&apos;re ready to kickstart a new website or revamp an existing
                            one, I&apos;m here to help turn your ideas into reality.
                        </p>
                        <Button className="mt-8 responsive-text-20 h-14" variant="white">
                            Liên hệ ngay
                        </Button>
                    </div>

                    {/* Image */}
                    <div className="md:col-span-2 w-full">
                        {/*<Image*/}
                        {/*    src="/freelancer/portfolio/footer/portfolio-footer1.svg"*/}
                        {/*    alt="Project collaboration"*/}
                        {/*    fill*/}
                        {/*    className="object-cover rounded-2xl"*/}
                        {/*    sizes="(max-width: 768px) 100vw, 50vw"*/}
                        {/*/>*/}
                        <Illustration url="/freelancer/portfolio/footer/portfolio-footer1.svg" className="w-full object-cover rounded-2xl" style={{
                            height: height
                        }}/>
                        {/*<Image src='/freelancer/portfolio/footer/portfolio-footer1.svg' alt="Footer Image" width={0} height={0}*/}
                        {/*       className="w-full object-cover rounded-2xl" style={{*/}
                        {/*    height: height*/}
                        {/*}}/>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

