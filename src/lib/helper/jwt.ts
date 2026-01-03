import { sign, verify } from "jsonwebtoken";

import { IJwtPayload } from "@/app/types/auth.type";

const secret = process.env.JWT_SECRET as string;

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
