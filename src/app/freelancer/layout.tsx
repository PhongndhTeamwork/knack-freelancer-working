"use client"

import React, {useEffect} from "react";
import {Footer} from "@/components/constitution/footer";
import {Header} from "@/components/constitution/header";
import {NavigationItem} from "@/lib/types/nanigation-item.type";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import useProfileStore from "@/lib/store/profile.modal";
import useAuthStore from "@/lib/store/user.modal";

type Props = {
    children?: React.ReactNode
}

const components: NavigationItem[] = [
    {
        href: "/freelancer/home",
        title: "Trang chủ",
    },
    {
        href: "/freelancer/profile",
        title: "Trang cá nhân"
    },
    {
        href: "/freelancer/portfolio/general",
        title: "Portfolio"
    },
]

const HomeLayout = ({children}: Props) => {
    const pathname = usePathname();
    const {fetchProfile} = useProfileStore();
    const {token, setToken} = useAuthStore();
    useEffect(() => {
        const storedToken = localStorage.getItem("knackToken");
        setToken(storedToken || "");
    }, [setToken]);

    useEffect(() => {
        // console.log(token);
        if (!token) return;
        fetchProfile(token)
    }, [fetchProfile, token]);


    return (
        <div>
            <div className="flex justify-center">
                {!pathname.includes("chat") &&
                    <Header logoLink="/freelancer/welcome"
                            components={components}
                    />}
            </div>
            <div className={cn("min-h-screen mx-auto", !pathname.includes("chat") && "mt-[80px]")}>
                {children}
            </div>
            <div className="mt-24">
                {!pathname.includes("chat") && <Footer/>}
            </div>
        </div>)
}
export default HomeLayout;

