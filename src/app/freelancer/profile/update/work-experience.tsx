import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import useProfileStore from "@/lib/store/profile.modal";
import {CustomSelect} from "@/components/custom/custom-select";
import months from '@/lib/json/month.json';
import years from '@/lib/json/year.json';
import {Checkbox} from "@/components/ui/checkbox";
import {ScrollArea} from "@/components/ui/scroll-area";
import * as React from "react";
import {
    ProfileWorkExperienceDialog
} from "@/app/freelancer/profile/update/dialogs/profile-work-experience-dialog";
import {FormatHelper} from "@/lib/helpers/format.helper";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import {CirclePlus, Pencil} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";

interface Props {
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const WorkExperience = ({setMessage, setTriggerNotice, triggerNotice}: Props) => {
    const {draftProfile, setProfileUpdate, profile} = useProfileStore();
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean[]>([]);

    const updateIsCurrentStatus = useCallback(() => {
        setProfileUpdate((prev) => ({
            ...prev, profileWorkExperiences: prev.profileWorkExperiences.map((pwe) =>
                !pwe.to ? {...pwe, isCurrent: true} : pwe
            )
        }))

    }, [setProfileUpdate])

    useEffect(() => {
        updateIsCurrentStatus()
    }, [updateIsCurrentStatus, profile]);

    useEffect(() => {
        setOpenUpdate(new Array(draftProfile.profileWorkExperiences?.length).fill(false))
    }, [draftProfile.profileWorkExperiences.length]);


    const handleControlUpdateDialog = (index: number, value: boolean) => {
        const updatedState: boolean[] = [...openUpdate];
        updatedState[index] = value;
        setOpenUpdate(updatedState);
    }

    return (
        <>
            <Card className="w-full mx-auto">
                <CardContent className="p-6 space-y-6 ">
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
                                    Thêm lĩnh vực
                                </Button>
                            </DialogTrigger>
                            <DialogContent
                                className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                <ScrollArea className="max-h-[80vh] px-4">
                                    <ProfileWorkExperienceDialog setOpen={setOpenCreate}
                                                                 setMessage={setMessage}
                                                                 triggerNotice={triggerNotice}
                                                                 setTriggerNotice={setTriggerNotice}
                                                                 experience={undefined}/>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="space-y-6">
                        {
                            draftProfile.profileWorkExperiences.map((pwe, index) => {
                                return <div key={index}
                                            className={`space-y-4 pb-4 ${index > 0 && "border-t border-black pt-8"}`}
                                >
                                    <div className="gap-6">
                                        {/* Position Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="position"  className="responsive-text-16">Lĩnh vực</Label>
                                            <Input
                                                id="position"
                                                readOnly={true}
                                                className="h-11 responsive-text-16"
                                                value={pwe.name}
                                                onChange={(e) => {
                                                    setProfileUpdate((prev) => ({
                                                        ...prev,
                                                        profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
                                                            i === index
                                                                ? {...pwe, name: e.target.value}
                                                                : pwe
                                                        )
                                                    }))
                                                }}
                                            />
                                        </div>
                                        {/* ProminentWork Period Field */}
                                        {/*<div className="space-y-2">*/}
                                        {/*    <Label htmlFor="period" className="responsive-text-16">Thời gian làm*/}
                                        {/*        việc</Label>*/}
                                        {/*    <Input*/}
                                        {/*        id="period"*/}
                                        {/*        placeholder=""*/}
                                        {/*        className="h-11 responsive-text-16"*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                    </div>

                                    {/* Description Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="responsive-text-16">Mô tả</Label>
                                        <CustomTextarea
                                            id="description"
                                            placeholder=""
                                            readOnly={true}
                                            value={pwe.description}
                                            className="min-h-[100px] resize-none responsive-text-16"
                                            onChange={(value) => {
                                                setProfileUpdate((prev) => ({
                                                    ...prev,
                                                    profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
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
                                                          readOnly={true}
                                                          ulClassname="bg-gray-100"
                                                          currentLabel={FormatHelper.formatMonth((new Date(pwe.from || "")).getMonth())}
                                                          onSelect={(value) => {
                                                              setProfileUpdate((prev) => ({
                                                                  ...prev,
                                                                  profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
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
                                                          readOnly={true}
                                                          currentLabel={(new Date(pwe.from || "")).getFullYear().toString()}
                                                          onSelect={(value) => {
                                                              setProfileUpdate((prev) => ({
                                                                  ...prev,
                                                                  profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
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
                                                readOnly={true}
                                                onSelect={(value) => {
                                                    setProfileUpdate((prev) => ({
                                                        ...prev,
                                                        profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
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
                                                          readOnly={true}
                                                          onSelect={(value) => {

                                                              setProfileUpdate((prev) => ({
                                                                  ...prev,
                                                                  profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
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
                                                              profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
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
                                            className="bg-white max-w-screen-xl w-[95%] overflow-hidden max-h-[85vh] h-auto">
                                            <ScrollArea className="max-h-[80vh] px-4">
                                                <ProfileWorkExperienceDialog
                                                    setOpen={(value) => handleControlUpdateDialog(index, value)}
                                                    setMessage={setMessage}
                                                    triggerNotice={triggerNotice}
                                                    setTriggerNotice={setTriggerNotice}
                                                    experience={pwe}/>
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

