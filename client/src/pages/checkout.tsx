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

type PaymentMethod = 'razorpay' | 'cod' | 'debit_card';

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { cartItems, cartCount, cart, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();
  const { toast } = useToast();
  
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
  const taxRate = 0.18; // 18% GST
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + taxAmount;

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

  const downloadJsonResponse = (data: any, filename: string) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Response Downloaded",
      description: `${filename} has been downloaded to your device.`,
    });
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
      
      // Download order creation response as TXT file
      const orderData = {
        step: 'Order Creation',
        timestamp: new Date().toISOString(),
        ...orderResponse
      };
      setRazorpayResponse(orderData);
      downloadJsonResponse(orderData, `razorpay-order-${Date.now()}.txt`);
      
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
          
          // Download payment verification response as TXT file
          const verificationData = {
            step: 'Payment Verification',
            timestamp: new Date().toISOString(),
            payment_response: response,
            verification: verificationResult
          };
          setRazorpayResponse(verificationData);
          downloadJsonResponse(verificationData, `razorpay-payment-verification-${Date.now()}.txt`);
          
          if (verificationResult.verified) {
            // Clear cart and redirect to success page
            await clearCart();
            
            toast({
              title: "Payment Successful! 🎉",
              description: `Your payment of ₹${totalAmount.toLocaleString()} has been processed successfully.`,
            });
            
            setTimeout(() => {
              setLocation('/success');
            }, 2000);
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
            downloadJsonResponse(dismissalData, `razorpay-dismissed-${Date.now()}.txt`);
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
      downloadJsonResponse(errorData, `razorpay-error-${Date.now()}.txt`);
      
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
          tax: taxAmount,
          total: totalAmount
        },
        paymentMethod: method
      };

      console.log('Order Data:', orderData);

      if (method === 'cod') {
        // COD - Process order successfully
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
        
        // Clear cart after successful order
        await clearCart();
        
        // Redirect to success page
        setLocation('/success');

      } else if (method === 'razorpay') {
        await handleRazorpayPayment(orderData);
        
      } else if (method === 'debit_card') {
        toast({
          title: "Debit Card Coming Soon",
          description: "Debit card payment integration will be available soon. Please use COD for now.",
          variant: "destructive",
        });
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
          <Button onClick={() => setLocation('/shop')} className="bg-terracotta hover:bg-terracotta-dark text-white">
            Continue Shopping
          </Button>
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
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary - Left Side */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Summary ({cartCount} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                    {/* Product Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                      <span className="text-2xl font-serif font-bold text-gray-400">
                        {item.productName.charAt(0)}
                      </span>
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.productName}</h3>
                      <p className="text-terracotta font-bold">₹{item.priceAtTime.toLocaleString()}</p>
                    </div>
                    
                    {/* Quantity Controls */}
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
                  </div>
                ))}
                
                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST 18%):</span>
                    <span>₹{taxAmount.toLocaleString()}</span>
                  </div>
                  
                  {/* Coupon Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4" />
                      <span className="font-medium">Have a coupon?</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        className={couponError ? 'border-red-500' : ''}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                      >
                        Apply
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-sm mt-1">{couponError}</p>
                    )}
                  </div>
                  
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-terracotta">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form - Right Side */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
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
                    <div className="ml-auto">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
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
                    <div className="ml-auto">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                    </div>
                  </Button>
                </div>

                {/* Debit Card */}
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <Button
                    onClick={() => handlePaymentMethodSelect('debit_card')}
                    disabled={isProcessing || isLoading}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Debit Card</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Coming Soon</span>
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