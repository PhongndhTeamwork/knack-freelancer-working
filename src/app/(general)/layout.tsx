"use client"

import React from "react";
import {Header} from "@/app/home/header";
import {Footer} from "@/components/constitution/footer";


type Props = {
    children?: React.ReactNode
}

const HomeLayout = ({children}: Props) => {

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