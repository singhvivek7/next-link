// app/api/v1/short-urls/[url]/route.ts

import { NextRequest, NextResponse } from "next/server";

import { analyticsEmitter } from "@/lib/analytics/emitter";
import { ANALYTICS_EVENTS } from "@/lib/analytics/types";
import { throwBadRequest, throwError } from "@/lib/helper/async-handler";
import client from "@/lib/helper/db";

export const dynamic = "force-dynamic";

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

    analyticsEmitter.emit(ANALYTICS_EVENTS.TRACK_VIEW, {
      shortUrl: shortUrl.short_url,
      ip: req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || req.headers.get("ip")
    });

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
