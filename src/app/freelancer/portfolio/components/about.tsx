import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { MapPin } from 'lucide-react'

export const About  = () => {
    return (
        <div className="mx-auto py-4 w-full">
            {/*<div className="flex items-center gap-2 mb-6">*/}
            {/*    <div className="w-2 h-2 bg-green-500 rounded-full" />*/}
            {/*    <h2 className="text-xl font-semibold">About</h2>*/}
            {/*</div>*/}

            <div>
                <div className="">
                    <div className="grid md:grid-cols-[40%_1fr] gap-12 text-2xl">
                        <div className="flex items-start gap-4 ">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Simrann" />
                                <AvatarFallback>SG</AvatarFallback>
                            </Avatar>
                            <div className="space-y-3">
                                {/*<h3 className="font-semibold">I&#39;m Simrann</h3>*/}
                                <p className="text-muted-foreground">
                                    <span className="font-bold text-black">I&#39;m Simrann</span> - an experienced freelance web
                                    developer crafting Digital experiences from Montreal
                                </p>
                                <Button variant="dark">
                                    Liên hệ ngay
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-muted-foreground">
                                Hey there! I&#39;m Simrann Gokhan, a freelance web developer based in Montreal. With over 5 years of experience, I specialize in crafting dynamic websites that leave a lasting impression. My skills span HTML, CSS, JavaScript, and more, allowing me to bring your digital vision to life with precision and creativity.
                            </p>
                            <p className="text-muted-foreground">
                                From sleek landing pages to robust e-commerce platforms, I&#39;ve got you covered. I thrive on exceeding client expectations, whether it&#39;s building responsive designs or optimizing for SEO. I take the time to understand your goals, ensuring the end product meets your needs.
                            </p>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                {/*<MapPin className="h-4 w-4" />*/}
                                <p>
                                    Located in Montreal, I draw inspiration from the city&#39;s diverse culture and innovative spirit. Let&#39;s collaborate and turn your ideas into captivating online experiences!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}