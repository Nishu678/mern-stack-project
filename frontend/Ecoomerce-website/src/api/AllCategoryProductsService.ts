import { fetcher } from '@/lib/fetcher'
import type { CategoriesResponse, Product, ProductsResponse } from './AllCategoryProductsService.type'


export default class AllCategoryProductsService {
  static getCategories(limit: number) {
    return fetcher.get<CategoriesResponse>('/categories', { limit })
  }

  static getProducts(limit: number, offset: number) {
    return fetcher.get<ProductsResponse>('/products', { limit, offset })
  }
  static getParticularProduct(id: number) {
    return fetcher.get<Product>(`/products/${id}`)
  }

  static getCategoryProducts(id: number, limit: number, offset: number) {
    return fetcher.get<ProductsResponse>(`/categories/${id}/products`, { limit, offset })
  }
}
