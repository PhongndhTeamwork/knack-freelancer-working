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
import {PortfolioFooter} from "@/app/freelancer/portfolio/components/portfolio-footer";
import {Illustration} from "@/components/custom/illustration";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ProminentProjectUpdateDialog} from "@/app/freelancer/portfolio/components/dialogs/prominent-project-update";
import {ScrollArea} from "@/components/ui/scroll-area";
import {FeedbackUpdateDialog} from "@/app/freelancer/portfolio/components/dialogs/feedback-update";
import {AboutMeUpdateDialog} from "@/app/freelancer/portfolio/components/dialogs/about-me-update";
import {SkillUpdateDialog} from "@/app/freelancer/portfolio/components/dialogs/skill-update";
import {WorkExperienceUpdateDialog} from "@/app/freelancer/portfolio/components/dialogs/work-experience-update";

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

                    <div className="space-x-4">
                        <Button variant="dark-outline" className="h-12 responsive-text-20">Xem trước</Button>
                        <Button variant="dark" className="h-12 responsive-text-20">Lưu chỉnh sửa</Button>
                    </div>

                </header>
            </div>
            <div className="max-width-suitable px-[60px] mx-auto">
                <PortfolioHeader/>
            </div>
            {/*<MarqueeBrand/>*/}
            <div className="max-width-suitable px-[60px] mx-auto ">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">Dự án nổi bật</h2>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="" variant="dark">
                                <Illustration className="w-6 h-6 object-cover" url="/freelancer/portfolio/PencilLine.svg" />
                                Chỉnh sửa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                            <ScrollArea className="h-full px-4">
                                <ProminentProjectUpdateDialog/>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>

                </div>
                {
                    Array.from({length: 2}).map((_, i) => (
                        <div key={i} className={i > 0 ? "mt-10" : "mt-5"}><ProminentProject/></div>
                        )
                    )
                }
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between mb-8 max-width-suitable px-[60px] mx-auto">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">Feedback của Khách hàng</h2>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="" variant="dark">
                                <Illustration className="w-6 h-6 object-cover" url="/freelancer/portfolio/PencilLine.svg"/>
                                Chỉnh sửa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                            <ScrollArea className="h-full">
                                <FeedbackUpdateDialog/>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>

                </div>
                <CustomerFeedback/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center justify-between mb-8 max-width-suitable mx-auto">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">About</h2>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="" variant="dark">
                                <Illustration className="w-6 h-6 object-cover" url="/freelancer/portfolio/PencilLine.svg"/>
                                Chỉnh sửa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                            <ScrollArea className="h-full">
                                <AboutMeUpdateDialog/>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </div>
                <About/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center justify-between mb-8 max-width-suitable mx-auto">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">Kinh nghiệm làm việc</h2>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="" variant="dark">
                                <Illustration className="w-6 h-6 object-cover" url="/freelancer/portfolio/PencilLine.svg"/>
                                Chỉnh sửa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                            <ScrollArea className="h-full">
                                <WorkExperienceUpdateDialog/>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </div>
                <WorkExperience/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center justify-between mb-8 max-width-suitable mx-auto">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">Kỹ năng</h2>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="" variant="dark">
                                <Illustration className="w-6 h-6 object-cover" url="/freelancer/portfolio/PencilLine.svg"/>
                                Chỉnh sửa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                            <ScrollArea className="h-full">
                                <SkillUpdateDialog/>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </div>
                <Skill/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <PortfolioFooter/>
            </div>
        </div>
    )
}