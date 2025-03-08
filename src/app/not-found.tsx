import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
            <div className="max-w-md mx-auto text-center space-y-8">
                {/* 404 Text with decorative elements */}
                <div className="relative">
                    <h1 className="text-9xl font-extrabold tracking-tighter text-primary">404</h1>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/20 rounded-full blur-xl" />
                </div>

                {/* Error message */}
                <div className="space-y-4 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold">Page not found</h2>
                    <p className="text-muted-foreground">Sorry, the page you&#39;re looking for doesn't exist or has been moved.</p>
                </div>

                {/* Return home button */}
                <Button asChild size="lg" variant="dark" className="mt-8">
                    <Link href="/home" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Return to Home
                    </Link>
                </Button>

                {/* Decorative elements */}
                <div className="grid grid-cols-3 gap-2 mt-12 opacity-70">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-2 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40"
                            style={{
                                width: `${100 - i * 20}%`,
                                opacity: 1 - i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}

