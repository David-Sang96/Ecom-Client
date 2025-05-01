import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: "Name must be at least 5 characters" })
    .max(50, { message: "Name must not be longer than 50 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "Password must contain at least one letter and one digit"
    )
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password is too long"),
  role: z.string().trim().optional(),
  secret: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[a-zA-Z0-9]+$/.test(val),
      "Secret can only contain letters and numbers"
    ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "Password must contain at least one letter and one digit"
    )
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password is too long"),
});

export const forgetPasswordEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
});

export const newPasswordSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "Password must contain at least one letter and one digit"
      )
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password is too long"),
    confrimPassword: z.string(),
    token: z.string({ message: "Invalid token" }).trim(),
  })
  .refine((data) => data.password === data.confrimPassword, {
    message: "Password do not match",
    path: ["confrimPassword"],
  });
