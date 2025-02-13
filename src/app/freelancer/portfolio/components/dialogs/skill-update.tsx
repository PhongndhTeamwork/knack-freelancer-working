"use client"

import {Trash2} from "lucide-react"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {useState} from "react";
import * as React from "react";


export const SkillUpdateDialog = () => {
    const [skills, setSkills] = useState([
        {name: ""},
        {name: ""},
    ])


    return (
        <div className="bg-white px-3">
            <h3 className="responsive-text-20 font-semibold">Chỉnh sửa “Kỹ năng”</h3>
            <div className="space-y-6 py-4 mt-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="responsive-text-16">Mô tả</Label>
                        <Textarea placeholder="" className="responsive-text-16 h-11"/>
                    </div>
                    <div className="space-y-2">
                        <Label className="responsive-text-16">Kỹ năng</Label>
                        <div className="grid md:grid-cols-4 gap-4">
                            {
                                skills.map((skill, index) => (
                                    <div key={index} className="space-y-2 col-span-1 relative">
                                        <Input placeholder="" className="responsive-text-16 h-11 mx-2" value={skill.name}/>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            style={{marginTop : 0}}
                                            className="shrink-0 w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full absolute right-1 top-1/2 -translate-y-1/2"
                                            onClick={() => {
                                                setSkills(skills.filter((_, i) => i !== index)); // Remove project
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                </div>

                <div className="flex justify-end mt-6 gap-4">
                    <Button variant="dark-outline" onClick={() => {
                        setSkills([...skills, {name: ""}]);
                    }}>Thêm kỹ năng</Button>
                    <Button variant="dark">Lưu thay đổi</Button>
                </div>
            </div>
        </div>

    )
}

