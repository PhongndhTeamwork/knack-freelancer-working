"use client"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {CustomSelect} from "@/components/custom/custom-select";
import months from "@/lib/json/month.json";
import years from "@/lib/json/year.json";
import {Checkbox} from "@/components/ui/checkbox";
import {FileUploader} from "@/components/constitution/file-uploader";
import * as React from "react";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import {PortfolioProminentProjectForm} from "@/lib/types/portfolio.type";
import {FormatHelper} from "@/lib/helpers/format.helper";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {ValidateHelper} from "@/lib/helpers/validate.helper";
import axios from "axios";
import useAuthStore from "@/lib/store/user.modal";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import {ImageForm} from "@/lib/types/image.type";
import {CustomSpinner} from "@/components/custom/custom-spinner";

type Props = {
    setOpen: (value: boolean) => void;
    prominentWork?: PortfolioProminentProjectForm;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const ProminentProjectDialog = ({
                                           setOpen,
                                           prominentWork,
                                           triggerNotice,
                                           setTriggerNotice,
                                           setMessage
                                       }: Props) => {
    const {token} = useAuthStore();
    const {currentPortfolio, fetchCurrentPortfolio} = usePortfolioStore();
    const [prominentWorkInfo, setProminentWorkInfo] = useState<PortfolioProminentProjectForm>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (prominentWork) setProminentWorkInfo(prominentWork);
    }, [prominentWork]);
    const [newImages, setNewImages] = useState<(File | ImageForm)[]>([]);

    const updateIsCurrentStatus = useCallback(() => {
        setProminentWorkInfo((prev) => ({...prev, isCurrent: !prev.to}))
    }, [])

    useEffect(() => {
        updateIsCurrentStatus()
    }, [updateIsCurrentStatus]);

    useEffect(() => {
        if (!prominentWorkInfo?.images) return;
        setNewImages((prev) => [...prev, ...(prominentWorkInfo.images || [])]);
    }, [prominentWorkInfo.images])

    // useEffect(() => {
    //     console.log(prominentWorkInfo);
    // }, [prominentWorkInfo]);

    const handleCreate = () => {
        setIsLoading(true);
        if (!token) return;
        if (!currentPortfolio.id) return;
        if (!validateBeforeCreating()){
            setIsLoading(false);
            return;
        }
        const from = new Date(Number(prominentWorkInfo?.fromYear), Number(prominentWorkInfo?.fromMonth), 1);
        let to = null;
        if (!prominentWorkInfo.isCurrent) to = new Date(Number(prominentWorkInfo?.toYear), Number(prominentWorkInfo?.toMonth), 1);
        const form = new FormData();
        prominentWorkInfo.from = from.toISOString();
        prominentWorkInfo.to = to ? to.toISOString() : "";
        prominentWorkInfo.description = prominentWorkInfo?.description?.replace(/\n+/g, "####");
        for (const [key, value] of Object.entries(prominentWorkInfo)) {
            if (Array.isArray(value)) {
            } else if (value === null) {
                form.append(key, "");
            } else if (value !== undefined) {
                form.append(key, String(value));
            }
        }

        //* Add image
        if (Array.isArray(newImages)) {
            newImages.forEach((image) => {
                if (image instanceof File) {
                    form.append("images", image);
                }
            });
        }
        // console.log(prominentWorkInfo.description);

        axios.post(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/create-prominent-work/${currentPortfolio.id}`, form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Tạo dự án nổi bật thành công", type: "success"});
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
    };

    const handleUpdate = () => {
        setIsLoading(true);
        if (!token) return;
        if (!currentPortfolio.id) return;
        if (!validateBeforeUpdating()){
            setIsLoading(false);
            return;
        }
        const from = new Date(Number(prominentWorkInfo?.fromYear), Number(prominentWorkInfo?.fromMonth), 1);
        let to = null;
        if (!prominentWorkInfo.isCurrent) to = new Date(Number(prominentWorkInfo?.toYear), Number(prominentWorkInfo?.toMonth), 1);

        const form = new FormData();
        prominentWorkInfo.from = from.toISOString();
        prominentWorkInfo.to = to ? to.toISOString() : "";
        prominentWorkInfo.description = prominentWorkInfo?.description?.replace(/\n+/g, "####");
        for (const [key, value] of Object.entries(prominentWorkInfo)) {
            if (Array.isArray(value)) {
            } else if (value === null) {
                form.append(key, "");
            } else if (value !== undefined) {
                form.append(key, String(value));
            }
        }

        //* Add image
        if (Array.isArray(newImages)) {
            newImages.forEach((image) => {
                if (image instanceof File) {
                    form.append("images", image);
                }
            });
        }
        //* Add trash images
        const trashImages = prominentWorkInfo.images?.filter((image) => {
            return !newImages.some((i) => !(i instanceof File) && i?.id === image?.id);
        })

        trashImages?.forEach((image) => {
            form.append("trashImages", String(image?.id));
        });

        // form.forEach((value, key) => {
        //     console.log(`${key}:`, value);
        // });

        //*
        axios.put(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/update-prominent-work/${currentPortfolio.id}/${prominentWorkInfo.id}`, form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Chỉnh sửa dự án nổi bật thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
            setOpen(false);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
        }).catch(err => {
            setMessage({content: "Something went wrong", type: "error"});
            setTriggerNotice(!triggerNotice);
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        });

    }

    const validateBeforeCreating = () => {
        if (!prominentWorkInfo?.name || prominentWorkInfo?.name?.trim() === "") {
            setMessage({content: "Vui lòng nhập tên.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false;
        }
        if (!prominentWorkInfo?.company || prominentWorkInfo?.company?.trim() === "") {
            setMessage({content: "Vui lòng nhập công ty.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false;
        }
        if (!prominentWorkInfo?.role || prominentWorkInfo?.role?.trim() === "") {
            setMessage({content: "Vui lòng nhập vai trò.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false;
        }
        if (!prominentWorkInfo.fromMonth || !prominentWorkInfo.fromYear) {
            setMessage({content: "Vui lòng chọn tháng và năm bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }

        if (!prominentWorkInfo.isCurrent && (!prominentWorkInfo.toMonth || !prominentWorkInfo.toYear)) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }

        if (prominentWorkInfo.fromMonth && prominentWorkInfo.fromYear && prominentWorkInfo.toMonth && prominentWorkInfo.toYear && !(ValidateHelper.checkStartAndEndTime(+prominentWorkInfo.fromMonth, +prominentWorkInfo.fromYear, +prominentWorkInfo.toMonth, +prominentWorkInfo.toYear))) {
            setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        return true
    }

    const validateBeforeUpdating = () => {
        if (!prominentWorkInfo.name || prominentWorkInfo.name.trim() === "") {
            setMessage({content: "Vui lòng nhập thành tựu .", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }

        if (!prominentWorkInfo.company || prominentWorkInfo.company.trim() === "") {
            setMessage({content: "Vui lòng nhập công ty .", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }

        if (!prominentWorkInfo.role || prominentWorkInfo.role.trim() === "") {
            setMessage({content: "Vui lòng nhập vai trò .", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }

        if (!prominentWorkInfo.description || prominentWorkInfo.description.trim() === "") {
            setMessage({content: "Vui lòng nhập mô tả.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!prominentWorkInfo.fromYear || +prominentWorkInfo.fromYear < 2010) prominentWorkInfo.fromYear = (new Date(prominentWorkInfo.from || "")).getFullYear().toString()
        if (!prominentWorkInfo.fromMonth) prominentWorkInfo.fromMonth = (new Date(prominentWorkInfo.from || "")).getMonth().toString()
        if (!prominentWorkInfo.isCurrent && (!prominentWorkInfo.toYear || !prominentWorkInfo.toMonth) && !prominentWorkInfo.to) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!prominentWorkInfo.isCurrent && (!prominentWorkInfo.toYear || !prominentWorkInfo.toMonth) && prominentWorkInfo.to) {
            prominentWorkInfo.toYear = (new Date(prominentWorkInfo.to || "")).getFullYear().toString()
            prominentWorkInfo.toMonth = (new Date(prominentWorkInfo.to || "")).getMonth().toString()
        }
        if (prominentWorkInfo.fromMonth && prominentWorkInfo.fromYear && prominentWorkInfo.toMonth && prominentWorkInfo.toYear && !(ValidateHelper.checkStartAndEndTime(+prominentWorkInfo.fromMonth, +prominentWorkInfo.fromYear, +prominentWorkInfo.toMonth, +prominentWorkInfo.toYear))) {
            setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        return true
    }


    return (
        <div className="bg-white px-3 pb-6">
            <h3 className="responsive-text-20 font-semibold">{prominentWork ? "Chỉnh sửa" : "Thêm"} “Dự án nổi bật”</h3>
            {/*<Button onClick={() => {setOpen(false)}}>Close</Button>*/}
            <div className="space-y-6 py-4 mt-6">
                <div className="py-4 pt-0 space-y-4 text-[#545454]">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="responsive-text-16">Tên dự án</Label>
                            <Input value={prominentWorkInfo?.name} onChange={(e) => {
                                setProminentWorkInfo((prev) => ({...prev, name: e.target.value}))
                            }} className="responsive-text-16 h-11"/>
                        </div>
                        <div className="space-y-2">
                            <Label className="responsive-text-16">Mô tả về dự án</Label>
                            <CustomTextarea value={prominentWorkInfo.description} onChange={(value) => {
                                setProminentWorkInfo((prev) => ({...prev, description: value}))
                            }} className="responsive-text-16 "/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="responsive-text-16">Vai trò</Label>
                                <Input value={prominentWorkInfo?.role} onChange={(e) => {
                                    setProminentWorkInfo((prev) => ({...prev, role: e.target.value}))
                                }} className="responsive-text-16 h-11"/>
                            </div>
                            <div className="space-y-2">
                                <Label className="responsive-text-16">Công ty</Label>
                                <Input className="responsive-text-16 h-11" value={prominentWorkInfo?.company}
                                       onChange={(e) => {
                                           setProminentWorkInfo((prev) => ({...prev, company: e.target.value}))
                                       }}/>
                            </div>
                            <div className="space-y-2">
                                <Label className="responsive-text-16">Chi tiết dự án</Label>
                                <Input value={prominentWorkInfo?.detail} onChange={(e) => {
                                    setProminentWorkInfo((prev) => ({...prev, detail: e.target.value}))
                                }} className="responsive-text-16 h-11"/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                <div className="responsive-text-16">Tháng bắt đầu</div>
                                <CustomSelect items={months} className="bg-white h-11 w-full"
                                              ulClassname="bg-gray-100"
                                              currentLabel={prominentWorkInfo?.from ? FormatHelper.formatMonth((new Date(prominentWorkInfo.from || "")).getMonth()) : undefined}
                                              onSelect={(value) => {
                                                  setProminentWorkInfo((prev) => ({
                                                      ...prev, fromMonth: value
                                                  }))
                                              }}/>
                            </div>

                            <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                <div className="responsive-text-16">Năm bắt đầu</div>
                                <CustomSelect items={years}
                                              className="bg-white h-11 w-full responsive-text-16"
                                              ulClassname="bg-gray-100"
                                              currentLabel={prominentWorkInfo?.from ? (new Date(prominentWorkInfo.from || "")).getFullYear().toString() : undefined}
                                              onSelect={(value) => {
                                                  setProminentWorkInfo((prev) => ({
                                                      ...prev, fromYear: value
                                                  }))
                                              }}/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                <div className="responsive-text-16">Tháng kết thúc</div>
                                <CustomSelect items={months} className={`h-11 w-full bg-white`}
                                              ulClassname="bg-gray-100"
                                              currentLabel={prominentWorkInfo?.to ? FormatHelper.formatMonth((new Date(prominentWorkInfo.to || "")).getMonth()) : undefined}
                                              disabled={prominentWorkInfo?.isCurrent}
                                              onSelect={(value) => {
                                                  setProminentWorkInfo((prev) => ({
                                                      ...prev, toMonth: value
                                                  }))
                                              }}/>
                            </div>

                            <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                <div className="responsive-text-16">Năm kết thúc</div>
                                <CustomSelect items={years}
                                              className={`h-11 w-full bg-white`}
                                              ulClassname="bg-gray-100"
                                              disabled={prominentWorkInfo?.isCurrent}
                                              currentLabel={prominentWorkInfo?.to ? (new Date(prominentWorkInfo.to || "")).getFullYear().toString() : undefined}
                                              onSelect={(value) => {
                                                  setProminentWorkInfo((prev) => ({
                                                      ...prev, toYear: value
                                                  }))
                                              }}/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id={`isCurrent-${1}`}
                                          checked={prominentWorkInfo.isCurrent}
                                          onClick={() => {
                                              setProminentWorkInfo((prev) => ({
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

                        <div className="space-y-2">
                            <Label className="responsive-text-16">Ảnh dự án</Label>
                            <FileUploader mode="multiple" files={newImages} setFiles={setNewImages}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
                {!prominentWork &&
                    <Button variant="dark" disabled={isLoading} onClick={handleCreate}>{isLoading && <CustomSpinner size="sm"/>} Thêm dự
                        án </Button>}
                {prominentWork && <Button variant="dark" disabled={isLoading} onClick={handleUpdate}>{isLoading && <CustomSpinner size="sm"/>} Lưu thay đổi </Button>}
            </div>
        </div>


    )
}

