'use client'

import {FormEvent, useState} from "react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Search, Phone, Settings, PaperclipIcon, SendIcon, Mic, SmileIcon, MoreVertical, ArrowLeft } from 'lucide-react'
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {Illustration} from "@/components/custom/illustration";

type Props = {
    goBackLink : string;
}

export const Chat = ({goBackLink} : Props) => {
    const [messages] = useState([
        {
            id: 1,
            sender: "X-AE-A-13b",
            message: "Enter your message description here...",
            time: "12:25",
            avatar: "/placeholder.svg"
        },
        {
            id: 2,
            sender: "Jerome White",
            message: "Enter your message description here...",
            time: "12:25",
            avatar: "/placeholder.svg"
        },
        {
            id: 3,
            sender: "Madagascar Silver",
            message: "Enter your message description here...",
            time: "12:25",
            avatar: "/placeholder.svg",
            unread: true
        }
    ])
    const [message, setMessage] = useState('');
    const router =useRouter();

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            console.log('Sending message:', message)
            setMessage('')
        }
    }
    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <div className="w-full max-w-xs border-r hidden md:block">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex space-x-2 items-center">
                        <h1 className="text-xl font-semibold">Tin nhắn</h1>
                        <Badge variant="secondary" className="text-[#8E0000]">29</Badge>
                    </div>

                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5"/>
                    </Button>
                </div>

                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input className="pl-8 bg-[#D8D8D8]" placeholder="Tìm kiếm" />
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-12rem)]">
                    {messages.map((chat) => (
                        <div
                            key={chat.id}
                            className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer"
                        >
                            <Avatar>
                                <AvatarImage src={chat.avatar}/>
                                <AvatarFallback>{chat.sender[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">{chat.sender}</h3>
                                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                            </div>
                            {chat.unread && (
                                <div className="w-2 h-2 bg-primary rounded-full"/>
                            )}
                        </div>
                    ))}
                </ScrollArea>

                <div className="px-4">
                    <Button variant="dark" className="w-full flex justify-center" size="sm" onClick={() => {
                        router.push(goBackLink || "/home")
                    }}>
                        <ArrowLeft className="relative bottom-[1px]"/>
                        Quay lại
                    </Button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="/placeholder.svg"/>
                            <AvatarFallback>AW</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold flex space-x-2">
                                <p>Azunyan U. Wu</p>
                                <Badge variant="success">Online</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">@azusanakano_1997</p>
                        </div>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Button variant="dark-outline" size="sm">
                            <Phone className="h-5 w-5"/> Gọi điện
                        </Button>
                        <Button variant="dark" size="sm">
                            Trang cá nhân
                        </Button>
                        <Button variant="ghost">
                            <MoreVertical/>
                        </Button>

                    </div>

                </div>

                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        <div className="flex justify-start">
                            <Card className="max-w-[80%] p-3 bg-[#D8D8D8]">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.</p>
                                <span className="text-xs text-muted-foreground mt-1">11:25</span>
                            </Card>
                        </div>

                        <div className="flex justify-end">
                            <Card className="max-w-[80%] p-3 bg-primary text-primary-foreground">
                                <p>Do androids truly dream of electric sheep?</p>
                                <span className="text-xs mt-1 opacity-70">12:30</span>
                            </Card>
                        </div>

                        <div className="flex justify-end">
                            <Card className="max-w-[80%] p-3 bg-primary text-primary-foreground">
                                <div className="rounded-lg overflow-hidden mb-2">
                                    <Illustration
                                        url="/placeholder.svg"
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <span className="text-xs opacity-70">02:25</span>
                            </Card>
                        </div>
                    </div>
                </ScrollArea>

                <form
                    onSubmit={handleSendMessage}
                    className="w-full mx-auto p-2"
                >
                    <div className="flex items-center gap-2 w-full rounded-2xl bg-[#D8D8D8] p-2">
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="shrink-0"
                        >
                            <PaperclipIcon className="h-5 w-5"/>
                            <span className="sr-only">Attach file</span>
                        </Button>
                        <Input
                            type="text"
                            placeholder="Send a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <div className="flex items-center space-x-2">
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="shrink-0"
                            >
                                <SmileIcon className="h-5 w-5"/>
                            </Button>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="shrink-0"
                            >
                                <Mic className="h-5 w-5"/>
                            </Button>
                            <Button
                                type="submit"
                                variant="dark"
                                disabled={!message.trim()}
                                className="flex items-center"
                            >
                                <SendIcon className="h-5 w-5"/>
                                Send
                            </Button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}