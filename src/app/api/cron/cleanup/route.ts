import { NextResponse } from "next/server";

import { asyncHandler } from "@/lib/helper/async-handler";
import client from "@/lib/helper/db";

export const dynamic = 'force-dynamic';

export const GET = asyncHandler(async () => {
    const result = await client.url.deleteMany({
        where: {
            expires_at: {
                lt: new Date(),
            },
        },
    });

    return NextResponse.json({
        message: "Cleanup successful",
        deletedCount: result.count,
    });

})
