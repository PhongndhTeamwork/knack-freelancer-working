"use client"

import React, {useEffect} from "react";
import {Header} from "@/app/home/header";
import {Footer} from "@/components/constitution/footer";
import axios from "axios";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Role} from "@/lib/enums/role.enum";
import useAuthStore from "@/lib/store/user.modal";

type Props = {
    children?: React.ReactNode
}


const HomeLayout = ({children}: Props) => {
    const {user, isSignedIn} = useUser();
    const router = useRouter();
    // const [isLoading, setIsLoading] = useState(false);
    const {setToken} = useAuthStore();

    useEffect(() => {
        const fetchData = async () => {
            if (isSignedIn && user) {
                // console.log({
                //     clerkUserId: user.id,
                //     username: user.fullName || user.username,
                //     email: user.emailAddresses[0]?.emailAddress,
                //     imageUrl: user.imageUrl
                // });
                try {
                    await axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/auth/login`, {
                        clerkUserId: user.id,
                        username: user.fullName || user.username,
                        email: user.emailAddresses[0]?.emailAddress,
                        imageSrc: user.imageUrl
                    }).then(({data}) => {
                        // console.log(data);
                        // setIsLoading(true)
                        setToken(data.data.token)
                        if (+data.data.role === Role.Freelancer) {
                            router.push("/freelancer/home")
                        } else if (+data.data.role === Role.Client) {
                            router.push("/client/home")
                        }
                    });
                } catch (error) {
                    console.error('Error during login:', error);
                    // setIsLoading(false)
                }
            }
        };
        fetchData().then(() => {
        });

    }, [isSignedIn, user, router, setToken]);

    // if (isLoading) return;
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

