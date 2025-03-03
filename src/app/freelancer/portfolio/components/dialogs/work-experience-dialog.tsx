"use client"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {CustomSelect} from "@/components/custom/custom-select";
import months from "@/lib/json/month.json";
import years from "@/lib/json/year.json";
import {Checkbox} from "@/components/ui/checkbox";
import * as React from "react";
import {PortfolioWorkExperienceForm} from "@/lib/types/portfolio.type";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {FormatHelper} from "@/lib/helpers/format.helper";
import {CustomSpinner} from "@/components/custom/custom-spinner";
import {ValidateHelper} from "@/lib/helpers/validate.helper";
import useAuthStore from "@/lib/store/user.modal";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import axios from "axios";

type Props = {
    setOpen: (value: boolean) => void;
    workExperience?: PortfolioWorkExperienceForm;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const WorkExperienceDialog = ({triggerNotice, setMessage, setTriggerNotice, setOpen, workExperience}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [workExperienceInfo, setWorkExperienceInfo] = useState<PortfolioWorkExperienceForm>({});
    const {token} = useAuthStore();
    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();

    useEffect(() => {
        if (workExperience) setWorkExperienceInfo(workExperience)
    }, [workExperience]);

    const handleCreate = () => {
        setIsLoading(true);
        if (!token) return;
        if (!currentPortfolio.id) return;
        if (!validateBeforeCreating()){
            setIsLoading(false);
            return;
        }
        const from = new Date(Number(workExperienceInfo?.fromYear), Number(workExperienceInfo?.fromMonth), 1);
        let to = null;
        if (!workExperienceInfo?.isCurrent) to = new Date(Number(workExperienceInfo?.toYear), Number(workExperienceInfo?.toMonth), 1);
        workExperienceInfo.from = from.toISOString();
        workExperienceInfo.to = to ? to.toISOString() : "";
        axios.post(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/create-work-experience/${currentPortfolio.id}`, workExperienceInfo,
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
        if (!validateBeforeUpdating()){
            setIsLoading(false);
            return;
        }
        const from = new Date(Number(workExperienceInfo?.fromYear), Number(workExperienceInfo?.fromMonth), 1);
        let to = null;
        if (!workExperienceInfo.isCurrent) to = new Date(Number(workExperienceInfo?.toYear), Number(workExperienceInfo?.toMonth), 1);
        workExperienceInfo.from = from.toISOString();
        workExperienceInfo.to = to ? to.toISOString() : "";

        axios.put(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/update-work-experience/${currentPortfolio.id}/${workExperienceInfo.id}`, workExperienceInfo,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Chỉnh sửa nghiệm thành công", type: "success"});
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

    const validateBeforeUpdating = () => {
        if (!workExperienceInfo?.company || workExperienceInfo?.company?.trim() === "") {
            setMessage({content: "Vui lòng nhập công ty.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false;
        }
        if (!workExperienceInfo?.role || workExperienceInfo?.role?.trim() === "") {
            setMessage({content: "Vui lòng nhập vai trò.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false;
        }
        if (!workExperienceInfo.fromYear || +workExperienceInfo.fromYear < 2010) workExperienceInfo.fromYear = (new Date(workExperienceInfo.from || "")).getFullYear().toString()
        if (!workExperienceInfo.fromMonth) workExperienceInfo.fromMonth = (new Date(workExperienceInfo.from || "")).getMonth().toString()
        if (!workExperienceInfo.isCurrent && (!workExperienceInfo.toYear || !workExperienceInfo.toMonth) && !workExperienceInfo.to) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!workExperienceInfo.isCurrent && (!workExperienceInfo.toYear || !workExperienceInfo.toMonth) && workExperienceInfo.to) {
            workExperienceInfo.toYear = (new Date(workExperienceInfo.to || "")).getFullYear().toString()
            workExperienceInfo.toMonth = (new Date(workExperienceInfo.to || "")).getMonth().toString()
        }
        if (workExperienceInfo.fromMonth && workExperienceInfo.fromYear && workExperienceInfo.toMonth && workExperienceInfo.toYear && !(ValidateHelper.checkStartAndEndTime(+workExperienceInfo.fromMonth, +workExperienceInfo.fromYear, +workExperienceInfo.toMonth, +workExperienceInfo.toYear))) {
            setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        return true
    }

    const validateBeforeCreating = () => {
        if (!workExperienceInfo?.company || workExperienceInfo?.company?.trim() === "") {
            setMessage({content: "Vui lòng nhập công ty.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false;
        }
        if (!workExperienceInfo?.role || workExperienceInfo?.role?.trim() === "") {
            setMessage({content: "Vui lòng nhập vai trò.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false;
        }
        if (!workExperienceInfo.fromMonth || !workExperienceInfo.fromYear) {
            setMessage({content: "Vui lòng chọn tháng và năm bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!workExperienceInfo.isCurrent && (!workExperienceInfo.toMonth || !workExperienceInfo.toYear)) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (workExperienceInfo.fromMonth && workExperienceInfo.fromYear && workExperienceInfo.toMonth && workExperienceInfo.toYear && !(ValidateHelper.checkStartAndEndTime(+workExperienceInfo.fromMonth, +workExperienceInfo.fromYear, +workExperienceInfo.toMonth, +workExperienceInfo.toYear))) {
            setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        return true
    }



    return (
        <div className="bg-white px-3 pb-6">
            <h3 className="responsive-text-20 font-semibold">{workExperienceInfo ? "Chỉnh sửa" : "Thêm"} “Kinh nghiệm làm việc”</h3>
            <div className="space-y-6 py-4 mt-6">
                <div className="p-4 pt-0 space-y-4 text-[#545454]">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="responsive-text-16">Vai trò</Label>
                            <Input placeholder="" value={workExperienceInfo?.role} onChange={(e) => {
                                setWorkExperienceInfo((prev) => ({...prev, role: e.target.value}))
                            }} className="responsive-text-16 h-11"/>
                        </div>
                        <div className="space-y-2">
                            <Label className="responsive-text-16">Tên công ty</Label>
                            <Input placeholder="" value={workExperienceInfo?.company} onChange={(e) => {
                                setWorkExperienceInfo((prev) => ({...prev, company: e.target.value}))
                            }} className="responsive-text-16 h-11"/>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                <div className="responsive-text-16">Tháng bắt đầu</div>
                                <CustomSelect items={months} className="bg-white h-11 w-full"
                                              ulClassname="bg-gray-100"
                                              currentLabel={workExperienceInfo?.from ? FormatHelper.formatMonth((new Date(workExperienceInfo.from || "")).getMonth()) : undefined}
                                              onSelect={(value) => {
                                                  setWorkExperienceInfo((prev) => ({
                                                      ...prev, fromMonth: value
                                                  }))
                                              }}/>
                            </div>

                            <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                <div className="responsive-text-16">Năm bắt đầu</div>
                                <CustomSelect items={years}
                                              className="bg-white h-11 w-full responsive-text-16"
                                              ulClassname="bg-gray-100"
                                              currentLabel={workExperienceInfo?.from ? (new Date(workExperienceInfo.from || "")).getFullYear().toString() : undefined}
                                              onSelect={(value) => {
                                                  setWorkExperienceInfo((prev) => ({
                                                      ...prev, fromYear: value
                                                  }))
                                              }}/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                <div className="responsive-text-16">Tháng kết thúc</div>
                                <CustomSelect items={months} className={`h-11 w-full bg-white`}
                                              disabled={workExperienceInfo?.isCurrent}
                                              currentLabel={workExperienceInfo?.to ? FormatHelper.formatMonth((new Date(workExperienceInfo.to || "")).getMonth()) : undefined}
                                              onSelect={(value) => {
                                                  setWorkExperienceInfo((prev) => ({
                                                      ...prev, toMonth: value
                                                  }))
                                              }}
                                              ulClassname="bg-gray-100"/>
                            </div>

                            <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                <div className="responsive-text-16">Năm kết thúc</div>
                                <CustomSelect items={years}
                                              className={`h-11 w-full bg-white`}
                                              disabled={workExperienceInfo?.isCurrent}
                                              currentLabel={workExperienceInfo?.to ? (new Date(workExperienceInfo.to || "")).getFullYear().toString() : undefined}
                                              onSelect={(value) => {
                                                  setWorkExperienceInfo((prev) => ({
                                                      ...prev, toYear: value
                                                  }))
                                              }}/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id={`isCurrent-${1}`}
                                          checked={workExperienceInfo.isCurrent}
                                          onClick={() => {
                                              setWorkExperienceInfo((prev) => ({
                                                  ...prev, isCurrent: !prev.isCurrent
                                              }))
                                          }}/>
                                <label
                                    htmlFor="terms"
                                    className="responsive-text-16 font-medium relative top-[1px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Hiện tại tôi vẫn đang làm công việc này
                                </label>
                            </div>
                        </div>

                        {/*<div className="space-y-2">*/}
                        {/*    <Label className="responsive-text-16">Ảnh công việc</Label>*/}
                        {/*    <FileUploader/>*/}

                        {/*</div>*/}
                    </div>
                </div>

            </div>

            <div className="flex justify-end mt-6 gap-4">
                {!workExperience &&
                    <Button variant="dark" disabled={isLoading} onClick={handleCreate}>{isLoading &&
                        <CustomSpinner size="sm"/>} Thêm kinh nghiệm </Button>}
                {workExperience && <Button variant="dark" disabled={isLoading} onClick={handleUpdate}>{isLoading && <CustomSpinner size="sm"/>} Lưu thay đổi </Button>}
            </div>
        </div>


    )
}

