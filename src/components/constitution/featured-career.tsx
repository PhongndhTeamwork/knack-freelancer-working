import Image from "next/image"
import {Card, CardContent} from "@/components/ui/card"
import {Star} from "lucide-react"

const careers = [
    {
        title: "Mẫu ảnh",
        image: "/freelancer/job/fashion1.png",
        alt: "Fashion model with long wavy hair"
    },
    {
        title: "Thiết kế thời trang",
        image: "/freelancer/job/fashion2.png",
        alt: "Fashion designer wearing glasses"
    },
    {
        title: "Review ẩm thực",
        image: "/freelancer/job/fashion3.png",
        alt: "Food review setup"
    },
    {
        title: "Diễn viên võ thuật",
        image: "/freelancer/job/movie1.png",
        alt: "Martial arts training session"
    },
    {
        title: "Nhiếp ảnh",
        image: "/freelancer/job/movie2.png",
        alt: "Photographer on rooftop"
    },
    {
        title: "Makeup Artist",
        image: "/freelancer/job/movie3.png",
        alt: "Makeup tools and supplies"
    }
]

export const FeaturedCareers = () => {
    return (
        <div className="bg-black text-white py-12">
            <div className="mx-auto">
                <div className="flex items-center gap-2 mb-10 justify-center">
                    <Star className="w-10 h-10"/>
                    <h2 className="text-[40px] font-semibold">
                        Top ngành, nghề nổi bật
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {careers.map((career, index) => (
                        <Card
                            key={index}
                            className="group relative overflow-hidden rounded-lg bg-transparent border-0"
                        >
                            <CardContent className="p-0">
                                <div className="relative aspect-[3/2]">
                                    <Image
                                        src={career.image}
                                        alt={career.alt}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"/>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h3 className="text-xl font-medium text-white">
                                            {career.title}
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}