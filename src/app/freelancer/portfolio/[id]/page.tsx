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
import {useParams, useRouter} from "next/navigation";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import useAuthStore from "@/lib/store/user.modal";
import {MessagePayloadForm} from "@/lib/types/error.type";
import ToastInitialisation from "@/lib/preprocessors/toast-initialisation";
import {Toaster} from "react-hot-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import axios from "axios";
import {CustomSpinner} from "@/components/custom/custom-spinner";


export default function Component() {
    const [open, setOpen] = useState<boolean[]>(Array(7).fill(false));
    const {isInUpdateMode, setIsInUpdateMode} = usePortfolioUpdateStore();
    const {fetchCurrentPortfolio, currentPortfolio} = usePortfolioStore();
    const {token} = useAuthStore();
    const router = useRouter();
    const params = useParams();
    const id = params?.id || "";
    const [message, setMessage] = useState<MessagePayloadForm>({content: ""});
    const [triggerNotice, setTriggerNotice] = useState<boolean>(false);
    const [isLoadingDeleteProcess, setIsLoadingDeleteProcess] = useState<boolean>(false);


    ToastInitialisation({triggerMessage: triggerNotice, message: message})
    useEffect(() => {
        setIsInUpdateMode(false)
    }, [setIsInUpdateMode]);

    useEffect(() => {
        console.log(id);
        if (!id) return;
        if (!token) return;
        fetchCurrentPortfolio(token || "", +id);
    }, [fetchCurrentPortfolio, id, router, token]);

    const handleControlDialog = (index: number, value: boolean) => {
        const array = [...open];
        array[index] = value;
        setOpen(array);
    }

    const handleDeletePortfolio = () => {
        setIsLoadingDeleteProcess(true);
        if (!token) {
            setMessage({content: "Vui lòng đăng nhập lại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        if (!id) {
            setMessage({content: "Portfolio không tồn tại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        axios.delete(`${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/delete-portfolio/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Xóa portfolio thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            setTimeout(() => {router.push("/freelancer/portfolio")}, 500)
        }).catch(() => {
            setMessage({content: "Something went wrong", type: "error"})
            setTriggerNotice(!triggerNotice)
        }).finally(() => {
        })
        setIsLoadingDeleteProcess(false);
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
                            <BreadcrumbLink href="/freelancer/portfolio"
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
                        {/*{isInUpdateMode &&*/}
                        {/*    <Button variant="dark-outline" className="h-12 responsive-text-20">Xem trước</Button>}*/}
                        {isInUpdateMode && <Button variant="dark" className="h-12 responsive-text-20" onClick={() => {
                            setIsInUpdateMode(false)
                        }}>Lưu chỉnh sửa</Button>}
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
                            <DialogContent
                                className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                <ScrollArea className="max-h-[80vh] px-4">
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
                            <DialogContent
                                className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                <ScrollArea className="max-h-[80vh] px-4">
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
                            <DialogContent
                                className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                <ScrollArea className="max-h-[80vh] px-4">
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
                            <DialogContent
                                className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                <ScrollArea className="max-h-[80vh] px-4">
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
                            <DialogContent
                                className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                <ScrollArea className="max-h-[80vh] px-4">
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
                            <DialogContent
                                className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                <ScrollArea className="max-h-[80vh] px-4">
                                    <SkillDialog setOpen={(value) => {
                                        handleControlDialog(6, value)
                                    }} setTriggerNotice={setTriggerNotice} setMessage={setMessage}
                                                 triggerNotice={triggerNotice}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>}

                </div>
                <Skill setTriggerNotice={setTriggerNotice} setMessage={setMessage} triggerNotice={triggerNotice}/>
            </div>

            <div className="max-width-suitable px-[60px] mx-auto">
                <PortfolioFooter/>
            </div>

            {isInUpdateMode && <div className="max-width-suitable px-[60px] mx-auto">
                <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                        <Button variant="danger" className="w-full">{isLoadingDeleteProcess && <CustomSpinner size="sm"/>}Xóa portfolio</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Hành động nãy sẽ xóa công việc nổi bật của bạn khỏi profile
                                này.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                handleDeletePortfolio()
                            }}>Xóa</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>}
        </div>
    )
}