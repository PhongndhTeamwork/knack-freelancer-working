"use client"

import {ChangeEvent, useState} from "react"
import {Upload} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image"
import {Separator} from "@/components/ui/separator";
import useProfileStore from "@/lib/store/profile.modal";

export const PrivateInfo = () => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const {profile} = useProfileStore();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatar(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Card className="w-full mx-auto p-6">
            <form className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-24 h-24">
                        <label
                            htmlFor="avatar"
                            className="block w-full h-full rounded-full border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer"
                        >
                            {avatar ? (
                                <Image
                                    src={avatar || "/placeholder.svg"}
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
                            <Input id="fullName" className="h-11" value={profile?.name}/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="location" className="responsive-text-16">Nơi sinh sống</Label>
                            <Input id="location" className="h-11"/>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="email" className="responsive-text-16">Email của bạn</Label>
                            <Input id="email" type="email" className="h-11"/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="phone" className="responsive-text-16">Số điện thoại</Label>
                            <Input id="phone" type="tel" className="h-11"/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="occupation" className="responsive-text-16">Nghề nghiệp</Label>
                            <Input id="occupation" className="h-11"/>
                        </div>
                    </div>

                    <Separator/>

                    <div className="flex gap-6">
                        {/* Social Media Links */}
                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="facebook" className="responsive-text-16">Liên kết Facebook</Label>
                            <Input id="facebook" placeholder="URL Facebook của bạn" className="h-11"/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="instagram" className="responsive-text-16">Liên kết Instagram</Label>
                            <Input id="instagram" placeholder="URL Instagram của bạn" className="h-11"/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="youtube" className="responsive-text-16">Liên kết Youtube</Label>
                            <Input id="youtube" placeholder="URL Youtube của bạn" className="h-11"/>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="tiktok" className="responsive-text-16">Liên kết TikTok</Label>
                            <Input id="tiktok" placeholder="URL TikTok của bạn" className="h-11"/>
                        </div>
                    </div>
                </div>

                <Separator/>

                {/* Add External Link Button */}
                <Button variant="dark" type="button" size="sm">
                    Thêm liên kết ngoài
                </Button>
            </form>
        </Card>
    )
}

