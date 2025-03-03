"use client"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import * as React from "react";
import {PortfolioSkillForm} from "@/lib/types/portfolio.type";
import {MessagePayloadForm} from "@/lib/types/error.type";
import useAuthStore from "@/lib/store/user.modal";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import {CustomSpinner} from "@/components/custom/custom-spinner";
import axios from "axios";

type Props = {
    setOpen: (value: boolean) => void;
    skill?: PortfolioSkillForm;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const SkillDialog = ({setOpen, skill, setTriggerNotice, triggerNotice, setMessage}: Props) => {
    const [skillInfo, setSkillInfo] = useState<PortfolioSkillForm>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {token} = useAuthStore();
    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();

    useEffect(() => {
        if (skill) setSkillInfo(skill);
    }, [skill])

    const handleCreate = () => {
        setIsLoading(true);
        if (!token) return;
        if (!currentPortfolio.id) return;
        if (!skillInfo.name || skillInfo.name === "") {
            setMessage({type: "error", content: "Tên kỹ năng không được để trống."});
            setIsLoading(false);
            return;
        }

        axios.post(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/create-skill/${currentPortfolio.id}`, {
                name: skillInfo.name
            },
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Tạo kinh nghiệm thành công", type: "success"});
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

    const handleUpdate = () => {
        setIsLoading(true);
        if (!token) return;
        if (!currentPortfolio.id) return;
        if (!skillInfo.id) return;
        if (!skillInfo.name || skillInfo.name === "") {
            setMessage({type: "error", content: "Tên kỹ năng không được để trống."});
            setIsLoading(false);
            return;
        }

        axios.put(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/update-skill/${currentPortfolio.id}/${skillInfo.id}`, {
                name: skillInfo.name
            },
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Tạo kinh nghiệm thành công", type: "success"});
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

    return (
        <div className="bg-white px-3 pb-6">
            <h3 className="responsive-text-20 font-semibold">Chỉnh sửa “Kỹ năng”</h3>
            <div className="space-y-6 py-4 mt-6">
                <div className="space-y-6">

                    <div className="space-y-2">
                        <Label className="responsive-text-16">Kỹ năng</Label>
                        <Input value={skillInfo.name} onChange={(e) => {
                            setSkillInfo((prev) => ({...prev, name: e.target.value}))
                        }} placeholder="" className="responsive-text-16 h-11"/>
                    </div>
                </div>

                <div className="flex justify-end mt-6 gap-4">
                    {!skill &&
                        <Button variant="dark" disabled={isLoading} onClick={handleCreate}>{isLoading &&
                            <CustomSpinner size="sm"/>} Thêm kỹ năng </Button>}
                    {skill && <Button variant="dark" disabled={isLoading} onClick={handleUpdate}>{isLoading &&
                        <CustomSpinner size="sm"/>} Lưu thay đổi </Button>}

                </div>
            </div>
        </div>

    )
}

