import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/authContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Minus, Plus, Package, CreditCard, MapPin, Phone, User, Mail, Truck, Wallet, Tag } from 'lucide-react';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

type PaymentMethod = 'razorpay' | 'cod';

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { cartItems, cartCount, cart, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [razorpayResponse, setRazorpayResponse] = useState<any>(null);

  // Calculate totals
  const subtotal = cart?.totalAmount || 0;
  const shippingCost = 0; // Always free shipping
  const totalAmount = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setCouponError('Invalid coupon code');
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is not valid.",
        variant: "destructive",
      });
    } else {
      setCouponError('');
    }
  };

  const saveOrderToBackend = async (orderData: any) => {
    try {
      const response = await fetch('https://sm-furnishing-backend.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save order: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Order saved successfully:', result);
      
      toast({
        title: "Order Saved Successfully! ✅",
        description: `Your order ${orderData.order_id} has been saved to our system.`,
      });
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Error saving order:', error);
      
      toast({
        title: "Order Save Failed",
        description: "Failed to save your order. Please contact support with your order details.",
        variant: "destructive",
      });
      
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const handleRazorpayPayment = async (orderData: any) => {
    try {
      setRazorpayResponse(null);
      
      // Create Razorpay order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          receipt: `order_${Date.now()}`
        }),
      });

      const orderResponse = await response.json();
      console.log('Razorpay Order Created:', orderResponse);
      
      // Store order creation data for final JSON
      const orderCreationData = {
        step: 'Order Creation',
        timestamp: new Date().toISOString(),
        ...orderResponse
      };
      setRazorpayResponse(orderCreationData);
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.error || 'Failed to create order');
      }

      const options = {
        key: orderResponse.key_id,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: 'SM Furnishings',
        description: `Order for ${cartItems.length} items`,
        order_id: orderResponse.order.id,
        handler: async (response: any) => {
          console.log('Razorpay Payment Response:', response);
          
          // Verify payment
          const verifyResponse = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...response,
              orderData
            }),
          });

          const verificationResult = await verifyResponse.json();
          console.log('Payment Verification:', verificationResult);
          
          if (verificationResult.verified) {
            // Create clean order JSON with only essential data
            const completeOrderData = {
              order_id: orderCreationData.order.id,
              order_date: new Date().toISOString(),
              status: 'completed',
              
              // User information (authenticated user or guest)
              user: isAuthenticated && user ? {
                username: user.name,
                user_email: user.email
              } : {
                username: `${formData.firstName} ${formData.lastName}`.trim(),
                user_email: formData.email
              },
              
              items: cartItems.map(item => ({
                product_id: item.productId,
                product_name: item.productName,
                quantity: item.quantity,
                price: item.priceAtTime
              })),
              
              customer: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pin_code: formData.zipCode,
                country: formData.country
              },
              
              pricing: {
                subtotal: subtotal,
                shipping: shippingCost,
                total: totalAmount
              },
              
              payment: {
                method: 'razorpay',
                status: 'verified',
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id
              }
            };
            
            // Save order to backend
            const saveResult = await saveOrderToBackend(completeOrderData);
            
            if (saveResult.success) {
              // Only proceed with success flow if order was saved successfully
              await clearCart(false);
              
              toast({
                title: "Payment Successful! 🎉",
                description: `Your payment of ₹${totalAmount.toLocaleString()} has been processed successfully.`,
              });
              
              setTimeout(() => {
                setLocation('/success');
              }, 2000);
            } else {
              // Payment succeeded but order save failed - show error but don't clear cart
              toast({
                title: "Payment Processed, Order Save Failed",
                description: "Your payment was successful but we couldn't save your order. Please contact support immediately with your payment ID: " + response.razorpay_payment_id,
                variant: "destructive",
              });
            }
          } else {
            toast({
              title: "Payment Verification Failed",
              description: "Payment could not be verified. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#B87333'
        },
        modal: {
          ondismiss: () => {
            console.log('Razorpay modal dismissed');
            const dismissalData = {
              step: 'Payment Dismissed',
              timestamp: new Date().toISOString(),
              message: 'Payment was cancelled by user'
            };
            setRazorpayResponse(dismissalData);
            // No download for dismissed payments
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Razorpay payment error:', error);
      
      const errorData = {
        step: 'Error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Payment failed'
      };
      setRazorpayResponse(errorData);
      // No download for payment errors
      
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Payment failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const validateForm = (): boolean => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    for (const field of required) {
      if (!formData[field as keyof CheckoutFormData].trim()) {
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
          variant: "destructive",
        });
        return false;
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    // Basic phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handlePaymentMethodSelect = async (method: PaymentMethod) => {
    if (!validateForm()) return;
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setSelectedPaymentMethod(method);
    setIsProcessing(true);
    
    try {
      const orderData = {
        items: cartItems,
        customer: formData,
        pricing: {
          subtotal,
          shipping: shippingCost,
          total: totalAmount
        },
        paymentMethod: method
      };

      console.log('Order Data:', orderData);

      if (method === 'cod') {
        // COD - Process order successfully
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
        
        // Create COD order JSON with same format as Razorpay
        const codOrderData = {
          order_id: `cod_order_${Date.now()}`,
          order_date: new Date().toISOString(),
          status: 'completed',
          
          // User information (authenticated user or guest)
          user: isAuthenticated && user ? {
            username: user.name,
            user_email: user.email
          } : {
            username: `${formData.firstName} ${formData.lastName}`.trim(),
            user_email: formData.email
          },
          
          items: cartItems.map(item => ({
            product_id: item.productId,
            product_name: item.productName,
            quantity: item.quantity,
            price: item.priceAtTime
          })),
          
          customer: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pin_code: formData.zipCode,
            country: formData.country
          },
          
          pricing: {
            subtotal: subtotal,
            shipping: shippingCost,
            total: totalAmount
          },
          
          payment: {
            method: 'cod',
            status: 'pending'
          }
        };
        
        // Save COD order to backend
        const saveResult = await saveOrderToBackend(codOrderData);
        
        if (saveResult.success) {
          // Only proceed with success flow if order was saved successfully
          await clearCart(false);
          
          toast({
            title: "Order Confirmed! 📦",
            description: `Your COD order of ₹${totalAmount.toLocaleString()} has been placed successfully.`,
          });
          
          setTimeout(() => {
            setLocation('/success');
          }, 2000);
        } else {
          // Order save failed - show error and don't clear cart so user can retry
          toast({
            title: "Order Failed to Save",
            description: "We couldn't save your order. Please try again or contact support.",
            variant: "destructive",
          });
        }

      } else if (method === 'razorpay') {
        await handleRazorpayPayment(orderData);
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setSelectedPaymentMethod(null);
    }
  };

  // Redirect to shop if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header variant="solid" />
        <div className="container mx-auto px-6 py-12 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart to proceed with checkout.</p>
          {/* Continue Shopping - Hidden on mobile */}
          {!isMobile && (
            <Button onClick={() => setLocation('/shop')} className="bg-terracotta hover:bg-terracotta-dark text-white">
              Continue Shopping
            </Button>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="solid" />
      
      <div className="container mx-auto px-6 py-12 mt-40">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Review your order and provide shipping details</p>
          {isAuthenticated && user && (
            <div className="mt-4 p-4 bg-terracotta/10 rounded-lg border border-terracotta/20">
              <div className="flex items-center gap-2 text-terracotta">
                <User className="w-5 h-5" />
                <span className="font-medium">Logged in as: {user.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                User ID: {user.id} | Email: {user.email}
              </p>
            </div>
          )}
        </div>

        <div className="max-w-5xl mx-auto space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Order Summary - Left Side */}
          <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Summary ({cartCount} items)
                </CardTitle>
              </CardHeader>
              <CardContent className={`${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                {cartItems.map((item) => (
                  <div key={item.productId} className={`flex items-center border-b last:border-b-0 ${isMobile ? 'space-x-2 pb-2' : 'space-x-3 pb-3'}`}>
                    {/* Product Image */}
                    <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-lg overflow-hidden flex-shrink-0 bg-gray-100`}>
                      <img 
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="hidden w-full h-full flex items-center justify-center">
                        <span className={`font-serif font-bold text-gray-400 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                          {item.productName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="w-32 min-w-0">
                      <h3 className={`font-medium truncate ${isMobile ? 'text-xs' : 'text-sm'}`}>{item.productName}</h3>
                      <p className={`text-terracotta font-bold ${isMobile ? 'text-xs' : ''}`}>₹{item.priceAtTime.toLocaleString()}</p>
                      {!isMobile && (
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      )}
                    </div>
                    
                    {/* Quantity Controls - Mobile Vertical Layout */}
                    {isMobile ? (
                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            className="h-5 w-5 p-0"
                            disabled={isLoading}
                          >
                            <Minus className="w-2 h-2" />
                          </Button>
                          <span className="w-4 text-center text-xs font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            className="h-5 w-5 p-0"
                            disabled={isLoading}
                          >
                            <Plus className="w-2 h-2" />
                          </Button>
                        </div>
                        <p className="text-xs font-bold text-center">₹{(item.priceAtTime * item.quantity).toLocaleString()}</p>
                      </div>
                    ) : (
                      <>
                        {/* Desktop Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                            disabled={isLoading}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                            disabled={isLoading}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        {/* Line Total */}
                        <div className="text-right">
                          <p className="font-bold">₹{(item.priceAtTime * item.quantity).toLocaleString()}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {/* Pricing Breakdown */}
                <div className={`${isMobile ? 'space-y-1 pt-2' : 'space-y-2 pt-3'}`}>
                  <div className="flex justify-start">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-start">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  
                  {/* Coupon Section */}
                  <div className={`border-t ${isMobile ? 'pt-2' : 'pt-3'}`}>
                    <div className={`flex items-center gap-2 ${isMobile ? 'mb-1' : 'mb-2'}`}>
                      <Tag className="w-4 h-4" />
                      <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Have a coupon?</span>
                    </div>
                    <div className={`flex ${isMobile ? 'gap-1' : 'gap-2'}`}>
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        className={`${couponError ? 'border-red-500' : ''} ${isMobile ? 'h-8 text-sm' : ''}`}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        className={isMobile ? 'h-8 px-3 text-sm' : ''}
                      >
                        Apply
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-sm mt-1">{couponError}</p>
                    )}
                  </div>
                  
                  <Separator />
                  <div className="flex justify-start text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-terracotta">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form - Right Side */}
          <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className={`${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                <div className={`grid grid-cols-2 ${isMobile ? 'gap-2' : 'gap-3'}`}>
                  <div>
                    <Label htmlFor="firstName" className={isMobile ? 'text-sm' : ''}>First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className={isMobile ? 'h-8 text-sm' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className={isMobile ? 'text-sm' : ''}>Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className={isMobile ? 'h-8 text-sm' : ''}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className={isMobile ? 'text-sm' : ''}>Email Address *</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">PIN Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="6-digit PIN code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Choose Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Razorpay Option */}
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <Button
                    onClick={() => handlePaymentMethodSelect('razorpay')}
                    disabled={isProcessing || isLoading}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Razorpay</p>
                      <p className="text-sm text-muted-foreground">UPI, Cards, Net Banking, Wallets</p>
                    </div>
                  </Button>
                </div>

                {/* Cash on Delivery */}
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <Button
                    onClick={() => handlePaymentMethodSelect('cod')}
                    disabled={isProcessing || isLoading}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Cash on Delivery (COD)</p>
                      <p className="text-sm text-muted-foreground">Pay when your order is delivered</p>
                    </div>
                  </Button>
                </div>


                {/* Processing State */}
                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                      <div className="animate-spin w-4 h-4 border-2 border-terracotta border-t-transparent rounded-full"></div>
                      Processing your order...
                    </div>
                  </div>
                )}

                {/* Auto-download info */}
                {razorpayResponse && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">
                      📁 API Response automatically downloaded as TXT file
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Step: {razorpayResponse.step} • {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                )}

                <div className="text-center pt-2">
                  <p className="text-lg font-bold text-terracotta">
                    Total: ₹{totalAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your information is secure and encrypted
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}