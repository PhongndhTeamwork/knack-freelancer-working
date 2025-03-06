import Link from "next/link"
import {Illustration} from "@/components/custom/illustration";
import {Button} from "@/components/ui/button"
import {useEffect, useRef, useState} from "react";


export const Footer = () => {
    const infoRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        setHeight(infoRef.current?.offsetHeight || 0);
    }, [infoRef])

    return (
        <footer className="bg-black text-white pt-6 px-[40px]">
            <div className="flex justify-between space-x-14 py-[30px]">
                <div ref={infoRef} className="bg-black text-white border-none space-y-8 w-full">
                    <div className="space-y-4">
                        <span className="responsive-text-28 font-bold">Liên hệ với chúng tôi</span>
                        <p className="mt-4 responsive-text-18 text-[#D8D8D8]">
                            Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi quan
                            thông tin liên hệ phía dưới!
                        </p>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button
                                variant="secondary"
                                className="rounded-xl font-semibold h-12 responsive-text-18"
                                size="lg"
                            >
                                <Illustration className="w-7 object-cover aspect-[1/1]"
                                              url="/footer/MessengerLogo.svg"/>
                                Messenger
                            </Button>
                            <Button
                                variant="secondary"
                                className="rounded-xl font-semibold h-12 responsive-text-18"
                                size="lg"
                            >
                                <Illustration className="w-7 object-cover aspect-[1/1]"
                                              url="/footer/Envelope.svg"/>
                                Email
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    {/*<Image src='/footer/footer1.svg' alt="Footer Image" width={0} height={0}*/}
                    {/*       className="w-full object-cover rounded-2xl" style={{*/}
                    {/*    height: height*/}
                    {/*}}/>*/}
                    <Illustration url="/footer/footer1.svg" className="w-full object-cover rounded-2xl" style={{
                        height: height
                    }}/>
                    {/*<Illustration className="w-full object-cover aspect-[7/2] rounded-2xl"*/}
                    {/*              url="/footer/footer1.svg"/>*/}
                </div>
            </div>


            {/* Bottom Bar */}
            <div className="border-t border-gray-800 max-width-suitable mx-auto">
                <div className="mx-auto py-6 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="responsive-text-18 text-white">
                            <span>© &nbsp;</span>
                            <span className="font-bold">Knack </span>
                            <span>2024. All rights reserved.</span>
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Illustration width={24} height={24} url='/social/instagram.svg'/>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <Illustration width={24} height={24} url="/social/facebook.svg"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}