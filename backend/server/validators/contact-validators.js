import { z } from "zod";

export const contactSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters")
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email({
      message: "Invalid email address",
    })
    .min(3, "Email must be at least 3 characters")
    .max(255, "Email must be at most 255 characters"),
  message: z
    .string({ required_error: "Message is required" })
    .min(6, "Message must be at least 6 characters")
    .max(255, "Message must be at most 255 characters"),
});