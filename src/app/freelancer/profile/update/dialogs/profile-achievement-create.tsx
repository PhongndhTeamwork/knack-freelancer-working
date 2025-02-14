import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {CustomSelect} from "@/components/custom/custom-select";
import months from "@/lib/json/month.json";
import years from "@/lib/json/year.json";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {useState} from "react";
import {ProfileWorkExperienceForm} from "@/lib/types/basic-profile.type";
import useAuthStore from "@/lib/store/user.modal";
import useProfileStore from "@/lib/store/profile.modal";
import {MessagePayloadForm} from "@/lib/types/error.type";
import ToastInitialisation from "@/lib/preprocessors/toast-initialisation";
import axios from "axios";
import {ValidateHelper} from "@/lib/helpers/validate.helper";
import {CustomTextarea} from "@/components/custom/custom-textarea";

type Props = {
    setIsOpen: (value : boolean) => void
}

export const ProfileAchievementCreateDialog = ({setIsOpen} : Props) => {
    const [isCurrent, setIsCurrent] = useState<boolean>(false);
    const [newAchievement, setNewAchievement] = useState<ProfileWorkExperienceForm>({});
    const {token} = useAuthStore();
    const {fetchProfile} = useProfileStore();
    const [message, setMessage] = useState<MessagePayloadForm>({content: ""});
    const [triggerNotice, setTriggerNotice] = useState<boolean>(false);

    ToastInitialisation({triggerMessage: triggerNotice, message: message})

    const handleSubmit = () => {
        if (!validateBeforeAdding()) return;
        // setIsCloseDialog(true);
        const from = new Date(Number(newAchievement?.fromYear), Number(newAchievement?.fromMonth), 1);
        let to: Date = new Date();
        if (!isCurrent) to = new Date(Number(newAchievement?.toYear), Number(newAchievement?.toMonth), 1);
        // console.log(newWorkExperience);
        axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/create-achievement`, {
            name: newAchievement.name,
            description: newAchievement.description,
            from: from.toISOString(),
            to: !isCurrent ? to?.toISOString() : "",
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Tạo thành tựu thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            setNewAchievement({});
            fetchProfile(token || "")
            setTimeout(() => {
                setIsOpen(false)
                window.scrollTo({ top: 0, behavior: "smooth" }); // Smoothly scroll to top
            }, 500)
        }).catch(() => {
            // console.error(error)
        })
    };

    const validateBeforeAdding = (): boolean => {
        if (!newAchievement.name) {
            setMessage({content: "Vui lòng nhập thành tựu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!newAchievement.description) {
            setMessage({content: "Vui lòng nhập mô tả.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!newAchievement.fromMonth || !newAchievement.fromYear) {
            setMessage({content: "Vui lòng chọn tháng và năm bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!isCurrent && (!newAchievement.toMonth || !newAchievement.toYear)) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (newAchievement.fromMonth && newAchievement.fromYear && newAchievement.toMonth && newAchievement.toYear && !(ValidateHelper.checkStartAndEndTime(+newAchievement.fromMonth, +newAchievement.fromYear, +newAchievement.toMonth, +newAchievement.toYear))) {
            setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        return true
    }

    return (
        <div
            className="space-y-4 pb-4 px-3">
            <h3 className="responsive-text-20 font-semibold">Thêm “Thành tựu”</h3>

            <div
                className={`space-y-4 pb-4`}>
                <div className="">
                    <div className="space-y-2">
                        <Label htmlFor="achievement" className="responsive-text-16">Công việc/dự
                            án</Label>
                        <Input
                            id="achievement"
                            placeholder=""
                            className="responsive-text-16 h-11"
                            onChange={(e) => {
                                setNewAchievement((prev) => ({
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
                        className="min-h-[100px] resize-none responsive-text-16"
                        value={newAchievement.description}
                        onChange={(value) => {
                            setNewAchievement((prev) => ({
                                ...prev, description: value
                            }))
                        }}
                    />

                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Tháng bắt đầu</div>
                        <CustomSelect items={months} className="bg-white h-11 w-full"
                                      ulClassname="bg-gray-100"
                                      onSelect={(value) => {
                                          setNewAchievement((prev) => ({
                                              ...prev, fromMonth: value
                                          }))
                                      }}/>
                    </div>

                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Năm bắt đầu</div>
                        <CustomSelect items={years}
                                      className="bg-white h-11 w-full responsive-text-16"
                                      ulClassname="bg-gray-100"
                                      onSelect={(value) => {
                                          setNewAchievement((prev) => ({
                                              ...prev, fromYear: value
                                          }))
                                      }}/>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Tháng kết thúc</div>
                        <CustomSelect items={months} className={`h-11 w-full bg-white`}
                                      disabled={isCurrent}
                                      ulClassname="bg-gray-100"
                                      onSelect={(value) => {
                                          setNewAchievement((prev) => ({
                                              ...prev, toMonth: value
                                          }))
                                      }}
                        />
                    </div>

                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Năm kết thúc</div>
                        <CustomSelect items={years}
                                      className={`h-11 w-full bg-white`} disabled={isCurrent}
                                      ulClassname="bg-gray-100" onSelect={(value) => {
                                        setNewAchievement((prev) => ({
                                            ...prev, toYear: value
                                        }))
                        }}/>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id={`isCurrent`}
                                  onClick={() => {
                                      setIsCurrent(!isCurrent)
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
                    <Button variant="dark" onClick={handleSubmit}>Thêm lĩnh vực</Button>
                </div>
            </div>
        </div>
    )
}