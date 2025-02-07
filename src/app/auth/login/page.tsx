"use client"

import {Card, CardContent} from "@/components/ui/card"
import Link from "next/link"
import {useState} from "react"
import {Illustration} from "@/components/custom/illustration";
// import axios from "axios";
import {GoogleLogin} from '@react-oauth/google';
import axios from "axios";
import {LoginInformation} from "@/app/auth/login/information";
import useAuthStore from "@/lib/store/user.modal";
import {useRouter} from "next/navigation";


export default function Login() {
    const [layout, setLayout] = useState(1);
    const [isLogin, setIsLogin] = useState(false);

    const {setToken} = useAuthStore()
    const router = useRouter()

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
            <div className="min-h-screen w-full flex px-4">
                {/* Left Side - Login Form */}
                <Link href="/home" className="h-[130px] w-[47px] absolute left-8 top-8">
                    <Illustration width={130} height={47} url="/logo/logo-black.svg"/>
                </Link>
                <div className="flex-1 overflow-hidden">
                    {!isLogin && <div
                        className={`flex transition-transform duration-500 ease-in-out ${
                            layout === 1 ? 'translate-x-0' : '-translate-x-1/2'
                        }`}
                        style={{width: "100vw"}}
                    >
                        <div className="w-1/2 min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
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
                                                strokeWidth="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
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
                                                strokeWidth="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
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

                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/auth/login`, {credential: credentialResponse.credential}).then(({data}) => {
                                                console.log(data)
                                                setToken(data.data.token)
                                                if(!data.data.hasFillInfo) {
                                                    setIsLogin(true)
                                                }else {
                                                    router.push("/freelancer/home")
                                                }
                                            }).catch(() => {
                                            })
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                        useOneTap
                                    />

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
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="group-hover:stroke-white transition-colors duration-300 group-hover:w-[40px] group-hover:h-[20px]"
                                        >
                                            <line x1="50" y1="50" x2="190" y2="50"/>
                                            <polyline points="80,20 50,50 80,80"/>
                                        </svg>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>}

                    {isLogin && <LoginInformation/>}

                </div>
                {/* Right Side - Image */}
                <div className="hidden lg:flex lg:flex-1 relative py-4">
                    <Illustration className="flex flex-1 rounded-xl" url="/auth/auth2.svg"/>
                </div>
            </div>
        </>

    )
}