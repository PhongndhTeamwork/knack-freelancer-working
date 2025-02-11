"use client";

import {ProminentProject} from "@/app/freelancer/portfolio/components/prominent-project";
import {CustomerFeedback} from "@/app/freelancer/portfolio/components/customer-feedback";
import {About} from "@/app/freelancer/portfolio/components/about";
import {WorkExperience} from "@/app/freelancer/portfolio/components/work-experience";
import {Skill} from "@/app/freelancer/portfolio/components/skill";
import {PortfolioHeader} from "@/app/freelancer/portfolio/components/portfolio-header";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import {Button} from "@/components/ui/button";
import * as React from "react";

export default function Component() {
    return (
        <div className="space-y-[60px]">
            <div className="max-width-suitable px-[60px] mx-auto">
                <header className="flex items-center justify-between w-full py-0">
                    <Breadcrumb className="flex gap-1">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/freelancer/portfolio/general" className="responsive-text-20 text-[#545454]">Quản lí Portfolio</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        {/*<ChevronRight />*/}
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/freelancer/portfolio" className="font-medium responsive-text-20">
                                Elegant 1
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <Button variant="dark" className="h-12 responsive-text-20">Chỉnh sửa mẫu
                        này</Button>
                </header>
            </div>
            <div className="max-width-suitable px-[60px] mx-auto">
                <PortfolioHeader/>
            </div>
            {/*<MarqueeBrand/>*/}
            <div className="max-width-suitable px-[60px] mx-auto ">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-5 h-5 bg-green-500 rounded-full"/>
                    <h2 className="responsive-text-40 font-semibold">Dự án nổi bật</h2>
                </div>
                {
                    Array.from({length: 2}).map((_, i) => (
                            <div key={i} className={i > 0 ? "mt-10" : "mt-5"}><ProminentProject/></div>
                        )
                    )
                }
            </div>

            <div className="mt-8">
                <div className="flex items-center gap-6 mb-8 max-width-suitable px-[60px] mx-auto">
                    <div className="w-5 h-5 bg-green-500 rounded-full"/>
                    <h2 className="responsive-text-40 font-semibold">Feedback của Khách hàng</h2>
                </div>
                <CustomerFeedback/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-5 h-5 bg-green-500 rounded-full"/>
                    <h2 className="responsive-text-40 font-semibold">About</h2>
                </div>
                <About/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-5 h-5 bg-green-500 rounded-full"/>
                    <h2 className="responsive-text-40 font-semibold">Kinh nghiệm làm việc</h2>
                </div>
                <WorkExperience/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-5 h-5 bg-green-500 rounded-full"/>
                    <h2 className="responsive-text-40 font-semibold">Kỹ năng</h2>
                </div>
                <Skill/>
            </div>
        </div>
    )
}