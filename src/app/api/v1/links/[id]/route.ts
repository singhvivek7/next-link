import { NextRequest, NextResponse } from "next/server"

import { asyncHandler, AsyncParams, throwNotFound } from "@/lib/helper/async-handler"
import client from "@/lib/helper/db"
import { getTokenData } from "@/lib/helper/jwt"

export const DELETE = asyncHandler(async (request: NextRequest, asyncParams: AsyncParams) => {
    const params = await asyncParams.params;
    const id = params.id || "";
    const tokenData = getTokenData(request);
    await client.url.delete({
        where: {
            id,
            user_id: tokenData.user_id
        }
    })
    return NextResponse.json({ message: "Link deleted successfully" }, { status: 200 })
})

export const PATCH = asyncHandler(async (request: NextRequest, asyncParams: AsyncParams) => {
    const params = await asyncParams.params;
    const id = params.id || "";
    const body = await request.json()
    const tokenData = getTokenData(request)
    const link = await client.url.count({
        where: {
            id,
            user_id: tokenData.user_id
        }
    })
    if (link < 1) {
        throw throwNotFound("Link not found");
    }
    await client.url.update({
        where: {
            id,
            user_id: tokenData.user_id
        },
        data: {
            is_active: body.is_active
        }
    })
    return NextResponse.json({ message: "Link updated successfully" }, { status: 200 })
})

export const GET = asyncHandler(async (request: NextRequest, asyncParams: AsyncParams) => {
    const params = await asyncParams.params;
    const id = params.id || "";
    const tokenData = getTokenData(request)
    const link = await client.url.findUnique({
        where: {
            id,
            user_id: tokenData.user_id
        },
        select: {
            clicks: true,
            created_at: true,
            expires_at: true,
            id: true,
            is_active: true,
            original_url: true,
            short_url: true,
            updated_at: true,
            user_id: true
        }
    });
    return NextResponse.json({
        message: "Link fetched successfully",
        data: link
    })
})
