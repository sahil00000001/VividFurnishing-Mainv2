import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export default function FAQsPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header variant="solid" className="sticky top-0 bg-white shadow-sm z-50" />

      {/* Main Content */}
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about SM Furnishings
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {/* About SM Furnishings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-terracotta">About SM Furnishings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Q. What makes SM Furnishings unique?</h3>
                  <p className="text-muted-foreground">We combine luxury, minimal design, and affordability, bringing premium-quality home furnishings into everyday living.</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. Where are your products made?</h3>
                  <p className="text-muted-foreground">All our products are designed and crafted in India, with a focus on detail, comfort, and durability.</p>
                </div>
              </CardContent>
            </Card>

            {/* Orders & Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-terracotta">Orders & Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Q. How can I place an order?</h3>
                  <p className="text-muted-foreground">Simply browse our collections, add your favorites to the cart, and proceed to checkout.</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">We accept credit/debit cards, UPI, net banking, and wallet payments via secure gateways like Razorpay.</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. Can I modify or cancel my order after placing it?</h3>
                  <p className="text-muted-foreground">No, orders cannot be cancelled once placed.</p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Delivery */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-terracotta">Shipping & Delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Q. Do you ship all over India?</h3>
                  <p className="text-muted-foreground">Yes, we deliver across India through trusted partners like Delhivery.</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. How long does delivery take?</h3>
                  <p className="text-muted-foreground">Most orders are delivered within 6–8 business days, depending on your location.</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. How can I track my order?</h3>
                  <p className="text-muted-foreground">Once shipped, you'll receive a tracking link via SMS/email to follow your package.</p>
                </div>
              </CardContent>
            </Card>

            {/* Returns & Exchanges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-terracotta">Returns & Exchanges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Q. What is your return policy?</h3>
                  <p className="text-muted-foreground">You can request a return/exchange within 7 days of delivery (unused and in original packaging).</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. How do I initiate a return?</h3>
                  <p className="text-muted-foreground">Contact us at smfurnishings.india@gmail.com with your order number, and we'll guide you through the process.</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. When will I get my refund?</h3>
                  <p className="text-muted-foreground">Refunds are processed within 7–10 business days after the product is received and inspected.</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. Do you accept exchanges?</h3>
                  <p className="text-muted-foreground">Yes, exchanges are possible for different designs/sizes, subject to availability.</p>
                </div>
              </CardContent>
            </Card>

            {/* Product Care */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-terracotta">Product Care</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Q. How do I care for my bedsheets and covers?</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>• Machine wash in cold water with mild detergent.</p>
                    <p>• Avoid bleach and harsh chemicals.</p>
                    <p>• Tumble dry low or line dry in shade.</p>
                    <p>• Iron on low heat if required.</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. Will the colors fade after washing?</h3>
                  <p className="text-muted-foreground">Our fabrics are made with high-quality dyes designed for durability. Following care instructions ensures long-lasting vibrancy.</p>
                </div>
              </CardContent>
            </Card>

            {/* Gifting & Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-terracotta">Gifting & Customization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Q. Do you offer gifting options?</h3>
                  <p className="text-muted-foreground">Yes, our products make perfect gifts. We also provide gift packaging on request.</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Q. Can I place a bulk or customized order?</h3>
                  <p className="text-muted-foreground">For bulk or custom inquiries, please contact us directly at smfurnishings.india@gmail.com.</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-terracotta">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-muted-foreground mb-4">
                    Didn't find what you were looking for? We're here to help.
                  </p>
                  <p className="font-semibold">
                    📧 Email: <a href="mailto:smfurnishings.india@gmail.com" className="text-terracotta hover:underline">smfurnishings.india@gmail.com</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-terracotta hover:bg-terracotta-dark text-white shadow-lg transition-all duration-300"
          size="icon"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}