// src/types/index.ts
import { Role, Category } from "@prisma/client";

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  isVerified: boolean;
  createdAt: Date;
}

export interface SafeUser extends Omit<User, "createdAt"> {
  createdAt: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  sizes: string[];
  colors: string[];
  isBest: boolean;
  isPopular: boolean;
  isSale: boolean;
  createdAt: Date;
}

export interface SafeProduct extends Omit<Product, "createdAt"> {
  createdAt: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  total: number;
  products: string;
  createdAt: Date;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
  user: User;
}

// Order Item Types
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  product: Product;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  product: Product;
}

// API Response Types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
  details?: any;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: PaginationMeta;
}