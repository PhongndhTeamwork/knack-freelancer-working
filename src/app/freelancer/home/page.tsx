"use client"

// import {useEffect} from "react";

import {RelatedJobs} from "@/components/constitution/job-category";
import {BannerCarousel} from "@/app/freelancer/home/carousel-banner";
import {ServiceSteps} from "@/app/freelancer/home/service-steps";
import {CustomerFeedback} from "@/app/freelancer/home/customer-feedback";
import {FreelancerProgress} from "@/app/freelancer/profile/freelancer-progress";


const HomePage = () => {

    return <div className="mt-3 mb-10 space-y-16">
        <div className="max-width-suitable px-14 mx-auto py-8">
            <BannerCarousel/>
        </div>

        <FreelancerProgress/>

        <div className="max-width-suitable px-14 mx-auto py-0">
            <ServiceSteps/>
        </div>

        <div className="max-width-suitable px-14 mx-auto py-0">
            <CustomerFeedback/>
        </div>

        <div className="max-width-suitable px-14 mx-auto">
            <RelatedJobs/>
        </div>
    </div>
}

export default HomePage;