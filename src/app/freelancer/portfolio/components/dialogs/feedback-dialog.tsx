"use client"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import * as React from "react";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {PortfolioCustomerFeedbackForm} from "@/lib/types/portfolio.type";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import useAuthStore from "@/lib/store/user.modal";
import axios from "axios";
import {CustomSpinner} from "@/components/custom/custom-spinner";
import {Star} from "lucide-react";

type Props = {
    setOpen: (value: boolean) => void;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
    feedback?: PortfolioCustomerFeedbackForm
}

export const FeedbackDialog = ({setOpen, setMessage, setTriggerNotice, triggerNotice, feedback}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();
    const {token} = useAuthStore();
    const [feedbackInfo, setFeedbackInfo] = useState<PortfolioCustomerFeedbackForm>({});
    const [selectedStars, setSelectedStars] = useState(0);

    useEffect(() => {
        if (feedback) setFeedbackInfo(feedback);
    }, [feedback]);

    useEffect(() => {
        setSelectedStars(feedbackInfo.star || 0);
    }, [feedbackInfo.star]);

    const handleCreate = () => {
        setIsLoading(true);
        if (!token) return;
        if (!currentPortfolio.id) return;
        if (!validate()) {
            setIsLoading(false);
            return;
        }
        feedbackInfo.star = selectedStars;
        axios.post(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/create-feedback/${currentPortfolio.id}`, feedbackInfo,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Tạo feedback thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
            setOpen(false);
        }).catch(() => {
            setMessage({content: "Something went wrong", type: "error"});
            setTriggerNotice(!triggerNotice);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleUpdate = () => {
        console.log(feedbackInfo)
        setIsLoading(true);
        if (!token) return;
        if (!currentPortfolio.id) return;
        if (!feedbackInfo.id) return;
        if (!validate()) {
            setIsLoading(false);
            return;
        }
        feedbackInfo.star = selectedStars;
        axios.put(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/update-feedback/${currentPortfolio.id}/${feedbackInfo.id}`, feedbackInfo,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Cập nhật feedback thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
            setOpen(false);
        }).catch((error) => {
            console.error(error);
            setMessage({content: "Something went wrong", type: "error"});
            setTriggerNotice(!triggerNotice);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const validate = () => {
        if (!feedbackInfo.customerPosition || !feedbackInfo.companyName || !feedbackInfo.customerName || !feedbackInfo.comment) {
            setMessage({
                content: "Vui lòng điền đầy đủ thông tin.",
                type: "error",
            });
            return false;
        }
        if (feedbackInfo.customerPosition?.trim() === "" || feedbackInfo.companyName?.trim() === "" || feedbackInfo.customerName?.trim() === "" || feedbackInfo.comment?.trim() === "") {
            setMessage({
                content: "Vui lòng điền đầy đủ thông tin.",
                type: "error",
            });
            return false;
        }
        return true;
    }


    return (
        <div className="bg-white px-3 pb-6">
            <h3 className="responsive-text-20 font-semibold">{feedback ? "Chỉnh sửa" : "Thêm"} “Feedback”</h3>
            <div className="space-y-6 py-4 mt-6">

                <div className="p-4 pt-0 space-y-4 text-[#545454]">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="responsive-text-16">Số sao nhận được</Label>
                            {/*<CustomSelect items={stars}*/}
                            {/*              currentLabel={feedbackInfo.star ? String(feedbackInfo.star) : "Select"}*/}
                            {/*              className="bg-white h-11 w-full responsive-text-16"*/}
                            {/*              ulClassname="bg-gray-100" onSelect={(value) => {*/}
                            {/*    setFeedbackInfo((prev) => ({...prev, star: Number(value)}))*/}
                            {/*}}/>*/}
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    // eslint-disable-next-line react/jsx-no-undef
                                    <Star
                                        key={star}
                                        className={`w-7 h-7 cursor-pointer transition-colors ${star <= selectedStars ? "text-yellow-400" : "text-gray-300"}`}
                                        onClick={() => {
                                            if (selectedStars === 1) setSelectedStars(0);
                                            else setSelectedStars(star)
                                        }}
                                        fill={star <= selectedStars ? "#facc15" : "none"}
                                    />
                                ))}
                            </div>

                        </div>
                        <div className="space-y-2">
                            <Label className="responsive-text-16">Lời nhận xét</Label>
                            <CustomTextarea value={feedbackInfo.comment} placeholder="" className="responsive-text-16"
                                            onChange={(value) => {
                                                setFeedbackInfo((prev) => ({...prev, comment: value}))
                                            }}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="responsive-text-16">Tên khách hàng</Label>
                                <Input placeholder="" value={feedbackInfo.customerName}
                                       className="responsive-text-16 h-11" onChange={(e) => {
                                    setFeedbackInfo((prev) => ({...prev, customerName: e.target.value}))
                                }}/>
                            </div>
                            <div className="space-y-2">
                                <Label className="responsive-text-16">Công ty</Label>
                                <Input value={feedbackInfo.companyName} placeholder=""
                                       className="responsive-text-16 h-11" onChange={(e) => {
                                    setFeedbackInfo((prev) => ({...prev, companyName: e.target.value}))
                                }}/>
                            </div>
                            <div className="space-y-2">
                                <Label className="responsive-text-16">Chức danh tại công ty</Label>
                                <Input value={feedbackInfo.customerPosition} placeholder=""
                                       className="responsive-text-16 h-11" onChange={(e) => {
                                    setFeedbackInfo((prev) => ({...prev, customerPosition: e.target.value}))
                                }}/>
                            </div>
                        </div>
                        {/*<div className="space-y-2">*/}
                        {/*    <Label className="responsive-text-16">Ảnh của khách hàng</Label>*/}
                        {/*    <FileUploader/>*/}

                        {/*</div>*/}
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
                {!feedback && <Button disabled={isLoading} variant="dark" onClick={handleCreate}>{isLoading &&
                    <CustomSpinner size="sm"/>} Thêm feedback</Button>}
                {feedback && <Button disabled={isLoading} variant="dark" onClick={handleUpdate}>{isLoading &&
                    <CustomSpinner size="sm"/>} Lưu thay đổi</Button>}
            </div>
        </div>


    )
}

