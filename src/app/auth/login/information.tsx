"use client"

import {Phone} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FormEvent, useState} from "react"
import {Card, CardContent} from "@/components/ui/card";
import axios from "axios";
import {useRouter} from "next/navigation";

export const LoginInformation = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const storedToken = localStorage.getItem("knackToken");
        if (!storedToken) {
            return;
        }
        if (username.trim() === "" || phone.trim() === "") {
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
            router.push("/freelancer/home")
        }).catch(() => {
        })

    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
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
                                <Label htmlFor="name" className="text-sm font-medium">
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

