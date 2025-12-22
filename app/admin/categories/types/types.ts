

export interface ICategory {
    id: string
    name: string
    slug: string
    createdAt: string
    _count?: {
        products: number
    }
}