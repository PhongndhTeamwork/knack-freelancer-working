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
import {ProfileAchievementForm} from "@/lib/types/basic-profile.type";
import {FormatHelper} from "@/lib/helpers/format.helper";
import {CustomSpinner} from "@/components/custom/custom-spinner";

type Props = {
    setOpen: (value: boolean) => void;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
    achievement?: ProfileAchievementForm
}

export const ProfileAchievementDialog = ({
                                             achievement,
                                             setOpen,
                                             setMessage,
                                             setTriggerNotice,
                                             triggerNotice
                                         }: Props) => {
    const [achievementInfo, setAchievementInfo] = useState<ProfileAchievementForm>({});
    const {token} = useAuthStore();
    const {fetchProfile} = useProfileStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (achievement) setAchievementInfo(achievement);
    }, [achievement]);

    const handleCreateAchievement = () => {
        setIsLoading(true);
        if (!validateBeforeCreating()) {
            setIsLoading(false);
            return;
        }
        // setIsCloseDialog(true);
        const from = new Date(Number(achievementInfo?.fromYear), Number(achievementInfo?.fromMonth), 1);
        let to: Date = new Date();
        if (!achievementInfo.isCurrent) to = new Date(Number(achievementInfo?.toYear), Number(achievementInfo?.toMonth), 1);
        // console.log(newWorkExperience);
        axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/create-achievement`, {
            name: achievementInfo.name,
            description: achievementInfo.description,
            from: from.toISOString(),
            to: !achievementInfo.isCurrent ? to?.toISOString() : "",
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Tạo thành tựu thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            setAchievementInfo({});
            fetchProfile(token || "")
            setTimeout(() => {
                setOpen(false)
                window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
            }, 500)
        }).catch(() => {
            // console.error(error)
            setMessage({content: "Something went wrong", type: "error"})
            setTriggerNotice(!triggerNotice)
        }).finally(() => {
            setIsLoading(false);
        })

    };

    const handleUpdateAchievement = () => {
        setIsLoading(true);
        if (!validateBeforeUpdating()) {
            setIsLoading(false);
            return;
        }
        const from = new Date(Number(achievementInfo?.fromYear), Number(achievementInfo?.fromMonth), 1);
        let to: Date = new Date();
        if (!achievementInfo.isCurrent) to = new Date(Number(achievementInfo?.toYear), Number(achievementInfo?.toMonth), 1);
        // console.log(newWorkExperience);
        axios.put(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/update-achievement/${achievementInfo?.id}`, {
            name: achievementInfo.name,
            description: achievementInfo.description,
            from: from.toISOString(),
            to: !achievementInfo.isCurrent ? to?.toISOString() : "",
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Lưu thành tựu thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            fetchProfile(token || "")
            setTimeout(() => {
                setOpen(false)
                window.scrollTo({top: 0, behavior: "smooth"});
            }, 500)
        }).catch(() => {
            // console.error(error)
            setMessage({content: "Something went wrong", type: "error"})
            setTriggerNotice(!triggerNotice)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const validateBeforeUpdating = () => {
        if (!achievementInfo.name || achievementInfo.name.trim() === "") {
            setMessage({content: "Vui lòng nhập lĩnh vực.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!achievementInfo.description || achievementInfo.description.trim() === "") {
            setMessage({content: "Vui lòng nhập mô tả.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!achievementInfo.fromYear || +achievementInfo.fromYear < 2010) achievementInfo.fromYear = (new Date(achievementInfo.from || "")).getFullYear().toString()
        if (!achievementInfo.fromMonth) achievementInfo.fromMonth = (new Date(achievementInfo.from || "")).getMonth().toString()
        if (!achievementInfo.isCurrent && (!achievementInfo.toYear || !achievementInfo.toMonth) && !achievementInfo.to) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!achievementInfo.isCurrent && (!achievementInfo.toYear || !achievementInfo.toMonth) && achievementInfo.to) {
            achievementInfo.toYear = (new Date(achievementInfo.to || "")).getFullYear().toString()
            achievementInfo.toMonth = (new Date(achievementInfo.to || "")).getMonth().toString()
        }
        // if(achievementInfo.isCurrent && achievementInfo.to) {
        //     achievementInfo.toYear =  (new Date(achievementInfo.to || "")).getFullYear().toString()
        //     achievementInfo.toMonth =  (new Date(achievementInfo.to || "")).getMonth().toString()
        // }

        if (!achievementInfo.isCurrent && achievementInfo.fromMonth && achievementInfo.fromYear && achievementInfo.toMonth && achievementInfo.toYear ) {
            if(!(ValidateHelper.checkStartAndEndTime(+achievementInfo.fromMonth, +achievementInfo.fromYear, +achievementInfo.toMonth, +achievementInfo.toYear))){
                setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
                setTriggerNotice(!triggerNotice)
                return false
            }
            if(!(ValidateHelper.checkDateInThePast(+achievementInfo.fromMonth, +achievementInfo.fromYear, +achievementInfo.toMonth, +achievementInfo.toYear))){
                setMessage({content: "Thời gian được chọn không được vượt quá hiện tại", type: "error"})
                setTriggerNotice(!triggerNotice)
                return false
            }
        }

        return true
    }

    const validateBeforeCreating = (): boolean => {
        if (!achievementInfo.name) {
            setMessage({content: "Vui lòng nhập lĩnh vực.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!achievementInfo.description) {
            setMessage({content: "Vui lòng nhập mô tả.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!achievementInfo.fromMonth || !achievementInfo.fromYear) {
            setMessage({content: "Vui lòng chọn tháng và năm bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!achievementInfo.isCurrent && (!achievementInfo.toMonth || !achievementInfo.toYear)) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!achievementInfo.isCurrent && achievementInfo.fromMonth && achievementInfo.fromYear && achievementInfo.toMonth && achievementInfo.toYear ) {
            if(!(ValidateHelper.checkStartAndEndTime(+achievementInfo.fromMonth, +achievementInfo.fromYear, +achievementInfo.toMonth, +achievementInfo.toYear))){
                setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
                setTriggerNotice(!triggerNotice)
                return false
            }
            if(!(ValidateHelper.checkDateInThePast(+achievementInfo.fromMonth, +achievementInfo.fromYear, +achievementInfo.toMonth, +achievementInfo.toYear))){
                setMessage({content: "Thời gian được chọn không được vượt quá hiện tại", type: "error"})
                setTriggerNotice(!triggerNotice)
                return false
            }
        }
        return true
    }

    return (
        <div
            className="space-y-4 pb-4 px-3">
            <h3 className="responsive-text-20 font-semibold">{achievement ? "Chỉnh sửa" : "Thêm"} “Thành tựu”</h3>

            <div
                className={`space-y-4 pb-4`}>
                <div className="">
                    <div className="space-y-2">
                        <Label htmlFor="achievement" className="responsive-text-16">Thành
                            tựu</Label>
                        <Input
                            id="achievement"
                            placeholder=""
                            value={achievementInfo.name}
                            className="responsive-text-16 h-11"
                            onChange={(e) => {
                                setAchievementInfo((prev) => ({
                                    ...prev,
                                    name: e.target.value
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
                        value={achievementInfo.description}
                        className="min-h-[100px] resize-none responsive-text-16"
                        onChange={(value) => {
                            setAchievementInfo((prev) => ({
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
                                      currentLabel={achievementInfo.from ? FormatHelper.formatMonth((new Date(achievementInfo.from || "")).getMonth()) : undefined}
                                      onSelect={(value) => {
                                          setAchievementInfo((prev) => ({
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
                                      currentLabel={achievementInfo.from ? (new Date(achievementInfo.from || "")).getFullYear().toString() : undefined}
                                      onSelect={(value) => {
                                          setAchievementInfo((prev) => ({
                                              ...prev, fromYear: value
                                          }))
                                      }}/>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Tháng kết thúc</div>
                        <CustomSelect items={months} className={`h-11 w-full bg-white`}
                                      disabled={achievementInfo.isCurrent}
                                      ulClassname="bg-gray-100"
                                      currentLabel={achievementInfo.to ? FormatHelper.formatMonth((new Date(achievementInfo.to || "")).getMonth()) : undefined}
                                      onSelect={(value) => {
                                          setAchievementInfo((prev) => ({
                                              ...prev, toMonth: value
                                          }))
                                      }}/>
                    </div>

                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Năm kết thúc</div>
                        <CustomSelect items={years}
                                      className={`h-11 w-full bg-white`} disabled={achievementInfo.isCurrent}
                                      ulClassname="bg-gray-100"
                                      currentLabel={achievementInfo.to ? (new Date(achievementInfo.to || "")).getFullYear().toString() : undefined}
                                      onSelect={(value) => {
                                          setAchievementInfo((prev) => ({
                                              ...prev, toYear: value
                                          }))
                                      }}/>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id={`isCurrent`}
                                  checked={achievementInfo.isCurrent}
                                  onClick={() => {
                                      setAchievementInfo((prev) => ({
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
                {!achievement &&
                    <Button variant="dark" disabled={isLoading} onClick={handleCreateAchievement}>{isLoading &&
                        <CustomSpinner size="sm"/>} Thêm thành tựu</Button>}
                {achievement &&
                    <Button variant="dark" disabled={isLoading}
                            onClick={handleUpdateAchievement}>{isLoading &&
                        <CustomSpinner size="sm"/>} Lưu</Button>}
                {/*{achievement &&*/}
                {/*    <Button variant="danger" disabled={isLoading || isLoadingDeleteProcess}*/}
                {/*            onClick={handleDeleteAchievement}>{isLoadingDeleteProcess &&*/}
                {/*        <CustomSpinner size="sm"/>} Xóa</Button>}*/}
            </div>
        </div>
    )
}