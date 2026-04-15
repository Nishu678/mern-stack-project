import AllCategoryProductsService from '@/api/AllCategoryProductsService';
import { formatINR } from '@/components/common/formatINR';
import RatingStar from '@/components/common/RatingStar';
import { Slider } from '@/components/ui/slider';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import { Heart, ShoppingCart, Tag, Filter, Grid, List, Star, X } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/_appLayout/categoryProducts/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortedBy, setSortedBy] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const { data: Products } = useQuery({
    queryKey: ['new-products'],
    queryFn: () => AllCategoryProductsService.getCategoryProducts(Number(id), 30, 0),
    refetchOnWindowFocus: true,
  })
  const newProducts = Products ?? []
  console.log(newProducts);


  const { data: ProductCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => AllCategoryProductsService.getCategories(30),
    refetchOnWindowFocus: true,
  })
  const categories = ProductCategories ?? []

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;

    if (selectedCategories.includes(category)) {
      // If already selected, remove it
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // If not selected, add it
      setSelectedCategories([...selectedCategories, category]);
    }
  };


  const searchProducts = newProducts.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )
    //category filter
    .filter((product) => selectedCategories.length === 0 ? true : selectedCategories.includes(product.category?.name || ''))

    //price filter
    .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])


  const sortedProducts = [...searchProducts].sort((a, b) => {
    switch (sortedBy) {
      case 'Price: Low to High':
        return (a.price || 0) - (b.price || 0);
      case 'Price: High to Low':
        return (b.price || 0) - (a.price || 0);
      case 'Customer Rating':
        return (b.rating || 0) - (a.rating || 0);
      case "NEWEST":
        return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
      default:
        return 0;
    }
  })


  // Sorting logic explanation:
  // negative-->	a pehle aayega
  // positive-->	b pehle aayega
  // 0-->	koi change nahi

  // or we can say if doing 
  // ascending--> a-b
  // descending--> b-a


  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRating(null);
    setSortedBy("Featured");
    setSearchTerm("");
    setPriceRange([0, 10000]);
  }

  // Categories for filter (you can get this from API)
  // const categories = [
  //   'Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Beauty', 'Sports'
  // ];

  const ratingOptions = [4, 3, 2, 1];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with view toggle */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Browse our collection of products</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}

              className="w-64 pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                type="button"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 px-4 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 px-4 ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <List size={18} />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{newProducts.length}</span> products
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white border rounded-lg p-5 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Filter size={18} />
                Filters
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6 pb-6 border-b">
              <h4 className="font-medium text-gray-900 mb-4">Price Range</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">₹{priceRange[0]}</span>
                  <span className="text-gray-600">₹{priceRange[1]}</span>
                </div>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Min</label>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Max</label>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mb-6 pb-6 border-b">
              <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={category.name}
                      checked={selectedCategories?.includes(category.name)} //check if selectedCategories includes the category name
                      onChange={handleCategoryChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{category.name}</span>
                    <span className="ml-auto text-gray-500 text-sm">(12)</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ratings Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-4">Customer Ratings</h4>
              <div className="space-y-2">
                {ratingOptions.map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600 text-sm">& above</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-4">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-700">In Stock</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-700">Out of Stock</span>
                </label>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Sort By</h4>
              <select className="w-full border rounded px-3 py-2 text-sm" value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:w-3/4">
          {viewMode === 'grid' ? (
            /* Grid View */
            (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
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
                        src={product.images[0] || 'img/defaultImg.avif'}
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
                        <RatingStar rating={product.rating ?? 3} />
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews || 124})</span>
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-foreground">{formatINR(product.price)}</span>
                          {/* <span className="text-xs text-muted-foreground line-through">{formatINR(product.discount_price)}</span> */}
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
            </div>)
          ) : (
            /* List View */
            (<div className="space-y-4">
              {sortedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/particularProduct/${product.id}`}
                  className="group bg-white border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Image Container */}
                  <div className="md:w-1/4">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0] || 'img/defaultImg.avif'}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 hover:rounded-t-sm transition-transform duration-300 rounded-t-sm"
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                          -{product.discount || 50}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 md:w-3/4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs text-gray-500">{product.category?.name || '-'}</span>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {product.title || 'Product Name'}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <RatingStar rating={product.rating ?? 5} />
                            <span className="text-sm text-gray-500">({product.reviews || 124} reviews)</span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {product.description || 'No description available.'}
                          </p>
                        </div>
                        <button className="bg-white hover:bg-gray-50 p-2 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-xl font-bold text-gray-900">{formatINR(product.price)}</span>
                          <span className="text-sm text-gray-500 line-through">{formatINR(product.discount_price)}</span>
                          <span className="text-xs text-emerald-600 font-medium">
                            {product.stock || 'In Stock'}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors text-sm cursor-pointer">
                          <ShoppingCart size={16} className="inline mr-2" />
                          Add to Cart
                        </button>
                        <button className="border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-md transition-colors text-sm cursor-pointer">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>)
          )}

          {/* Load More Button (if needed) */}
          {/* <div className="flex justify-center mt-8">
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-2 rounded-lg transition-colors">
              Load More Products
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}