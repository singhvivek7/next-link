import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/lib/helper/async-handler";
import client from "@/lib/helper/db";
import { getTokenData } from "@/lib/helper/jwt";

export const GET = asyncHandler(async (request: NextRequest) => {
    const decodedToken = getTokenData(request);
    const user = await client.user.findFirst({
        where: {
            id: decodedToken.user_id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            username: true,
            avatar: true,
            plan: true,
            created_at: true,
            updated_at: true,
        }
    })
    return NextResponse.json({ message: "success", data: user }, { status: 200 })
})