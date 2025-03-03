import {Badge} from "@/components/ui/badge"
import {CardDescription, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {
    ProminentProjectDialog,
} from "@/app/freelancer/portfolio/components/dialogs/prominent-project-dialog";
import {Illustration} from "@/components/custom/illustration";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Trash2} from "lucide-react";
import usePortfolioUpdateStore from "@/lib/store/portfolio-update.modal";
import {PortfolioProminentProjectForm} from "@/lib/types/portfolio.type";
import {cn} from "@/lib/utils";
import {FormatHelper} from "@/lib/helpers/format.helper";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import useAuthStore from "@/lib/store/user.modal";


// type Props = {
//     index : number
// }

type Props = {
    prominentProject: PortfolioProminentProjectForm,
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const ProminentProject = ({prominentProject, setMessage, setTriggerNotice,triggerNotice }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const {isInUpdateMode} = usePortfolioUpdateStore();
    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();
    const {token} = useAuthStore();


    const handleDelete = () => {
        axios.delete(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/delete-prominent-work/${currentPortfolio.id}/${prominentProject.id}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content : "Xóa dự án nổi bật thành công", type : "success"});
            setTriggerNotice(!triggerNotice);
            setOpen(false);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className="container mx-auto max-width-suitable">
            <div className="grid lg:grid-cols-[40%_1fr] gap-12 w-full">
                <div className="space-y-5">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary"
                               className="rounded-full h-14 responsive-text-20 py-1 px-6 border border-black">
                            Dự án
                        </Badge>
                        {/*<Badge variant="outline">Đơn dự án</Badge>*/}
                    </div>

                    <div className="border-none shadow-none text-xl space-y-4">
                        <div className="px-0 pt-0 space-y-4">
                            <CardTitle
                                className="flex flex-[0_0_20%] gap-6 justify-between items-start font-semibold responsive-text-36">
                                <p>{prominentProject.name}</p>
                                {isInUpdateMode && <div className="space-x-2 flex items-center">
                                    <Dialog onOpenChange={setOpen} open={open}>
                                        <DialogTrigger asChild>
                                            <Button className="w-10 h-10 p-0" variant="dark">
                                                <Illustration className="w-5 h-5 object-cover"
                                                              url="/freelancer/portfolio/PencilLine.svg"/>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent
                                            className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                            <ScrollArea className="max-h-[80vh] px-4">
                                                <ProminentProjectDialog prominentWork={prominentProject} setOpen={setOpen} triggerNotice={triggerNotice} setTriggerNotice={setTriggerNotice} setMessage={setMessage}/>
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
                                                    Hành động nãy sẽ xóa dự án của bạn khỏi portfolio này.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>}
                            </CardTitle>
                            {prominentProject?.description?.split("####").map((des, index) => (
                                <CardDescription key={index} className={cn("text-xl text-justify font-normal", index === 0 && "mt-2")}>
                                    {des}
                                </CardDescription>
                            ))}

                            {/*<CardDescription className="text-xl">*/}
                            {/*    It&#39;s built to help you showcase your business&#39;s services or products, you*/}
                            {/*    can*/}
                            {/*    also use the contact form as an easy way to get in touch with you through the*/}
                            {/*    Calendly*/}
                            {/*    embed.*/}
                            {/*</CardDescription>*/}
                        </div>
                        <div className="px-0">
                            <dl className="space-y-4">
                                <div className="flex justify-between border-b-2 pb-2">
                                    <dt className="font-medium text-muted-foreground flex items-center">Vai trò</dt>
                                    <dd className="mt-1">{prominentProject.role}</dd>
                                </div>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <dt className="text font-medium text-muted-foreground flex items-center">
                                        Thời gian tham gia
                                    </dt>
                                    <dd className="mt-1">{FormatHelper.formatDateToMonthYear(prominentProject.from || "")} {prominentProject.to ? " - " + FormatHelper.formatDateToMonthYear(prominentProject.to || "") : " đến nay"}</dd>
                                </div>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <dt className="text font-medium text-muted-foreground flex items-center">Công
                                        ty
                                    </dt>
                                    <dd className="mt-1">{prominentProject.company}</dd>
                                </div>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <dt className="text font-medium text-muted-foreground flex items-center">Chi
                                        tiết dự án
                                    </dt>
                                    <dd className="mt-1">{prominentProject.detail}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary"
                               className="rounded-full h-14 responsive-text-20 py-1 px-6 border border-black">
                            Ảnh dự án
                        </Badge>
                        {/*<Badge variant="outline">Đơn dự án</Badge>*/}
                    </div>
                    {prominentProject?.images?.map((image, index) => (
                        <div key={index} className="relative aspect-[2/1] space-y-5 overflow-hidden rounded-lg">
                            <Illustration className="w-full object-cover aspect-[2/1]" url={image.image}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}