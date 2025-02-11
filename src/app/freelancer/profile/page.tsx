import {FreelancerProgress} from "@/app/freelancer/profile/freelancer-progress";
import {ProfileInfo} from "@/app/freelancer/profile/profile-info";
import {WorkSection} from "@/app/freelancer/profile/work-section";


export default function Component() {
    return (
        <div className="mt-15">
            <FreelancerProgress userName={""}
                                supportingText="Thiết kế trang cá nhân chuyên nghiệp và gây ấn tượng với khách hàng"
                                message="Trang cá nhân"/>
            <div className="grid md:grid-cols-3 md:gap-6 px-[60px] py-6">
                <div className="col-span-1">
                    <ProfileInfo/>
                </div>
                <div className="col-span-2">
                    <WorkSection/>
                </div>
            </div>
        </div>
    )
}