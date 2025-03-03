import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {CustomSelect} from "@/components/custom/custom-select";
import months from "@/lib/json/month.json";
import years from "@/lib/json/year.json";
import {Checkbox} from "@/components/ui/checkbox";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import * as React from "react";
import {Button} from "@/components/ui/button";
import axios from "axios";
import useAuthStore from "@/lib/store/user.modal";
import {MessagePayloadForm} from "@/lib/types/error.type";
import useProfileStore from "@/lib/store/profile.modal";
import {ValidateHelper} from "@/lib/helpers/validate.helper";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import {ProfileProminentWorkForm} from "@/lib/types/basic-profile.type";
import {FormatHelper} from "@/lib/helpers/format.helper";
import {CustomSpinner} from "@/components/custom/custom-spinner";

type Props = {
    setOpen: (value: boolean) => void;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
    prominentWork?: ProfileProminentWorkForm
}

export const ProfileProminentWorkDialog = ({
                                               prominentWork,
                                               setOpen,
                                               setMessage,
                                               setTriggerNotice,
                                               triggerNotice
                                           }: Props) => {
    const [prominentWorkInfo, setProminentWorkInfo] = useState<ProfileProminentWorkForm>({});
    const {token} = useAuthStore();
    const {fetchProfile} = useProfileStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingDeleteProcess, setIsLoadingDeleteProcess] = useState<boolean>(false);

    useEffect(() => {
        if (prominentWork) setProminentWorkInfo(prominentWork);
    }, [prominentWork]);

    const handleCreateProminentWork = () => {
        setIsLoading(true);
        if (!validateBeforeCreating()) {
            setIsLoading(false);
            return;
        }
        // setIsCloseDialog(true);
        const from = new Date(Number(prominentWorkInfo?.fromYear), Number(prominentWorkInfo?.fromMonth), 1);
        let to: Date = new Date();
        if (!prominentWorkInfo.isCurrent) to = new Date(Number(prominentWorkInfo?.toYear), Number(prominentWorkInfo?.toMonth), 1);
        // console.log(newWorkExperience);
        axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/create-prominent-work`, {
            name: prominentWorkInfo.name,
            description: prominentWorkInfo.description,
            from: from.toISOString(),
            to: !prominentWorkInfo.isCurrent ? to?.toISOString() : "",
            wage: Number(prominentWorkInfo.wage)
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Tạo công việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            setProminentWorkInfo({});
            fetchProfile(token || "")
            setTimeout(() => {
                setOpen(false)
                window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
            }, 500)
        }).catch(() => {
            // console.error(error)
        }).finally(() => {
            setIsLoading(false);
        })

    };

    const handleDeleteProminentWork = () => {
        setIsLoadingDeleteProcess(true);
        if (!token) {
            setMessage({content: "Vui lòng đăng nhập lại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        if (!prominentWorkInfo.id) {
            setMessage({content: "Công việc này không tồn tại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        axios.delete(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/delete-prominent-work/${prominentWorkInfo.id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Xóa công việc làm việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            fetchProfile(token || "")
            setTimeout(() => {
                setOpen(false)
                window.scrollTo({top: 0, behavior: "smooth"});
            }, 500)
        }).catch(() => {
        }).finally(() => {
        })
        setIsLoadingDeleteProcess(false);
    }

    const handleUpdateProminentWork = () => {
        setIsLoading(true);
        if (!validateBeforeUpdating()) {
            setIsLoading(false);
            return;
        }
        const from = new Date(Number(prominentWorkInfo?.fromYear), Number(prominentWorkInfo?.fromMonth), 1);
        let to: Date = new Date();
        if (!prominentWorkInfo.isCurrent) to = new Date(Number(prominentWorkInfo?.toYear), Number(prominentWorkInfo?.toMonth), 1);
        // console.log(newWorkExperience);
        axios.put(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/update-prominent-work/${prominentWorkInfo?.id}`, {
            name: prominentWorkInfo.name,
            description: prominentWorkInfo.description,
            from: from.toISOString(),
            to: !prominentWorkInfo.isCurrent ? to?.toISOString() : "",
            wage: Number(prominentWorkInfo.wage)
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Lưu công việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            fetchProfile(token || "")
            setTimeout(() => {
                setOpen(false)
                window.scrollTo({top: 0, behavior: "smooth"});
            }, 500)
        }).catch(() => {
            // console.error(error)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const validateBeforeUpdating = () => {
        if (!prominentWorkInfo.name || prominentWorkInfo.name.trim() === "") {
            setMessage({content: "Vui lòng nhập lĩnh vực.", type: "error"})
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
        // if(prominentWorkInfo.isCurrent && prominentWorkInfo.to) {
        //     prominentWorkInfo.toYear =  (new Date(prominentWorkInfo.to || "")).getFullYear().toString()
        //     prominentWorkInfo.toMonth =  (new Date(prominentWorkInfo.to || "")).getMonth().toString()
        // }
        if (Number(prominentWorkInfo.wage) <= 0) {
            setMessage({content: "Chi phí/Hoa hồng phải lớn hơn 0.", type: "error"})
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

    const validateBeforeCreating = (): boolean => {
        if (!prominentWorkInfo.name) {
            setMessage({content: "Vui lòng nhập lĩnh vực.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!prominentWorkInfo.description) {
            setMessage({content: "Vui lòng nhập mô tả.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
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
        if (Number(prominentWorkInfo.wage) <= 0) {
            setMessage({content: "Chi phí/Hoa hồng phải lớn hơn 0.", type: "error"})
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

    return (
        <div
            className="space-y-4 pb-4 px-3">
            <h3 className="responsive-text-20 font-semibold">{prominentWork ? "Chỉnh sửa" : "Thêm"} “Công việc nổi
                bật”</h3>

            <div
                className={`space-y-4 pb-4`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Achievement Title Field */}
                    <div className="space-y-2">
                        <Label htmlFor="achievement" className="responsive-text-16">Thành
                            tựu</Label>
                        <Input
                            id="achievement"
                            placeholder=""
                            value={prominentWorkInfo.name}
                            className="responsive-text-16 h-11"
                            onChange={(e) => {
                                setProminentWorkInfo((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tip" className="responsive-text-16">Chi phí/ Hoa
                            hồng</Label>
                        <Input
                            id="tip"
                            placeholder=""
                            type="number"
                            step="100000"
                            value={prominentWorkInfo.wage}
                            // value={Number(prominentWorkInfo.wage).toLocaleString("vi-VN")}
                            className="responsive-text-16 h-11"
                            onChange={(e) => {
                                setProminentWorkInfo((prev) => ({
                                    ...prev,
                                    wage: +e.target.value
                                }))
                            }}
                        />
                    </div>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="responsive-text-16">Mô tả</Label>
                    <CustomTextarea
                        id="description"
                        placeholder=""
                        value={prominentWorkInfo.description}
                        className="min-h-[100px] resize-none responsive-text-16"
                        onChange={(value) => {
                            setProminentWorkInfo((prev) => ({
                                ...prev,
                                description: value
                            }))
                        }}
                    />

                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Tháng bắt đầu</div>
                        <CustomSelect items={months} className="bg-white h-11 w-full"
                                      ulClassname="bg-gray-100"
                                      currentLabel={prominentWorkInfo.from ? FormatHelper.formatMonth((new Date(prominentWorkInfo.from || "")).getMonth()) : undefined}
                                      onSelect={(value) => {
                                          setProminentWorkInfo((prev) => ({
                                              ...prev, fromMonth: value
                                          }))
                                      }}
                        />
                    </div>

                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Năm bắt đầu</div>
                        <CustomSelect items={years}
                                      className="bg-white h-11 w-full responsive-text-16"
                                      ulClassname="bg-gray-100"
                                      currentLabel={prominentWorkInfo.from ? (new Date(prominentWorkInfo.from || "")).getFullYear().toString() : undefined}
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
                                      disabled={prominentWorkInfo.isCurrent}
                                      ulClassname="bg-gray-100"
                                      currentLabel={prominentWorkInfo.to ? FormatHelper.formatMonth((new Date(prominentWorkInfo.to || "")).getMonth()) : undefined}
                                      onSelect={(value) => {
                                          setProminentWorkInfo((prev) => ({
                                              ...prev, toMonth: value
                                          }))
                                      }}/>
                    </div>

                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Năm kết thúc</div>
                        <CustomSelect items={years}
                                      className={`h-11 w-full bg-white`} disabled={prominentWorkInfo.isCurrent}
                                      ulClassname="bg-gray-100"
                                      currentLabel={prominentWorkInfo.to ? (new Date(prominentWorkInfo.to || "")).getFullYear().toString() : undefined}
                                      onSelect={(value) => {
                                          setProminentWorkInfo((prev) => ({
                                              ...prev, toYear: value
                                          }))
                                      }}/>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id={`isCurrent`}
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
            </div>
            <div className="flex justify-end mt-6 gap-4">
                {!prominentWork &&
                    <Button variant="dark" disabled={isLoading} onClick={handleCreateProminentWork}>{isLoading &&
                        <CustomSpinner size="sm"/>} Thêm lĩnh vực</Button>}
                {prominentWork &&
                    <Button variant="dark" disabled={isLoading || isLoadingDeleteProcess}
                            onClick={handleUpdateProminentWork}>{isLoading &&
                        <CustomSpinner size="sm"/>} Lưu</Button>}
                {prominentWork &&
                    <Button variant="danger" disabled={isLoading || isLoadingDeleteProcess}
                            onClick={handleDeleteProminentWork}>{isLoadingDeleteProcess &&
                        <CustomSpinner size="sm"/>} Xóa</Button>}
            </div>
        </div>
    )
}