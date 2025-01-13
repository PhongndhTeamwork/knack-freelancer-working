import {FreelancerProgress} from "@/components/constitution/freelancer-progress";
import {ProfileInfo} from "@/app/freelancer/profile/profile-info";
import {WorkSection} from "@/app/freelancer/profile/work-section";

export default function Component() {
    return (
        <div><FreelancerProgress/>
            <div className="grid md:grid-cols-7 md:gap-4 px-14 py-6">
                <div className="col-span-2">
                    <ProfileInfo/>
                </div>
                <div className="col-span-5">
                    <WorkSection/>
                </div>
            </div>
        </div>
    )
}