"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {Eye, EyeOff} from 'lucide-react'
import Link from "next/link"
import {FormEvent, useState} from "react"
import {Illustration} from "@/components/custom/illustration";
// import axios from "axios";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [layout, setLayout] = useState(1);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
    }

    // useEffect( () => {
    //     const fetchData = async () => {
    //         if (isSignedIn && user) {
    //             // console.log({
    //             //     clerkUserId: user.id,
    //             //     username: user.fullName || user.username,
    //             //     email: user.emailAddresses[0]?.emailAddress,
    //             //     imageUrl: user.imageUrl
    //             // });
    //             try {
    //                 await axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/api/auth/login`, {
    //                     clerkUserId: user.id,
    //                     username: user.fullName || user.username,
    //                     email: user.emailAddresses[0]?.emailAddress,
    //                     imageSrc: user.imageUrl
    //                 }).then(({data}) => {
    //                     console.log(data);
    //                 });
    //
    //             } catch (error) {
    //                 console.error('Error during login:', error);
    //             }
    //         }
    //     };
    //     fetchData().then(() => {
    //     });
    //
    // }, [isSignedIn, user, router]);

    return (
        <>
            {/*<div*/}
            {/*    className="w-screen h-screen absolute top-0 left-0 z-20 bg-white bg-opacity-40 flex justify-center items-center">*/}
            {/*    <div*/}
            {/*        className="w-40 h-40 border-8 border-gray-600 border-solid rounded-full border-t-transparent animate-spin"></div>*/}
            {/*</div>*/}
            <div className="min-h-screen w-full flex px-4">
                {/* Left Side - Login Form */}
                <Link href="/home" className="h-[130px] w-[47px] absolute left-8 top-8">
                    <Illustration width={130} height={47} url="/logo/logo-black.svg"/>
                </Link>
                <div className="flex-1 overflow-hidden">
                    <div
                        className={`flex transition-transform duration-500 ease-in-out ${
                            layout === 1 ? 'translate-x-0' : '-translate-x-1/2'
                        }`}
                        style={{width: "100vw"}}
                    >
                        <div className="w-1/2 min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
                            {/*<Link href="/home" className="h-[130px] w-[47px] absolute left-0 top-0">*/}
                            {/*    <Illustration width={130} height={47} url="/logo/logo-black.svg"/>*/}
                            {/*</Link>*/}
                            <Card className="w-full max-w-md border-none shadow-none">
                                <CardContent className="space-y-6 mt-8">
                                    {/* Login Form */}
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-semibold">Đăng nhập</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Lựa chọn vai trò của bạn để tiêp tục
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div
                                            className="border border-black max-w-xl rounded-xl p-4 text-xl flex justify-between items-center hover:text-white hover:bg-black cursor-pointer group"
                                            onClick={() => {
                                                setLayout(2);
                                            }}>
                                            Freelancer
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 200 100"
                                                width="30"
                                                height="15"
                                                fill="none"
                                                stroke="black"
                                                stroke-width="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="group-hover:stroke-white transition-colors duration-300 group-hover:w-[40px] group-hover:h-[20px]"
                                            >
                                                <line x1="10" y1="50" x2="150" y2="50"/>
                                                <polyline points="120,20 150,50 120,80"/>
                                            </svg>
                                        </div>
                                        <div
                                            className="border border-black max-w-xl rounded-xl p-4 text-xl flex justify-between items-center transition-colors duration-300 hover:text-white hover:bg-black cursor-pointer group"
                                            onClick={() => {
                                                setLayout(2);
                                            }}>
                                            Doanh nghiệp
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 200 100"
                                                width="30"
                                                height="15"
                                                fill="none"
                                                stroke="black"
                                                stroke-width="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="group-hover:stroke-white transition-colors duration-300 group-hover:w-[40px] group-hover:h-[20px]"
                                            >
                                                <line x1="10" y1="50" x2="150" y2="50"/>
                                                <polyline points="120,20 150,50 120,80"/>
                                            </svg>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="w-1/2 min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
                            {/*<Link href="/home" className="h-[130px] w-[47px] absolute left-0 top-0">*/}
                            {/*    <Illustration width={130} height={47} url="/logo/logo-black.svg"/>*/}
                            {/*</Link>*/}
                            <Card className="w-full max-w-md border-none shadow-none">
                                <CardContent className="space-y-6 mt-8">
                                    {/* Login Form */}
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-semibold">Đăng nhập</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Đăng nhập tài khoản của bạn để tiếp tục
                                        </p>
                                    </div>

                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <div className="space-y-2">
                                            <Input
                                                // type="email"
                                                placeholder="Email"
                                                // defaultValue="jonas_kahnwald@gmail.com"
                                                className="h-[40px]"
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }}

                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Mật khẩu"
                                                    className="h-[40px]"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {!showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-muted-foreground"/>
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-muted-foreground"/>
                                                    )}
                                                    <span className="sr-only">
                                          {showPassword ? "Hide password" : "Show password"}
                                        </span>
                                                </Button>
                                            </div>
                                        </div>

                                        {/*<div className="flex items-center space-x-2">*/}
                                        {/*    <Checkbox id="remember"/>*/}
                                        {/*    <label*/}
                                        {/*        htmlFor="remember"*/}
                                        {/*        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
                                        {/*    >*/}
                                        {/*        Nhớ tài khoản của tôi*/}
                                        {/*    </label>*/}
                                        {/*</div>*/}

                                        <Button variant="dark" className="w-full" size="sm">
                                            Đăng nhập
                                        </Button>

                                        <div className="relative mt-3">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t"/>
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                  <span className="bg-background px-2 text-muted-foreground">
                                    or
                                  </span>
                                            </div>
                                        </div>

                                        <div className="text-center text-sm">
                                <span className="text-muted-foreground">
                                  Bạn chưa có tài khoản?{" "}
                                </span>
                                            <Link
                                                href="/auth/signup"
                                                className="font-semibold hover:underline"
                                            >
                                                Đăng kí ngay
                                            </Link>
                                        </div>
                                        <div
                                            className="border border-black max-w-xl rounded-xl p-4 text-xl flex justify-between items-center hover:text-white hover:bg-black cursor-pointer group"
                                            onClick={() => {
                                                setLayout(1);
                                            }}>
                                            Lựa chọn lại vai trò của bạn
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 200 100"
                                                width="30"
                                                height="15"
                                                fill="none"
                                                stroke="black"
                                                stroke-width="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="group-hover:stroke-white transition-colors duration-300 group-hover:w-[40px] group-hover:h-[20px]"
                                            >
                                                <line x1="50" y1="50" x2="190" y2="50"/>
                                                <polyline points="80,20 50,50 80,80"/>
                                            </svg>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </div>
                {/* Right Side - Image */}
                <div className="hidden lg:flex lg:flex-1 relative py-4">
                    <Illustration className="flex flex-1 rounded-xl" url="/auth/auth2.svg"/>
                </div>
            </div>
        </>

    )
}