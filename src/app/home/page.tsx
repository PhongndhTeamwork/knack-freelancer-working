import React from "react";
import {Banner} from "@/app/home/banner";
import {CareerCategories} from "@/app/home/career-category";
import {PlatformSections} from "@/app/home/platform";
import {CommunitySection} from "@/app/home/community";
import {RecruitmentFeatures} from "@/app/home/recruitment-feature";
import {WhyKnackSection} from "@/app/home/why-knack";
import {JobCategories} from "@/app/home/job-category";
import {MarqueeBrand} from "@/components/constitution/marquee-brand";


const HomePage = () => {
    return <div className="mt-3 mb-10">
        <div className="max-width-suitable px-[60px] mx-auto">
            <Banner/>
        </div>
        <div>
            <MarqueeBrand/>
        </div>
        <div className="bg-black mt-16">
            <div className="max-width-suitable px-[60px] mx-auto">
                <CareerCategories/>
            </div>
        </div>
        <div className="max-width-suitable px-[60px] mx-auto">
            <PlatformSections/>
        </div>
        <div className="max-width-suitable px-[60px] mx-auto">
            <CommunitySection/>
        </div>
        <div className="max-width-suitable px-[60px] mx-auto ">
            <RecruitmentFeatures/>
        </div>
        <div className="max-width-suitable px-[60px] mx-auto">
            <WhyKnackSection/>
        </div>
        <div className="max-width-suitable px-[60px] mx-auto">
            <JobCategories/>
        </div>
    </div>
}

export default HomePage;