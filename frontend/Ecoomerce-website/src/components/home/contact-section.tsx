import {
  Phone,
  Send,
  MessageSquare,
  HelpCircle,
  ShoppingBag,
  Package,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/api/AuthApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/store/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ContactSection() {
  const { token, storeToken } = useAuth();

  const contactSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  type FormData = z.infer<typeof contactSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  const fetchUser = async (token: string) => {
    const response = await api.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["user-details", token],
    queryFn: () => fetchUser(token),
    enabled: !!token,
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      reset({
        username: data.username || "",
        email: data.email || "",
        message: "", // Keep empty or default
      });
    }
  }, [data, reset]);

  const loginUser = async (data: FormData) => {
    try {
      const response = await api.post("/form/contact", data);
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.extraDetails ||
          error?.response?.data?.message ||
          "Contact Form Failed",
      );
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success("Contact details Sent Successful ✅");
      storeToken(data.token);
      console.log(data);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-15">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-1.5">
            <MessageSquare className="w-4 h-4 mr-2" />
            24/7 Customer Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Need Shopping <span className="text-primary">Help?</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            We're here to help with your orders, returns, product questions, and
            any shopping assistance you need. Our team is ready to ensure you
            have the best shopping experience.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2 min</div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <p className="text-sm text-muted-foreground">Order Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                30 days
              </div>
              <p className="text-sm text-muted-foreground">Easy Returns</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Free</div>
              <p className="text-sm text-muted-foreground">Shipping Over $50</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form & Features */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <Card className="border">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 30
                  minutes during business hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Name *
                      </label>
                      <Input
                        placeholder="John"
                        className="h-12"
                        {...register("username")}
                      />
                      {errors.username && (
                        <p className="text-sm text-red-500">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                    {/* <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Last Name *
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="Doe"
                        required
                        className="h-12"
                      />
                    </div> */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email Address *
                      </label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-12"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Order Number (optional)
                    </label>
                    <Input placeholder="ORD-123456" className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Inquiry Type *
                    </label>
                    <select className="w-full h-12 px-3 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Select an option</option>
                      <option value="order-status">
                        Order Status & Tracking
                      </option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="product-info">Product Questions</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="payment">Payment Issues</option>
                      <option value="size-fit">Size & Fit Help</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <Textarea
                      {...register("message")}
                      placeholder="How can we help with your shopping experience?"
                      className="min-h-[140px] resize-none"
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base gap-2 cursor-pointer"
                    disabled={isPending}
                  >
                    <Send className="w-5 h-5" />
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why choose our shopping support?
              </h2>
              <p className="text-lg text-muted-foreground">
                We're committed to providing exceptional support to ensure you
                have the best shopping experience.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Fast & Free Shipping
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enjoy free shipping on orders over $50. Most orders ship
                    within 24 hours and arrive in 2-3 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Easy Returns
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Not happy with your purchase? Return it within 30 days for a
                    full refund or exchange. We provide prepaid return labels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Secure Shopping
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Shop with confidence. We use bank-level encryption to
                    protect your payment information and personal data.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <Card className="border bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Need immediate help?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Check our FAQ for instant answers about shipping, returns,
                      sizing, and more.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Live Chat
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="w-4 h-4" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to start shopping?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers who shop with confidence and
            receive exceptional support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Phone className="w-5 h-5" />
              Call Support: 1-800-SHOP-NOW
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Monday - Sunday: 6AM - 12AM EST | Average wait time: 2 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
