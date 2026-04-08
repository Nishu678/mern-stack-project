import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({
      message: "Invalid email address",
    })
    .min(3, "Email must be at least 3 characters")
    .max(255, "Email must be at most 255 characters"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be at most 255 characters"),
});

export const signUpSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters")
    .trim(),
  phone: z.array(
    z.object({
      number: z
        .string({ required_error: "Phone number is required" })
        .min(10, "Phone number must be at least 10 characters")
        .max(15, "Phone number must be at most 15 characters"),
    }),
  ),
});
