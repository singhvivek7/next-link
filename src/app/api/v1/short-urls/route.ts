import { AUTH_COOKIE_NAME } from "@/app/constant/auth.constant";
import { asyncHandler, throwBadRequest } from "@/lib/async-handler";
import client from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { generateUniqueShortUrl } from "@/lib/short-url";
import { shortUrlSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

const isUrlExists = async (url: string) => {
  const count = await client.url.count({
    where: {
      short_url: url,
    },
  });

  return count > 0;
};

export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { success, data } = shortUrlSchema.safeParse(body);

  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (token) {
    const { user_id } = verifyJwt(token);
    body.user_id = user_id;
  }

  if (!success) {
    return throwBadRequest("Invalid url");
  }

  const short_url = await generateUniqueShortUrl({
    length: 6,
    ensureUnique: async (url: string) => !(await isUrlExists(url)),
  });

  await client.url.create({
    data: {
      short_url,
      original_url: data.url,
      ...(body.user_id && { user_id: body.user_id }),
    },
  });

  return NextResponse.json({
    status: "success",
    message: "Short url created successfully",
    data: {
      short_url,
      original_url: data.url,
    },
  });
});
