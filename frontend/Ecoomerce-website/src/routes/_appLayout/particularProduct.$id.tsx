import { createFileRoute } from '@tanstack/react-router'
import { Star, ShoppingCart, Heart, Truck, RefreshCw, Shield, Tag, ArrowLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import AllCategoryProductsService from '@/api/AllCategoryProductsService'
import { formatINR } from '@/components/common/formatINR'
import { Link } from '@tanstack/react-router'
import RatingStar from '@/components/common/RatingStar'

export const Route = createFileRoute('/_appLayout/particularProduct/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    const [selectedSize, setSelectedSize] = useState('M')
    const [quantity, setQuantity] = useState(1)
    const [mainImage, setMainImage] = useState('img/defaultImg.avif')

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => AllCategoryProductsService.getParticularProduct(Number(id)),
        enabled: !!id,
    })

    const { data: similarProducts } = useQuery({
        queryKey: ['similar-products'],
        queryFn: () => AllCategoryProductsService.getProducts(4, 0),
    })

    useEffect(() => {
        if (product?.images && product.images.length > 0) {
            setMainImage(product.images[0])
        }
    }, [product?.images])

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="aspect-square bg-gray-200 rounded-lg"></div>
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-xl font-bold text-foreground">Product not found</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <Link
                to="/"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/90 font-medium mb-4 hover:underline"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
            </Link>


            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left - Images */}
                <div>
                    <div className="mb-4">
                        <div className="aspect-square overflow-hidden rounded-lg bg-card">
                            <img
                                // src={product.images?.[0] || 'img/defaultImg.avif'}
                                src={mainImage}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2">
                        {product.images?.slice(0, 4).map((image, index) => (
                            <div key={index} className={`w-16 h-16 rounded border overflow-hidden cursor-pointer ${mainImage === image ? `border-primary` : `border-transparent`}`} onClick={() => setMainImage(image)}>
                                <img
                                    src={image || 'img/defaultImg.avif'}
                                    alt={`Product view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Details */}
                <div className="space-y-6">
                    {/* Title and Brand */}
                    <div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                Brand: <span className="font-medium text-foreground">Sangria</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                                <div className="flex items-center">
                                    {/* {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < 4 ? `fill-amber-400 text-amber-400` : `fill-muted text-muted`}`}
                                        />
                                    ))} */}
                                    <RatingStar rating={product.rating ?? 3.5} />
                                </div>
                                <span className="text-xs text-muted-foreground">(15 Reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <div className="text-3xl font-bold text-foreground">{formatINR(product.price || "-")}</div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg text-muted-foreground line-through">{formatINR(product.originalPrice || "67670")}</span>
                            <span className="text-sm font-medium text-emerald-600">70% OFF</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium text-emerald-600">IN STOCK</span>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-2">Description</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {product.description || "No description available for this product."}
                        </p>
                    </div>

                    {/* Size Selection */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Select Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-3 py-2 text-sm rounded border transition-colors cursor-pointer ${selectedSize === size
                                        ? 'bg-primary/10 border-primary text-primary'
                                        : 'border-border hover:border-input'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex border border-border rounded-md">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="px-3 py-2 hover:bg-accent text-muted-foreground cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 border-x border-border text-foreground min-w-[40px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(prev => Math.min(12, prev + 1))}
                                    className="px-3 py-2 hover:bg-accent text-muted-foreground cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground">Only 12 items left</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors">
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                        <button className="flex-1 border border-primary text-primary hover:bg-primary/10 font-medium py-2.5 rounded-md transition-colors">
                            Buy Now
                        </button>
                        <button className="p-2.5 border border-border rounded-md hover:bg-accent transition-colors">
                            <Heart className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Features */}
                    <div className="border-t border-border pt-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Truck className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-xs font-medium text-foreground">Fast Delivery</p>
                                <p className="text-xs text-muted-foreground">2-3 days</p>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <RefreshCw className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-xs font-medium text-foreground">Easy Returns</p>
                                <p className="text-xs text-muted-foreground">15 days return</p>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-xs font-medium text-foreground">Secure Payment</p>
                                <p className="text-xs text-muted-foreground">100% secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            {similarProducts && similarProducts.length > 0 && (
                <div className="border-t border-border mt-12 pt-12">
                    <div className="mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Tag className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-foreground">Similar Products</h2>
                                <p className="text-muted-foreground text-sm">You might also like</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {similarProducts.slice(0, 4).map((similar) => (
                            <Link
                                key={similar.id}
                                to={`/particularProduct/${similar.id}`}
                                className="bg-card rounded-lg border hover:shadow-sm transition-all duration-200 cursor-pointer"
                            >
                                <div className="relative">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={similar.images?.[0] || 'img/defaultImg.avif'}
                                            alt={similar.title}
                                            className="w-full h-full object-cover rounded-t-lg"
                                        />
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                                                -50%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3">
                                    <div className="mb-2">
                                        <span className="text-xs text-muted-foreground">{similar.category?.name || "-"}</span>
                                    </div>

                                    <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                                        {similar.title || '-'}
                                    </h3>

                                    <div className="flex items-center gap-1.5 mb-3">
                                        <div className="flex items-center">
                                            {/* {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${i < 4 ? `fill-amber-400 text-amber-400` : `fill-muted text-muted`}`}
                                                />
                                            ))} */}
                                            <RatingStar rating={similar.rating ?? 3.5} />

                                        </div>
                                        <span className="text-xs text-muted-foreground">(124)</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm font-bold text-foreground">{formatINR(similar.price)}</span>
                                                <span className="text-xs text-muted-foreground line-through">
                                                    {formatINR(similar.price * 1.5)}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground p-1.5 rounded-md transition-colors">
                                            <ShoppingCart className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}