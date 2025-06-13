import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productStatus = [
  "pending",
  "shipped",
  "cancelled",
  "completed",
  "failed",
  "processing",
];

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Product name is required")
    .min(10, "Product name should be at least 10 characters")
    .max(100, "Product name should be at most 100 characters"),

  description: z
    .string()
    .trim()
    .nonempty("Description is required")
    .min(10, "Description must be at least 10 characters"),

  categories: z
    .string()
    .min(1, "Category is required")
    .refine(
      (val) => ["Electronics", "Clothing", "Kitchen", "Books"].includes(val),
      "Invalid category. Must be Electronics, Clothing, Kitchen, or Books",
    ),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Must be a number",
    })
    .min(1, "Must be a positive number")
    .refine((val) => {
      const str = val.toString();
      const decimalPart = str.split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    }, "Must have at most 2 decimal places")
    .transform((val) => Number(val.toFixed(2))),

  countInStock: z
    .number({ invalid_type_error: "Stock is required" })
    .int("Stock must be a whole number")
    .min(1, "Must have at least 1 stock"),

  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file && file.size <= MAX_FILE_SIZE, {
          message: `The image is too large. Please choose an image smaller than 5MB.`,
        })
        .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message:
            "Please upload a valid image file (JPEG, PNG, JPG, or WebP).",
        }),
    )
    .max(5, "You can upload up to 5 images.")
    .min(1, "Must have at least 1 image"),
});

export const updateProductSchema = z.object({
  productId: z
    .string()
    .trim()
    .nonempty("Product ID is required")
    .regex(/^[a-f\d]{24}$/i, "Invalid Product ID format"),

  name: z
    .string()
    .trim()
    .nonempty("Product name is required")
    .min(10, "Product name should be at least 10 characters")
    .max(100, "Product name should be at most 100 characters"),

  description: z
    .string()
    .trim()
    .nonempty("Description is required")
    .min(10, "Description must be at least 10 characters"),

  categories: z
    .array(
      z
        .string()
        .refine(
          (val) =>
            ["Electronics", "Clothing", "Kitchen", "Books"].includes(val),
          "Invalid category. Must be Electronics, Clothing, Kitchen, or Books",
        ),
    )
    .min(1, "Please select at least one category"),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Must be a number",
    })
    .min(1, "Must be a positive number")
    .refine((val) => {
      const str = val.toString();
      const decimalPart = str.split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    }, "Must have at most 2 decimal places")
    .transform((val) => Number(val.toFixed(2))),

  countInStock: z
    .number({ invalid_type_error: "Stock is required" })
    .int("Stock must be a whole number")
    .min(1, "Must have at least 1 stock"),

  status: z.string().trim().nonempty("Status is required"),

  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file && file.size <= MAX_FILE_SIZE, {
          message: `The image is too large. Please choose an image smaller than 5MB.`,
        })
        .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message:
            "Please upload a valid image file (JPEG, PNG, JPG, or WebP).",
        }),
    )
    .max(5, "You can upload up to 5 images.")
    .optional(),
});
