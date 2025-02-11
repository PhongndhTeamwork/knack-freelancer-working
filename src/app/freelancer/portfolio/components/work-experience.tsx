import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"

interface WorkExperience {
    label: string
    company: string
    period: string
}

export const WorkExperience = () => {
    const experiences: WorkExperience[] = [
        { label: "Vai trò", company: "Công ty TNHH ABC", period: "2018 - 2020" },
        { label: "Thời gian tham gia", company: "Công ty TNHH ABC", period: "2018 - 2020" },
        { label: "Công ty", company: "Công ty TNHH ABC", period: "2018 - 2020" },
        { label: "Chi tiết dự án", company: "Công ty TNHH ABC", period: "2018 - 2020" }
    ]

    return (
        <div className="mx-auto p-4">
            {/*<div className="flex items-center gap-2 mb-6">*/}
            {/*    <div className="w-2 h-2 bg-green-500 rounded-full" />*/}
            {/*    <h2 className="text-xl font-semibold">Kinh nghiệm làm việc</h2>*/}
            {/*</div>*/}

            <div>
                <div className="p-0">
                    <div className="space-y-4">
                        {experiences.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b-2 responsive-text-32"
                            >
                                <div className="font-medium text-muted-foreground">
                                    {item.label}
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Badge variant="secondary" className="rounded-[40px] font-normal h-14 px-6 responsive-text-20 bg-[#DDDDDD] bg-opacity-50">
                                        {item.company}
                                    </Badge>
                                    <Badge variant="secondary" className="font-normal h-14 rounded-[40px] px-6 responsive-text-20 bg-[#DDDDDD] bg-opacity-50">
                                        {item.period}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}