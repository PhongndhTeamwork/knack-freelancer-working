"use client"

import {ChevronDown, Trash2} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import stars from "@/lib/json/star.json";
import { FileUploader} from "@/components/constitution/file-uploader";
import * as React from "react";
import {CustomSelect} from "@/components/custom/custom-select";
import {CustomTextarea} from "@/components/custom/custom-textarea";



export const FeedbackUpdateDialog = () => {
    const [feedbacks, setFeedbacks] = useState([
        { isOpen: true },
        { isOpen: false },
    ])


    return (
        <div className="bg-white px-3">
            <h3 className="responsive-text-20 font-semibold">Chỉnh sửa “Dự án nổi bật”</h3>
            <div className="space-y-6 py-4 mt-6">
                {feedbacks.map((feedback, index) => (
                    <Collapsible
                        key={index}
                        open={feedback.isOpen}
                        onOpenChange={(open: never) =>
                            setFeedbacks(feedbacks.map((p, i) => (i === index ? {...p, isOpen: open} : p)))
                        }
                        className="border rounded-lg"
                    >
                        <CollapsibleTrigger
                            className="flex items-center justify-between w-full p-4 hover:bg-muted/50 rounded-lg">
                            <span className="responsive-text-20">Feedback {index + 1}</span>
                            <div className="flex items-center gap-2">
                                <ChevronDown className="h-4 w-4"/>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents Collapsible from toggling
                                        setFeedbacks(feedbacks.filter((p, i) => i !== index)); // Remove project
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 pt-0 space-y-4 text-[#545454]">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="responsive-text-16">Số sao nhận được</Label>
                                    <CustomSelect items={stars}
                                                  className="bg-white h-11 w-full responsive-text-16"
                                                  ulClassname="bg-gray-100"/>
                                </div>
                                <div className="space-y-2">
                                    <Label className="responsive-text-16">Lời nhận xét</Label>
                                    <CustomTextarea placeholder="" className="responsive-text-16"/>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="responsive-text-16">Tên khách hàng</Label>
                                        <Input placeholder="" className="responsive-text-16 h-11"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="responsive-text-16">Công ty</Label>
                                        <Input placeholder="" className="responsive-text-16 h-11"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="responsive-text-16">Chức danh tại công ty</Label>
                                        <Input placeholder="" className="responsive-text-16 h-11"/>
                                    </div>
                                </div>


                                <div className="space-y-2">
                                    <Label className="responsive-text-16">Ảnh của khách hàng</Label>
                                    <FileUploader/>

                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>

            <div className="flex justify-end mt-6 gap-4">
                <Button variant="dark-outline" onClick={() => {
                    setFeedbacks([...feedbacks, {isOpen: false}]);
                }}>Thêm dự án</Button>
                <Button variant="dark">Lưu thay đổi</Button>
            </div>
        </div>


    )
}

