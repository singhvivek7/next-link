// app/api/v1/short-urls/[url]/route.ts

import { NextRequest, NextResponse } from "next/server";

import { throwBadRequest, throwError } from "@/lib/helper/async-handler";
import client from "@/lib/helper/db";

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
        is_active: true,
      },
    });

    if (!shortUrl) {
      throw throwBadRequest("Short url not found or disabled");
    }

    return NextResponse.json({
      status: "success",
      message: "Short url found",
      data: {
        short_url: shortUrl.short_url,
        original_url: shortUrl.original_url,
      },
    });
  } catch (err: any) {
    throw throwError(err.status, err.message);
  }
};
