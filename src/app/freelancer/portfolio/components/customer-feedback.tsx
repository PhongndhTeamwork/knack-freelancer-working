"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card"
import {Star, Trash2} from 'lucide-react'
import Marquee from "react-fast-marquee";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Illustration} from "@/components/custom/illustration";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {FeedbackDialog} from "@/app/freelancer/portfolio/components/dialogs/feedback-dialog";
import usePortfolioUpdateStore from "@/lib/store/portfolio-update.modal";
import {cn} from "@/lib/utils";
import {MessagePayloadForm} from "@/lib/types/error.type";
import usePortfolioStore from "@/lib/store/portfolio.modal";
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

export const CustomerFeedback = ({setMessage, setTriggerNotice, triggerNotice}: Props) => {
    const feedbackWidth = 420;
    const [width, setWidth] = useState("100px");
    const [height, setHeight] = useState(300);
    const marqueeRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState<boolean[]>([]);
    const {isInUpdateMode} = usePortfolioUpdateStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isUseMarquee, setIsUseMarquee] = useState<boolean>(true);

    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();
    const {token} = useAuthStore()

    useEffect(() => {
        setOpen(new Array(currentPortfolio?.portfolioCustomerFeedbacks?.length).fill(false))
    }, [currentPortfolio?.portfolioCustomerFeedbacks?.length]);

    useEffect(() => {
        const calculatedWidth = (window.innerWidth - 1700) / 2;
        setWidth(calculatedWidth > 0 ? `${calculatedWidth}px` : "100px");
    }, []);

    useEffect(() => {
        if (marqueeRef.current) {
            setHeight(marqueeRef?.current?.offsetHeight);
        }
    }, []);

    useEffect(() => {
        const width = containerRef.current?.offsetWidth || 0;
        setIsUseMarquee(width < feedbackWidth * currentPortfolio?.portfolioCustomerFeedbacks?.length);
    }, [containerRef, currentPortfolio?.portfolioCustomerFeedbacks?.length]);

    const handleOpenChange = (index: number, value: boolean) => {
        setOpen((prev) => prev.map((o, i) => (i === index ? value : o)));
    };

    const handleDelete = (id ?: number) => {
        if (!token) return;
        if (!id) return;
        axios.delete(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/delete-feedback/${currentPortfolio.id}/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Xóa feedback thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
        }).catch(err => {
            console.log(err)
        });
    }

    if(currentPortfolio?.portfolioCustomerFeedbacks?.length === 0 ) return;
    return (
        <div className="container mx-auto max-w-none" ref={containerRef}>
            <div className="relative flex items-center">
                {isInUpdateMode || !isUseMarquee ? (
                    <ScrollArea className="whitespace-nowrap pb-4 max-width-suitable mx-[60px]">
                        <div className="flex flex-wrap gap-4 w-max justify-center">
                            {currentPortfolio.portfolioCustomerFeedbacks.map((feedback, index) => (
                                <Card key={index} className={`border-gray-500`} style={{
                                    width: feedbackWidth + 'px',
                                }}>
                                    <CardContent className="p-6 w-full text-xl">
                                        <div className="">
                                            <div className="flex ">
                                                {Array.from({length: 5}).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-6 w-6 ${i < Number(feedback.star)
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-500 fill-gray-200"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-muted-foreground responsive-text-20 mt-4 break-words whitespace-normal line-clamp-4 h-[6rem]"
                                               style={{lineHeight: "1.5rem"}}>
                                                {feedback.comment}
                                            </p>
                                            <div
                                                className={cn("flex items-center gap-3 mt-12", isInUpdateMode && "justify-between")}>
                                                <div className="flex gap-3 items-center">
                                                    <Avatar className="w-12 h-12">
                                                        <AvatarImage src={String(feedback.image) || ""}
                                                                     alt={feedback.customerName}/>
                                                        <AvatarFallback>{feedback?.customerName?.charAt(0) || "U"}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-2">
                                                        <p className="font-semibold responsive-text-18 whitespace-normal">{feedback.customerName}</p>
                                                        <p className="text-muted-foreground responsive-text-16">{feedback.customerPosition} in {feedback.companyName}</p>
                                                    </div>
                                                </div>
                                                {isInUpdateMode && <div className="flex gap-2 items-center">
                                                    <Dialog onOpenChange={(value) => handleOpenChange(index, value)}
                                                            open={open[index]}>
                                                        <DialogTrigger asChild>
                                                            <Button className="w-10 h-10 p-0" variant="dark">
                                                                <Illustration className="w-5 h-5 object-cover"
                                                                              url="/freelancer/portfolio/PencilLine.svg"/>
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent
                                                            className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6 max-h-fit">
                                                            <ScrollArea className="h-full px-4">
                                                                <FeedbackDialog
                                                                    setOpen={(value) => handleOpenChange(index, value)}
                                                                    setTriggerNotice={setTriggerNotice}
                                                                    setMessage={setMessage}
                                                                    triggerNotice={triggerNotice}
                                                                    feedback={currentPortfolio.portfolioCustomerFeedbacks[index]}/>
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
                                                                    Hành động nãy sẽ xóa feedback của bạn khỏi portfolio
                                                                    này.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => {
                                                                    handleDelete(currentPortfolio.portfolioCustomerFeedbacks[index].id)
                                                                }}>Xóa</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                ) : (
                    <>
                        <div className="left-0 absolute bg-gradient-to-r from-white to-transparent z-10"
                             style={{width: width, height: height}}/>
                        <Marquee className="" ref={marqueeRef}>
                            {currentPortfolio.portfolioCustomerFeedbacks.map((feedback, index) => (
                                <Card key={index} className={`mx-2 w-[${feedbackWidth}px] border-gray-500`}>
                                    <CardContent className="p-6 text-xl">
                                        <div className="">
                                            <div className="flex ">
                                                {Array.from({length: 5}).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-6 w-6 ${
                                                            i < Number(feedback.star)
                                                                ? "text-yellow-400 fill-yellow-400"
                                                                : "text-gray-500 fill-gray-200"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-muted-foreground responsive-text-20 mt-4 break-words whitespace-normal line-clamp-4 h-[6rem]"
                                               style={{lineHeight: "1.5rem"}}>
                                                {feedback.comment}
                                            </p>
                                            <div
                                                className={cn("flex items-center gap-3 mt-12", isInUpdateMode && "justify-between")}>
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={String(feedback.image) || ""}
                                                                 alt={feedback.customerName}/>
                                                    <AvatarFallback>{feedback?.customerName?.charAt(0) || "U"}</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-2">
                                                    <p className="font-semibold responsive-text-18 whitespace-normal">{feedback.customerName}</p>
                                                    <p className="text-muted-foreground responsive-text-16">{feedback.customerPosition} in {feedback.companyName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </Marquee>
                        <div className="right-0 absolute bg-gradient-to-l from-white to-transparent z-10"
                             style={{width: width, height: height}}/>
                    </>
                )}

                {/*<div className="right-0 absolute bg-gradient-to-l from-white to-transparent z-10" style={{*/}
                {/*    width: width,*/}
                {/*    height: height*/}
                {/*}}/>*/}
            </div>
        </div>
    )
}