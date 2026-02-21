







// export interface IUser {
//     id: string
//     username: string
//     email: string
//     role: string
//     isVerified: boolean
//     createdAt: string
// }

// export interface ICategory {
//     id: string
//     name: string
//     slug: string
// }

// export interface IProduct {
//     id: string
//     name: string
//     price: number
//     image: string
//     category: ICategory
//     categoryId: string
//     sizes: string[]
//     colors: string[]
//     isBest: boolean
//     isPopular: boolean
//     isSale: boolean
//     createdAt: string
// }

// export interface IOrderItem {
//     id: string
//     orderId: string
//     productId: string
//     product?: IProduct
//     quantity: number
//     size: string
//     color: string
//     price: number
// }





// export interface IOrder {
//     id: string
//     userId: string
//     user?: IUser
//     total: number
//     totalAmount?: number  
//     status: string  
//     paymentStatus: string 
//     trackingNumber?: string  
//     products?: string
//     orderItems?: IOrderItem[]  
//     createdAt: string
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
    status: string  
    paymentStatus: string 
    trackingNumber?: string  
    products?: string
    items?: IOrderItem[]  // ✅ Changed from orderItems to items
    createdAt: string
}