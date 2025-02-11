"use client"

import {WelcomeBanner} from "@/components/constitution/welcome-banner";
import {ProfileMenu} from "@/app/freelancer/profile/update/profile-menu";
import {useState} from "react";
import {PrivateInfo} from "@/app/freelancer/profile/update/private-info";
import {Button} from "@/components/ui/button";
import {ProfileBio} from "@/app/freelancer/profile/update/profile-bio";
import {WorkExperience} from "@/app/freelancer/profile/update/work-experience";
import {Achievement} from "@/app/freelancer/profile/update/achievement";
import {Work} from "@/app/freelancer/profile/update/work";
import {PricingDisplayForm} from "@/app/freelancer/profile/update/pricing-display";


export default function Component() {
    const [activeBar, setActiveBar] = useState<number>(1);

    return <div className="px-[60px] mx-auto py-6 space-y-10">
        <WelcomeBanner userName="" message="Chỉnh sửa thông tin cá nhân"
                       supportingText="Hãy nhớ cập nhật thông tin thường xuyên nếu cần nhé!"/>
        <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
                <ProfileMenu onChangeNavbar={(id) => setActiveBar(id)} activeBar={activeBar} />
            </div>
            <div className="md:col-span-9">
                {activeBar === 1 && <PrivateInfo/>}
                {activeBar === 2 && <ProfileBio/>}
                {activeBar === 3 &&<WorkExperience/> }
                { activeBar ===4 && <Achievement/> }
                { activeBar ===5 && <Work/> }
                { activeBar ===6 && <PricingDisplayForm/> }
                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="dark" size="sm">Lưu thay đổi</Button>
                    <Button variant="dark-outline" size="sm">Hủy</Button>
                </div>
            </div>
        </div>
    </div>
}