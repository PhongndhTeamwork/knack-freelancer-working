import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const PortfolioHeader = () => {
    return (
        <div className="mx-auto pt-4">
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Nguyễn Hồng Bé"/>
                        <AvatarFallback>NB</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Nguyễn Hồng Bé</h2>
                        {/*<Badge variant="secondary" className="font-normal">*/}
                        {/*    Sẵn sàng nhận dự án mới*/}
                        {/*</Badge>*/}
                        <div className="flex items-center gap-2 mx-auto text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"/>
                            <h2 className="text-muted-foreground"> Sẵn sàng nhận dự án mới</h2>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-8xl font-medium tracking-tight">
                        Elevate your online presence with our customizable portfolio template tailored for freelancers.
                    </h1>
                    <p className="text-2xl text-muted-foreground">
                        Elevate your online presence with our customizable portfolio template tailored for freelancers.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <Button size="xl" variant="dark" >
                        Liên hệ ngay
                    </Button>
                    <Button size="xl" variant="dark-outline">
                        Xem thêm
                    </Button>
                </div>
            </div>
        </div>
    )
}