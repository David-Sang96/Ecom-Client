import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
    .min(3, "Product name should be at least 3 characters")
    .max(20, "Product name should be at most 20 characters"),

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
    .number({ invalid_type_error: "Price is required" })
    .refine((val) => /^\d+\.\d{2}$/.test(val.toFixed(2)), {
      message: "Price must have exactly 2 decimal places",
    }),

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
    .optional(),
});
