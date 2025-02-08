import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const Achievement = () => {
    return (
        <Card className="w-full mx-auto">
            <CardContent className="p-6">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Achievement Title Field */}
                        <div className="space-y-2">
                            <Label htmlFor="achievement">Công việc/dự án</Label>
                            <Input
                                id="achievement"
                                placeholder=""
                            />
                        </div>

                        {/* Time Period Field */}
                        <div className="space-y-2">
                            <Label htmlFor="period">Thời gian</Label>
                            <Input
                                id="period"
                                placeholder=""
                            />
                        </div>
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea
                            id="description"
                            placeholder=""
                            className="min-h-[100px] resize-none"
                        />
                    </div>

                    {/* Add Achievement Button */}
                    <Button
                        type="button"
                        variant="dark-outline"
                        size="sm"
                    >
                        Thêm thành tựu
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

