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
    ProfileProminentWorkDialog,
} from "@/app/freelancer/profile/update/dialogs/profile-prominent-work-dialog";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {FormatHelper} from "@/lib/helpers/format.helper";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import {CirclePlus, Pencil} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";

interface Props {
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}


export const ProminentWork = ({setMessage, setTriggerNotice, triggerNotice}: Props) => {
    const {draftProfile, setProfileUpdate, profile} = useProfileStore();
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean[]>([]);


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

    const handleControlUpdateDialog = (index: number, value: boolean) => {
        const updatedState: boolean[] = [...openUpdate];
        updatedState[index] = value;
        setOpenUpdate(updatedState);
    }


    return (
        <>
            <Card className="w-full mx-auto">
                <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h4 className="mb-0 responsive-text-28 font-semibold">Kinh nghiệm làm việc</h4>

                        <Dialog onOpenChange={setOpenCreate} open={openCreate}>
                            <DialogTrigger asChild>
                                <Button
                                    type="button"
                                    variant="dark-outline"
                                    size="sm"
                                >
                                    <CirclePlus/>
                                    Thêm công việc
                                </Button>
                            </DialogTrigger>
                            <DialogContent
                                className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                <ScrollArea className="h-full px-4">
                                    <ProfileProminentWorkDialog setOpen={setOpenCreate}
                                                                setMessage={setMessage}
                                                                triggerNotice={triggerNotice}
                                                                setTriggerNotice={setTriggerNotice}
                                                                prominentWork={undefined}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
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
                                                readOnly={true}
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
                                            <Label htmlFor="tip" className="responsive-text-16">Chi phí/ Hoa hồng</Label>
                                            <Input
                                                id="tip"
                                                value={Number(pwe.wage).toLocaleString("vi-VN")}
                                                placeholder=""
                                                type="number"
                                                readOnly={true}
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
                                            readOnly={true}
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
                                                          readOnly={true}
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
                                                          readOnly={true}
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
                                                readOnly={true}
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
                                                          readOnly={true}
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
                                                      disabled={true}
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

                                    <Dialog onOpenChange={(value) => handleControlUpdateDialog(index, value)}
                                            open={openUpdate[index]}>
                                        <DialogTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="primary-outline"
                                                size="sm"
                                            >
                                                <Pencil/>
                                                Chỉnh sửa
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent
                                            className="bg-white max-w-screen-xl w-full overflow-hidden h-5/6">
                                            <ScrollArea className="h-full px-4">
                                                <ProfileProminentWorkDialog
                                                    setOpen={(value) => handleControlUpdateDialog(index, value)}
                                                    setMessage={setMessage}
                                                    triggerNotice={triggerNotice}
                                                    setTriggerNotice={setTriggerNotice}
                                                    prominentWork={pwe}/>
                                            </ScrollArea>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            })
                        }


                    </div>
                </CardContent>
            </Card>
        </>

    )
}

