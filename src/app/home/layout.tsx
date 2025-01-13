"use client"

import {Header} from "@/app/home/header";
import {Footer} from "@/components/constitution/footer";
import {ReactNode} from "react";

type Props = {
    children?: ReactNode
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

