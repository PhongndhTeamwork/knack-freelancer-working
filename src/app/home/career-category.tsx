import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

const categories = {
    fashion: {
        title: "Lĩnh vực thời trang",
        items: [
            {
                title: "Mẫu ảnh",
                image: "/home/fashion1.png",
                link: "#"
            },
            {
                title: "Stylish",
                image: "/home/fashion2.png",
                link: "#"
            },
            {
                title: "May mặc",
                image: "/home/fashion3.png",
                link: "#"
            }
        ]
    },
    film: {
        title: "Lĩnh vực phim ảnh",
        items: [
            {
                title: "Diễn viên",
                image: "/home/movie1.png",
                link: "#"
            },
            {
                title: "Nhiếp ảnh",
                image: "/home/movie2.png",
                link: "#"
            },
            {
                title: "Makeup Artist",
                image: "/home/movie3.png",
                link: "#"
            }
        ]
    }
}

export const CareerCategories = () => {
    return (
        <div className="bg-black text-white min-h-screen md:py-12">
            <div className="mx-auto">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold">
                            Trở thành một phần của Knack.{" "}
                            <span className="text-gray-400">Ngay bây giờ</span>
                        </h1>
                    </div>

                    {Object.entries(categories).map(([key, category]) => (
                        <div key={key} className="space-y-6">
                            <Badge variant="secondary" className="rounded-[8px] text-sm font-medium text-[24px]">
                                {category.title}
                            </Badge>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, index) => (
                                    <Card
                                        key={index}
                                        className="group relative overflow-hidden rounded-xl border-0 bg-transparent"
                                    >
                                        <CardContent className="p-0">
                                            <Link href={item.link} className="block relative aspect-[4/3]">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                <div className="absolute bottom-0 left-0 p-6">
                                                    <h3 className="text-xl font-semibold text-white">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Hãy khám phá tài năng của bạn.
                        </h2>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="text-[18px]"
                        >
                            Bắt Đầu Hành Trình
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}