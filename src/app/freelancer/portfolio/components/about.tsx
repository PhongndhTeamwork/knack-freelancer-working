import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import usePortfolioStore from "@/lib/store/portfolio.modal";
// import { Card, CardContent } from "@/components/ui/card"
// import { MapPin } from 'lucide-react'

export const About = () => {
    const {currentPortfolio} = usePortfolioStore();

    if (!currentPortfolio.avatar && !currentPortfolio.overview && !currentPortfolio.detail) return;
    return (
        <div className="mx-auto w-full">
            {/*<div className="flex items-center gap-2 mb-6">*/}
            {/*    <div className="w-2 h-2 bg-green-500 rounded-full" />*/}
            {/*    <h2 className="text-xl font-semibold">About</h2>*/}
            {/*</div>*/}

            <div>
                <div className="">
                    <div className="grid md:grid-cols-[40%_1fr] gap-12 text-2xl">
                        <div className="flex items-start gap-4 ">
                            {currentPortfolio.avatar && <Avatar className="h-24 w-24">
                                <AvatarImage src={currentPortfolio.avatar || ""} alt="Simrann"/>
                                <AvatarFallback>SG</AvatarFallback>
                            </Avatar>}

                            {currentPortfolio.overview && <div className="space-y-3">
                                {/*<h3 className="font-semibold">I&#39;m Simrann</h3>*/}
                                <p className="text-muted-foreground responsive-text-24">
                                    {/*<span className="font-bold text-black">I&#39;m Simrann</span> - an experienced freelance web*/}
                                    {/*developer crafting Digital experiences from Montreal*/}
                                    {currentPortfolio.overview}
                                </p>
                                <Button variant="dark" size="sm">
                                    Liên hệ ngay
                                </Button>
                            </div>}
                        </div>
                        <div className="flex justify-end space-y-4 responsive-text-20 ">
                            {currentPortfolio.detail?.split("####").map((d, index) => (
                                <p key={index} className="text-muted-foreground responsive-text-20 text-justify">
                                    {d}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}