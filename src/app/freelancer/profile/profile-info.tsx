import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Info, Briefcase, Trophy} from 'lucide-react'

interface WorkExperience {
    role: string
    period: string
    description: string
}

export const ProfileInfo = () => {
    const experiences: WorkExperience[] = [
        {
            role: "Người mẫu",
            period: "7/2024 - 12/2025",
            description: "Làm việc ở đây tốt nhưng mà không có sướng. Sếp không trả lương đúng hạn. Tóm lại là không cần nhắc làm ở đây thì khi vì quá."
        },
        {
            role: "Người mẫu",
            period: "7/2024 - 12/2025",
            description: "Làm việc ở đây tốt nhưng mà không có sướng. Sếp không trả lương đúng hạn. Tóm lại là không cần nhắc làm ở đây thì khi vì quá."
        }
    ]

    return (
        <div className="space-y-6 w-full">
            {/* Introduction */}
            <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                    <Info className="h-5 w-5 text-muted-foreground"/>
                    <CardTitle>Giới thiệu</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Tôi là một người khá hòa đồng, làm việc nghiêm túc, luôn tuân thủ về thời gian, timeline cũng
                        như yêu cầu của bên đơn vị booking hoặc khách hàng. Luôn lắng nghe và đóng góp ý kiến để cho sản
                        phẩm của mình tốt nhất
                    </p>
                </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground"/>
                    <CardTitle>Kinh nghiệm làm việc</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {experiences.map((experience, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium">{experience.role}</h3>
                                <span className="text-sm text-muted-foreground">{experience.period}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{experience.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Personal Achievements */}
            <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                    <Trophy className="h-5 w-5 text-muted-foreground"/>
                    <CardTitle>Thành tích cá nhân</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between items-start">
                            <h3 className="font-medium">Người mẫu triển vọng</h3>
                            <span className="text-sm text-muted-foreground">7/2024 - 12/2025</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Làm việc ở đây tốt nhưng mà không có sướng. Sếp không trả lương đúng hạn. Tóm lại là không
                            cần nhắc làm ở đây thì khi vì quá.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}