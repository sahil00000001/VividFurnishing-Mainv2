import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Returns() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header className="relative bg-white border-b shadow-sm" variant="solid" />
      
      <main className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Returns & Exchanges Policy
            </h1>
            
            <p className="text-center text-muted-foreground mb-12">
              <strong>Last Updated:</strong> 22.09.2025
            </p>

            <div className="space-y-8 text-foreground">
              <p className="text-lg leading-relaxed">
                At SM Furnishings, we want you to love your purchase. If you are not fully satisfied, we offer returns and exchanges under the terms outlined below.
              </p>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">1. Eligibility for Returns & Exchanges</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Products must be unused, unwashed, and in their original packaging with tags intact.</li>
                  <li>Returns or exchanges must be requested within 7 days of delivery.</li>
                  <li>Products that have been used, washed, stained, or damaged after delivery will not be eligible.</li>
                  <li>Custom-made or discounted/sale items may not be eligible for returns unless defective.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">2. Non-Returnable Items</h2>
                <p className="mb-3">The following items cannot be returned or exchanged:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Products purchased on clearance or final sale.</li>
                  <li>Gift cards or vouchers.</li>
                  <li>Customized or personalized items.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">3. Process for Returns & Exchanges</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To initiate a return/exchange, please contact us at smfurnishings.india@gmail.com with your order number.</li>
                  <li>Once approved, we will arrange a pickup through our logistics partner or ask you to self-ship (depending on your location).</li>
                  <li>Returned items will be inspected before processing a refund or exchange.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">4. Refunds</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Approved refunds will be issued to the original method of payment (credit card, debit card, UPI, wallet, etc.).</li>
                  <li>Please allow 7–10 business days for the refund to reflect in your account.</li>
                  <li>In cases where pickup is not possible, you may be required to ship the product back at your own cost.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">5. Exchanges</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>If you wish to exchange your product for a different design or size, please mention it when requesting the return.</li>
                  <li>Exchanges are subject to stock availability. If the requested product is unavailable, a refund will be issued instead.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">6. Damaged or Defective Products</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>If you receive a damaged or defective product, please contact us within 48 hours of delivery with images of the issue.</li>
                  <li>We will arrange a free replacement or full refund after verification.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">7. Cancellations</h2>
                <p>Orders cannot be cancelled once placed.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">8. Contact Us</h2>
                <p className="mb-4">For any questions about returns, refunds, or exchanges, please contact:</p>
                <div className="bg-cream p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">SM Furnishings</h3>
                  <p className="mb-2">📧 Email: smfurnishings.india@gmail.com</p>
                  <p>🏠 Address: 233, Model Town, Tosham Road, Hisar, Haryana – 125001</p>
                </div>
              </section>

              <section className="bg-cream p-8 rounded-lg">
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-6">Frequently Asked Questions (FAQs)</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">About SM Furnishings</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Q. What makes SM Furnishings unique?</p>
                        <p className="text-muted-foreground">We combine luxury, minimal design, and affordability, bringing premium-quality home furnishings into everyday living.</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. Where are your products made?</p>
                        <p className="text-muted-foreground">All our products are designed and crafted in India, with a focus on detail, comfort, and durability.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Orders & Payments</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Q. How can I place an order?</p>
                        <p className="text-muted-foreground">Simply browse our collections, add your favorites to the cart, and proceed to checkout.</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. What payment methods do you accept?</p>
                        <p className="text-muted-foreground">We accept credit/debit cards, UPI, net banking, and wallet payments via secure gateways like Razorpay.</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. Can I modify or cancel my order after placing it?</p>
                        <p className="text-muted-foreground">No, orders cannot be cancelled once placed.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Shipping & Delivery</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Q. Do you ship all over India?</p>
                        <p className="text-muted-foreground">Yes, we deliver across India through trusted partners like Delhivery.</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. How long does delivery take?</p>
                        <p className="text-muted-foreground">Most orders are delivered within 6–8 business days, depending on your location.</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. How can I track my order?</p>
                        <p className="text-muted-foreground">Once shipped, you'll receive a tracking link via SMS/email to follow your package.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Returns & Exchanges</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Q. What is your return policy?</p>
                        <p className="text-muted-foreground">You can request a return/exchange within 7 days of delivery (unused and in original packaging).</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. How do I initiate a return?</p>
                        <p className="text-muted-foreground">Contact us at smfurnishings.india@gmail.com with your order number, and we'll guide you through the process.</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. When will I get my refund?</p>
                        <p className="text-muted-foreground">Refunds are processed within 7–10 business days after the product is received and inspected.</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. Do you accept exchanges?</p>
                        <p className="text-muted-foreground">Yes, exchanges are possible for different designs/sizes, subject to availability.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Product Care</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Q. How do I care for my bedsheets and covers?</p>
                        <div className="text-muted-foreground">
                          <p>• Machine wash in cold water with mild detergent.</p>
                          <p>• Avoid bleach and harsh chemicals.</p>
                          <p>• Tumble dry low or line dry in shade.</p>
                          <p>• Iron on low heat if required.</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Q. Will the colors fade after washing?</p>
                        <p className="text-muted-foreground">Our fabrics are made with high-quality dyes designed for durability. Following care instructions ensures long-lasting vibrancy.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Gifting & Customization</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Q. Do you offer gifting options?</p>
                        <p className="text-muted-foreground">Yes, our products make perfect gifts. We also provide gift packaging on request.</p>
                      </div>
                      <div>
                        <p className="font-medium">Q. Can I place a bulk or customized order?</p>
                        <p className="text-muted-foreground">For bulk or custom inquiries, please contact us directly at smfurnishings.india@gmail.com.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
                    <div>
                      <p className="font-medium mb-2">Didn't find what you were looking for? We're here to help.</p>
                      <p className="text-muted-foreground">📧 Email: smfurnishings.india@gmail.com</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}