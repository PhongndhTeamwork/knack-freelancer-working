import Link from "next/link"
import {Illustration} from "@/components/custom/illustration";
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle } from 'lucide-react'


export const Footer = () => {
    return (
        <footer className="bg-black text-white px-14">
            <div className="bg-black text-white border-none py-8 space-y-6">
                <div>
                    <span className="text-2xl font-bold">Liên hệ với chúng tôi</span>
                    <p className="text-zinc-400 mt-2 w-1/2">
                        Our services are loved by founders around the all world. We are proud to work with emerging talents, innovative startups and companies. So you are Our Customers
                    </p>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button
                            variant="secondary"
                            className="rounded-md"
                            size="lg"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Messenger
                        </Button>
                        <Button
                            variant="secondary"
                            className="rounded-md"
                            size="lg"
                        >
                            <Mail className="mr-2 h-5 w-5" />
                            Email
                        </Button>
                    </div>
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