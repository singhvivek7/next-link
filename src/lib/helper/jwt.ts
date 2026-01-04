import { sign, verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

import { IJwtPayload } from "@/app/types/auth.type";
import { env } from "@/config/env";

import { throwUnauthorized } from "./async-handler";
import { decryptData } from "./storage";

const secret = env.JWT_SECRET as string;

export const signJwt = (payload: IJwtPayload) => {
  const t = sign(payload, secret, {
    expiresIn: "7d",
    algorithm: "HS256",
  });

  return t;
};

export const verifyJwt = (token: string) => {
  return verify(token, secret) as IJwtPayload;
};

export const getTokenData = (request: NextRequest) => {
  try {
    const encryptedToken = request.cookies.get("token")?.value;
    if (!encryptedToken) throw throwUnauthorized("Unauthorized");

    const token = decryptData(encryptedToken, secret);
    if (!token) throw throwUnauthorized("Unauthorized");

    return verifyJwt(token);
  } catch {
    throw throwUnauthorized("Unauthorized")
  }
}