import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const Work = () => {
    return (
        <Card className="w-full mx-auto">
            <CardContent className="p-6">
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Achievement Title Field */}
                        <div className="space-y-2">
                            <Label htmlFor="achievement" className="responsive-text-16">Thành tựu</Label>
                            <Input
                                id="achievement"
                                placeholder=""
                                className="responsive-text-16 h-11"
                            />
                        </div>

                        {/* Time Period Field */}
                        <div className="space-y-2">
                            <Label htmlFor="period" className="responsive-text-16">Thời gian làm việc</Label>
                            <Input
                                id="period"
                                placeholder=""
                                className="responsive-text-16 h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tip" className="responsive-text-16">Chi phí/ Hoa hồng</Label>
                            <Input
                                id="tip"
                                placeholder=""
                                className="responsive-text-16 h-11"
                            />
                        </div>
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="responsive-text-16">Mô tả</Label>
                        <Textarea
                            id="description"
                            placeholder=""
                            className="min-h-[100px] resize-none responsive-text-16"
                        />
                    </div>

                    {/* Add Achievement Button */}
                    <Button
                        type="button"
                        variant="dark-outline"
                        size="sm"
                    >
                        Thêm công việc
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

