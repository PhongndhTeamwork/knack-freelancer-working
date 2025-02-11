"use client"

import {Phone} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FormEvent, useState} from "react"
import {Card, CardContent} from "@/components/ui/card";
import axios from "axios";
import {useRouter} from "next/navigation";
import {MessagePayloadForm} from "@/lib/types/error.type";
import ToastInitialisation from "@/lib/preprocessors/toast-initialisation";
import {Toaster} from "react-hot-toast";

export const LoginInformation = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();

    const [message, setMessage] = useState<MessagePayloadForm>({content: ""});
    const [triggerNotice, setTriggerNotice] = useState<boolean>(false);

    ToastInitialisation({triggerMessage: triggerNotice, message: message})


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const storedToken = localStorage.getItem("knackToken");
        if (!storedToken) {
            setMessage({content: "Vui lòng đăng nhập để tiếp tục", type: "error"})
            setTriggerNotice(!triggerNotice)
            return;
        }
        if (username.trim() === "" || phone.trim() === "") {
            setMessage({content: "Vui lòng điền đầy đủ thông tin để tiếp tục", type: "error"})
            setTriggerNotice(!triggerNotice)
            return;
        }

        const cleanedPhone = phone.replace(/\s+/g, '');
        if (!/^\d+$/.test(cleanedPhone)) {
            setMessage({ content: "Số điện thoại chỉ được chứa số", type: "error" });
            setTriggerNotice(!triggerNotice);
            return;
        }
        if (cleanedPhone.length !== 10) {
            setMessage({ content: "Số điện thoại phải bao gồm 10 số", type: "error" });
            setTriggerNotice(!triggerNotice);
            return;
        }

        axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/auth/complete-signup-info`, {
            username: username,
            phone: phone
        }, {
            headers: {
                Authorization: "Bearer " + storedToken
            }
        }).then(() => {
            setMessage({content: "Đăng ký thành công!", type: "success"})
            setTriggerNotice(!triggerNotice)
            setTimeout(() => {
                router.push("/freelancer/home")
            }, 1000)
        }).catch(() => {
            setMessage({content: "Lỗi server", type: "error"})
            setTriggerNotice(!triggerNotice)
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
            <Toaster position="bottom-left"/>
            <Card className="w-full max-w-md border-none shadow-none">
                <CardContent className="space-y-6 mt-8">
                    {/* Login Form */}
                    <div className="space-y-4">
                        <h2 className="text-4xl font-semibold">Đăng nhập</h2>
                        <p className="text-sm text-muted-foreground">
                            Đăng nhập tài khoản của bạn để tiếp tục
                        </p>
                    </div>

                    <div className="w-full max-w-md mx-auto p-4">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="font-medium">
                                    Họ và tên
                                </Label>
                                <Input id="name" placeholder="Họ và tên" value={username} onChange={(e) => {
                                    setUsername(e.target.value)
                                }} className="h-12 px-4 rounded-lg"/>
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">
                                    Số điện thoại
                                </Label>
                                <div className="relative">
                                    <Input id="phone" value={phone} onChange={(e) => {
                                        setPhone(e.target.value)
                                    }} type="tel" className="h-12 px-4 pr-4 rounded-lg"
                                           placeholder="Số điện thoại"/>
                                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"/>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="dark"
                                className="w-full mt-4"
                            >
                                Hoàn tất
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

