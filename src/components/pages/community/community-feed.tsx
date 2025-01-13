import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {Camera, ImagePlus, Search} from 'lucide-react'
import {Illustration} from "@/components/custom/illustration";
import { Textarea } from "@/components/ui/textarea"
import {useState} from "react";

const posts = [
    {
        images : ["/community/community1.svg","/community/community2.svg"],
        avatar : "/",
        avatarName : "AW",
        username : "Azunyan U. Wu",
        content : "Hai phong cách khác nhau nè các mom!!!!!",
        majority : "Thiết kế thời trang"
    },
    {
        images : ["/community/community3.svg","/community/community4.svg"],
        avatar : "/",
        avatarName : "AW",
        username : "Azunyan U. Wu",
        content : "Hệ tư tưởng mới nè cả nhà!",
        majority : "Thiết kế thời trang"
    }
]

export const CommunityFeed = () => {
    const [content, setContent] = useState("");

    return (
        <div className="w-full mx-auto mb-20">
            <h1 className="text-[48px] font-bold mb-4">Cộng đồng</h1>

            <Tabs defaultValue="business" className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="business">Thảo luận doanh nghiệp</TabsTrigger>
                    <TabsTrigger value="freelancer">Thảo luận freelancer</TabsTrigger>
                </TabsList>
            </Tabs>

            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>AW</AvatarFallback>
                        </Avatar>
                        <Card className="w-full mx-auto bg-[#D8D8D8]">
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <Textarea
                                        placeholder="Hôm nay bạn muốn chia sẻ điều gì..."
                                        className="min-h-[40px] w-full resize-none border-0 focus-visible:ring-0 p-0 shadow-none"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        style={{marginTop : 0}}
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <Camera className="h-5 w-5" />
                                                <span className="sr-only">Add photo from camera</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <ImagePlus className="h-5 w-5" />
                                                <span className="sr-only">Add photo from gallery</span>
                                            </Button>
                                        </div>
                                        <Button
                                            variant="dark"
                                            size="sm"
                                            className="bg-black text-white hover:bg-black/90"
                                        >
                                            Đăng
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Post Items */}
            {posts.map((post, index : number) => (
                <Card key={index} className="mb-6">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>AW</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{post.username}</h3>
                                <p className="text-sm text-muted-foreground">{post.majority}</p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm">
                            Theo dõi
                        </Button>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="mb-4">{post.content}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {post.images.map((image, index) =>
                                <Illustration key={index}
                                    url={image}
                                    className="w-full rounded-lg object-cover aspect-square"
                                />
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Search and Filter Button - Fixed Position */}
            <div className="fixed bottom-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary">
                    <Search className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}