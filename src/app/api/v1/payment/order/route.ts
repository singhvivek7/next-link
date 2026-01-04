
import { NextRequest, NextResponse } from "next/server";
import { Orders } from "razorpay/dist/types/orders";

import { asyncHandler } from "@/lib/helper/async-handler";
import client from "@/lib/helper/db";
import { getTokenData } from "@/lib/helper/jwt";
import { razorpay } from "@/lib/helper/razorpay";

export const POST = asyncHandler(async (req: NextRequest) => {
    const { user_id } = getTokenData(req);
    const body = await req.json();
    const { amount, currency = "INR" } = body;

    const options: Orders.RazorpayOrderCreateRequestBody | Orders.RazorpayTransferCreateRequestBody | Orders.RazorpayAuthorizationCreateRequestBody = {
        amount: amount * 100, // amount in smallest currency unit
        currency,
        receipt: `rcpt_${Date.now().toString().slice(-10)}`, // Max 40 chars
        notes: {
            user_id,
            plan_type: "PRO"
        }
    };

    const order = await razorpay.orders.create(options);

    // Create a pending transaction record
    await client.transaction.create({
        data: {
            amount: amount,
            currency,
            status: "PENDING",
            order_id: order.id,
            user_id: user_id,
            plan_type: "PRO" // Assuming PRO plan for now
        }
    });

    return NextResponse.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount
    });
});
