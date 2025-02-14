"use client"

import {ChangeEvent, Dispatch, SetStateAction, useState} from "react"
import {Upload} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image"
import {Separator} from "@/components/ui/separator";
import useProfileStore from "@/lib/store/profile.modal";
import useAuthStore from "@/lib/store/user.modal";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {CustomTextarea} from "@/components/custom/custom-textarea";

interface Props {
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}


export const PrivateInfo = ({setMessage, setTriggerNotice, triggerNotice}: Props) => {
    const {draftProfile, setProfileUpdate, updateProfile, resetDraftProfile, fetchProfile} = useProfileStore();
    const {token} = useAuthStore();
    const [avatarImage, setAvatarImage] = useState<string>("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileUpdate((prev) => {
                    return {...prev, avatar: file}
                })
                setAvatarImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }

    }

    const handleSubmit = async () => {
        const result = await updateProfile(token || "");
        if (result) {
            fetchProfile(token || "");
            setMessage({content: "Cập nhật thông tin cá nhân thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
        } else {
            setMessage({content: "Cập nhật thông tin cá nhân thất bại", type: "error"});
            setTriggerNotice(!triggerNotice);
        }
    }

    return (
        <> <Card className="w-full mx-auto p-6">
            <form className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-24 h-24">
                        <label
                            htmlFor="avatar"
                            className="block w-full h-full rounded-full border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer"
                        >
                            {draftProfile?.avatar != null ? (
                                <Image
                                    src={avatarImage !== "" ? avatarImage : draftProfile?.avatar?.toString() || ""}
                                    alt="Profile"
                                    fill
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <Upload className="w-6 h-6 text-gray-400"/>
                                </div>
                            )}
                            <input
                                id="avatar"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                        Click to upload or drag and drop<br/>
                        SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                </div>

                {/* Form Grid */}
                <div className="flex flex-col gap-6">
                    {/* Basic Information */}
                    <div className="flex gap-6">
                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="fullName" className="responsive-text-16">Họ và tên &nbsp;
                                <span className="text-red-700">*</span></Label>
                            <Input id="fullName" className="h-11" value={draftProfile?.name} onChange={(e) => {
                                setProfileUpdate((prev) => {
                                    return {...prev, name: e.target.value}
                                })
                            }}/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="location" className="responsive-text-16">Nơi sinh sống</Label>
                            <Input id="location" className="h-11" value={draftProfile.address} onChange={(e) => {
                                setProfileUpdate((prev) => {
                                    return {...prev, address: e.target.value}
                                })
                            }}/>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="email" className="responsive-text-16">Email của bạn</Label>
                            <Input id="email" type="email" className="h-11" value={draftProfile.email} readOnly={true}/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="phone" className="responsive-text-16">Số điện thoại</Label>
                            <Input id="phone" type="tel" className="h-11" value={draftProfile.phone} onChange={(e) => {
                                setProfileUpdate((prev) => {
                                    return {...prev, phone: e.target.value}
                                })
                            }}/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="occupation" className="responsive-text-16">Nghề nghiệp</Label>
                            <Input id="occupation" className="h-11" value={draftProfile.occupation} onChange={(e) => {
                                setProfileUpdate((prev) => {
                                    return {...prev, occupation: e.target.value}
                                })
                            }}/>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="phone" className="responsive-text-16">Tiểu sử</Label>
                            <CustomTextarea
                                id="bio"
                                placeholder=""
                                className="min-h-[80px] responsive-text-16 max-h-[120px]"
                                value={draftProfile.biography}
                                onChange={(value) => {
                                    setProfileUpdate((prev) => {
                                        return {...prev, biography: value}
                                    })
                                }}
                            />
                        </div>
                    </div>


                    <Separator/>

                    <div className="flex gap-6">
                        {/* Social Media Links */}
                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="facebook" className="responsive-text-16">Liên kết Facebook</Label>
                            <Input id="facebook" placeholder="" className="h-11"
                                   value={draftProfile.facebookLink} onChange={(e) => {
                                setProfileUpdate((prev) => {
                                    return {...prev, facebookLink: e.target.value}
                                })
                            }}/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="instagram" className="responsive-text-16">Liên kết Instagram</Label>
                            <Input id="instagram" placeholder="" className="h-11"
                                   value={draftProfile.instagramLink} onChange={(e) => {
                                setProfileUpdate((prev) => {
                                    return {...prev, instagramLink: e.target.value}
                                })
                            }}/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="youtube" className="responsive-text-16">Liên kết Youtube</Label>
                            <Input id="youtube" placeholder="" className="h-11"
                                   value={draftProfile.youtubeLink} onChange={(e) => {
                                setProfileUpdate((prev) => {
                                    return {...prev, youtubeLink: e.target.value}
                                })
                            }}/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="tiktok" className="responsive-text-16">Liên kết TikTok</Label>
                            <Input id="tiktok" placeholder="" className="h-11"
                                   value={draftProfile.tiktokLink} onChange={(e) => {
                                setProfileUpdate((prev) => {
                                    return {...prev, tiktokLink: e.target.value}
                                })
                            }}/>
                        </div>
                    </div>
                </div>

                {/*<Separator/>*/}

                {/* Add External Link Button */}
                {/*<Button variant="dark" type="button" size="sm">*/}
                {/*    Thêm liên kết ngoài*/}
                {/*</Button>*/}
            </form>
        </Card>
            <div className="flex justify-end gap-4 mt-6">
                <Button variant="dark" size="sm" onClick={handleSubmit}>Lưu thay đổi</Button>
                <Button variant="dark-outline" size="sm" onClick={resetDraftProfile}>Hủy</Button>
            </div>
        </>

    )
}

