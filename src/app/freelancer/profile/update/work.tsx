import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import useProfileStore from "@/lib/store/profile.modal";
import {CustomSelect} from "@/components/custom/custom-select";
import months from "@/lib/json/month.json";
import years from "@/lib/json/year.json";
import {Checkbox} from "@/components/ui/checkbox";
import {ScrollArea} from "@/components/ui/scroll-area";

import * as React from "react";
import {
    ProfileProminentWorkCreateDialog,
} from "@/app/freelancer/profile/update/dialogs/profile-prominent-work-create";
import useAuthStore from "@/lib/store/user.modal";
import {useCallback, useEffect, useState} from "react";
import {MessagePayloadForm} from "@/lib/types/error.type";
import ToastInitialisation from "@/lib/preprocessors/toast-initialisation";
import axios from "axios";
import {ProfileProminentWork} from "@/lib/types/basic-profile.type";
import {ValidateHelper} from "@/lib/helpers/validate.helper";
import {FormatHelper} from "@/lib/helpers/format.helper";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import CustomDialog from "@/components/custom/custom-dialog";

export const Work = () => {
    const {draftProfile, setProfileUpdate, resetDraftProfile, profile} = useProfileStore();
    const {token} = useAuthStore();
    const [message, setMessage] = useState<MessagePayloadForm>({content: ""});
    const [triggerNotice, setTriggerNotice] = useState<boolean>(false);
    const {fetchProfile} = useProfileStore();
    const [isOpen, setIsOpen] = useState(false);



    ToastInitialisation({triggerMessage: triggerNotice, message: message})

    const updateIsCurrentStatus = useCallback(() => {
        setProfileUpdate((prev) => ({
            ...prev, profileProminentWorks: prev.profileProminentWorks.map((pwe) =>
                !pwe.to ? {...pwe, isCurrent: true} : pwe
            )
        }))

    }, [setProfileUpdate])

    useEffect(() => {
        updateIsCurrentStatus()
    }, [updateIsCurrentStatus, profile]);


    const handleDeleteProminentWork = (id ?: number) => {
        if (!token) {
            setMessage({content: "Vui lòng đăng nhập lại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        if (!id) {
            setMessage({content: "Công việc này không tồn tại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        axios.delete(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/delete-prominent-work/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Xóa công việc làm việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            fetchProfile(token || "")
        }).catch(() => {
        })
    }

    const handleUpdateProminentWork = (work: ProfileProminentWork) => {
        if (!validateWorkExperience(work)) return;
        const from = new Date(Number(work?.fromYear), Number(work?.fromMonth), 1);
        let to: Date = new Date();
        if (!work.isCurrent) to = new Date(Number(work?.toYear), Number(work?.toMonth), 1);
        console.log(from);
        // console.log(newWorkExperience);
        axios.put(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/update-prominent-work/${work?.id}`, {
            name: work.name,
            description: work.description,
            from: from.toISOString(),
            to: !work.isCurrent ? to?.toISOString() : "",
            wage: Number(work.wage)
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Lưu công việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            fetchProfile(token || "")
        }).catch(() => {
            // console.error(error)
        })
    }

    const validateWorkExperience = (work: ProfileProminentWork) => {
        if (!work.name || work.name.trim() === "") {
            setMessage({content: "Vui lòng nhập lĩnh vực.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!work.description || work.description.trim() === "") {
            setMessage({content: "Vui lòng nhập mô tả.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!work.fromYear || +work.fromYear < 2010) work.fromYear = (new Date(work.from || "")).getFullYear().toString()
        if (!work.fromMonth) work.fromMonth = (new Date(work.from || "")).getMonth().toString()
        if (!work.isCurrent && (!work.toYear || !work.toMonth) && !work.to) {
            setMessage({content: "Vui lòng chọn tháng và năm kết thúc.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!work.isCurrent && (!work.toYear || !work.toMonth) && work.to) {
            work.toYear = (new Date(work.to || "")).getFullYear().toString()
            work.toMonth = (new Date(work.to || "")).getMonth().toString()
        }
        // if(work.isCurrent && work.to) {
        //     work.toYear =  (new Date(work.to || "")).getFullYear().toString()
        //     work.toMonth =  (new Date(work.to || "")).getMonth().toString()
        // }
        if (Number(work.wage) <= 0) {
            setMessage({content: "Chi phí/Hoa hồng phải lớn hơn 0.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (work.fromMonth && work.fromYear && work.toMonth && work.toYear && !(ValidateHelper.checkStartAndEndTime(+work.fromMonth, +work.fromYear, +work.toMonth, +work.toYear))) {
            setMessage({content: "Thời gian kết thúc phải sau thời gian bắt đầu.", type: "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }


        return true
    }


    return (
        <>
            <Card className="w-full mx-auto">
                <CardContent className="p-6">
                    <div className="space-y-6">
                        {
                            draftProfile.profileProminentWorks.map((pwe, index) => {
                                return <div key={index}
                                            className={`space-y-4 pb-4 ${index > 0 && "border-t border-black pt-8"}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Achievement Title Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="achievement" className="responsive-text-16">Thành
                                                tựu</Label>
                                            <Input
                                                id="achievement"
                                                placeholder=""
                                                value={pwe.name}
                                                className="responsive-text-16 h-11"
                                                onChange={(e) => {
                                                    setProfileUpdate((prev) => ({
                                                        ...prev,
                                                        profileProminentWorks: prev.profileProminentWorks.map((pwe, i) =>
                                                            i === index
                                                                ? {...pwe, name: e.target.value}
                                                                : pwe
                                                        )
                                                    }))
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tip" className="responsive-text-16">Chi phí/ Hoa
                                                hồng</Label>
                                            <Input
                                                id="tip"
                                                value={Number(pwe.wage)}
                                                placeholder=""
                                                type="number"
                                                className="responsive-text-16 h-11"
                                                onChange={(e) => {
                                                    setProfileUpdate((prev) => ({
                                                        ...prev,
                                                        profileProminentWorks: prev.profileProminentWorks.map((pwe, i) =>
                                                            i === index
                                                                ? {...pwe, wage: +e.target.value}
                                                                : pwe
                                                        )
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
                                            value={pwe.description}
                                            className="min-h-[100px] resize-none responsive-text-16"
                                            onChange={(value) => {
                                                setProfileUpdate((prev) => ({
                                                    ...prev,
                                                    profileProminentWorks: prev.profileProminentWorks.map((pwe, i) =>
                                                        i === index
                                                            ? {...pwe, description: value}
                                                            : pwe
                                                    )
                                                }))
                                            }}
                                        />

                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <div className="responsive-text-16">Tháng bắt đầu</div>
                                            <CustomSelect items={months} className="bg-white h-11 w-full"
                                                          ulClassname="bg-gray-100"
                                                          currentLabel={FormatHelper.formatMonth((new Date(pwe.from || "")).getMonth())}
                                                          onSelect={(value) => {
                                                              setProfileUpdate((prev) => ({
                                                                  ...prev,
                                                                  profileProminentWorks: prev.profileProminentWorks.map((pwe, i) =>
                                                                      i === index
                                                                          ? {...pwe, fromMonth: value}
                                                                          : pwe
                                                                  )
                                                              }))
                                                          }}/>
                                        </div>

                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <div className="responsive-text-16">Năm bắt đầu</div>
                                            <CustomSelect items={years}
                                                          className="bg-white h-11 w-full responsive-text-16"
                                                          ulClassname="bg-gray-100"
                                                          currentLabel={(new Date(pwe.from || "")).getFullYear().toString()}
                                                          onSelect={(value) => {
                                                              setProfileUpdate((prev) => ({
                                                                  ...prev,
                                                                  profileProminentWorks: prev.profileProminentWorks.map((pwe, i) =>
                                                                      i === index
                                                                          ? {...pwe, fromYear: value}
                                                                          : pwe
                                                                  )
                                                              }))
                                                          }}/>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <div className="responsive-text-16">Tháng kết thúc</div>
                                            <CustomSelect
                                                currentLabel={pwe.to ? FormatHelper.formatMonth((new Date(pwe.to || "")).getMonth()) : undefined}
                                                items={months} className={`h-11 w-full bg-white`}
                                                disabled={pwe.isCurrent} ulClassname="bg-gray-100"
                                                onSelect={(value) => {
                                                    setProfileUpdate((prev) => ({
                                                        ...prev,
                                                        profileProminentWorks: prev.profileProminentWorks.map((pwe, i) =>
                                                            i === index
                                                                ? {...pwe, toMonth: value}
                                                                : pwe
                                                        )
                                                    }))
                                                }}/>
                                        </div>


                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <div className="responsive-text-16">Năm kết thúc</div>
                                            <CustomSelect items={years}
                                                          currentLabel={pwe.to ? (new Date(pwe.to || "")).getFullYear().toString() : undefined}
                                                          className={`h-11 w-full bg-white`} disabled={pwe.isCurrent}
                                                          ulClassname="bg-gray-100"
                                                          onSelect={(value) => {

                                                              setProfileUpdate((prev) => ({
                                                                  ...prev,
                                                                  profileProminentWorks: prev.profileProminentWorks.map((pwe, i) =>
                                                                      i === index
                                                                          ? {...pwe, toYear: value}
                                                                          : pwe
                                                                  )
                                                              }))
                                                          }}/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id={`isCurrent-${index}`}
                                                      checked={pwe.isCurrent}
                                                      onClick={() => {
                                                          setProfileUpdate((prev) => ({
                                                              ...prev,
                                                              profileProminentWorks: prev.profileProminentWorks.map((pwe, i) =>
                                                                  i === index ? {
                                                                      ...pwe,
                                                                      isCurrent: !pwe.isCurrent
                                                                  } : pwe
                                                              ),
                                                          }));
                                                      }}/>
                                            <label
                                                htmlFor="terms"
                                                className="responsive-text-16 font-medium relative top-[1px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Hiện tại tôi vẫn đang làm công việc này
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Button variant="danger-outline" type="button" size="sm" onClick={() => {
                                            handleDeleteProminentWork(pwe.id)
                                        }}> Xóa công việc </Button>
                                        <Button variant="primary-outline" type="button" size="sm" onClick={() => {
                                            handleUpdateProminentWork(pwe)
                                        }}> Lưu công việc </Button>
                                    </div>
                                </div>
                            })
                        }

                        <div className="">
                            <Button
                                type="button"
                                variant="dark-outline"
                                size="sm"
                                onClick={() => setIsOpen(true)}
                            >
                                Thêm công việc
                            </Button>
                            <CustomDialog className="w-3/4 h-5/6" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                                <div className="py-6 px-4 h-full">
                                    <ScrollArea className="h-full">
                                        <ProfileProminentWorkCreateDialog setIsOpen={setIsOpen}/>
                                    </ScrollArea>
                                </div>
                            </CustomDialog>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end gap-4 mt-6">
                {/*<Button variant="dark" size="sm">Lưu thay đổi</Button>*/}
                <Button variant="dark-outline" size="sm" onClick={resetDraftProfile}>Hủy</Button>
            </div>
        </>

    )
}

