import {Badge} from "@/components/ui/badge";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Illustration} from "@/components/custom/illustration";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Trash2} from "lucide-react";
import * as React from "react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {SkillDialog} from "@/app/freelancer/portfolio/components/dialogs/skill-dialog";
import usePortfolioUpdateStore from "@/lib/store/portfolio-update.modal";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import {PortfolioWorkExperienceForm} from "@/lib/types/portfolio.type";
import {MessagePayloadForm} from "@/lib/types/error.type";
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
    workExperience?: PortfolioWorkExperienceForm;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const Skill = ({triggerNotice, setMessage, setTriggerNotice}: Props) => {
    const [open, setOpen] = useState<boolean[]>([]);
    const {isInUpdateMode} = usePortfolioUpdateStore();
    const {token} = useAuthStore();
    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();

    useEffect(() => {
        setOpen(new Array(currentPortfolio?.portfolioSkills?.length).fill(false))
    }, [currentPortfolio?.portfolioSkills?.length]);

    const handleOpenChange = (index: number, value: boolean) => {
        setOpen((prev) => prev.map((o, i) => (i === index ? value : o)));
    };
    
    const handleDelete = (id ?: number) => {
        if(!token) return;
        if(!id) return;
        axios.delete(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/delete-skill/${currentPortfolio.id}/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Xóa kỹ năng thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
        }).catch(err => {
            setMessage({content: "Something went wrong", type: "error"});
            setTriggerNotice(!triggerNotice);
            console.log(err)
        });
    }

    return (
        <div>
            <div className="grid lg:grid-cols-2 gap-12 w-full">
                <div className="col-span-1">
                    <p className="text-muted-foreground mb-6 responsive-text-24">
                        {currentPortfolio.skillDescription}
                    </p>
                </div>
                <div className="col-span-1 flex gap-4 ml-auto justify-end space-y-4 flex-wrap w-fit h-fit">
                    {currentPortfolio.portfolioSkills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary"
                               style={{marginTop: 0}}
                               className="rounded-[40px] flex gap-2 justify-between items-center font-normal h-14 px-6 responsive-text-20 bg-[#DDDDDD] bg-opacity-50">
                            {skill.name}
                            {isInUpdateMode && <div className="flex gap-2">
                                <Dialog onOpenChange={(value) => {
                                    handleOpenChange(skillIndex, value)
                                }} open={open[skillIndex]}>
                                    <DialogTrigger asChild>
                                        <Button className="w-10 h-10 p-0 flex justify-center items-center"
                                                variant="dark">
                                            <Illustration className="w-5 h-5 object-cover"
                                                          url="/freelancer/portfolio/PencilLine.svg"/>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent
                                        className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                        <ScrollArea className="max-h-[80vh] px-4">
                                            <SkillDialog setTriggerNotice={setTriggerNotice} setMessage={setMessage} triggerNotice={triggerNotice} setOpen={(value) => {
                                                handleOpenChange(skillIndex, value)
                                            }} skill={currentPortfolio.portfolioSkills[skillIndex]}/>
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
                                                Hành động nãy sẽ xóa kỹ năng của bạn khỏi portfolio
                                                này.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => {
                                                handleDelete(currentPortfolio.portfolioSkills[skillIndex].id)
                                            }}>Xóa</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>}
                        </Badge>
                    ))}


                </div>
            </div>
        </div>
    )
}