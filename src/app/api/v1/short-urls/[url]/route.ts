// app/api/v1/short-urls/[url]/route.ts

import { asyncHandler, throwBadRequest } from "@/lib/async-handler";
import client from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type ContextType = {
  params: Promise<{ url: string }>;
};

export const GET = async (req: NextRequest, { params }: ContextType) => {
  try {
    const { url } = await params;

    if (!url) {
      return throwBadRequest("Missing url");
    }

    const shortUrl = await client.url.findFirst({
      where: {
        short_url: url,
      },
    });

    if (!shortUrl) {
      return throwBadRequest("Short url not found");
    }

    return NextResponse.json({
      status: "success",
      message: "Short url found",
      data: {
        short_url: shortUrl.short_url,
        original_url: shortUrl.original_url,
      },
    });
  } catch (err) {
    throw throwBadRequest("Short url not found");
  }
};
