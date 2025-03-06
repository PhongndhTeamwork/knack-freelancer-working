"use client"

import Link from "next/link"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Menu} from "lucide-react"
import {Illustration} from "@/components/custom/illustration";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {NavigationItem} from "@/lib/types/nanigation-item.type";

import useProfileStore from "@/lib/store/profile.modal";
import {useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import useAuthStore from "@/lib/store/user.modal";

type Props = {
    logoLink: string,
    components: NavigationItem[],
}

export const Header = ({logoLink, components}: Props) => {
    // const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const {profile} = useProfileStore();
    const path = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const avatarRef = useRef<HTMLDivElement | null>(null);
    const { removeToken} =useAuthStore()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef?.current?.contains(event?.target as Node) && !avatarRef?.current?.contains(event?.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <header className={cn(
            "top-6 z-50 w-full responsive-text-16 fixed transition-all",isScrolled && "w-[920px] 2xl:w-[1000px]"
        )}
                style={{...(isScrolled ? {backgroundColor: 'rgba(255, 255, 255, 0.4)', top : "24px", borderRadius : "10px"} : {width : "100%"}), transition: 'background-color 0.5s ease, top 0.5s ease, width 0.5s ease',}}
        >
            <div className="container mx-auto max-width-suitable px-[60px]" >
                <div className={cn("flex h-16 items-center justify-between")}>
                    {/* Logo */}
                    <Link href={logoLink || "/freelancer/home"} className="flex items-center space-x-2 w-[130px] h-[47px]">
                        <Illustration width={130} height={47} url='/logo/logo-black.svg'/>
                    </Link>

                    {/*NavBar*/}
                    <div className="gap-2 flex responsive-text-16">
                        {components.map((c, index) => (
                            <div key={index}
                                 className={cn("rounded-md px-3 py-1 cursor-pointer select-none h-9 responsive-text-16 flex items-center", path.includes(c.hrefCheck) ? "bg-[#333333] text-white hover:bg-black active:bg-[#333333]" : "hover:bg-gray-200")}
                                 onClick={() => {
                                     router.push(c.href)
                                 }}>
                                {c.title}
                            </div>
                        ))}
                    </div>


                    {/* Search and Auth Buttons */}
                    <div className="flex items-center space-x-8">
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="flex items-center relative">
                                <Avatar ref={avatarRef} className="border border-gray-300 w-10 h-10 cursor-pointer" onClick={toggleDropdown}>
                                    <AvatarImage src={String(profile?.avatar) || ""} alt="User 1"
                                                 className="w-full h-full"/>
                                    <AvatarFallback
                                        className="text-[20px]">{profile?.name?.substring(0, 1) || "P"}</AvatarFallback>
                                </Avatar>
                                <p className="ml-3 text-[16px] font-semibold">{profile?.name}</p>
                                {isOpen && <div
                                    className="absolute bg-white border border-gray-300 w-32 top-12 right-1/2 rounded-md">
                                    <ul ref={dropdownRef} className="w-full rounded-xl">
                                        <li className="px-2 py-2 w-full cursor-pointer hover:bg-gray-100 rounded-t-xl"
                                            onClick={() => {
                                                router.push("/freelancer/profile")
                                                setIsOpen(false);
                                            }}>Profile
                                        </li>
                                        <li className="px-2 py-2 w-full cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                router.push("/freelancer/portfolio/general")
                                                setIsOpen(false);
                                            }}>Portfolio
                                        </li>
                                        <li className="px-2 py-2 w-full cursor-pointer hover:bg-gray-100 rounded-b-xl"
                                            onClick={() => {
                                                setIsOpen(false);
                                                removeToken();
                                                router.push("/home")
                                            }}>Logout
                                        </li>
                                    </ul>
                                </div>}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col space-y-4 mt-4">
                                    <Input type="search" placeholder="Tìm kiếm..."/>
                                    <div className="flex flex-col space-y-2">
                                        <div className="hidden md:flex items-center space-x-2">
                                            <div className="flex items-center">
                                                <Avatar className="border border-gray-300 w-10 h-10">
                                                    <AvatarImage src={String(profile?.avatar) || ""} alt="User 1"
                                                                 className="w-full h-full"/>
                                                    <AvatarFallback
                                                        className="text-[20px]">{profile?.name?.substring(0, 1) || "P"}</AvatarFallback>
                                                </Avatar>
                                                <p className="ml-3 text-[16px] font-bold cursor-pointer">{profile?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}