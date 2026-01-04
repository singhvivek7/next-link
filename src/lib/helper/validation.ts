import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  history: z.array(z.string()).optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const shortUrlSchema = z.object({
  url: z
    .string()
    .min(1, {
      message: "URL is required",
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ShortUrlSchema = z.infer<typeof shortUrlSchema>;
