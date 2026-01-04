import { Rocket, Sparkles } from "lucide-react"

interface ComingSoonProps {
    title?: string
    description?: string
}

export function ComingSoon({
    title = "Coming Soon",
    description = "We're working hard to bring you this feature. Stay tuned!"
}: ComingSoonProps) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Icon */}
                <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl rounded-full" />
                    <div className="relative w-24 h-24 mx-auto rounded-none bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 flex items-center justify-center">
                        <Rocket className="w-12 h-12 text-primary" />
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {title}
                        </h2>
                        <Sparkles className="w-5 h-5 text-secondary" />
                    </div>
                    <p className="text-muted-foreground">
                        {description}
                    </p>
                </div>

                {/* Progress indicator */}
                <div className="space-y-3">
                    <div className="w-full h-1 bg-muted rounded-none overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-primary to-secondary animate-pulse" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        In development
                    </p>
                </div>

                {/* Features list */}
                <div className="pt-4 space-y-2 text-sm text-left">
                    <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                        <span className="text-muted-foreground">Advanced analytics and insights</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                        <span className="text-muted-foreground">Real-time data visualization</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                        <span className="text-muted-foreground">Powerful filtering options</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
