"use client"

import {Header} from "@/app/home/header";
import {Footer} from "@/components/constitution/footer";
import {ReactNode, useEffect} from "react";
import useAuthStore from "@/lib/store/user.modal";
import {Role} from "@/lib/enums/role.enum";
import axios from "axios";
import {useRouter} from "next/navigation";

type Props = {
    children?: ReactNode
}


const HomeLayout = ({children}: Props) => {
    const {token, setToken} = useAuthStore();
    const router = useRouter();
    useEffect(() => {
        const storedToken = localStorage.getItem("knackToken");
        setToken(storedToken || "");
        axios.get(`${process.env.NEXT_PUBLIC_PREFIX_API}/auth/check-role`,{
            headers : {
                Authorization : "Bearer " + storedToken
            }
        }).then((data) => {
            const role = +data?.data?.data?.role
            // if(role === Role.Admin)  return router.push("/admin/dashboard");
            if(role === Role.Freelancer)  return router.push("/freelancer/home");
            if(role === Role.Client)  return router.push("/client/home");
        }).catch(() => {
        })
    }, [router, setToken, token]);


    return (
        <div>
            <div className="flex justify-center">
                <Header/>
            </div>
            <div className="min-h-screen mx-auto mt-[80px]">
                {children}
            </div>
            <div>
                <Footer/>
            </div>
        </div>)
}
export default HomeLayout;

