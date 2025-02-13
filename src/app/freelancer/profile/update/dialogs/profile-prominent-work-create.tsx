import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {CustomSelect} from "@/components/custom/custom-select";
import months from "@/lib/json/month.json";
import years from "@/lib/json/year.json";
import {Checkbox} from "@/components/ui/checkbox";
import {useState} from "react";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {ProfileProminentWork} from "@/lib/types/basic-profile.type";
import axios from "axios";
import useAuthStore from "@/lib/store/user.modal";
import {MessagePayloadForm} from "@/lib/types/error.type";
import ToastInitialisation from "@/lib/preprocessors/toast-initialisation";
import useProfileStore from "@/lib/store/profile.modal";
import {ValidateHelper} from "@/lib/helpers/validate.helper";


export const ProfileProminentWorkCreateDialog = () => {
    const [isCurrent, setIsCurrent] = useState<boolean>(false);
    const [newProminentWork,setNewProminentWork] = useState<ProfileProminentWork>({});
    const {token} = useAuthStore();
    const {fetchProfile} = useProfileStore();
    const [message, setMessage] = useState<MessagePayloadForm>({content: ""});
    const [triggerNotice, setTriggerNotice] = useState<boolean>(false);

    ToastInitialisation({triggerMessage : triggerNotice, message : message})

    const handleSubmit = () => {
        if(!validateBeforeAdding()) return;
        // setIsCloseDialog(true);
        const from = new Date(Number(newProminentWork?.fromYear) , Number(newProminentWork?.fromMonth),1);
        let to : Date = new Date();
        if(!isCurrent) to = new Date(Number(newProminentWork?.toYear) , Number(newProminentWork?.toMonth),1);
        // console.log(newWorkExperience);
        axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/user/create-prominent-work`,{
            name :newProminentWork.name,
            description :newProminentWork.description,
            from : from.toISOString(),
            to : !isCurrent ? to?.toISOString() : "",
            wage : Number(newProminentWork.wage)
        },{
            headers : {
                Authorization : "Bearer " + token
            }
        }).then(() => {
            setMessage({content : "Tạo công việc thành công!", type : "success"})
            setTriggerNotice(!triggerNotice)
            setNewProminentWork({
            });
            fetchProfile(token || "")
        }).catch((error) => {
            console.error(error)
        })
    };

    const validateBeforeAdding = () : boolean => {
        if (!newProminentWork.name) {
            setMessage({content : "Vui lòng nhập lĩnh vực.", type : "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if (!newProminentWork.description) {
            setMessage({content : "Vui lòng nhập mô tả.", type : "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if(!newProminentWork.fromMonth || !newProminentWork.fromYear) {
            setMessage({content : "Vui lòng chọn tháng và năm bắt đầu.", type : "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if(!isCurrent && (!newProminentWork.toMonth || !newProminentWork.toYear)) {
            setMessage({content : "Vui lòng chọn tháng và năm kết thúc.", type : "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if(Number(newProminentWork.wage) <= 0) {
            setMessage({content : "Chi phí/Hoa hồng phải lớn hơn 0.", type : "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        if(newProminentWork.fromMonth &&newProminentWork.fromYear &&newProminentWork.toMonth &&newProminentWork.toYear && !(ValidateHelper.checkStartAndEndTime(+newProminentWork.fromMonth, +newProminentWork.fromYear, +newProminentWork.toMonth, +newProminentWork.toYear ))){
            setMessage({content : "Thời gian kết thúc phải sau thời gian bắt đầu.", type : "error"})
            setTriggerNotice(!triggerNotice)
            return false
        }
        return true
    }



    return (
        <div
            className="space-y-4 pb-4 px-3">
            <h3 className="responsive-text-20 font-semibold">Thêm “Công việc nổi bật”</h3>

            <div
                 className={`space-y-4 pb-4`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Achievement Title Field */}
                    <div className="space-y-2">
                        <Label htmlFor="achievement" className="responsive-text-16">Thành
                            tựu</Label>
                        <Input
                            id="achievement"
                            placeholder=""
                            value={newProminentWork.name}
                            className="responsive-text-16 h-11"
                            onChange={(e) => {
                                setNewProminentWork((prev) => ({
                                    ...prev,
                                    name : e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tip" className="responsive-text-16">Chi phí/ Hoa
                            hồng</Label>
                        <Input
                            id="tip"
                            placeholder=""
                            type="number"
                            value={newProminentWork.wage}
                            className="responsive-text-16 h-11"
                            onChange={(e) => {
                                setNewProminentWork((prev) => ({
                                    ...prev,
                                    wage : +e.target.value
                                }))
                            }}
                        />
                    </div>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="responsive-text-16">Mô tả</Label>
                    <Textarea
                        id="description"
                        placeholder=""
                        value={newProminentWork.description}
                        className="min-h-[100px] resize-none responsive-text-16"
                        onChange={(e) => {
                            setNewProminentWork((prev) => ({
                                ...prev,
                                description : e.target.value
                            }))
                        }}
                    />

                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Tháng bắt đầu</div>
                        <CustomSelect items={months} className="bg-white h-11 w-full"
                                      ulClassname="bg-gray-100"
                                      onSelect={(value) => {
                                          setNewProminentWork((prev) => ({
                                              ...prev, fromMonth: value
                                          }))
                                      }}
                        />
                    </div>

                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Năm bắt đầu</div>
                        <CustomSelect items={years}
                                      className="bg-white h-11 w-full responsive-text-16"
                                      ulClassname="bg-gray-100"
                                      onSelect={(value) => {
                                          setNewProminentWork((prev) => ({
                                              ...prev, fromYear: value
                                          }))
                                      }}/>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Tháng kết thúc</div>
                        <CustomSelect items={months} className={`h-11 w-full bg-white`}
                                      disabled={isCurrent}
                                      ulClassname="bg-gray-100"
                                      onSelect={(value) => {
                                          setNewProminentWork((prev) => ({
                                              ...prev, toMonth: value
                                          }))
                                      }}/>
                    </div>

                    <div className="flex flex-col w-full responsive-text-16 space-y-2">
                        <div className="responsive-text-16">Năm kết thúc</div>
                        <CustomSelect items={years}
                                      className={`h-11 w-full bg-white`} disabled={isCurrent}
                                      ulClassname="bg-gray-100"
                                      onSelect={(value) => {
                                          setNewProminentWork((prev) => ({
                                              ...prev, toYear: value
                                          }))
                                      }}/>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id={`isCurrent`}
                                  onClick={() => {
                                      setIsCurrent(!isCurrent)
                                  }}/>
                        <label
                            htmlFor="terms"
                            className="responsive-text-16 font-medium relative top-[1px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Hiện tại tôi vẫn đang làm công việc này
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-6 gap-4">
                <Button variant="dark" onClick={handleSubmit}>Thêm công việc</Button>
            </div>
        </div>
    )
}