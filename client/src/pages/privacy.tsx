import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Privacy() {
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
              Privacy Policy
            </h1>
            
            <p className="text-center text-muted-foreground mb-12">
              <strong>Last Updated:</strong> 22.09.2025
            </p>

            <div className="space-y-8 text-foreground">
              <p className="text-lg leading-relaxed">
                Welcome to SM Furnishings ("Company," "we," "our," or "us"). This Privacy Policy describes how we collect, use, and protect your personal information when you visit or make a purchase from www.smfurnishings.com (the "Website").
              </p>
              
              <p className="text-lg leading-relaxed">
                By accessing or using our Website, you agree to the terms of this Privacy Policy. If you do not agree, please do not use the Website.
              </p>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">1. Information We Collect</h2>
                
                <h3 className="font-semibold text-xl mb-3">Personal Information (provided by you):</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number (optional)</li>
                  <li>Billing and shipping address</li>
                  <li>Payment details (processed securely through third-party payment gateways)</li>
                </ul>

                <h3 className="font-semibold text-xl mb-3 mt-6">Automatically Collected Information:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Browsing data (IP address, device type, browser type, operating system)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Website usage patterns, analytics, and preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">2. How We Use Your Information</h2>
                <p className="mb-3">We use the collected information for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Processing and fulfilling your orders</li>
                  <li>Managing payments and transactions</li>
                  <li>Delivering products to your address</li>
                  <li>Sending order updates, confirmations, and support communications</li>
                  <li>Marketing, promotional offers, and newsletters (with your consent)</li>
                  <li>Improving Website functionality, user experience, and services</li>
                  <li>Compliance with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">3. Sharing of Information</h2>
                <p className="mb-3">We do not sell or rent your personal information. However, we may share your data with trusted third parties only for legitimate purposes, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payment Processors (e.g., Razorpay) for secure transaction handling</li>
                  <li>Delivery & Logistics Partners (e.g., Delhivery) for product shipping</li>
                  <li>Analytics & Marketing Tools (e.g., Google Analytics, Meta Ads) for performance insights</li>
                  <li>Legal & Regulatory Authorities when required by applicable law</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">4. Cookies & Tracking Technologies</h2>
                <p className="mb-3">Our Website uses cookies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and cart items</li>
                  <li>Provide a personalized shopping experience</li>
                  <li>Measure and improve Website performance</li>
                  <li>Deliver relevant advertisements</li>
                </ul>
                <p className="mt-4">You can control or disable cookies through your browser settings. However, some features of the Website may not function properly without cookies.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">5. Data Security</h2>
                <p>We implement industry-standard security measures to protect your personal information, including encryption and restricted access. However, no electronic storage or transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">6. Your Rights</h2>
                <p className="mb-3">As a user, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and request a copy of your personal data</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Opt out of marketing communications at any time</li>
                  <li>Request deletion of your personal data (subject to legal or business requirements)</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact us at smfurnishings.india@gmail.com.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">7. Data Retention</h2>
                <p>We retain your personal data only as long as necessary for fulfilling orders, complying with legal obligations, resolving disputes, and enforcing our agreements.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">8. Third-Party Links</h2>
                <p>Our Website may contain links to external sites. We are not responsible for the privacy practices or content of third-party websites.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">9. Compliance with Laws</h2>
                <p className="mb-4">This Privacy Policy is governed by the laws of India, including but not limited to the Information Technology Act, 2000 and applicable data protection rules.</p>
                <p className="mb-4">For customers in the EU, we follow key transparency and fairness principles of the General Data Protection Regulation (GDPR).</p>
                <p>For customers in California (USA), we respect applicable rights under the California Consumer Privacy Act (CCPA).</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">10. Updates to This Policy</h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in technology, law, or business practices. Updates will be posted on this page with a revised "Last Updated" date.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-terracotta mb-4">11. Contact Us</h2>
                <p className="mb-4">If you have questions or concerns about this Privacy Policy, please contact us at:</p>
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