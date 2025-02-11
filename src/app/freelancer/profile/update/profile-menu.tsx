"use client"

import {cn} from "@/lib/utils";

type Props = {
    onChangeNavbar: (id: number) => void,
    activeBar: number
}

export const ProfileMenu = ({onChangeNavbar, activeBar}: Props) => {
    const menuItems = [
        {
            id: 1,
            title: "Thông tin cá nhân",
            description: "Cập nhật ảnh đại diện và thông tin cá nhân",
        },
        {
            id: 2,
            title: "Giới thiệu",
            description: "Cập nhật thông tin về công việc của bạn",
        },
        {
            id: 3,
            title: "Kinh nghiệm làm việc",
            description: "Cập nhật thông tin về công việc của bạn",
        },
        {
            id: 4,
            title: "Thành tựu cá nhân",
            description: "Cập nhật thông tin về công việc của bạn",
        },
        {
            id: 5,
            title: "Công việc nổi bật",
            description: "Cập nhật thông tin về công việc của bạn",
        },
        {
            id: 6,
            title: "Biểu giá dịch vụ",
            description: "Cập nhật thông tin về công việc của bạn",
        }
    ]

    return (
        <div className="bg-background">
            <div className="overflow-hidden">
                <div className="space-y-2">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            // href={item.href}
                            className={cn("flex items-center justify-between p-4 transition-colors rounded-xl cursor-pointer space-y-3", activeBar !== item.id && "hover:bg-gray-300", activeBar === item.id && "bg-black text-white")}
                            onClick={() => onChangeNavbar(item.id)}
                        >
                            <div className="space-y-1">
                                <h2 className="responsive-text-16 font-medium leading-none">{item.title}</h2>
                                <p className={cn("responsive-text-14", activeBar !== item.id ? " text-muted-foreground" : "text-[#D8D8D8]" )}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

