"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card"
import {Star} from 'lucide-react'
import Marquee from "react-fast-marquee";
import React, {useEffect, useRef, useState} from "react";

const testimonials = [
    {
        rating: 5,
        text: "Catora was a pleasure to work with. They followed my instructions to the letter, and the end results were absolutely outstanding.",
        author: {
            name: "Nguyễn Hồng Bé",
            role: "Marketing Director at NYC",
            image: "/placeholder.svg?height=40&width=40"
        }
    },
    {
        rating: 2,
        text: "Catora was a pleasure to work with. They followed my instructions to the letter, and the end results were absolutely outstanding.",
        author: {
            name: "Nguyễn Hồng Bé",
            role: "Marketing Director at NYC",
            image: "/placeholder.svg?height=40&width=40"
        }
    },
    {
        rating: 4,
        text: "Catora was a pleasure to work with. They followed my instructions to the letter, and the end results were absolutely outstanding.",
        author: {
            name: "Nguyễn Hồng Bé",
            role: "Marketing Director at NYC",
            image: "/placeholder.svg?height=40&width=40"
        }
    },
    {
        rating: 5,
        text: "Catora was a pleasure to work with. They followed my instructions to the letter, and the end results were absolutely outstanding.",
        author: {
            name: "Nguyễn Hồng Bé",
            role: "Marketing Director at NYC",
            image: "/placeholder.svg?height=40&width=40"
        }
    },
    {
        rating: 4,
        text: "Catora was a pleasure to work with. They followed my instructions to the letter, and the end results were absolutely outstanding.",
        author: {
            name: "Nguyễn Hồng Bé",
            role: "Marketing Director at NYC",
            image: "/placeholder.svg?height=40&width=40"
        }
    }
]

export const CustomerFeedback = () => {
    const [width, setWidth] = useState("100px");
    const [height, setHeight] = useState(300);
    const marqueeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Dynamically calculate the width
        const calculatedWidth = (window.innerWidth - 1700) / 2;
        setWidth(calculatedWidth > 0 ? `${calculatedWidth}px` : "100px");
    }, []);

    useEffect(() => {
        // Set the height of the card dynamically
        if (marqueeRef.current) {
            setHeight(marqueeRef?.current?.offsetHeight);
        }
    }, []);

    return (
        <div className="container mx-auto py-8 max-w-none">
            {/*<div className="flex items-center gap-2 mb-8">*/}
            {/*    <div className="w-2 h-2 bg-green-500 rounded-full"/>*/}
            {/*    <h2 className="text-xl font-semibold">Feedback của Khách hàng</h2>*/}
            {/*</div>*/}

            <div className="relative flex items-center">
                <div className="left-0 absolute bg-gradient-to-r from-white to-transparent z-10" style={{
                    width: width,
                    height: height
                }}/>
                <Marquee className="" ref={marqueeRef}>
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="mx-2 w-[380px] border-gray-500">
                            <CardContent className="p-6 text-xl">
                                <div className="space-y-4">
                                    <div className="flex ">
                                        {Array.from({length: 5}).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${
                                                    i < testimonial.rating
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-500 fill-gray-200"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground">
                                        {testimonial.text}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={testimonial.author.image} alt={testimonial.author.name}/>
                                            <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{testimonial.author.name}</p>
                                            <p className="text-muted-foreground">{testimonial.author.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </Marquee>
                <div className="right-0 absolute bg-gradient-to-l from-white to-transparent z-10" style={{
                    width: width,
                    height: height
                }}/>
            </div>
        </div>
    )
}