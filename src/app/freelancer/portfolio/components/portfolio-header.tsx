import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {PortfolioBanner} from "@/app/freelancer/portfolio/components/portfolio-banner";
import * as React from "react";
import useProfileStore from "@/lib/store/profile.modal";

export const PortfolioHeader = () => {
    const {profile} = useProfileStore();
    return (
        <div className="mx-auto">
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={String(profile?.avatar) || ""} alt={profile?.name}/>
                        <AvatarFallback>NB</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <h2 className="responsive-text-20 font-semibold">{profile?.name}</h2>
                        {/*<Badge variant="secondary" className="font-normal">*/}
                        {/*    Sẵn sàng nhận dự án mới*/}
                        {/*</Badge>*/}
                        <div className="flex items-center gap-2 mx-auto text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"/>
                            <h2 className="responsive-text-16 text-muted-foreground"> Sẵn sàng nhận dự án mới</h2>
                        </div>
                    </div>
                </div>

                {/*<div className="space-y-6">*/}
                {/*    <h1 className="text-4xl md:text-5xl lg:text-8xl font-medium tracking-tight">*/}
                {/*        Elevate your online presence with our customizable portfolio template tailored for freelancers.*/}
                {/*    </h1>*/}
                {/*    <p className="text-2xl text-muted-foreground">*/}
                {/*        Elevate your online presence with our customizable portfolio template tailored for freelancers.*/}
                {/*    </p>*/}
                {/*</div>*/}

                {/*<div className="flex flex-wrap gap-4">*/}
                {/*    <Button size="xl" variant="dark" >*/}
                {/*        Liên hệ ngay*/}
                {/*    </Button>*/}
                {/*    <Button size="xl" variant="dark-outline">*/}
                {/*        Xem thêm*/}
                {/*    </Button>*/}
                {/*</div>*/}
                <PortfolioBanner/>
            </div>
        </div>
    )
}