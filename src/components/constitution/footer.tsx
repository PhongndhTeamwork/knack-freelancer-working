import Link from "next/link"
import {Illustration} from "@/components/custom/illustration";
import { Button } from "@/components/ui/button"


export const Footer = () => {
    return (
        <footer className="bg-black text-white px-14">
            <div className="flex justify-between space-x-16 py-10">
                <div className="bg-black text-white border-none space-y-8 w-full">
                    <div>
                        <span className="text-4xl font-bold">Liên hệ với chúng tôi</span>
                        <p className="mt-4 text-2xl">
                            Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi quan thông tin liên hệ phía dưới!
                        </p>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button
                                variant="secondary"
                                className="rounded-xl font-bold text-[16px]"
                                size="lg"
                            >
                                <Illustration className="w-5 object-cover aspect-[1/1]"
                                              url="/footer/MessengerLogo.svg"/>
                                Messenger
                            </Button>
                            <Button
                                variant="secondary"
                                className="rounded-xl font-bold text-[16px]"
                                size="lg"
                            >
                                <Illustration className="w-5 object-cover aspect-[1/1]"
                                              url="/footer/Envelope.svg"/>
                                Email
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Illustration className="h-full object-cover aspect-[7/2] rounded-2xl"
                                  url="/footer/footer1.svg"/>
                </div>
            </div>


            {/* Bottom Bar */}
            <div className="border-t border-gray-800 max-width-suitable mx-auto">
                <div className="mx-auto py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-white">
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
                            <Illustration width={24} height={24} url='/social/facebook.svg'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}