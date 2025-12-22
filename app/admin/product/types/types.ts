// src/app/admin/types/types.ts

export interface IProduct {
  id: string
  name: string
  price: number
  image: string
  category: {
    id?: string
    name: string
  }
  sizes: string[]
  colors: string[]
  isBest: boolean
  isPopular: boolean
  isSale: boolean
  createdAt: string
}
export type CategoryName = "Men" | "Women" | "Bag"

// export interface IUser {
//   id: string
//   name: string
//   email: string
//   password?: string
//   role: "ADMIN" | "USER"
//   isVerified: boolean
//   createdAt?: string
//   updatedAt?: string
// }



