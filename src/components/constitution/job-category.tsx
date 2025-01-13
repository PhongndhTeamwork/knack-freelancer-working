import Link from "next/link";
import {Button} from "@/components/ui/button";

const jobCategories = [
    {
        title: "Column 1",
        jobs: [
            "Người mẫu quảng cáo",
            "Người mẫu catwalk",
            "Người mẫu đóng phim",
            "Người mẫu quay TVC",
            "Người mẫu ngoại cảnh",
            "Người mẫu nhân dung",
            "Người mẫu bàn tay",
            "Người mẫu nước ngoài",
            "Người mẫu nhí, sơ sinh",
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
        title: "Column 2",
        jobs:[
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
            "Đạo diện trường quay",
            "Đạo diễn hình ảnh",
            "Đạo diễn sân khấu",
            "Chỉ đạo nghệ thuật",
            "Quản lý nghệ sĩ",
            "Đại diện nghệ sĩ"
        ]
    },
    {
        title: "Column 3",
        jobs: [
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
        title: "Column 4",
        jobs: [
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
            "MC triễn lãm",
            "MC hội nghị, hội thảo",
            "MC khai trương",
            "MC livestream",
            "MC song ngữ"
        ]
    }
]

export const RelatedJobs = () => {
    return (
        <div className="mx-auto px-4 py-12">
            <div className="mb-8 flex justify-between">
                <div>
                    <h2 className="text-4xl font-bold">
                        Thông tin
                    </h2>
                    <p className="text-4xl font-bold text-[#8A8A8A]">
                        việc làm hàng đầu tại Việt Nam
                    </p>
                </div>
                <Button variant="dark">
                    Khám phá ngay
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {jobCategories.map((category, index) => (
                    <div key={index} className="space-y-4">
                        <ul className="space-y-2 text-[#545454] text-xl">
                            {category.jobs.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-black transition-colors duration-200"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}