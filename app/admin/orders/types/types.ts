// // types/types.ts

// export interface IUser {
//   id: string;
//   username: string;
//   email: string;
// }

// export interface IProduct {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   sizes: string[];
//   colors: string[];
// }

// export interface IOrderItem {
//   id: string;
//   orderId: string;
//   productId: string;
//   quantity: number;
//   size: string;
//   color: string;
//   price: number;
//   product: IProduct;
// }

// export interface IOrder {
//   id: string;
//   userId: string;
//   total: number;
//   products: string;
//   createdAt: string;
//   user: IUser;
//   items: IOrderItem[];
// }







export interface IUser {
    id: string
    username: string
    email: string
    role: string
    isVerified: boolean
    createdAt: string
}

export interface ICategory {
    id: string
    name: string
    slug: string
}

export interface IProduct {
    id: string
    name: string
    price: number
    image: string
    category: ICategory
    categoryId: string
    sizes: string[]
    colors: string[]
    isBest: boolean
    isPopular: boolean
    isSale: boolean
    createdAt: string
}

export interface IOrderItem {
    id: string
    orderId: string
    productId: string
    product?: IProduct
    quantity: number
    size: string
    color: string
    price: number
}

export interface IOrder {
    id: string
    userId: string
    user?: IUser
    total: number
    products?: string
    items?: IOrderItem[]
    createdAt: string
}