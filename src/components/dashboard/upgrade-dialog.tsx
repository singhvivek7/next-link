
"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useThemeColor } from "@/components/config-style-provider";
import { GeneralLoader } from "@/components/general-loader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { env } from "@/config/env";
import { usePlans } from "@/hooks/use-plans";
import { UPGRADE_GRADIENT_STYLES } from "@/lib/constant/ui.constant";
import { hslToHex } from "@/utils/color";

interface UpgradeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: {
        name?: string;
        email?: string;
    };
}

export function UpgradeDialog({ open, onOpenChange, user }: UpgradeDialogProps) {
    const [loading, setLoading] = useState(false);
    const { data: plans, isLoading: plansLoading } = usePlans();
    const { palette } = useThemeColor();

    // Get Pro Plan from database
    const proPlan = plans?.find(p => p.type === "PRO");
    const PRO_PLAN_AMOUNT = proPlan?.price || 499; // Fallback to 499
    const CURRENCY = proPlan?.currency || "INR";

    // Get theme color in hex format for Razorpay
    const themeColor = hslToHex(palette.cssVars.primary);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        // 1. Load Script
        const res = await loadRazorpayScript();
        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            setLoading(false);
            return;
        }

        // 2. Create Order
        try {
            const orderRes = await fetch("/api/v1/payment/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: PRO_PLAN_AMOUNT, currency: CURRENCY }),
            });

            if (!orderRes.ok) throw new Error("Failed to create order");

            const orderData = await orderRes.json();

            // 3. Open Razorpay Options
            const options = {
                key: env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use env var
                amount: orderData.amount,
                currency: orderData.currency,
                name: "NextLink Pro",
                description: "Upgrade to Pro Plan",
                image: "/logo/light.svg", // Optional logo
                order_id: orderData.id,
                handler: async function (response: any) {
                    // 4. Verify Payment
                    try {
                        const verifyRes = await fetch("/api/v1/payment/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        if (verifyRes.ok) {
                            toast.success("Upgrade Successful!", {
                                description: "You are now on the Pro plan."
                            });
                            onOpenChange(false);
                            // Ideally refresh user profile here or redirect
                            window.location.reload();
                        } else {
                            toast.error("Payment verification failed");
                        }
                    } catch (err) {
                        console.error(err);
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                    contact: ""
                },
                theme: {
                    color: themeColor,
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upgrade to Pro</DialogTitle>
                    <DialogDescription>
                        Unlock the full potential of NextLink with our Pro plan.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {plansLoading ? (
                        <GeneralLoader title="Loading Plan Details" description="Please wait..." />
                    ) : (
                        <>
                            <div className="flex items-baseline justify-center mb-6">
                                <span className="text-3xl font-bold">₹{PRO_PLAN_AMOUNT}</span>
                                <span className="text-muted-foreground ml-1">/month</span>
                            </div>

                            <ul className="space-y-3">
                                {proPlan?.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                )) || [
                                    "Unlimited Short Links",
                                    "Advanced Analytics",
                                    "Custom Domains",
                                    "Priority Support",
                                    "Ad-free Experience"
                                ].map((feature) => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handlePayment}
                        disabled={loading}
                        className={`${UPGRADE_GRADIENT_STYLES} border-0 hover:opacity-90`}
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
