import { Link } from '@tanstack/react-router'
import { Shirt, Smartphone, ShoppingBag, Footprints, ShoppingCart, Heart } from 'lucide-react'

const categories = [
  { icon: <Shirt className="w-8 h-8" />, label: 'Fashion', href: '/fashion', color: 'bg-pink-100 text-pink-600' },
  { icon: <Smartphone className="w-8 h-8" />, label: 'Electronics', href: '/electronics', color: 'bg-blue-100 text-blue-600' },
  { icon: <ShoppingBag className="w-8 h-8" />, label: 'Bags', href: '/bags', color: 'bg-amber-100 text-amber-600' },
  { icon: <Footprints className="w-8 h-8" />, label: 'Footwear', href: '/footwear', color: 'bg-purple-100 text-purple-600' },
  { icon: <ShoppingCart className="w-8 h-8" />, label: 'Groceries', href: '/groceries', color: 'bg-emerald-100 text-emerald-600' },
  { icon: <Heart className="w-8 h-8" />, label: 'Beauty & Wellness', href: '/beauty', color: 'bg-rose-100 text-rose-600' },
]

export default function CategoriesSection() {
  return (
    <div className="bg-white py-8 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shop By Category</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={category.href}
              className="group"
            >
              <div className="flex flex-col items-center p-6 rounded-2xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
                <div className={`p-4 rounded-xl mb-3 ${category.color} group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <div className="font-semibold text-gray-700 group-hover:text-emerald-600">
                  {category.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}