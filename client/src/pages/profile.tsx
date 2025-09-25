import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, User, Mail, Calendar, Shield, LogOut, CheckCircle, AlertCircle, Settings, ShoppingBag, Heart, Award, Package, CreditCard, Truck, Phone, MapPin, Receipt, Calendar as CalendarIcon, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { useWishlist } from "@/lib/wishlistContext";
import { Header } from "@/components/Header";
import { useQuery } from "@tanstack/react-query";

interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  country: string;
}

interface OrderPricing {
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number | null;
  total: number;
}

interface OrderPayment {
  method: string;
  status: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string | null;
  transaction_id?: string | null;
  payment_date?: string | null;
}

interface Order {
  _id: string;
  order_id: string;
  order_date: string;
  status: string;
  user: {
    user_id?: string | null;
    username: string;
    user_email: string;
  };
  items: OrderItem[];
  customer: OrderCustomer;
  pricing: OrderPricing;
  payment: OrderPayment;
  shipping?: any;
  notes?: string | null;
  invoice_number?: string | null;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  success: boolean;
  message: string;
  count: number;
  email: string;
  orders: Order[];
}

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, logout, sendOTP, verifyOTP, isAuthenticated } = useAuth();
  const { setIsWishlistOpen } = useWishlist();
  const [otp, setOtp] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch user orders
  const { data: ordersData, isLoading: ordersLoading, error: ordersError } = useQuery<OrdersResponse>({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!user?.email) throw new Error('No user email found');
      
      const response = await fetch(`https://sm-furnishing-backend.onrender.com/api/orders/${encodeURIComponent(user.email)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }
      
      return response.json();
    }
  });

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    setLocation("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const result = await sendOTP(user.email);
      if (result.success) {
        setShowOtpVerification(true);
        setSuccess("Verification code sent to your email");
      } else {
        setError(result.error || "Failed to send verification code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const result = await verifyOTP(user.email, otp);
      if (result.success) {
        setSuccess("Email verified successfully!");
        setShowOtpVerification(false);
        setOtp("");
      } else {
        setError(result.error || "Invalid verification code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" data-testid="profile-page">
      {/* Background with elegant gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 via-cream to-terracotta/20"></div>
      
      {/* Moving geometric shapes */}
      <div className="absolute inset-0">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
        <div className="floating-shape floating-shape-5"></div>
        <div className="floating-shape floating-shape-6"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b5835a' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.2
      }}></div>
      
      <Header variant="solid" className="relative bg-white/95 backdrop-blur-md shadow-lg border-b border-terracotta/20" />
      
      <div className="relative container mx-auto px-6 pt-20 pb-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Welcome Header with elegant design */}
          <div className="text-center mb-12" data-testid="profile-header">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-terracotta rounded-full"></div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Account Dashboard</h1>
              <div className="w-1 h-8 bg-terracotta rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column - Profile Info */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* Profile Card with elegant design */}
              <Card className="relative bg-gradient-to-br from-white to-cream/50 shadow-2xl border-0 overflow-hidden" data-testid="profile-card">
                <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-terracotta/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <CardHeader className="text-center pb-6 relative">
                  <div className="relative mx-auto mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-serif font-bold text-foreground mb-2" data-testid="user-name">{user.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2 text-base">
                    <Mail className="w-4 h-4 text-terracotta" />
                    <span className="font-medium" data-testid="user-email">{user.email}</span>
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-white to-cream/30 shadow-xl border-0" data-testid="stats-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="w-5 h-5 text-terracotta" />
                    Account Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-terracotta/10 to-terracotta/5 rounded-xl">
                      <ShoppingBag className="w-6 h-6 text-terracotta mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground" data-testid="orders-count">
                        {ordersLoading ? '...' : ordersData?.count || 0}
                      </p>
                      <p className="text-sm text-muted-foreground">Orders</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl">
                      <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-sm text-muted-foreground">Wishlist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Account Information */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Account Information with modern design */}
              <Card className="bg-gradient-to-br from-white to-cream/30 shadow-xl border-0 overflow-hidden" data-testid="account-info-card">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-terracotta/5 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
                
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    Account Information
                  </CardTitle>
                  <CardDescription className="text-base">Manage your personal details and preferences</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 relative">
                  {/* Personal Information */}
                  <div className="bg-gradient-to-r from-cream/50 to-white rounded-xl p-6 border border-terracotta/10">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-terracotta" />
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-terracotta uppercase tracking-wide">Full Name</Label>
                        <div className="bg-white rounded-lg p-3 border border-terracotta/20">
                          <p className="text-lg font-medium text-foreground" data-testid="display-name">{user.name}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-terracotta uppercase tracking-wide">Email Address</Label>
                        <div className="bg-white rounded-lg p-3 border border-terracotta/20">
                          <p className="text-lg font-medium text-foreground break-all md:break-normal" data-testid="display-email">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email Verification Status */}
                  <div className="bg-gradient-to-r from-white to-cream/30 rounded-xl p-6 border border-terracotta/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Mail className="w-5 h-5 text-terracotta" />
                        Email Verification
                      </h3>
                      {user.emailVerified ? (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-md" data-testid="verified-badge">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-rose-500 text-white border-0 shadow-md" data-testid="unverified-badge">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Not Verified
                        </Badge>
                      )}
                    </div>
                    
                    {!user.emailVerified && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 mb-3">Please verify your email address to access all features.</p>
                        <Button
                          onClick={handleSendOtp}
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta text-white border-0 shadow-md"
                          data-testid="verify-email-button"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Mail className="w-4 h-4 mr-2" />
                              Verify Email
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* OTP Verification Card */}
              {showOtpVerification && (
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl border-0" data-testid="otp-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-700">Email Verification</CardTitle>
                    <CardDescription className="text-blue-600">
                      Enter the verification code sent to {user.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp" className="text-blue-700 font-semibold">Verification Code</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          required
                          disabled={isSubmitting}
                          className="h-12 text-center text-lg tracking-wider border-blue-200 focus:border-blue-400"
                          maxLength={6}
                          data-testid="otp-input"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                          disabled={isSubmitting || otp.length !== 6}
                          data-testid="verify-otp-button"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            "Verify"
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowOtpVerification(false)}
                          disabled={isSubmitting}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          data-testid="cancel-otp-button"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Orders Section */}
              <Card className="bg-gradient-to-br from-white to-cream/30 shadow-xl border-0" data-testid="orders-section">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    My Orders
                    {ordersData?.count && (
                      <Badge className="bg-terracotta text-white ml-2">
                        {ordersData.count}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Track and manage your furniture orders</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
                      <span className="ml-2 text-muted-foreground">Loading your orders...</span>
                    </div>
                  ) : ordersError ? (
                    <div className="text-center py-8">
                      <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                      <p className="text-red-600 font-medium">Failed to load orders</p>
                      <p className="text-sm text-muted-foreground">Please try again later</p>
                    </div>
                  ) : !ordersData?.orders?.length ? (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-lg font-medium text-muted-foreground">No orders yet</p>
                      <p className="text-sm text-muted-foreground mb-4">Start shopping to see your orders here</p>
                      <Link href="/shop">
                        <Button className="bg-terracotta hover:bg-terracotta-dark text-white">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Start Shopping
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {ordersData.orders.map((order) => (
                        <div
                          key={order._id}
                          className="bg-gradient-to-r from-white to-cream/50 rounded-xl p-6 border border-terracotta/10 hover:border-terracotta/30 transition-all duration-200 cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                          data-testid={`order-${order.order_id}`}
                        >
                          {/* Mobile-optimized order header */}
                          <div className="space-y-3 md:space-y-0 md:flex md:items-start md:justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="font-bold text-lg text-foreground">
                                  Order #{order.order_id.slice(-8)}
                                </h3>
                                <Badge
                                  className={`${
                                    order.status === 'completed'
                                      ? 'bg-green-100 text-green-700 border-green-200'
                                      : order.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                      : 'bg-gray-100 text-gray-700 border-gray-200'
                                  }`}
                                >
                                  {order.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                  {order.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="break-words">
                                  {new Date(order.order_date).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </p>
                            </div>
                            <div className="text-left md:text-right">
                              <p className="text-2xl font-bold text-terracotta">
                                ₹{order.pricing.total.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          
                          {/* Mobile-friendly order details */}
                          <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="capitalize text-muted-foreground">
                                {order.payment.method === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {order.customer.city}, {order.customer.state}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Receipt className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {order.invoice_number ? `INV-${order.invoice_number.slice(-8)}` : 'No Invoice'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-terracotta/10">
                            <div className="flex flex-wrap gap-2">
                              {order.items.slice(0, 3).map((item, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-terracotta/10 text-terracotta-dark"
                                >
                                  {item.product_name} x{item.quantity}
                                </span>
                              ))}
                              {order.items.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                                  +{order.items.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="bg-gradient-to-br from-white to-cream/30 shadow-xl border-0" data-testid="actions-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Manage your account and continue your shopping experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="w-full h-14 bg-gradient-to-br from-white to-cream/50 border-terracotta/30 hover:border-terracotta hover:bg-terracotta/5 transition-all duration-200"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setLocation('/shop');
                      }}
                      data-testid="button-continue-shopping"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2 text-terracotta" />
                      <div className="text-left">
                        <p className="font-medium">Continue Shopping</p>
                        <p className="text-xs text-muted-foreground">Browse our collection</p>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full h-14 bg-gradient-to-br from-white to-pink-50/50 border-pink-200 hover:border-pink-300 hover:bg-pink-50 transition-all duration-200" 
                      onClick={() => setIsWishlistOpen(true)}
                      data-testid="wishlist-button"
                    >
                      <Heart className="w-5 h-5 mr-2 text-pink-500" />
                      <div className="text-left">
                        <p className="font-medium">My Wishlist</p>
                        <p className="text-xs text-muted-foreground">Saved items</p>
                      </div>
                    </Button>
                    
                    <Button
                      onClick={handleLogout}
                      className="w-full h-14 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0 shadow-md transition-all duration-200"
                      data-testid="logout-button"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      <div className="text-left">
                        <p className="font-medium">Sign Out</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Order Details</h2>
                      <p className="text-muted-foreground">Order #{selectedOrder.order_id}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(null)}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      ✕ Close
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Order Status & Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-terracotta/5 to-terracotta/10 border-terracotta/20">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center mx-auto mb-2">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-bold text-2xl text-terracotta">₹{selectedOrder.pricing.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-bold text-green-700 capitalize">{selectedOrder.status}</p>
                        <p className="text-sm text-muted-foreground">Order Status</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-bold text-blue-700 capitalize">
                          {selectedOrder.payment.method === 'razorpay' ? 'Online' : 'COD'}
                        </p>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-terracotta" />
                        Order Items ({selectedOrder.items.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{item.product_name}</h4>
                              <p className="text-sm text-muted-foreground">Product ID: {item.product_id}</p>
                            </div>
                            <div className="text-center mx-4">
                              <p className="font-medium">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-terracotta">₹{item.price.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">₹{(item.price * item.quantity).toLocaleString()} total</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Shipping & Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-terracotta" />
                          Shipping Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="font-medium">{selectedOrder.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.customer.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pin_code}
                        </p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.customer.country}</p>
                        <div className="pt-2 border-t">
                          <p className="text-sm flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {selectedOrder.customer.phone}
                          </p>
                          <p className="text-sm flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {selectedOrder.customer.email}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Receipt className="w-5 h-5 text-terracotta" />
                          Order Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span>₹{selectedOrder.pricing.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping:</span>
                          <span className="text-green-600 font-medium">
                            {selectedOrder.pricing.shipping === 0 ? 'Free' : `₹${selectedOrder.pricing.shipping.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax (GST):</span>
                          <span>₹{selectedOrder.pricing.tax.toLocaleString()}</span>
                        </div>
                        {selectedOrder.pricing.discount && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Discount:</span>
                            <span className="text-green-600">-₹{selectedOrder.pricing.discount.toLocaleString()}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-terracotta">₹{selectedOrder.pricing.total.toLocaleString()}</span>
                        </div>
                        
                        {selectedOrder.invoice_number && (
                          <div className="pt-3 border-t">
                            <p className="text-sm text-muted-foreground">
                              Invoice: {selectedOrder.invoice_number}
                            </p>
                          </div>
                        )}
                        
                        <div className="pt-3 border-t">
                          <p className="text-sm text-muted-foreground">
                            Order Date: {new Date(selectedOrder.order_date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Alerts */}
          {error && (
            <Alert variant="destructive" className="mt-6 bg-gradient-to-r from-red-50 to-rose-50 border-red-200" data-testid="error-alert">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" data-testid="success-alert">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}