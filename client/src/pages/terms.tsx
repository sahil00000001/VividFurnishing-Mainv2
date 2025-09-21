import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
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
              Terms of Service
            </h1>
            
            <p className="text-center text-muted-foreground mb-12">
              <strong>Last Updated:</strong> 22.09.2025
            </p>

            <div className="space-y-8 text-foreground">
              <p className="text-lg leading-relaxed">
                Welcome to SM Furnishings ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website www.smfurnishings.com (the "Website") and the purchase of our products.
              </p>
              
              <p className="text-lg leading-relaxed">
                By accessing or using our Website, you agree to comply with these Terms. If you do not agree, you may not use the Website.
              </p>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">1. Eligibility</h2>
                <p>By using our Website, you confirm that you are at least 18 years of age or are using the Website under the supervision of a parent or legal guardian.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">2. Account Registration</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You may be required to create an account to place an order.</li>
                  <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                  <li>You agree to provide accurate and complete information during registration and update it as necessary.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">3. Orders & Payments</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>By placing an order, you agree to purchase the selected product(s) at the stated price, including applicable taxes and shipping charges.</li>
                  <li>Prices and availability are subject to change without prior notice.</li>
                  <li>Payments are processed securely through third-party payment gateways (e.g., Razorpay). We are not responsible for errors or failures caused by such third parties.</li>
                  <li>Orders will be confirmed only after successful payment authorization.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">4. Shipping & Delivery</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We partner with trusted logistics providers (e.g., Delhivery) to deliver your orders.</li>
                  <li>Estimated delivery times are 6–8 business days, depending on your location.</li>
                  <li>We are not liable for delays caused by courier companies, customs clearance, or unforeseen events.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">5. Returns, Refunds & Cancellations</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Returns and exchanges are subject to our Returns & Exchanges Policy.</li>
                  <li>Products must be unused, unwashed, and in original packaging to qualify for returns.</li>
                  <li>Refunds, where applicable, will be processed through the original method of payment within 7–10 business days.</li>
                  <li>Orders cannot be cancelled once placed.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">6. Intellectual Property</h2>
                <p>All content on the Website, including text, images, logos, graphics, and designs, is the intellectual property of SM Furnishings and protected under applicable copyright and trademark laws.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">7. User Conduct</h2>
                <p className="mb-3">When using our Website, you agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any laws or regulations.</li>
                  <li>Post false, misleading, or harmful information.</li>
                  <li>Attempt to hack, disrupt, or gain unauthorized access to our systems.</li>
                  <li>Use the Website for fraudulent purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">8. Limitation of Liability</h2>
                <p className="mb-4">We strive to ensure accuracy of product descriptions, pricing, and availability. However, errors may occur, and we reserve the right to correct them.</p>
                <p>To the maximum extent permitted by law, SM Furnishings shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the Website or purchase of products.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">9. Indemnification</h2>
                <p>You agree to indemnify and hold harmless SM Furnishings, its employees, partners, and affiliates against any claims, damages, or expenses arising from your use of the Website or violation of these Terms.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">10. Governing Law & Dispute Resolution</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>These Terms are governed by the laws of India.</li>
                  <li>Any disputes shall be subject to the exclusive jurisdiction of the courts of Hisar, Haryana.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">11. Amendments</h2>
                <p>We reserve the right to update or modify these Terms at any time. Updates will be posted on this page with a revised "Last Updated" date. Continued use of the Website constitutes acceptance of the updated Terms.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">12. Contact Us</h2>
                <p className="mb-4">If you have any questions about these Terms, please contact us at:</p>
                <div className="bg-cream p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">SM Furnishings</h3>
                  <p className="mb-2">📧 Email: smfurnishings.india@gmail.com</p>
                  <p>🏠 Address: 233, Model Town, Tosham Road, Hisar, Haryana – 125001</p>
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