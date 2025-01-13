import {Badge} from "@/components/ui/badge"
import {Card, CardContent} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import {Illustration} from "@/components/custom/illustration";

export const Blog = () => {
    const articles = [{
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "/blog/blog1.jpg",
        platform: "Truyền hình"
    }, {
        title: "Duis aute irure dolor in reprehenderit in voluptate",
        image: "/blog/blog3.jpg",
        platform: "Truyền hình"
    }, {
        title: " Aenean vulputate eleifend tellus",
        image: "/blog/blog4.jpg",
        platform: "Diễn Viên"
    }, {
        title: "Excepteur sint occaecat cupidatat non proident",
        image: "/blog/blog5.jpg",
        platform: "TikTok"
    }]

    const tips = Array(8).fill({
        title: "Cum sociis natoque penatibus et magnis ",
        content: "Làm sao để triển chiếu thẳng khi dùng trước đám đông",
        url: "/blog/tip1.png"
    })

    return (
        <div className="container mx-auto py-4 max-width-suitable px-14 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Featured Article */}
                    <Card className="group relative overflow-hidden">
                        <Link href="#" className="block">
                            <div className="relative aspect-[16/9]">
                                <Image
                                    src="/blog/blog2.jpg"
                                    alt="Featured artist in gallery"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                                <Badge
                                    className="absolute top-4 left-4 bg-white text-black hover:bg-white/90"
                                    variant="secondary"
                                >
                                    TikTok
                                </Badge>
                            </div>
                            <div className="absolute bottom-0 p-4 text-white">
                                <h2 className="text-2xl font-bold">
                                    Công bố Nghệ sĩ danh giá của năm
                                </h2>
                            </div>
                        </Link>
                    </Card>

                    {/* Article Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {articles.map((article, index) => (
                            <Card key={index} className="group relative overflow-hidden">
                                <Link href="#" className="block">
                                    <div className="relative aspect-[16/9]">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                                        <Badge
                                            className="absolute top-4 left-4 bg-white text-black hover:bg-white/90"
                                            variant="secondary"
                                        >
                                            {article.platform}
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-0 p-4 text-white">
                                        <h3 className="font-bold">{article.title}</h3>
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Tips Sidebar */}
                <div className="lg:col-span-1">
                    <div className="w-full mx-auto">
                        <div className="">
                            {/*<ScrollArea className="h-[600px] pr-4">*/}
                            <div className="space-y-4">
                                {tips.map((tip, index) => (
                                    <Card key={index} className="bg-muted">
                                        <CardContent className="p-4 space-y-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
                                            <div className="lg:col-span-2">
                                                <h3 className="text-sm text-muted-foreground font-medium">{tip.title}</h3>
                                                <p className="text-sm mt-3 h-15 line-clamp-2">
                                                    {tip.content}
                                                </p>
                                            </div>
                                            <div className="w-full h-full rounded-xl" style={{marginTop: 0}}>
                                                <Illustration
                                                    url={tip.url}
                                                    className="border border-gray-400 w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            {/*</ScrollArea>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
