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
import {ScrollArea} from "@/components/ui/scroll-area";
import {FeedbackDialog} from "@/app/freelancer/portfolio/components/dialogs/feedback-dialog";
import {useEffect, useState} from "react";
import {CirclePlus} from "lucide-react";
import {ProminentProjectDialog} from "@/app/freelancer/portfolio/components/dialogs/prominent-project-dialog";
import {AboutMeDialog} from "@/app/freelancer/portfolio/components/dialogs/about-me-dialog";
import {WorkExperienceDialog} from "@/app/freelancer/portfolio/components/dialogs/work-experience-dialog";
import {SkillDialog} from "@/app/freelancer/portfolio/components/dialogs/skill-dialog";
import {SkillDescriptionDialog} from "@/app/freelancer/portfolio/components/dialogs/skill-description-dialog";
import usePortfolioUpdateStore from "@/lib/store/portfolio-update.modal";
import {useRouter, useSearchParams} from "next/navigation";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import useAuthStore from "@/lib/store/user.modal";
import {MessagePayloadForm} from "@/lib/types/error.type";
import ToastInitialisation from "@/lib/preprocessors/toast-initialisation";
import {Toaster} from "react-hot-toast";
// import { useReactToPrint } from "react-to-print";

export default function Component() {
    const [open, setOpen] = useState<boolean[]>(Array(7).fill(false));
    const {isInUpdateMode, setIsInUpdateMode} = usePortfolioUpdateStore();
    const {fetchCurrentPortfolio, currentPortfolio} = usePortfolioStore();
    const {token} = useAuthStore();
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");
    const [message, setMessage] = useState<MessagePayloadForm>({content: ""});
    const [triggerNotice, setTriggerNotice] = useState<boolean>(false);
    // const contentRef = useRef<HTMLDivElement>(null);
    // const reactToPrintFn = useReactToPrint({ contentRef });


    ToastInitialisation({triggerMessage: triggerNotice, message: message})

    useEffect(() => {
        if (!id) return;
        if (!token) return;
        fetchCurrentPortfolio(token || "", +id);
    }, [fetchCurrentPortfolio, id, router, token]);

    const handleControlDialog = (index: number, value: boolean) => {
        const array = [...open];
        array[index] = value;
        setOpen(array);
    }


    return (
        <div className="space-y-[60px]"
             // ref={contentRef}
        >
            <Toaster position="bottom-center"/>
            <div className="max-width-suitable px-[60px] mx-auto">
                <header className="flex items-center justify-between w-full py-0">
                    <Breadcrumb className="flex gap-1">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/freelancer/portfolio/general"
                                            className="responsive-text-20 text-[#545454]">Quản lí
                                Portfolio</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        {/*<ChevronRight />*/}
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/freelancer/portfolio" className="font-medium responsive-text-20">
                                Elegant 1
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <div className="space-x-5 flex items-center">
                        {isInUpdateMode && <Button
                            className="border-dashed border-black rounded-xl responsive-text-16 font-semibold px-4 space-x-3"
                            variant="dark-outline">
                            <Illustration className="w-6 h-6 object-cover"
                                          url="/freelancer/portfolio/PencilLineBlack.svg"/>
                            Bạn đang ở chế độ chỉnh sửa
                        </Button>}
                        {isInUpdateMode &&
                            <Button variant="dark-outline" className="h-12 responsive-text-20">Xem trước</Button>}
                        {isInUpdateMode && <Button variant="dark" className="h-12 responsive-text-20" onClick={() => {
                            setIsInUpdateMode(false)
                        }}>Quay lại</Button>}
                        {/*{!isInUpdateMode && <Button variant="dark-outline" className="h-12 responsive-text-20" onClick={() => reactToPrintFn()}>Tải portfolio</Button>}*/}
                        {!isInUpdateMode && <Button variant="dark" className="h-12 responsive-text-20" onClick={() => {
                            setIsInUpdateMode(true)
                        }}>Cập nhật</Button>}
                    </div>
                </header>
            </div>
            <div className="max-width-suitable px-[60px] mx-auto">
                <PortfolioHeader/>
            </div>
            <div className="max-width-suitable px-[60px] mx-auto ">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">Dự án nổi bật</h2>
                    </div>
                    {isInUpdateMode &&
                        <Dialog onOpenChange={(value) => {
                            handleControlDialog(1, value)
                        }} open={open[1]}>
                            <DialogTrigger asChild>
                                <Button className="" variant="dark">
                                    <CirclePlus className="w-6 h-6"/>
                                    Thêm dự án
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                <ScrollArea className="h-full px-4">
                                    <ProminentProjectDialog setOpen={(value) => {
                                        handleControlDialog(1, value)
                                    }} setTriggerNotice={setTriggerNotice}
                                                            setMessage={setMessage} triggerNotice={triggerNotice}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>}
                </div>
                {
                    currentPortfolio.portfolioProminentProjects?.map((prominentProject, i) => (
                            <div key={i} className={i > 0 ? "mt-10" : "mt-5"}><ProminentProject setMessage={setMessage}
                                                                                                triggerNotice={triggerNotice}
                                                                                                setTriggerNotice={setTriggerNotice}
                                                                                                prominentProject={prominentProject}/>
                            </div>
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
                    {isInUpdateMode &&
                        <Dialog onOpenChange={(value) => {
                            handleControlDialog(2, value)
                        }} open={open[2]}>
                            <DialogTrigger asChild>
                                <Button className="" variant="dark">
                                    <CirclePlus className="w-6 h-6"/>
                                    Thêm feedback
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                <ScrollArea className="h-full">
                                    <FeedbackDialog setOpen={(value) => {
                                        handleControlDialog(2, value)
                                    }} setTriggerNotice={setTriggerNotice} setMessage={setMessage}
                                                    triggerNotice={triggerNotice}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>}
                </div>
                <CustomerFeedback setTriggerNotice={setTriggerNotice} setMessage={setMessage}
                                  triggerNotice={triggerNotice}/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center justify-between mb-8 max-width-suitable mx-auto">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">About</h2>
                    </div>
                    {isInUpdateMode &&
                        <Dialog onOpenChange={(value) => {
                            handleControlDialog(3, value)
                        }} open={open[3]}>
                            <DialogTrigger asChild>
                                <Button className="" variant="dark">
                                    <Illustration className="w-6 h-6"
                                                  url="/freelancer/portfolio/PencilLine.svg"/>
                                    Chỉnh sửa
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                <ScrollArea className="h-full">
                                    <AboutMeDialog setOpen={(value) => {
                                        handleControlDialog(3, value)
                                    }} setTriggerNotice={setTriggerNotice} setMessage={setMessage}
                                                   triggerNotice={triggerNotice}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    }
                </div>
                <About/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center justify-between mb-8 max-width-suitable mx-auto">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">Kinh nghiệm làm việc</h2>
                    </div>
                    {isInUpdateMode &&
                        <Dialog onOpenChange={(value) => {
                            handleControlDialog(4, value)
                        }} open={open[4]}>
                            <DialogTrigger asChild>
                                <Button className="" variant="dark">
                                    <CirclePlus className="w-6 h-6"/>
                                    Thêm kinh nghiệm
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                <ScrollArea className="h-full">
                                    <WorkExperienceDialog setOpen={(value) => {
                                        handleControlDialog(4, value)
                                    }} setTriggerNotice={setTriggerNotice} triggerNotice={triggerNotice}
                                                          setMessage={setMessage}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    }
                </div>
                <WorkExperience setMessage={setMessage} triggerNotice={triggerNotice}
                                setTriggerNotice={setTriggerNotice}/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <div className="flex items-center justify-between mb-8 max-width-suitable mx-auto">
                    <div className="flex gap-6 items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                        <h2 className="responsive-text-40 font-semibold">Kỹ năng</h2>
                    </div>
                    {isInUpdateMode && <div className="space-x-3 flex items-center">
                        <Dialog onOpenChange={(value) => {
                            handleControlDialog(5, value)
                        }} open={open[5]}>
                            <DialogTrigger asChild>
                                <Button className="" variant="dark-outline">
                                    <Illustration className="w-5 h-5 object-cover"
                                                  url="/freelancer/portfolio/PencilLineBlack.svg"/>
                                    Chỉnh sửa mô tả
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                <ScrollArea className="h-full">
                                    <SkillDescriptionDialog setTriggerNotice={setTriggerNotice} setMessage={setMessage}
                                                            triggerNotice={triggerNotice} setOpen={(value) => {
                                        handleControlDialog(5, value)
                                    }}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                        <Dialog onOpenChange={(value) => {
                            handleControlDialog(6, value)
                        }} open={open[6]}>
                            <DialogTrigger asChild>
                                <Button className="" variant="dark">
                                    <CirclePlus className="w-6 h-6"/>
                                    Thêm kỹ năng
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                <ScrollArea className="h-full">
                                    <SkillDialog setOpen={(value) => {
                                        handleControlDialog(6, value)
                                    }} setTriggerNotice={setTriggerNotice} setMessage={setMessage} triggerNotice={triggerNotice}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>}

                </div>
                <Skill setTriggerNotice={setTriggerNotice} setMessage={setMessage} triggerNotice={triggerNotice} />
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <PortfolioFooter/>
            </div>
        </div>
    )
}