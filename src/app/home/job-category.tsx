import { Button } from "@/components/ui/button"

interface JobCategory {
    title: string
    items: string[]
}

const jobCategories: JobCategory[] = [
    {
        title: "Models",
        items: [
            "Người mẫu quảng cáo",
            "Người mẫu catwalk",
            "Người mẫu đóng phim",
            "Người mẫu quay TVC",
            "Người mẫu ngoại cảnh",
            "Người mẫu nhãn dụng",
            "Người mẫu bán tay",
            "Người mẫu nước ngoài",
            "Người mẫu nhi, sơ sinh",
            "Người mẫu review",
            "Diễn viên điện ảnh",
            "Diễn viên truyền hình",
            "Diễn viên võ thuật",
            "Diễn viên hài",
            "Diễn viên đóng thế",
            "Diễn viên quần chúng",
            "Diễn viên lồng tiếng",
            "Diễn viên kể chuyện",
            "Diễn viên múa",
            "Diễn viên kịch",
            "Diễn viên xiếc"
        ]
    },
    {
        title: "Stylists & Artists",
        items: [
            "Costumes Stylish",
            "Concept Stylish",
            "Makeup artist",
            "Thợ may",
            "Nhiếp ảnh",
            "Thiết kế thời trang",
            "Chỉnh sửa ảnh",
            "Chỉ đạo nghệ thuật",
            "Biên kịch viên",
            "Quay phim",
            "Chuyên viên trang phục",
            "Thiết kế âm thanh",
            "Thiết kế đồ họa phim",
            "Thiết kế chuyển động",
            "Đạo diễn trường quay",
            "Đạo diễn hình ảnh/Đạo diễn sân khấu",
            "Chỉ đạo nghệ thuật",
            "Quản lý nghệ sĩ",
            "Đại diện nghệ sĩ"
        ]
    },
    {
        title: "Musicians",
        items: [
            "Top múa, nhóm nhảy phụ họa",
            "Nghệ sĩ Guitar",
            "Nghệ sĩ Cello",
            "Nghệ sĩ Dương cầm",
            "Nghệ sĩ Violin",
            "Nhà soạn nhạc",
            "Sản xuất podcast",
            "Sản xuất sách nói",
            "Sản xuất âm nhạc",
            "Chỉnh sửa âm thanh",
            "Chỉnh sửa giọng",
            "Voice over",
            "Ca sĩ tự do",
            "Nghệ sĩ nhạc cụ",
            "DJ drops & tags",
            "DJ mixing",
            "Remixing"
        ]
    },
    {
        title: "Reviewers & MCs",
        items: [
            "Review ẩm thực",
            "Review công nghệ",
            "Review phim",
            "Review game",
            "Review du lịch",
            "Review mỹ phẩm",
            "Review thời trang",
            "Review xe",
            "Review nhạc",
            "Review dịch vụ",
            "MC sự kiện",
            "MC triển lãm",
            "MC hội nghị, hội thảo",
            "MC khai trương",
            "MC livestream",
            "MC song ngữ"
        ]
    }
]

export const JobCategories = () => {
    return (
        <div className="mx-auto py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-[40px] font-bold">Thông tin</h2>
                    <p className="text-[40px] font-bold text-[#8A8A8A]">việc làm hàng đầu tại Việt Nam</p>
                </div>
                <Button variant="dark">
                    Khám phá ngay
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {jobCategories.map((category, index) => (
                    <div key={index} className="space-y-4">
                        <h3 className="font-semibold text-lg">{category.title}</h3>
                        <ul className="space-y-2 text-[#545454]">
                            {category.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-black transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}