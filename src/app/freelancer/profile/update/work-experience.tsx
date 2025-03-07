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
import {CirclePlus, Trash2} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Illustration} from "@/components/custom/illustration";
import axios from "axios";
import useAuthStore from "@/lib/store/user.modal";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {CustomSpinner} from "@/components/custom/custom-spinner";

interface Props {
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const WorkExperience = ({setMessage, setTriggerNotice, triggerNotice}: Props) => {
    const {draftProfile, setProfileUpdate, profile} = useProfileStore();
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean[]>([]);
    const [isLoadingDeleteProcess, setIsLoadingDeleteProcess] = useState<boolean>(false);
    const {token} = useAuthStore();
    const {fetchProfile} = useProfileStore();

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

    const handleDeleteWorkExperience = (id ?: number) => {
        setIsLoadingDeleteProcess(true);
        if (!token) {
            setMessage({content: "Vui lòng đăng nhập lại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        if (!id) {
            setMessage({content: "Kinh nghiệm này không tồn tại", type: "error"})
            setTriggerNotice(!triggerNotice)
        }
        axios.delete(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/delete-work-experience/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setMessage({content: "Xóa kinh nghiệm làm việc thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            fetchProfile(token || "")
            // setTimeout(() => {
            //     window.scrollTo({top: 0, behavior: "smooth"}); // Smoothly scroll to top
            // }, 500)
        }).catch(() => {
            setMessage({content: "Something went wrong", type: "error"})
            setTriggerNotice(!triggerNotice)
        }).finally(() => {
            setIsLoadingDeleteProcess(false);
        })
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
                                    Thêm kinh nghiệm
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

                    {draftProfile.profileWorkExperiences?.length >0 && <div className="space-y-6">
                        {
                            draftProfile.profileWorkExperiences.map((pwe, index) => {
                                return <div key={index}
                                            className={`space-y-4 pb-4 ${index > 0 && "border-t border-black pt-8"}`}
                                >
                                    <header
                                        className="flex items-center justify-between bg-[#333333] text-white px-4 py-2 rounded-md">
                                        <h2 className="responsive-text-16font-medium">Công việc {index +1}</h2>
                                        <div className="flex items-center gap-2">
                                            <Dialog onOpenChange={(value) => handleControlUpdateDialog(index, value)}
                                                    open={openUpdate[index]}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full"
                                                    >
                                                        <Illustration className="w-5 h-5 object-cover"
                                                                      url="/freelancer/portfolio/PencilLineBlack.svg"/>
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
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <Button variant="danger" size="icon" className="h-8 w-8 rounded-full">

                                                        {!isLoadingDeleteProcess ? <Trash2 className="h-5 w-5"/> : <CustomSpinner size="sm"/>}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Hành động nãy sẽ xóa kinh nghiệm của bạn khỏi profile
                                                            này.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => {
                                                            handleDeleteWorkExperience(pwe?.id)
                                                        }}>Xóa</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </header>
                                    <div className="gap-6">
                                        {/* Position Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="position" className="responsive-text-16">Lĩnh vực</Label>
                                            <Input
                                                id="position"
                                                readOnly={true}
                                                className="h-11 responsive-text-16"
                                                value={pwe.name}
                                            />
                                        </div>
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
                                </div>
                            })
                        }
                    </div>}

                </CardContent>
            </Card>
        </>

    )
}

