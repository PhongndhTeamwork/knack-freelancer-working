import { Card, CardContent } from "@/components/ui/card"

interface WelcomeBannerProps {
    userName?: string
    message?: string
    supportingText?: string
}

export const WelcomeBanner = ({
                                  userName = "Dora",
                                  message = "Mừng bạn quay trở lại, ",
                                  supportingText = "Hãy để Knack tìm cho bạn những nhân sự phù hợp nhất nhé!"
                              }: WelcomeBannerProps) => {
    return (
        <Card className="border-none shadow-none p-0 bg-transparent">
            <CardContent className="p-0">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        {/*<Hand className="h-6 w-6 rotate-12 text-yellow-400" />*/}
                        <span className="text-4xl font-bold">{message} {userName}</span>
                    </div>
                    <p className="text-muted-foreground text-xl">
                        {supportingText}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}