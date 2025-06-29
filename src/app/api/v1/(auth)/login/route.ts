// /api/v1/login

import { AUTH_COOKIE_NAME } from "@/app/constant/auth.constant";
import { IJwtPayload } from "@/app/types/auth.type";
import {
  asyncHandler,
  successResponse,
  throwBadRequest,
  throwConflict,
  throwValidationError,
} from "@/lib/async-handler";
import { compare, hash } from "@/lib/bcrypt";
import client from "@/lib/db";
import { signJwt } from "@/lib/jwt";
import { loginSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  // Validate request
  const { success, data } = loginSchema.safeParse(body);

  if (!success) {
    return throwValidationError("Invalid request");
  }

  // Check if user already exists
  const user = await client.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return throwBadRequest("Email or password is incorrect");
  }

  // Hash password
  const isMatched = await compare(data.password, user.password);

  if (!isMatched) {
    return throwBadRequest("Email or password is incorrect");
  }

  // create token
  const payload: IJwtPayload = {
    user_id: user.id,
  };

  const token = signJwt(payload);

  return successResponse(
    {
      user_id: user.id,
      token,
    },
    "Login successful",
    200
  );
});
