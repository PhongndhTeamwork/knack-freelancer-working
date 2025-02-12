import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import useProfileStore from "@/lib/store/profile.modal";
import {useEffect} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {CustomSelect} from "@/components/custom/custom-select";


export const WorkExperience = () => {
    const {profile, setProfileUpdate} = useProfileStore();
    useEffect(() => {
        if (profile.profileWorkExperiences.length === 0) {
            setProfileUpdate((prev) => {
                return {
                    ...prev,
                    profileWorkExperiences: [...prev.profileWorkExperiences, {name: "", description: ""}],
                }
            })
        }
    }, [profile, setProfileUpdate]);

    const handleAddWorkExperience = () => {
        setProfileUpdate((prev) => {
            return {
                ...prev,
                profileWorkExperiences: [...prev.profileWorkExperiences, {name: "", description: ""}],
            }
        })
    }


    return (
        <>
            <Card className="w-full mx-auto">
                <CardContent className="p-6">
                    <form className="space-y-6">
                        {
                            profile.profileWorkExperiences.map((pwe, index) => {
                                return <div key={index} className={`space-y-4 pb-4 ${index > 0 && "border-t border-black pt-8"}`}>
                                    <div className="gap-6">
                                        {/* Position Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="position" className="responsive-text-16">Lĩnh vực</Label>
                                            <Input
                                                id="position"
                                                className="h-11 responsive-text-16"
                                            />
                                        </div>
                                        {/* Work Period Field */}
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
                                        <Textarea
                                            id="description"
                                            placeholder=""
                                            className="min-h-[100px] resize-none responsive-text-16"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-2">
                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <label htmlFor="cars">Tháng bắt đầu</label>
                                            <select id="cars" name="cars" className="w-full h-11 border shadow cursor-pointer rounded-md">
                                                <option value="volvo">Volvo</option>
                                                <option value="bmw">BMW</option>
                                                <option value="mercedes">Mercedes</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                        {/*<div>*/}
                                        {/*    <label htmlFor="cars">Năm bắt đầu</label>*/}
                                        {/*    <select id="cars" name="cars">*/}
                                        {/*        <option value="volvo">Volvo</option>*/}
                                        {/*        <option value="bmw">BMW</option>*/}
                                        {/*        <option value="mercedes">Mercedes</option>*/}
                                        {/*        <option value="audi">Audi</option>*/}
                                        {/*    </select>*/}
                                        {/*</div>*/}
                                        <CustomSelect items={[]} className="bg-white w-11"/>
                                    </div>
                                </div>
                            })
                        }

                        {/* Add Job Button */}
                        <Button
                            type="button"
                            variant="dark-outline"
                            size="sm"
                            onClick={handleAddWorkExperience}
                        >
                            Thêm công việc
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <div className="flex justify-end gap-4 mt-6">
                <Button variant="dark" size="sm">Lưu thay đổi</Button>
                <Button variant="dark-outline" size="sm">Hủy</Button>
            </div>
        </>

    )
}

