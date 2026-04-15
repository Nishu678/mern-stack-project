import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AllCategoryProductsService from "@/api/AllCategoryProductsService";
import HeroBannerSkelton from "../home-skeltons/hero-banner-skelton";

export default function FeaturedCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 1,
      title: "Electronics",
      count: "24 products",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Fashion",
      count: "56 products",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Home & Living",
      count: "32 products",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "Beauty",
      count: "18 products",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      title: "Sports",
      count: "27 products",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      title: "Groceries",
      count: "42 products",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => AllCategoryProductsService.getCategories(30),
    refetchOnWindowFocus: true,
  });
  const ProductCategories = data ?? [];
  console.log(ProductCategories);

  if (isLoading) {
    return <HeroBannerSkelton />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Categories
          </h2>
          <p className="text-gray-600 mt-2">
            Discover our top product categories
          </p>
        </div>

        {/* Navigation */}
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full border hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full border hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Scrollable Categories */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ProductCategories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 w-64 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() =>
                (window.location.href = `/categoryProducts/${category.id}`)
              }
            >
              <div className="relative h-64 overflow-hidden rounded-xl">
                <img
                  src={category.image}
                  alt={category.slug}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {category.name || "Unknown"}
                  </h3>
                  <p className="text-sm opacity-90">{category.slug || "-"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
