import { createFileRoute } from "@tanstack/react-router";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { formatINR } from "@/components/common/formatINR";

export const Route = createFileRoute("/_appLayout/addCart")({
  component: RouteComponent,
});

// Mock cart data (you would fetch this from your API)
// const cartItems = [
//   {
//     id: 1,
//     name: "Men Alias-N Regular Fit Shirt",
//     price: 1500,
//     originalPrice: 3000,
//     discount: 50,
//     quantity: 2,
//     image:
//       "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=250&q=80",
//     category: "Shirts",
//     stock: "In Stock",
//   },
//   {
//     id: 2,
//     name: "A-Line Kurti With Shrug",
//     price: 1300,
//     originalPrice: 1450,
//     discount: 10,
//     quantity: 1,
//     image:
//       "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=250&q=80",
//     category: "Kurtis",
//     stock: "In Stock",
//   },
//   {
//     id: 3,
//     name: "Smart Watch Series 5",
//     price: 5999,
//     originalPrice: 7999,
//     discount: 25,
//     quantity: 1,
//     image:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=250&q=80",
//     category: "Electronics",
//     stock: "In Stock",
//   },
// ];

function RouteComponent() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(storedItems);
    setItems(storedItems);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setItems(updatedItems);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    return items.reduce(
      (total, item) =>
        total + (item.originalPrice - item.price) * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 50;
    return subtotal + shipping;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Your Shopping Cart
              </h2>
              <p className="text-muted-foreground text-sm">
                {items.length} items in your cart
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="text-sm text-primary hover:text-primary/90 font-medium flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <Card className="border-border">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6">
              Add some products to get started
            </p>
            <Link to="/">
              <Button>
                <Tag className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0"
                    >
                      {/* Product Image */}
                      <div className="sm:w-1/4">
                        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {item.discount > 0 && (
                            <div className="absolute top-2 left-2">
                              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                                -{item.discount}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="sm:w-3/4 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              {item.category}
                            </span>
                            <h3 className="font-medium text-foreground mb-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-base font-bold text-foreground">
                                {formatINR(item.price)}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatINR(item.originalPrice)}
                                </span>
                              )}
                            </div>
                            <span
                              className={`text-xs font-medium ${item.stock === `In Stock` ? `text-emerald-600` : `text-amber-600`}`}
                            >
                              {item.stock}
                            </span>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground">
                              {formatINR(item.price * item.quantity)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.quantity} × {formatINR(item.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="border-border sticky top-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-6">
                  Order Summary
                </h3>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {formatINR(calculateSubtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-medium text-emerald-600">
                      -{formatINR(calculateDiscount())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">₹50</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">
                      {formatINR(calculateTotal())}
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-2">
                    Promo Code
                  </h4>
                  <div className="flex gap-2">
                    <Input placeholder="Enter promo code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Free shipping on orders over ₹999
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      30-day return policy
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full" size="lg">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>

                {/* Continue Shopping */}
                <Link to="/">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Security Note */}
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <Shield className="w-3 h-3 inline mr-1" />
                Secure checkout. Your information is protected.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recently Viewed (Optional) */}
      {/* You can add a section for recently viewed products here */}
    </div>
  );
}
