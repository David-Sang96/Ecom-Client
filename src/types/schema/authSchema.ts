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
      "Password must contain at least one letter and one digit",
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
      "Secret can only contain letters and numbers",
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
      "Password must contain at least one letter and one digit",
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
        "Password must contain at least one letter and one digit",
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

export const resetPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "Current password must contain at least one letter and one digit",
      )
      .min(8, "Current password must be at least 8 characters")
      .max(15, "Current password is too long"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "New password must contain at least one letter and one digit",
      )
      .min(8, "New password must be at least 8 characters")
      .max(15, "New password is too long"),
    confrimPassword: z.string(),
  })
  .refine((data) => data.password === data.confrimPassword, {
    message: "Passwords do not match",
    path: ["confrimPassword"],
  });

export const resetAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: "Name must be at least 5 characters" })
    .max(50, { message: "Name must not be longer than 50 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const uploadProfileSchema = z.object({
  image: z
    .instanceof(File, {
      message: "Please select an image file.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than 5MB.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid image file (JPEG, PNG, JPG, or WebP).",
    }),
});
