"use client"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
// import {FileUploader} from "@/components/constitution/file-uploader";
import * as React from "react";
import {CustomTextarea} from "@/components/custom/custom-textarea";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {MessagePayloadForm} from "@/lib/types/error.type";
import {PortfolioAboutSectionForm} from "@/lib/types/portfolio.type";
import {FileUploader} from "@/components/constitution/file-uploader";
import {ImageForm} from "@/lib/types/image.type";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import axios from "axios";
import useAuthStore from "@/lib/store/user.modal";
import {CustomSpinner} from "@/components/custom/custom-spinner";

type Props = {
    setOpen: (value: boolean) => void;
    setMessage: Dispatch<SetStateAction<MessagePayloadForm>>;
    setTriggerNotice: Dispatch<SetStateAction<boolean>>;
    triggerNotice: boolean;
}

export const AboutMeDialog = ({setOpen, setMessage, setTriggerNotice, triggerNotice}: Props) => {
    const [newImages, setNewImages] = useState<(File | ImageForm)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [aboutSectionInfo ,setAboutSectionInfo] = useState<PortfolioAboutSectionForm>({});
    const {currentPortfolio,fetchCurrentPortfolio} = usePortfolioStore();
    const {token} = useAuthStore();

    useEffect(() => {
        if (currentPortfolio) {
            setAboutSectionInfo({
                avatar : currentPortfolio.avatar,
                detail : currentPortfolio.detail,
                overview : currentPortfolio.overview,
            });
        }
    }, [currentPortfolio]);

    useEffect(() => {
        const image : ImageForm  = {id : 0, image : currentPortfolio.avatar || ""};
        if(currentPortfolio.avatar) setNewImages([image])
    }, [currentPortfolio.avatar]);

    const handleSave = () => {
        setIsLoading(true);
        if (!token) return;
        if (!currentPortfolio.id) return;
        const form = new FormData();

        console.log(newImages);

        let avatarField;
        if(newImages.length === 0) avatarField =  new File([""], "empty.png", { type: "image/png" })
        if (newImages.length === 1) {
            if (newImages[0] instanceof File) avatarField = newImages[0];
            else avatarField = "";
        }
        form.append("avatar", avatarField || "");
        form.append("overview", aboutSectionInfo.overview || "");
        form.append("detail",  aboutSectionInfo?.detail?.replace(/\n+/g, "####") || "");

        form.forEach((key, value) => {
            console.log(key, value);
        })

        axios.put(
            `${process.env.NEXT_PUBLIC_PREFIX_API}/portfolio/update-portfolio/${currentPortfolio.id}`, form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token
                }
            }
        ).then(() => {
            setMessage({content: "Chỉnh sửa portfolio thành công", type: "success"});
            setTriggerNotice(!triggerNotice);
            fetchCurrentPortfolio(token || "", currentPortfolio.id);
            setOpen(false);
        }).catch(err => {
            setMessage({content: "Something went wrong", type: "error"});
            setTriggerNotice(!triggerNotice);
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="bg-white px-3 pb-6">
            <h3 className="responsive-text-20 font-semibold">Chỉnh sửa “Về tôi”</h3>
            <div className="space-y-6 py-4 mt-6">

                <div className="space-y-4">
                    {/*<div className="space-y-2">*/}
                    {/*    <Label className="responsive-text-16">Ảnh đại diện</Label>*/}
                    {/*    <FileUploader/>*/}

                    {/*</div>*/}
                    <div className="space-y-2">
                        <Label className="responsive-text-16">Ảnh đại diện</Label>
                        <FileUploader files={newImages} setFiles={setNewImages} mode="single"/>
                    </div>

                    <div className="space-y-2">
                        <Label className="responsive-text-16">Mô tả chung</Label>
                        <Input value={aboutSectionInfo.overview}  onChange={(e) => {
                            setAboutSectionInfo((prev) => ( {...prev, overview : e.target.value}))
                        }}  placeholder="" className="responsive-text-16"/>
                    </div>
                    <div className="space-y-2">
                        <Label className="responsive-text-16">Mô tả chi tiết</Label>
                        <CustomTextarea value={aboutSectionInfo.detail}  onChange={(value) => {
                            setAboutSectionInfo((prev) => ( {...prev, detail : value}))
                        }} placeholder="" className="responsive-text-16 "/>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
                <Button variant="dark" disabled={isLoading} onClick={handleSave} >{isLoading && <CustomSpinner size="sm"/>} Lưu thay đổi</Button>
            </div>
        </div>


    )
}

