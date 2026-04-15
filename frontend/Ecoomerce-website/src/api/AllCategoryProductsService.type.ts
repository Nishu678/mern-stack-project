// patients-service.types.ts (or a new file if you prefer)

export interface Category {
  id: number
  name: string
  slug: string
  image: string
  creationAt: string
  updatedAt: string
}

export type CategoriesResponse = Category[]

export interface Product {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: Category
  images: string[]
  creationAt: string
  updatedAt: string
}

export type ProductsResponse = Product[]


