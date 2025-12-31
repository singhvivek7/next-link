// /api/v1/register

import {
  asyncHandler,
  successResponse,
  throwConflict,
  throwValidationError,
} from "@/lib/helper/async-handler";
import { hash } from "@/lib/helper/bcrypt";
import client from "@/lib/helper/db";
import { registerSchema } from "@/lib/helper/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  // Validate request
  const { success, data } = registerSchema.safeParse(body);

  if (!success) {
    return throwValidationError("Invalid request");
  }

  // Check if user already exists
  const existingUserCount = await client.user.count({
    where: {
      email: data.email,
    },
  });

  if (existingUserCount > 0) {
    return throwConflict("User already exists");
  }

  // Hash password
  const hashedPassword = await hash(data.password);
  data.password = hashedPassword;
  try {

    // Create user
    const user = await client.user.create({
      data,
    });
    console.log("🚀 ~ user:", user)
  } catch (error) {
    console.log("🚀 ~ error:", error)
  }

  return successResponse(
    {
      user_id: '', // user.id,
    },
    "User registered successfully",
    201
  );
});
