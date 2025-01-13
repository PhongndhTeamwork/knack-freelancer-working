"use client"

import {ImageWithContent} from "@/components/custom/image-with-comtent";

const categories = [
    {
        image : "/freelancer/welcome/1.jpg",
        title : "Chỉnh sửa thông tin",
        link : "/freelancer/profile"
    },
    {
        image : "/freelancer/welcome/2.jpg",
        title : "Chỉnh sửa Portfolio",
        link : "/freelancer/portfolio"
    },
    {
        image : "/freelancer/welcome/3.jpg",
        title : "Tạo Portfolio mới",
        link : "/freelancer/portfolio/template"
    },
]

export default function Component() {
    // const {profile} = useProfileStore()
    return (
        <div className="max-width-suitable px-14 mt-28 mx-auto">
            <div className="">
                {/*<WelcomeBanner userName={profile.username} supportingText="Hôm nay Knack có thể giúp gì cho bạn nhỉ?"/>*/}

            </div>

            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {categories.map((item, index) => (
                        <ImageWithContent key={index} link={item.link} image={item.image} title={item.title} aspect={"2/1"}/>
                    ))}
                </div>
            </div>
        </div>
    )

}
