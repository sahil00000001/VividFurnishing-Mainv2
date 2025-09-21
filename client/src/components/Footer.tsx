import { useState } from "react";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { submitNewsletter } from "@/lib/api";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async () => {
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await submitNewsletter({ email });
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter. You'll receive the latest updates and exclusive coupons.",
        });
        setEmail("");
      } catch (error) {
        toast({
          title: "Subscription failed",
          description: "Please try again later or contact support if the problem persists.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <footer className="text-white py-16" style={{ backgroundColor: 'rgb(88 35 8 / var(--tw-bg-opacity, 1))' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand & About */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold tracking-wider" data-testid="footer-brand">
                SM FURNISHINGS
              </h3>
              <p className="text-cream leading-relaxed" data-testid="footer-description">
                SM Furnishings is more than a home décor brand — it's a family legacy. Inspired by Shakuntala & Manohar's values of love, comfort, and quality, we design luxury that feels personal, timeless, and affordable.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-cream hover:text-white hover:bg-terracotta-dark transition-colors duration-200"
                  data-testid="footer-social-facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-cream hover:text-white hover:bg-terracotta-dark transition-colors duration-200"
                  data-testid="footer-social-instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-cream hover:text-white hover:bg-terracotta-dark transition-colors duration-200"
                  data-testid="footer-social-twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg" data-testid="footer-links-title">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-link-home"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/shop" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-link-shop"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-link-about"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-link-contact"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-link-faq"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg" data-testid="footer-categories-title">Categories</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/category/living-room" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-living"
                  >
                    Living Room
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/category/bedroom" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-bedroom"
                  >
                    Bedroom
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/category/dining-room" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-dining"
                  >
                    Dining Room
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/category/office" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-office"
                  >
                    Office
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/category/outdoor" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-outdoor"
                  >
                    Outdoor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg" data-testid="footer-contact-title">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-cream">
                  <Mail className="w-4 h-4" />
                  <span data-testid="footer-email">hello@smfurnishings.com</span>
                </div>
                <div className="flex items-start space-x-3 text-cream">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span data-testid="footer-address">
                    233, Model Town, Tosham Road<br />
                    Hisar, 1250001
                  </span>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h5 className="font-medium" data-testid="footer-newsletter-title">Subscribe to our newsletter to receive the latest collections, special drops, and exclusive coupons.</h5>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-cream text-foreground border-cream-dark placeholder:text-muted-foreground"
                    data-testid="footer-newsletter-input"
                  />
                  <Button
                    onClick={handleNewsletterSubmit}
                    disabled={isSubmitting || !email.trim()}
                    className="bg-cream text-terracotta hover:bg-cream-dark transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="footer-newsletter-button"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-cream-dark opacity-30 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-cream text-sm" data-testid="footer-copyright">
              © 2025 SM Furnishings. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-cream hover:text-white transition-colors duration-200"
                data-testid="footer-privacy"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-cream hover:text-white transition-colors duration-200"
                data-testid="footer-terms"
              >
                Terms of Service
              </Link>
              <Link 
                href="/returns" 
                className="text-cream hover:text-white transition-colors duration-200"
                data-testid="footer-returns"
              >
                Returns & Exchanges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}