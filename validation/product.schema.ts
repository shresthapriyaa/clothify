// src/validation/product.schema.ts
import { z } from "zod";

// Create Product Schema
export const createProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters").max(100),
  price: z.number().positive("Price must be positive"),
  image: z.string().url("Invalid image URL"),
  categoryId: z.string().min(1, "Category is required"),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  isBest: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isSale: z.boolean().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

// Update Product Schema
export const updateProductSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  price: z.number().positive().optional(),
  image: z.string().url().optional(),
  categoryId: z.string().min(1).optional(),
  sizes: z.array(z.string()).min(1).optional(),
  colors: z.array(z.string()).min(1).optional(),
  isBest: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isSale: z.boolean().optional(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;