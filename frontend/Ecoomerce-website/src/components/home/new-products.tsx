import { Star, ShoppingCart, Heart, Tag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import AllCategoryProductsService from "@/api/AllCategoryProductsService";
import { formatINR } from "../common/formatINR";
import RatingStar from "../common/RatingStar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import type { Product } from "@/api/AllCategoryProductsService.type";
import NewProductsSkeleton from "../home-skeltons/new-products-skelton";
import { useState } from "react";

// const newProducts = [
//   {
//     id: 1,
//     name: 'Men Alias-N Regular Fit Shirt',
//     price: '₹1,500',
//     originalPrice: '₹3,000',
//     discount: '50%',
//     rating: 4.5,
//     reviews: 128,
//     stock: 'In Stock',
//     category: 'Shirts',
//     image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 2,
//     name: 'A-Line Kurti With Shrug',
//     price: '₹1,300',
//     originalPrice: '₹1,450',
//     discount: '10%',
//     rating: 5,
//     reviews: 89,
//     stock: 'In Stock',
//     category: 'Kurtis',
//     image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 3,
//     name: 'Chikankari Woven Kurta',
//     price: '₹1,200',
//     originalPrice: '₹1,350',
//     discount: '11%',
//     rating: 5,
//     reviews: 64,
//     stock: 'In Stock',
//     category: 'Ethnic',
//     image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 4,
//     name: 'Men Layerr Regular Fit',
//     price: '₹950',
//     originalPrice: '₹1,200',
//     discount: '21%',
//     rating: 5,
//     reviews: 42,
//     stock: 'In Stock',
//     category: 'T-Shirts',
//     image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 5,
//     name: 'Printed Cotton Kurti',
//     price: '₹899',
//     originalPrice: '₹1,199',
//     discount: '25%',
//     rating: 4,
//     reviews: 56,
//     stock: 'In Stock',
//     category: 'Kurtis',
//     image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 6,
//     name: 'Casual Button Shirt',
//     price: '₹1,099',
//     originalPrice: '₹1,499',
//     discount: '27%',
//     rating: 4.5,
//     reviews: 73,
//     stock: 'In Stock',
//     category: 'Shirts',
//     image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=250&q=80'
//   },
//   {
//     id: 7,
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
//     id: 8,
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
//     id: 9,
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
// ]

export default function NewProducts() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["new-products"],
    queryFn: () => AllCategoryProductsService.getProducts(30, 0),
    refetchOnWindowFocus: true,
  });
  const newProducts = data ?? [];
  console.log(newProducts);

  const handleAddToCart = (product: Product) => {
    console.log(product);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Product) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      cart.push({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        discount: product.discount || 0,
        image: product.images[0],
        category: product.category?.name || "General",
        stock: "In Stock",
        quantity: 1,
      }); // Add new item
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleLike = (product: Product, e) => {
    e.preventDefault();
    e.stopPropagation();

    setLiked((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
  };

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
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                New Arrivals
              </h2>
              <p className="text-muted-foreground text-sm">
                Fresh products added recently
              </p>
            </div>
          </div>
          <Link
            to="/products/new"
            className="text-sm text-primary hover:text-primary/90 font-medium"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {newProducts.map((product) => (
          <Link
            key={product.id}
            to={`/particularProduct/${product.id}`}
            className="group bg-card rounded-lg border hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative">
              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images[0] || "img/defaultImg.avif"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 hover:rounded-t-sm transition-transform duration-300 rounded-t-sm"
                />
                {/* Discount Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                    -{product.discount || 50}%
                  </span>
                </div>
                {/* Quick Actions */}
                <button
                  className={`absolute top-2 right-2 bg-background/90 hover:bg-background p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity`}
                  onClick={() => handleLike(product)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      liked[product.id]
                        ? "fill-rose-500 text-rose-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-3">
              {/* Category & Stock */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {product.category?.name || "-"}
                </span>
                <span className="text-xs font-medium text-emerald-600">
                  {product.stock || "In Stock"}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                {product.title || "Product Name"}
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
                  <RatingStar rating={product.rating ?? 3} />
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews || 124})
                </span>
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-foreground">
                      {formatINR(product.price)}
                    </span>
                    {/* <span className="text-xs text-muted-foreground line-through">{formatINR(product.discount_price)}</span> */}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link to="/addCart">
                        <button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-md transition-colors cursor-pointer"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-neutral-200 text-neutral-950 dark:bg-neutral-50 [&_svg]:bg-neutral-200 [&_svg]:fill-neutral-200 dark:[&_svg]:bg-neutral-50 dark:[&_svg]:fill-neutral-50">
                      Add to Cart
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button */}
      {/* <div className="flex justify-center mt-8">
        <Link
          to="/products/new"
          className="text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2 border border-border hover:border-input rounded-lg transition-colors"
        >
          Load More Products
        </Link>
      </div> */}
    </div>
  );
}
