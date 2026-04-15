import { Star, ShoppingCart, TrendingUp } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const popularProducts = [
  {
    name: 'POCO C61, 4GB RAM, 64GB',
    price: '₹20,000',
    originalPrice: '₹15,000',
    rating: 5,
    stock: 'In Stock',
    category: 'Electronics',
    image: '📱'
  },
  {
    name: 'KSC "KHATUSHYAM COLL..."',
    price: '₹750',
    originalPrice: '₹520',
    rating: 5,
    stock: 'In Stock',
    category: 'Accessories',
    image: '👓'
  },
  {
    name: 'ZAALIQA Girls Black Watch',
    price: '₹1,000',
    originalPrice: '₹750',
    rating: 5,
    stock: 'In Stock',
    category: 'Watches',
    image: '⌚'
  },
]

export default function PopularProducts() {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-600 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">POPULAR PRODUCTS</h2>
          <p className="text-gray-500">Don't miss the current offers</p>
        </div>
      </div>

      <div className="space-y-4">
        {popularProducts.map((product, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-colors">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-2xl">
                  {product.image}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-emerald-600">{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                    </div>
                    <span className="text-xs text-gray-500">{product.stock}</span>
                  </div>

                  <button className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/products/popular">
        <button className="w-full mt-6 py-3 bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors">
          View All Popular Products
        </button>
      </Link>
    </div>
  )
}