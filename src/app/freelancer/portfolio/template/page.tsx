"use client"

import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Illustration} from "@/components/custom/illustration";
import * as React from "react";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {CustomSelect} from "@/components/custom/custom-select";
import {useRouter} from "next/navigation";
import usePortfolioStore from "@/lib/store/portfolio.modal";
import {useEffect} from "react";
import useAuthStore from "@/lib/store/user.modal";

interface PortfolioItem {
    title: string
    image: string
}

export default function Component() {
    const portfolioItems: PortfolioItem[] = [
        {title: "Elegant 1", image: "/freelancer/portfolio/portfolio1.png"},
    ]
    const styles = [
        {
            value: "1",
            label: "Portfolio type 1",
        },
        {
            value: "2",
            label: "Portfolio type 2",
        },
        {
            value: "3",
            label: "Portfolio type 3",
        }
    ]

    const router = useRouter();
    const {isChooseNewPortfolio, createNewPortfolio} = usePortfolioStore();
    const {token} = useAuthStore();
    const { fetchBasicPortfolios} = usePortfolioStore();

    useEffect(() => {
        if (!isChooseNewPortfolio) router.push("/freelancer/portfolio/general")
    }, [isChooseNewPortfolio, router])

    const handleCreateNewPortfolio = async () => {
        const result = await createNewPortfolio(token || "");
        if (!result) {
            console.log("Something went wrong");
            return;
        }
        fetchBasicPortfolios(token || "")
        router.push("/freelancer/portfolio?id="+result);
    }


    return (
        <div className="max-w-[1800px] px-[60px] mx-auto mt-28">

            {/* Banner Section */}
            <div className="relative h-[200px] w-full overflow-hidden">
                <Illustration url="/freelancer/portfolio/banner/1.svg" className="h-full rounded-xl"/>
            </div>

            {/* Content Section */}
            <div className="mx-auto py-8 mt-4">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold">Portfolio Template</h1>
                        <p className="text-muted-foreground text-xl">
                            Khám phá những mẫu Hồ sơ năng lực hấp dẫn nhất từ chúng tôi
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        <div className="hidden md:flex relative">
                            <Search
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                            <Input
                                type="search"
                                placeholder="Tìm kiếm..."
                                className="pl-10 w-[200px] lg:w-[300px] bg-[#DDDDDD80]"
                            />
                        </div>
                        {/*<Badge variant="secondary" className="px-4 py-1">*/}
                        {/*    Style*/}
                        {/*</Badge>*/}
                        <CustomSelect items={styles} className="w-52"/>
                        {/*<Select>*/}
                        {/*    <SelectTrigger className="w-[100px] bg-[#DDDDDD80] h-[40px]">*/}
                        {/*        <SelectValue placeholder="Style"/>*/}
                        {/*    </SelectTrigger>*/}
                        {/*    <SelectContent className="bg-[#D8D8D8]">*/}
                        {/*        <SelectGroup>*/}
                        {/*            <SelectLabel>Style</SelectLabel>*/}
                        {/*            <SelectItem value="1">1</SelectItem>*/}
                        {/*            <SelectItem value="2">2</SelectItem>*/}
                        {/*            <SelectItem value="3">3</SelectItem>*/}
                        {/*        </SelectGroup>*/}
                        {/*    </SelectContent>*/}
                        {/*</Select>*/}
                        <div className="ml-auto">
                            <div>
                                <Button variant="dark" size="sm">Tìm kiếm</Button>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {portfolioItems.map((item, index) => (
                            <Card key={index} className="overflow-hidden col-span-1 cursor-pointer"
                                  onClick={async () => {
                                      await handleCreateNewPortfolio()
                                  }}>
                                <CardContent className="p-0 bg-gray-800">
                                    <div className="aspect-[6/5] relative border-b-2">
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
                        {/*<Card className="overflow-hidden col-span-1 flex items-center justify-center cursor-pointer">*/}
                        {/*    <div className="w-full flex justify-center flex-col items-center">*/}
                        {/*        <Plus className="w-2/3 h-2/3 text-[#D8D8D8]"/>*/}
                        {/*        <h3 className="w-full text-xl font-medium text-muted-foreground flex justify-center">Thêm*/}
                        {/*            Portfolio mới</h3>*/}

                        {/*    </div>*/}
                        {/*    /!*<CardContent className="flex justify-center">*!/*/}

                        {/*    /!*</CardContent>*!/*/}
                        {/*    /!*<CardFooter className="p-4">*!/*/}
                        {/*    /!*</CardFooter>*!/*/}
                        {/*</Card>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}