"use client"

import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import * as React from "react";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import useAuthStore from "@/lib/store/user.modal";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import {CustomSpinner} from "@/components/custom/custom-spinner";
import {PortfolioSkillForm} from "@/lib/types/portfolio.type";
import axios from "axios";
import {MessagePayloadForm} from "@/lib/types/error.type";

type Props = {
    setOpen: (value: boolean) => void;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const SkillDescriptionDialog = ({setOpen, setMessage, setTriggerNotice, triggerNotice}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {token} = useAuthStore();
    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();
    const [skillDescription, setSkillDescription] = useState<PortfolioSkillForm>({});

    useEffect(() => {
        setSkillDescription({
            name: currentPortfolio.skillDescription
        })
    }, [currentPortfolio.skillDescription]);

    const handleSave =  () => {
        setIsLoading(true);
        console.log(currentPortfolio);
        axios.put(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/update-portfolio/${currentPortfolio.id}`, {
                skillDescription: skillDescription.name
            },
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Chỉnh sửa portfolio thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
            setOpen(false);
        }).catch(err => {
            setMessage({content: "Something went wrong", type: "error"});
            setTriggerNotice(!triggerNotice);
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="bg-white px-3 pb-6">
            <h3 className="responsive-text-20 font-semibold">Chỉnh sửa “Mô tả kỹ năng”</h3>
            <div className="space-y-6 py-4 mt-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="responsive-text-16">Mô tả</Label>
                        <CustomTextarea placeholder="" value={skillDescription.name} onChange={(value) => {
                            setSkillDescription((prev) => ({...prev, name: value}));
                        }} className="responsive-text-16 h-11"/>
                    </div>
                </div>

                <div className="flex justify-end mt-6 gap-4">
                    <Button variant="dark" onClick={handleSave} disabled={isLoading}>{isLoading && <CustomSpinner size="sm"/>} Lưu thay
                        đổi</Button>
                </div>
            </div>
        </div>

    )
}

