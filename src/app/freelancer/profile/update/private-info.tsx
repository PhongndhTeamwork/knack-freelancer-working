"use client"

import {ChangeEvent, useState} from "react"
import {Upload} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image"
import {Separator} from "@/components/ui/separator";

export const PrivateInfo = () => {
    const [avatar, setAvatar] = useState<string | null>(null)

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
                <div className="flex flex-col gap-8">
                    {/* Basic Information */}
                    <div className="flex gap-6">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="fullName">Họ và tên &nbsp;
                                <span className="text-red-700">*</span></Label>
                            <Input id="fullName"/>
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="location">Nơi sinh sống</Label>
                            <Input id="location"/>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="email">Email của bạn</Label>
                            <Input id="email" type="email"/>
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input id="phone" type="tel"/>
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="occupation">Nghề nghiệp</Label>
                            <Input id="occupation"/>
                        </div>
                    </div>

                    <Separator/>

                    <div className="flex gap-6">
                        {/* Social Media Links */}
                        <div className="space-y-2 w-full">
                            <Label htmlFor="facebook">Liên kết Facebook</Label>
                            <Input id="facebook" placeholder="URL Facebook của bạn"/>
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="instagram">Liên kết Instagram</Label>
                            <Input id="instagram" placeholder="URL Instagram của bạn"/>
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="youtube">Liên kết Youtube</Label>
                            <Input id="youtube" placeholder="URL Youtube của bạn"/>
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="tiktok">Liên kết TikTok</Label>
                            <Input id="tiktok" placeholder="URL TikTok của bạn"/>
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

