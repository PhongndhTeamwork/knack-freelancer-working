import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const WorkExperience = () => {
    return (
        <Card className="w-full mx-auto">
            <CardContent className="p-6">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Position Field */}
                        <div className="space-y-2">
                            <Label htmlFor="position" className="responsive-text-16">Vị trí</Label>
                            <Input
                                id="position"
                                placeholder="Người mẫu"
                                className="h-11 responsive-text-16"
                            />
                        </div>

                        {/* Work Period Field */}
                        <div className="space-y-2">
                            <Label htmlFor="period" className="responsive-text-16">Thời gian làm việc</Label>
                            <Input
                                id="period"
                                placeholder=""
                                className="h-11 responsive-text-16"
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

                    {/* Add Job Button */}
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

