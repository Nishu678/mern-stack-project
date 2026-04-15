import { Star, ShoppingCart, Heart, Eye, Tag, TrendingUp } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import AllCategoryProductsService from '@/api/AllCategoryProductsService';
import { formatINR } from '../common/formatINR';
import RatingStar from '../common/RatingStar';
import NewProductsSkeleton from '../home-skeltons/new-products-skelton';

// const featuredProducts = [
//   {
//     id: 1,
//     name: 'Wireless Bluetooth Headphones',
//     price: '₹2,499',
//     originalPrice: '₹3,999',
//     discount: '30%',
//     rating: 4,
//     reviews: 156,
//     stock: 'In Stock',
//     category: 'Electronics',
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 2,
//     name: 'Running Sports Shoes',
//     price: '₹1,899',
//     originalPrice: '₹2,999',
//     discount: '25%',
//     rating: 5,
//     reviews: 89,
//     stock: 'In Stock',
//     category: 'Footwear',
//     image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 3,
//     name: 'Designer Handbag',
//     price: '₹3,499',
//     originalPrice: '₹4,999',
//     discount: '20%',
//     rating: 4,
//     reviews: 67,
//     stock: 'In Stock',
//     category: 'Bags',
//     image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 4,
//     name: 'Organic Honey 500g',
//     price: '₹299',
//     originalPrice: '₹399',
//     discount: '15%',
//     rating: 5,
//     reviews: 124,
//     stock: 'In Stock',
//     category: 'Groceries',
//     image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 5,
//     name: 'Smart Watch Series 5',
//     price: '₹5,999',
//     originalPrice: '₹7,999',
//     discount: '25%',
//     rating: 4.5,
//     reviews: 203,
//     stock: 'In Stock',
//     category: 'Electronics',
//     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 6,
//     name: 'Casual Backpack',
//     price: '₹1,299',
//     originalPrice: '₹1,799',
//     discount: '28%',
//     rating: 4,
//     reviews: 78,
//     stock: 'In Stock',
//     category: 'Bags',
//     image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 7,
//     name: 'Running Shorts',
//     price: '₹799',
//     originalPrice: '₹1,199',
//     discount: '33%',
//     rating: 4.5,
//     reviews: 45,
//     stock: 'In Stock',
//     category: 'Sports',
//     image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 8,
//     name: 'Coffee Maker',
//     price: '₹3,299',
//     originalPrice: '₹4,499',
//     discount: '27%',
//     rating: 4,
//     reviews: 112,
//     stock: 'In Stock',
//     category: 'Home',
//     image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=250&q=80'
//   },
// ]

export default function FeaturedProducts() {

  const { data, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => AllCategoryProductsService.getProducts(10, 0),
    refetchOnWindowFocus: true,
  })
  const featuredProducts = data ?? []
  console.log(featuredProducts);

  if (isLoading) {
    return <NewProductsSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Featured Products</h2>
              <p className="text-muted-foreground text-sm">Best selling products this week</p>
            </div>
          </div>
          <Link
            to="/products/featured"
            className="text-sm text-primary hover:text-primary/90 font-medium"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/particularProduct/${product.id}`}
            className="group bg-card rounded-lg border hover:shadow-sm transition-all duration-200"
          >
            {/* Image Container */}
            <div className="relative">
              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images[0] || 'img/defaultImg.avif'}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-sm"
                />
                {/* Discount Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                    -{product.discount || '10%'}
                  </span>
                </div>
                {/* Quick Actions */}
                <button className="absolute top-2 right-2 bg-background/90 hover:bg-background p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-3">
              {/* Category & Stock */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{product.category?.name || '-'}</span>
                <span className="text-xs font-medium text-emerald-600">
                  {product.stock || 'In Stock'}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                {product.title || 'Product Name'}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center">
                  {/* {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating || 4.8)
                        ? 'fill-amber-400 text-amber-400'
                        : i < (product.rating || 4.8)
                          ? 'fill-amber-400/50 text-amber-400'
                          : 'fill-muted text-muted'
                        }`}
                    />
                  ))} */}
                  <RatingStar rating={product.rating ?? 3.5} />
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews || 345})</span>
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-foreground">{formatINR(product.price)}</span>
                    {/* <span className="text-xs text-muted-foreground line-through">{formatINR(product.originalPrice)}</span> */}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-md transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/products/featured"
          className="text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2 border border-border hover:border-input rounded-lg transition-colors"
        >
          View All Featured Products
        </Link>
      </div>
    </div>
  )
}