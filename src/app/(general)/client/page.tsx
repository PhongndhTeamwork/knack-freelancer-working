"use client"

import React from "react";
import {FeaturedCareers} from "@/components/constitution/featured-career";
import {RelatedJobs} from "@/components/constitution/job-category";


const HomePage = () => {
    return <div className="mt-3 mb-10">
        <div className="bg-black mt-16">
            <div className="max-width-suitable px-[60px] mx-auto">
                <FeaturedCareers/>
            </div>
        </div>
        <div className="max-width-suitable px-[60px] mx-auto">
            <RelatedJobs/>
        </div>
    </div>
}

export default HomePage;