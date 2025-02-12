"use client"

// import {useEffect} from "react";

import {RelatedJobs} from "@/components/constitution/job-category";
import {BannerCarousel} from "@/app/freelancer/home/carousel-banner";
import {ServiceSteps} from "@/app/freelancer/home/service-steps";
import {CustomerFeedback} from "@/app/freelancer/home/customer-feedback";
import {FreelancerProgress} from "@/app/freelancer/profile/freelancer-progress";
import useProfileStore from "@/lib/store/profile.modal";


const HomePage = () => {
    const {profile} = useProfileStore()
    return <div className="mt-3 mb-10 space-y-20">
        <div className="max-width-suitable px-[60px] mx-auto pb-10 pt-8">
            <BannerCarousel/>
        </div>

        <FreelancerProgress userName={profile?.name + "! 🎉" || ""}
                            supportingText="Chúng tôi có một vài gợi ý cho bạn!"
                            message="Chào mừng bạn trở lại, "/>

        <div className="max-width-suitable px-[60px] mx-auto py-0">
            <ServiceSteps/>
        </div>

        <div className="max-width-suitable px-[60px] mx-auto py-0">
            <CustomerFeedback/>
        </div>

        <div className="max-width-suitable px-[60px] mx-auto">
            <RelatedJobs/>
        </div>
    </div>
}

export default HomePage;