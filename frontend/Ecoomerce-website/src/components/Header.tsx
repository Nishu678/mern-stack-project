import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Bell,
  Heart,
  MapPin,
  Truck,
  Shield,
  Phone,
  Tag,
  Star,
  Gift,
  Shirt,
  Smartphone,
  Package,
  Home,
  Utensils,
  Sparkles,
  Dumbbell,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "./store/auth";
import { api } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, removeToken } = useAuth();
  const { token } = useAuth();
  // const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(2);
  const [notificationCount] = useState(3);

  const fetchUser = async (token: string) => {
    const response = await api.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
    enabled: !!token,
    retry: 1,
  });

  console.log("User login data", data);

  // Categories with proper icons
  const categories = [
    { label: "Fashion", href: "/fashion", icon: Shirt },
    { label: "Electronics", href: "/electronics", icon: Smartphone },
    { label: "Bags", href: "/bags", icon: Package },
    { label: "Footwear", href: "/footwear", icon: Shirt },
    { label: "Groceries", href: "/groceries", icon: Utensils },
    { label: "Beauty & Wellness", href: "/beauty", icon: Sparkles },
    { label: "Home & Living", href: "/home", icon: Home },
    { label: "Sports", href: "/sports", icon: Dumbbell },
  ];

  // User menu items
  const userMenuItems = [
    { label: "My Account", href: "/account" },
    { label: "My Orders", href: "/orders" },
    { label: "My Wishlist", href: "/wishlist" },
    { label: "My Addresses", href: "/addresses" },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-2 md:mb-0">
              <div className="flex items-center space-x-2 bg-primary/20 px-3 py-1 rounded-full">
                <Tag size={12} />
                <span className="text-sm">SUMMER SALE</span>
                <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded">
                  15% OFF
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Truck size={12} />
                  <span className="text-sm">Free Shipping Over $50</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/track"
                className="hover:text-primary-foreground/90 flex items-center space-x-1"
              >
                <Truck size={12} />
                <span>Track Order</span>
              </Link>
              <Link
                to="/contact"
                className="hover:text-primary-foreground/90 flex items-center space-x-1"
              >
                <Phone size={12} />
                <span>Contact</span>
              </Link>
              <Link
                to="/security"
                className="hover:text-primary-foreground/90 flex items-center space-x-1"
              >
                <Shield size={12} />
                <span>Secure</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background shadow-sm">
        <div className="container mx-auto px-4">
          {/* Logo, Search, Actions Row */}
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">ShopEasy</h1>
                <p className="text-xs text-muted-foreground">
                  Everything You Need
                </p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  className="w-full pl-10 pr-28 py-2.5 border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Search for products, brands, and categories..."
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-md transition-colors text-sm font-medium">
                  Search
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <button className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors">
                <Search size={18} className="text-muted-foreground" />
              </button>

              {/* Location */}
              <button className="hidden md:flex items-center space-x-1 p-2 rounded-lg hover:bg-accent transition-colors">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-foreground">Location</span>
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 rounded-lg hover:bg-accent transition-colors relative"
              >
                <Heart size={18} className="text-muted-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-accent transition-colors relative">
                <Bell size={18} className="text-muted-foreground" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <Link
                to="/addCart"
                className="p-2 rounded-lg hover:bg-accent transition-colors relative"
              >
                <div className="relative">
                  <ShoppingCart size={18} className="text-muted-foreground" />
                  {cartCount > 0 && (
                    <span className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* User */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="relative">
                    {/* User button */}
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-1 p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>

                      <ChevronDown
                        className={`w-3 h-3 text-muted-foreground transition-transform ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border py-2 z-50">
                        <div className="px-3 py-2 border-b">
                          <p className="font-medium text-foreground">{`Hello ${
                            data?.username || "User"
                          }!`}</p>
                          <p className="text-xs text-muted-foreground">
                            Welcome
                          </p>
                        </div>

                        {userMenuItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="block px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}

                        {/* logout */}
                        <button
                          onClick={() => {
                            removeToken();
                            navigate({ to: "/login" });
                          }}
                          // onClick={() =>
                          //   logout({
                          //     logoutParams: {
                          //       returnTo: window.location.origin,
                          //     },
                          //   })
                          // }
                          className="w-full text-left px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // <button
                  //   onClick={() => loginWithRedirect()}
                  //   className="button login flex items-center space-x-1 p-2 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
                  // >
                  //   Log In
                  // </button>
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      className="button login flex items-center space-x-1 cursor-pointer
               bg-primary hover:bg-primary/90
               text-primary-foreground px-4 py-1.5
               rounded-md transition-colors text-sm font-medium"
                    >
                      Log In
                    </Link>

                    <Link
                      to="/registeration"
                      className="button login flex items-center space-x-1 cursor-pointer
               bg-primary hover:bg-primary/90
               text-primary-foreground px-4 py-1.5
               rounded-md transition-colors text-sm font-medium"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              >
                {isMenuOpen ? (
                  <X size={18} className="text-muted-foreground" />
                ) : (
                  <Menu size={18} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Categories Bar - Desktop */}
          <div className="hidden lg:flex items-center justify-between py-2 border-t">
            <div className="flex items-center space-x-4">
              {/* All Categories */}
              <button className="flex items-center space-x-2 px-3 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors text-sm font-medium">
                <Menu size={16} />
                <span>All Categories</span>
                <ChevronDown size={14} />
              </button>

              {/* Category Links */}
              <div className="flex items-center space-x-6">
                {categories.slice(0, 6).map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.label}
                      to={category.href}
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon size={16} className="text-primary" />
                      <span>{category.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Today's Deal */}
            <Link
              to="/deals"
              className="flex items-center space-x-2 bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Gift size={16} />
              <div>
                <div className="text-sm font-medium">TODAY'S DEAL</div>
              </div>
            </Link>
          </div>

          {/* Mobile Search Bar */}
          {isMenuOpen && (
            <div className="lg:hidden py-3 border-t">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:border-primary"
                  placeholder="Search products..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t shadow-lg">
            <div className="container mx-auto px-4 py-4">
              {/* Categories Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.label}
                      to={category.href}
                      className="flex flex-col items-center p-3 rounded-lg border hover:bg-accent transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={20} className="text-primary mb-2" />
                      <span className="text-sm font-medium text-center">
                        {category.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Quick Links */}
              <div className="space-y-2">
                <Link
                  to="/deals"
                  className="flex items-center justify-between p-3 rounded-lg bg-accent border hover:bg-accent/80 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Star className="text-primary" size={18} />
                    <div>
                      <div className="font-medium text-foreground">
                        Today's Hot Deals
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Up to 60% OFF
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="text-primary" size={14} />
                </Link>

                <Link
                  to="/new-arrivals"
                  className="flex items-center justify-between p-3 rounded-lg bg-accent border hover:bg-accent/80 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Tag className="text-primary" size={18} />
                    <div>
                      <div className="font-medium text-foreground">
                        New Arrivals
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Fresh Collections
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="text-primary" size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
