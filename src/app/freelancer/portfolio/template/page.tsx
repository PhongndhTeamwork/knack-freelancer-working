import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Illustration} from "@/components/custom/illustration";
import * as React from "react";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

interface PortfolioItem {
    title: string
    image: string
}

export default function Component() {
    const portfolioItems: PortfolioItem[] = [
        { title: "Elegant 1", image: "/placeholder.svg?height=200&width=300" },
        { title: "Elegant 1", image: "/placeholder.svg?height=200&width=300" },
        { title: "Elegant 1", image: "/placeholder.svg?height=200&width=300" },
        { title: "Elegant 1", image: "/placeholder.svg?height=200&width=300" }
    ]

    return (
        <div className="w-[1800px] px-14 mx-auto mt-28">
            {/* Banner Section */}
            <div className="relative h-[200px] w-full overflow-hidden">
                <Illustration url="/freelancer/portfolio/banner/1.svg" className="h-full rounded-xl"/>
            </div>

            {/* Content Section */}
            <div className="mx-auto px-4 py-8 mt-4">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold">Portfolio Template</h1>
                        <p className="text-muted-foreground text-xl">
                            The best templates and plugins from the Framer community
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        <div className="hidden md:flex relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                            <Input
                                type="search"
                                placeholder="Tìm kiếm..."
                                className="pl-10 w-[200px] lg:w-[300px] bg-[#D8D8D8]"
                            />
                        </div>
                        {/*<Badge variant="secondary" className="px-4 py-1">*/}
                        {/*    Style*/}
                        {/*</Badge>*/}
                        <Select>
                            <SelectTrigger className="w-[100px] bg-[#D8D8D8] h-[40px]">
                                <SelectValue placeholder="Style"/>
                            </SelectTrigger>
                            <SelectContent className="bg-[#D8D8D8]">
                                <SelectGroup>
                                    <SelectLabel>Style</SelectLabel>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="ml-auto">
                            <div>
                                <Button variant="dark" size="sm">Tìm kiếm</Button>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {portfolioItems.map((item, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardContent className="p-0 bg-gray-800">
                                    <div className="aspect-[6/5] relative">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4">
                                    <h3 className="text-xl font-medium">{item.title}</h3>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}