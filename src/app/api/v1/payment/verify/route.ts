
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { env } from "@/config/env";
import { asyncHandler, throwBadRequest } from "@/lib/helper/async-handler";
import client from "@/lib/helper/db";

export const POST = asyncHandler(async (req: NextRequest) => {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature !== expectedSign) {
        // Mark transaction as failed
        await client.transaction.updateMany({
            where: { order_id: razorpay_order_id },
            data: { status: "FAILED" }
        });
        return throwBadRequest("Invalid payment signature");
    }

    // Payment verification successful
    // 1. Update transaction status
    await client.transaction.updateMany({
        where: { order_id: razorpay_order_id },
        data: {
            status: "SUCCESS",
            payment_id: razorpay_payment_id,
            signature: razorpay_signature
        }
    });

    // Find the transaction to get the user_id (updateMany returns count)
    // In a real app, order_id should be unique in transactions.
    const successTx = await client.transaction.findFirst({
        where: { order_id: razorpay_order_id }
    });

    if (successTx) {
        // 2. Update user plan
        await client.user.update({
            where: { id: successTx.user_id },
            data: {
                plan: "PRO",
                // Set expiry to 30 days from now (example)
                plan_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });
    }

    return NextResponse.json({ message: "Payment verified successfully" });
});
