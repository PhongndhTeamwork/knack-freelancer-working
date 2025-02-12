import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import useProfileStore from "@/lib/store/profile.modal";
import {CustomSelect} from "@/components/custom/custom-select";
import months from '@/lib/json/month.json';
import years from '@/lib/json/year.json';
import {Checkbox} from "@/components/ui/checkbox";

export const WorkExperience = () => {
    const {draftProfile, setProfileUpdate, resetDraftProfile} = useProfileStore();

    // useEffect(() => {
    //     if (draftProfile.profileWorkExperiences.length === 0) {
    //         setProfileUpdate((prev) => {
    //             return {
    //                 ...prev,
    //                 profileWorkExperiences: [...prev.profileWorkExperiences, {name: "", description: ""}],
    //             }
    //         })
    //     }
    // }, [draftProfile.profileWorkExperiences, setProfileUpdate]);

    const handleAddWorkExperience = () => {
        setProfileUpdate((prev) => {
            return {
                ...prev,
                profileWorkExperiences: [...prev.profileWorkExperiences, {name: "", description: ""}],
            }
        })
    }

    const handleRemoveWorkExperience = (index : number) => {
        setProfileUpdate((prev) => {
            return {
                ...prev,
                profileWorkExperiences: prev.profileWorkExperiences.filter((_, i) => i !== index),
            }
        })
    }


    return (
        <>
            <Card className="w-full mx-auto">
                <CardContent className="p-6">
                    <form className="space-y-6">
                        {
                            draftProfile.profileWorkExperiences.map((pwe, index) => {
                                return <div key={index}
                                            className={`space-y-4 pb-4 ${index > 0 && "border-t border-black pt-8"}`}>
                                    <div className="gap-6">
                                        {/* Position Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="position" className="responsive-text-16">Lĩnh vực</Label>
                                            <Input
                                                id="position"
                                                className="h-11 responsive-text-16"
                                                value={pwe.name}
                                                onChange={(e) => {
                                                    setProfileUpdate((prev) => ({
                                                        ...prev, profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
                                                            i === index
                                                                ? {...pwe, name: e.target.value}
                                                                : pwe
                                                        )
                                                    }))
                                                }}
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
                                            onChange={(e) => {
                                                setProfileUpdate((prev) => ({
                                                    ...prev, profileWorkExperiences: prev.profileWorkExperiences.map((pwe, i) =>
                                                        i === index
                                                            ? {...pwe, description: e.target.value}
                                                            : pwe
                                                    )
                                                }))
                                            }}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <div className="responsive-text-16">Tháng bắt đầu</div>
                                            <CustomSelect items={months} className="bg-white h-11 w-full"/>
                                        </div>

                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <div className="responsive-text-16">Năm bắt đầu</div>
                                            <CustomSelect items={years}
                                                          className="bg-white h-11 w-full responsive-text-16"/>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <div className="responsive-text-16">Tháng kết thúc</div>
                                            <CustomSelect items={months} className="bg-white h-11 w-full"/>
                                        </div>

                                        <div className="flex flex-col w-full responsive-text-16 space-y-2">
                                            <div className="responsive-text-16">Năm kết thúc</div>
                                            <CustomSelect items={years}
                                                          className="bg-white h-11 w-full responsive-text-16"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="terms"/>
                                            <label
                                                htmlFor="terms"
                                                className="responsive-text-16 font-medium relative top-[1px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Hiện tại tôi vẫn đang làm công việc này
                                            </label>
                                        </div>
                                    </div>

                                    {(draftProfile.profileWorkExperiences.length > 1 || index !== 0) &&
                                        <div className="flex justify-end">
                                            <Button variant="danger-outline" type="button" size="sm" onClick={() => {
                                                handleRemoveWorkExperience(index)
                                        }}> Xóa lĩnh vực </Button>
                                    </div>}
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
                <Button variant="dark-outline" size="sm" onClick={resetDraftProfile}>Hủy</Button>
            </div>
        </>

    )
}

