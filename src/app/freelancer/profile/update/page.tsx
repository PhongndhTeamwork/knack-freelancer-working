"use client"

import {WelcomeBanner} from "@/components/constitution/welcome-banner";
import {ProfileMenu} from "@/app/freelancer/profile/update/profile-menu";
import {useState} from "react";
import {PrivateInfo} from "@/app/freelancer/profile/update/private-info";
import {WorkExperience} from "@/app/freelancer/profile/update/work-experience";
import {Achievement} from "@/app/freelancer/profile/update/achievement";
import {ProminentWork} from "@/app/freelancer/profile/update/prominent-work";
import {PricingDisplayForm} from "@/app/freelancer/profile/update/pricing-display";
import ToastInitialisation from "@/lib/preprocessors/toast-initialisation";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {Toaster} from "react-hot-toast";



export default function Component() {
    const [activeBar, setActiveBar] = useState<number>(1);


    const [message, setMessage] = useState<MessagePayloadForm>({content: ""});
    const [triggerNotice, setTriggerNotice] = useState<boolean>(false);

    ToastInitialisation({triggerMessage: triggerNotice, message: message})



    return <div className="px-[60px] mx-auto py-2 space-y-10">
        <Toaster position="bottom-center"/>
        <WelcomeBanner userName="" message="Chỉnh sửa thông tin cá nhân"
                       supportingText="Hãy nhớ cập nhật thông tin thường xuyên nếu cần nhé!"/>
        <div className="grid md:grid-cols-12 gap-8 ">
            <div className="md:col-span-3">
                <div className="sticky top-20"> {/* Adjust `top-20` as needed */}
                    <ProfileMenu onChangeNavbar={(id) => setActiveBar(id)} activeBar={activeBar}/>
                </div>
            </div>
            <div className="md:col-span-9">
                {activeBar === 1 && <PrivateInfo triggerNotice={triggerNotice} setTriggerNotice={setTriggerNotice} setMessage={setMessage}/>}
                {activeBar === 2 &&<WorkExperience triggerNotice={triggerNotice} setTriggerNotice={setTriggerNotice} setMessage={setMessage}/> }
                { activeBar ===3 && <Achievement triggerNotice={triggerNotice} setTriggerNotice={setTriggerNotice} setMessage={setMessage}/> }
                { activeBar ===4 && <ProminentWork triggerNotice={triggerNotice} setTriggerNotice={setTriggerNotice} setMessage={setMessage}/> }
                { activeBar ===5 && <PricingDisplayForm/> }
            </div>
        </div>
    </div>
}