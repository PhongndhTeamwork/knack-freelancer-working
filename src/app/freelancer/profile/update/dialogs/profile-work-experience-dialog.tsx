import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {CustomSelect} from "@/components/custom/custom-select";
import months from "@/lib/json/month.json";
import years from "@/lib/json/year.json";
import {Checkbox} from "@/components/ui/checkbox";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {ProfileWorkExperienceForm} from "@/lib/types/basic-profile.type";
import axios from "axios";
import useAuthStore from "@/lib/store/user.modal";
import {MessagePayloadForm} from "@/lib/types/error.type";
import useProfileStore from "@/lib/store/profile.modal";
import {ValidateHelper} from "@/lib/helpers/validate.helper";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import {FormatHelper} from "@/lib/helpers/format.helper";

type Props = {
    experience?: ProfileWorkExperienceForm;
    setIsOpen: (value: boolean) => void;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const ProfileWorkExperienceDialog = ({
                                                experience,
                                                setIsOpen,
                                                setMessage,
                                                setTriggerNotice,
                                                triggerNotice
                                            }: Props) => {
    const [experienceInfo, setExperienceInfo] = useState<ProfileWorkExperienceForm>({});
    const {token} = useAuthStore();
    const {fetchProfile} = useProfileStore();
    useEffect(() => {
        if (experience) setExperienceInfo(experience);
    }, [experience]);

    const handleCreateWorkExperience = () => {
        if (!validateBeforeCreating()) return;
        // setIsCloseDialog(true);
        const from = new Date(Number(experienceInfo?.fromYear), Number(experienceInfo?.fromMonth), 1);
        let to: Date = new Date();
        if (!experienceInfo.isCurrent) to = new Date(Number(experienceInfo?.toYear), Number(experienceInfo?.toMonth), 1);
        // console.log(experienceInfo);
        axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/create-work-experience`, {
            name: experienceInfo.name,
            description: experienceInfo.description,
            from: from.toISOString(),
            to: !experienceInfo.isCurrent ? to?.toISOString() : "",
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Tạo kinh nghiệm làm việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            setExperienceInfo({});
            fetchProfile(token || "")
            setTimeout(() => {
                setIsOpen(false)
                window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"}); // Smoothly scroll to top
            }, 500)
        }).catch((error) => {
            console.error(error)
        })
    };

    const validateBeforeCreating = (): boolean => {
        console.log(experienceInfo);
        if (!experienceInfo.name) {
            setMessage({content: "Vui lòng nhập lĩnh vực.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!experienceInfo.description) {
            setMessage({content: "Vui lòng nhập mô tả.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!experienceInfo.fromMonth || !experienceInfo.fromYear) {
            setMessage({content: "Vui lòng chọn tháng và năm bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!experienceInfo.isCurrent && (!experienceInfo.toMonth || !experienceInfo.toYear)) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (experienceInfo.fromMonth && experienceInfo.fromYear && experienceInfo.toMonth && experienceInfo.toYear && !(ValidateHelper.checkStartAndEndTime(+experienceInfo.fromMonth, +experienceInfo.fromYear, +experienceInfo.toMonth, +experienceInfo.toYear))) {
            setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        return true
    }

    const validateBeforeUpdating = () :boolean => {

        if (!experienceInfo.name || experienceInfo.name.trim() === "") {
            setMessage({content: "Vui lòng nhập lĩnh vực.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!experienceInfo.description || experienceInfo.description.trim() === "") {
            setMessage({content: "Vui lòng nhập mô tả.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!experienceInfo.fromYear || +experienceInfo.fromYear < 2010) experienceInfo.fromYear = (new Date(experienceInfo.from || "")).getFullYear().toString()
        if (!experienceInfo.fromMonth) experienceInfo.fromMonth = (new Date(experienceInfo.from || "")).getMonth().toString()
        if (!experienceInfo.isCurrent && (!experienceInfo.toYear || !experienceInfo.toMonth) && !experienceInfo.to) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!experienceInfo.isCurrent && (!experienceInfo.toYear || !experienceInfo.toMonth) && experienceInfo.to) {
            experienceInfo.toYear = (new Date(experienceInfo.to || "")).getFullYear().toString()
            experienceInfo.toMonth = (new Date(experienceInfo.to || "")).getMonth().toString()
        }
        // if(work.isCurrent && work.to) {
        //     work.toYear =  (new Date(work.to || "")).getFullYear().toString()
        //     work.toMonth =  (new Date(work.to || "")).getMonth().toString()
        // }
        if (experienceInfo.fromMonth && experienceInfo.fromYear && experienceInfo.toMonth && experienceInfo.toYear && !(ValidateHelper.checkStartAndEndTime(+experienceInfo.fromMonth, +experienceInfo.fromYear, +experienceInfo.toMonth, +experienceInfo.toYear))) {
            setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        return true
    }


    const handleDeleteWorkExperience = () => {
        if (!token) {
            setMessage({content: "Vui lòng đăng nhập lại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        if (!experienceInfo.id) {
            setMessage({content: "Kinh nghiệm này không tồn tại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        axios.delete(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/delete-work-experience/${experienceInfo.id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Xóa kinh nghiệm làm việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            fetchProfile(token || "")
            setTimeout(() => {
                setIsOpen(false)
                window.scrollTo({top: 0, behavior: "smooth"}); // Smoothly scroll to top
            }, 500)
        }).catch(() => {
        })
    }

    const handleUpdateWorkExperience = () => {
        if (!validateBeforeUpdating()) return;
        const from = new Date(Number(experienceInfo?.fromYear), Number(experienceInfo?.fromMonth), 1);
        let to: Date = new Date();
        if (!experienceInfo.isCurrent) to = new Date(Number(experienceInfo?.toYear), Number(experienceInfo?.toMonth), 1);
        console.log(from);
        // console.log(newWorkExperience);
        axios.put(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/update-work-experience/${experienceInfo?.id}`, {
            name: experienceInfo.name,
            description: experienceInfo.description,
            from: from.toISOString(),
            to: !experienceInfo.isCurrent ? to?.toISOString() : "",
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Lưu kinh nghiệm làm việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            fetchProfile(token || "")
            setTimeout(() => {
                setIsOpen(false)
                window.scrollTo({top: 0, behavior: "smooth"}); // Smoothly scroll to top
            }, 500)
        }).catch(() => {
            // console.error(error)
        })
    }


    return (
        <div
            className="space-y-4 pb-4 px-3">
            <h3 className="responsive-text-20 font-semibold">{experience ? "Chỉnh sửa" : "Thêm"} “Kinh nghiệm làm
                việc”</h3>
            <div className="gap-6">
                {/* Position Field */}
                <div className="space-y-2">
                    <Label htmlFor="position" className="responsive-text-16">Lĩnh vực</Label>
                    <Input
                        id="position"
                        className="h-11 responsive-text-16"
                        value={experienceInfo.name}
                        onChange={(e) => {
                            setExperienceInfo((prev) => ({
                                ...prev, name: e.target.value
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
                    value={experienceInfo.description}
                    className="min-h-[100px] resize-none responsive-text-16"
                    onChange={(value) => {
                        setExperienceInfo((prev) => ({
                            ...prev, description: value
                        }))
                    }}
                />
            </div>


            <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col w-full responsive-text-16 space-y-2">
                    <div className="responsive-text-16">Tháng bắt đầu</div>
                    <CustomSelect items={months} className="bg-white h-11 w-full" ulClassname="bg-gray-100"
                                  onSelect={(value) => {
                                      setExperienceInfo((prev) => ({
                                          ...prev, fromMonth: value
                                      }))
                                  }}
                                  currentLabel={experienceInfo.from ? FormatHelper.formatMonth((new Date(experienceInfo.from || "")).getMonth()) : undefined}/>
                </div>

                <div className="flex flex-col w-full responsive-text-16 space-y-2">
                    <div className="responsive-text-16">Năm bắt đầu</div>
                    <CustomSelect items={years}
                                  className="bg-white h-11 w-full responsive-text-16" ulClassname="bg-gray-100"
                                  currentLabel={experienceInfo.from ? (new Date(experienceInfo.from || "")).getFullYear().toString() : undefined}
                                  onSelect={(value) => {
                                      setExperienceInfo((prev) => ({
                                          ...prev, fromYear: value
                                      }))
                                  }}/>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col w-full responsive-text-16 space-y-2">
                    <div className="responsive-text-16">Tháng kết thúc</div>
                    <CustomSelect items={months} className={`h-11 w-full bg-white`}
                                  disabled={experienceInfo.isCurrent}
                                  currentLabel={experienceInfo.to ? FormatHelper.formatMonth((new Date(experienceInfo.to || "")).getMonth()) : undefined}
                    ulClassname="bg-gray-100" onSelect={(value) => {
                        setExperienceInfo((prev) => ({
                            ...prev, toMonth: value

                        }))

                    }}
                    />
                </div>

                <div className="flex flex-col w-full responsive-text-16 space-y-2">
                    <div className="responsive-text-16">Năm kết thúc</div>
                    <CustomSelect items={years}
                                  className={`h-11 w-full bg-white`}
                                  currentLabel={experienceInfo.to ? (new Date(experienceInfo.to || "")).getFullYear().toString() : undefined}
                                  ulClassname="bg-gray-100"
                                  disabled={experienceInfo.isCurrent}
                                  onSelect={(value) => {
                                      setExperienceInfo((prev) => ({
                                          ...prev, toYear: value
                                      }))
                                  }}/>
                </div>
            </div>
            <div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`isCurrent`}
                              checked={experienceInfo.isCurrent}
                              onClick={() => {
                                  setExperienceInfo((prev) => ({
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
            <div className="flex justify-end mt-6 gap-4">
                {!experience && <Button variant="dark" onClick={handleCreateWorkExperience}>Thêm lĩnh vực</Button>}
                {experience && <Button variant="dark" onClick={handleUpdateWorkExperience}>Lưu</Button>}
                {experience && <Button variant="danger" onClick={handleDeleteWorkExperience}>Xóa</Button>}
            </div>
        </div>
    )
}