"use client"

import {ChevronDown, Trash2} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {CustomSelect} from "@/components/custom/custom-select";
import months from "@/lib/json/month.json";
import years from "@/lib/json/year.json";
import {Checkbox} from "@/components/ui/checkbox";
import * as React from "react";
import {CustomTextarea} from "@/components/custom/custom-textarea";


export const FooterUpdateDialog = () => {
    const [projects, setProjects] = useState([
        { isOpen: true },
        { isOpen: false },
    ])


    return (
        <div className="bg-white px-3">
            <h3 className="responsive-text-20 font-semibold">Chỉnh sửa “Dự án nổi bật”</h3>
            <div className="space-y-6 py-4 mt-6">
                {projects.map((project, index) => (
                    <Collapsible
                        key={index}
                        open={project.isOpen}
                        onOpenChange={(open: never) =>
                            setProjects(projects.map((p, i) => (i === index ? {...p, isOpen: open} : p)))

                        }
                        className="border rounded-lg"
                    >
                        <CollapsibleTrigger
                            className="flex items-center justify-between w-full p-4 hover:bg-muted/50 rounded-lg">
                            <span className="responsive-text-20">Dự án {index +1}</span>
                            <div className="flex items-center gap-2">
                                <ChevronDown className="h-4 w-4"/>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents Collapsible from toggling
                                        setProjects(projects.filter((p, i) => i !== index)); // Remove project
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 pt-0 space-y-4 text-[#545454]">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="responsive-text-16">Tên dự án</Label>
                                    <Input placeholder="responsive-text-16 h-11"/>
                                </div>
                                <div className="space-y-2">
                                    <Label className="responsive-text-16">Mô tả về dự án</Label>
                                    <CustomTextarea placeholder="" className="responsive-text-16 "/>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="responsive-text-16">Vai trò</Label>
                                        <Input placeholder="" className="responsive-text-16 h-11"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="responsive-text-16">Công ty</Label>
                                        <Input placeholder="" className="responsive-text-16 h-11"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="responsive-text-16">Chi tiết dự án</Label>
                                        <Input placeholder="" className="responsive-text-16 h-11"/>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                        <div className="responsive-text-16">Tháng bắt đầu</div>
                                        <CustomSelect items={months} className="bg-white h-11 w-full"
                                                      ulClassname="bg-gray-100"/>
                                    </div>

                                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                        <div className="responsive-text-16">Năm bắt đầu</div>
                                        <CustomSelect items={years}
                                                      className="bg-white h-11 w-full responsive-text-16"
                                                      ulClassname="bg-gray-100"/>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                        <div className="responsive-text-16">Tháng kết thúc</div>
                                        <CustomSelect items={months} className={`h-11 w-full bg-white`}
                                            // disabled={pwe.isCurrent}
                                                      ulClassname="bg-gray-100"/>
                                    </div>

                                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                        <div className="responsive-text-16">Năm kết thúc</div>
                                        <CustomSelect items={years}
                                                      className={`h-11 w-full bg-white`}
                                            // disabled={pwe.isCurrent}
                                                      ulClassname="bg-gray-100"/>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id={`isCurrent-${1}`}/>
                                        <label
                                            htmlFor="terms"
                                            className="responsive-text-16 font-medium relative top-[1px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Hiện tại tôi vẫn đang làm công việc này
                                        </label>
                                    </div>
                                </div>

                                {/*<div className="space-y-2">*/}
                                {/*    <Label className="responsive-text-16">Ảnh dự án</Label>*/}
                                {/*    <FileUploader/>*/}

                                {/*</div>*/}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>

            <div className="flex justify-end mt-6 gap-4">
                <Button variant="dark-outline" onClick={() => {
                    setProjects([...projects, {isOpen: false}]);
                }}>Thêm dự án</Button>
                <Button variant="dark">Lưu thay đổi</Button>
            </div>
        </div>


    )
}

