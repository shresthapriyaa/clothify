
import { z } from "zod";

// Order Item Schema
export const orderItemSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().int().positive().min(1),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  price: z.number().positive(),
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;

// Create Order Schema (Checkout)
export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  total: z.number().positive("Total must be positive"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// Cart Item Schema
export const cartItemSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().int().positive().min(1).max(99),
  size: z.string().min(1),
  color: z.string().min(1),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;

// Update Cart Item Schema
export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive().min(1).max(99),
});