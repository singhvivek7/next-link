import { Sparkles, Zap } from "lucide-react"

import { handleUpgrade } from "@/actions/upgrade-plan"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/hooks/use-profile";

export const UpgradeCard = () => {
    const { data } = useProfile();
    if (data?.data.plan !== "BASIC") return null;

    return <div className="rounded-none bg-linear-to-br from-primary/10 to-secondary/10 p-4 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Upgrade to Pro</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
            Unlock unlimited links and advanced analytics
        </p>
        <form action={handleUpgrade}>
            <Button size="sm" className="w-full rounded-none gap-2">
                <Zap className="h-3.5 w-3.5" />
                Upgrade Now
            </Button>
        </form>
    </div>
}