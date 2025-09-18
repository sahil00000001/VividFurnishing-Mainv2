import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Check, CreditCard, Smartphone, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface CouponCodes {
  [key: string]: number;
}

const COUPON_CODES: CouponCodes = {
  'SAHIL10': 10,
  'SAHIL20': 20,
  'SAHIL30': 30,
  'SAHIL40': 40,
  'SAHIL50': 50,
  'SAHIL60': 60,
};

interface AddressInfo {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
}

type PaymentMethod = 'upi' | 'debit' | 'cod';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
  const [address, setAddress] = useState<AddressInfo>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: ''
  });
  
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cod');
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    const upperCaseCode = couponCode.toUpperCase();
    if (COUPON_CODES[upperCaseCode]) {
      if (appliedCoupon === upperCaseCode) {
        toast({
          title: "Coupon Already Applied",
          description: `${upperCaseCode} is already applied to your order.`,
          variant: "destructive"
        });
        return;
      }
      
      setAppliedCoupon(upperCaseCode);
      setDiscount(COUPON_CODES[upperCaseCode]);
      setCouponCode('');
      toast({
        title: "Coupon Applied!",
        description: `${COUPON_CODES[upperCaseCode]}% discount applied successfully.`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive"
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    toast({
      title: "Coupon Removed",
      description: "Discount has been removed from your order.",
    });
  };

  const handleAddressChange = (field: keyof AddressInfo, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = () => {
    const requiredFields = ['addressLine1', 'city', 'state', 'pinCode'];
    const missingFields = requiredFields.filter(field => !address[field as keyof AddressInfo]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Incomplete Address",
        description: "Please fill in all required address fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Address Saved",
      description: "Your delivery address has been saved successfully.",
    });
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    if (method === 'upi' || method === 'debit') {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 3000);
    } else {
      setSelectedPayment(method);
    }
  };

  const handleOrderNow = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    const requiredFields = ['addressLine1', 'city', 'state', 'pinCode'];
    const missingFields = requiredFields.filter(field => !address[field as keyof AddressInfo]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Incomplete Address",
        description: "Please complete your delivery address before placing the order.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPayment !== 'cod') {
      toast({
        title: "Payment Method Required",
        description: "Please select Cash on Delivery to proceed.",
        variant: "destructive"
      });
      return;
    }

    // Clear cart and show success
    clearCart();
    setIsOrderPlaced(true);
  };

  // Order Success Page
  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-cream">
        <Header variant="solid" className="relative bg-cream border-b" />
        
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-lg shadow-lg p-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  Your order has been successfully placed.
                </h1>
                
                <p className="text-gray-600 mb-8">
                  Thank you for your purchase! We'll start processing your order right away.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => setLocation('/')}
                    className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setLocation('/shop')}
                    className="w-full"
                  >
                    Browse More Products
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header variant="solid" className="relative bg-cream border-b" />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/')}
              className="text-terracotta hover:text-terracotta-dark hover:bg-terracotta/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cart Items Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-terracotta">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹{item.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Coupon Code Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Coupon Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">
                            {appliedCoupon} Applied ({discount}% off)
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="text-green-700 hover:text-green-800"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1"
                        />
                        <Button 
                          onClick={handleApplyCoupon}
                          className="bg-terracotta hover:bg-terracotta-dark text-white"
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                    <p className="text-sm text-gray-500">
                      Available codes: SAHIL10, SAHIL20, SAHIL30, SAHIL40, SAHIL50, SAHIL60
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Address Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        value={address.addressLine1}
                        onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
                        placeholder="Street, Building name, etc."
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        value={address.addressLine2}
                        onChange={(e) => handleAddressChange('addressLine2', e.target.value)}
                        placeholder="Apartment, suite, etc. (optional)"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        placeholder="City"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        placeholder="State"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="pinCode">Pin Code *</Label>
                      <Input
                        id="pinCode"
                        value={address.pinCode}
                        onChange={(e) => handleAddressChange('pinCode', e.target.value)}
                        placeholder="Pin Code"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleSaveAddress}
                    className="mt-4 bg-terracotta hover:bg-terracotta-dark text-white"
                  >
                    Save Address
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Options Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Payment Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* UPI */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === 'upi' ? 'border-terracotta bg-terracotta/5' : 'border-gray-200 hover:border-terracotta/50'
                      }`}
                      onClick={() => handlePaymentSelect('upi')}
                    >
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-terracotta" />
                        <span className="font-medium">UPI</span>
                      </div>
                    </div>

                    {/* Debit Card */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === 'debit' ? 'border-terracotta bg-terracotta/5' : 'border-gray-200 hover:border-terracotta/50'
                      }`}
                      onClick={() => handlePaymentSelect('debit')}
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-terracotta" />
                        <span className="font-medium">Debit Card</span>
                      </div>
                    </div>

                    {/* Cash on Delivery */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === 'cod' ? 'border-terracotta bg-terracotta/5' : 'border-gray-200 hover:border-terracotta/50'
                      }`}
                      onClick={() => handlePaymentSelect('cod')}
                    >
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-terracotta" />
                        <span className="font-medium">Cash on Delivery (COD)</span>
                      </div>
                    </div>
                  </div>

                  {/* Coming Soon Overlay */}
                  {showComingSoon && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800 text-center font-medium">
                        This functionality is coming soon.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Order Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedCoupon}):</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-terracotta">₹{finalTotal.toLocaleString()}</span>
                    </div>
                    
                    <Button 
                      onClick={handleOrderNow}
                      className="w-full bg-terracotta hover:bg-terracotta-dark text-white text-lg py-3"
                    >
                      Order Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}