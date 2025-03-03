import {Badge} from "@/components/ui/badge"
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Illustration} from "@/components/custom/illustration";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Trash2} from "lucide-react";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {WorkExperienceDialog} from "@/app/freelancer/portfolio/components/dialogs/work-experience-dialog";
import usePortfolioUpdateStore from "@/lib/store/portfolio-update.modal";
import {MessagePayloadForm} from "@/lib/types/error.type";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import {FormatHelper} from "@/lib/helpers/format.helper";
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
import useAuthStore from "@/lib/store/user.modal";


type Props = {
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}


export const WorkExperience = ({setMessage, setTriggerNotice, triggerNotice}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const {isInUpdateMode} = usePortfolioUpdateStore();
    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();
    const {token} = useAuthStore()

    const handleDelete = (id ?: number) => {
        if(!token) return;
        if(!id) return;
        axios.delete(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/delete-work-experience/${currentPortfolio.id}/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Xóa kinh nghiệm thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
        }).catch(err => {
            console.log(err)
        });
    }


    return (
        <div className="mx-auto p-4">
            {/*<div className="flex items-center gap-2 mb-6">*/}
            {/*    <div className="w-2 h-2 bg-green-500 rounded-full" />*/}
            {/*    <h2 className="text-xl font-semibold">Kinh nghiệm làm việc</h2>*/}
            {/*</div>*/}

            <div>
                <div className="p-0">
                    <div className="space-y-4">
                        {currentPortfolio.portfolioWorkExperiences.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b-2 responsive-text-32"
                            >
                                <div className="font-medium text-muted-foreground">
                                    {item.role}
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Badge variant="secondary"
                                           className="rounded-[40px] font-normal h-14 px-6 responsive-text-20 bg-[#DDDDDD] bg-opacity-50">
                                        {item.company}
                                    </Badge>
                                    <Badge variant="secondary"
                                           className="font-normal h-14 rounded-[40px] px-6 responsive-text-20 bg-[#DDDDDD] bg-opacity-50">
                                        {FormatHelper.formatDateToMonthYear(item.from || "")} {item.to ? " - " + FormatHelper.formatDateToMonthYear(item.to || "") : " đến nay"}
                                    </Badge>
                                    {isInUpdateMode && <div className="space-x-2 flex items-center">
                                        <Dialog onOpenChange={setOpen} open={open}>
                                            <DialogTrigger asChild>
                                                <Button className="w-10 h-10 p-0" variant="dark">
                                                    <Illustration className="w-5 h-5 object-cover"
                                                                  url="/freelancer/portfolio/PencilLine.svg"/>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent
                                                className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                                <ScrollArea className="h-full px-4">
                                                    <WorkExperienceDialog setMessage={setMessage}
                                                                          triggerNotice={triggerNotice}
                                                                          setTriggerNotice={setTriggerNotice}
                                                                          setOpen={setOpen}
                                                                          workExperience={currentPortfolio.portfolioWorkExperiences[index]}
                                                    />
                                                </ScrollArea>
                                            </DialogContent>
                                        </Dialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <Button className="w-10 h-10 p-0" variant="danger">
                                                    <Trash2 className="w-5 h-5 object-cover"/>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Hành động nãy sẽ xóa kinh nghiệm của bạn khỏi portfolio
                                                        này.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => {
                                                        handleDelete(currentPortfolio.portfolioWorkExperiences[index].id)
                                                    }}>Xóa</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}