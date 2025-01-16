import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export const ProfileBio =() => {
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Tiểu sử</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Textarea
                        id="bio"
                        placeholder=""
                        className="min-h-[120px] resize-none"
                    />
                </div>
            </CardContent>
        </Card>
    )
}

