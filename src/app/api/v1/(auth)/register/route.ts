// /api/v1/register

import {
  asyncHandler,
  successResponse,
  throwConflict,
  throwValidationError,
} from "@/lib/async-handler";
import { hash } from "@/lib/bcrypt";
import client from "@/lib/db";
import { registerSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  // Validate request
  const { success, data } = registerSchema.safeParse(body);

  if (!success) {
    return throwValidationError("Invalid request");
  }

  // Check if user already exists
  const existingUser = await client.user.count({
    where: {
      email: data.email,
    },
  });

  if (existingUser > 0) {
    return throwConflict("User already exists");
  }

  // Hash password
  const hashedPassword = await hash(data.password);
  data.password = hashedPassword;

  // Create user
  const user = await client.user.create({
    data,
  });

  return successResponse(
    {
      user_id: user.id,
    },
    "User registered successfully",
    201
  );
});
