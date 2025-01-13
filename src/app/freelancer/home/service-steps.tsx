import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkles } from 'lucide-react'
import {Button} from "@/components/ui/button";

interface Step {
    number: number
    title: string
    description: string
    isDark?: boolean
    showIcon?: boolean
}

export const ServiceSteps = () => {
    const steps: Step[] = [
        {
            number: 1,
            title: "Hoàn thiện Hồ sơ cá nhân",
            description: "If our services is a good fit, start your subscription. Access your project board, and we'll reach out the same day for a introductory discussion. Plans & Pricing ↓",
            isDark: true
        },
        {
            number: 2,
            title: "Hoàn thiện Hồ sơ cá nhân",
            description: "If our services is a good fit, start your subscription. Access your project board, and we'll reach out the same day for a introductory discussion. Plans & Pricing ↓",
            isDark: true
        },
        {
            number: 3,
            title: "Hoàn thiện Hồ sơ cá nhân",
            description: "If our services is a good fit, start your subscription. Access your project board, and we'll reach out the same day for a introductory discussion. Plans & Pricing ↓",
            isDark: true
        },
        {
            number: 4,
            title: "Hoàn thiện Hồ sơ cá nhân",
            description: "If our services is a good fit, start your subscription. Access your project board, and we'll reach out the same day for a introductory discussion. Plans & Pricing ↓",
            isDark: true,
            showIcon: true
        }
    ]

    return (
        <div className="mx-auto">
            <h2 className="text-4xl font-bold mb-6">Các bước sử dụng dịch vụ</h2>

            <div className="grid gap-4 md:grid-cols-2">
                {steps.map((step) => (
                    <Card
                        key={step.number}
                        className={`relative overflow-hidden rounded-3xl p-4 ${
                            step.isDark ? 'bg-zinc-900 text-white' : ''
                        }`}
                    >
                        <CardHeader>
                            <Button
                                variant="outline"
                                className="w-fit"
                            >
                                Bước {step.number}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4 mt-20">
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                            <p className={`text-sm ${
                                step.isDark ? 'text-zinc-300' : 'text-zinc-600'
                            }`}>
                                {step.description}
                            </p>
                            {step.showIcon && (
                                <div className="absolute right-6 bottom-6">
                                    <Sparkles className="h-12 w-12 text-white/20" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}