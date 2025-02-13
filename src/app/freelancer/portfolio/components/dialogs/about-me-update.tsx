"use client"


import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {FileUploader} from "@/components/constitution/file-uploader";
import * as React from "react";


export const AboutMeUpdateDialog = () => {


    return (
        <div className="bg-white px-3">
            <h3 className="responsive-text-20 font-semibold">Chỉnh sửa “Dự án nổi bật”</h3>
            <div className="space-y-6 py-4 mt-6">

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="responsive-text-16">Ảnh đại diện</Label>
                        <FileUploader/>

                    </div>

                    <div className="space-y-2">
                        <Label className="responsive-text-16">Mô tả chung</Label>
                        <Input placeholder="" className="responsive-text-16"/>
                    </div>
                    <div className="space-y-2">
                        <Label className="responsive-text-16">Mô tả chi tiết</Label>
                        <Textarea placeholder="" className="responsive-text-16 "/>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
                <Button variant="dark">Lưu thay đổi</Button>
            </div>
        </div>


    )
}

