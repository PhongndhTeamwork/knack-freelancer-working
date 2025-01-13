'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DatePicker from "react-datepicker";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";

const data = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 2000) + 500
}))

export const Dashboard = () => {
    const [targetDate, setTargetDate] = useState<Date | null>(new Date(Date.now()))
    return (
        <div className="space-y-4 max-width-suitable px-14 mx-auto pt-12">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <Card className="bg-[#D8D8D8]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Thu nhập tháng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">40,689</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#D8D8D8]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Thu nhập trung bình</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10,689 / Job</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#D8D8D8]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Công việc đã hoàn thành</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">25</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#D8D8D8]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hoàn thành đúng hạn</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#D8D8D8]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Công việc đang hoàn thiện</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                    </CardContent>
                </Card>
            </div>
            <Card className="relative border-none shadow-none">
                <CardHeader>
                    <CardTitle>Thống kê</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis
                                    dataKey="day"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="currentColor"
                                    radius={[4, 4, 0, 0]}
                                    className="fill-primary"
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Ngày
                              </span>
                                                            <span className="font-bold text-muted-foreground">
                                {payload[0].payload.day}
                              </span>
                                                        </div>
                                                        <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Giá trị
                              </span>
                                                            <span className="font-bold">
                                {payload[0].value}
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
                <div className="absolute right-2 top-2">
                    <DatePicker customInput={<Input/>} className="w-[100px]" selected={targetDate} onChange={(date) => setTargetDate(date)} dateFormat="MMM yyyy"/>
                </div>
            </Card>
        </div>
    )
}