import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import useProfileStore from "@/lib/store/profile.modal";
import {CustomSelect} from "@/components/custom/custom-select";
import months from '@/lib/json/month.json';
import years from '@/lib/json/year.json';

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
        console.log(draftProfile.profileWorkExperiences)
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

                                    {(draftProfile.profileWorkExperiences.length > 1 || index!==0) &&  <div className="flex justify-end">
                                        <Button variant="danger-outline" size="sm" onClick={() => {
                                            handleRemoveWorkExperience(index)
                                        }}> Xóa Lĩnh Vực </Button>
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

