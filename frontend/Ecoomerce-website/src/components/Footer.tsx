import { Facebook, Twitter, Instagram, Youtube, Linkedin, Heart, Shield, Truck, CreditCard, Phone, Mail, MapPin, ChevronRight, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white border-t border-gray-200">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand & Description */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                                <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-primary">ShopEasy</h1>
                                <p className="text-xs text-muted-foreground">Everything You Need</p>
                            </div>
                        </Link>
                        <p className="text-gray-600">
                            Your one-stop destination for quality products and exceptional shopping experience.
                            We bring the best deals right to your doorstep.
                        </p>

                        {/* Newsletter Subscription */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
                            <p className="text-sm text-gray-600">Subscribe to our newsletter for exclusive deals</p>
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    className="border-gray-300 text-gray-900 placeholder:text-gray-500"
                                />
                                <Button className="bg-primary hover:bg-primary/90 border-0 text-white">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link to="/new-arrivals" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link to="/best-sellers" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Best Sellers
                                </Link>
                            </li>
                            <li>
                                <Link to="/sale" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Sale
                                </Link>
                            </li>
                            <li>
                                <Link to="/gift-cards" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Gift Cards
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Service</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link to="/size-guide" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Size Guide
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900">Phone Support</p>
                                    <a href="tel:+18005551234" className="text-gray-600 hover:text-primary transition-colors">
                                        +1 (800) 555-1234
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900">Email</p>
                                    <a href="mailto:support@shopeasy.com" className="text-gray-600 hover:text-primary transition-colors">
                                        support@shopeasy.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900">Address</p>
                                    <p className="text-gray-600">
                                        123 Commerce Street<br />
                                        Suite 450<br />
                                        New York, NY 10001
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors text-gray-600">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors text-gray-600">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors text-gray-600">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors text-gray-600">
                                    <Youtube className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors text-gray-600">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center justify-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Secure Shopping</p>
                                <p className="text-sm text-gray-600">SSL Encrypted Checkout</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Truck className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Free Shipping</p>
                                <p className="text-sm text-gray-600">On Orders Over $50</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Easy Returns</p>
                                <p className="text-sm text-gray-600">30-Day Money Back</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-gray-50 border-t border-gray-200 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-600 text-sm">
                                © {currentYear} ShopEasy. All rights reserved.
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link to="/terms" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/privacy" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/cookies" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                Cookie Policy
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="text-sm">Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            <span className="text-sm">for shoppers everywhere</span>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            ShopEasy is a registered trademark. All product names, logos, and brands are property of their respective owners.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}