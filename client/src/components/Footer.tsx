import { useState } from "react";
import { Link } from "wouter";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { submitNewsletter } from "@/lib/api";
import smLogo from "@assets/4_1758709631305.png";

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand & About */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                {/* SM Furnishings Logo */}
                <img 
                  src={smLogo} 
                  alt="SM Furnishings Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <h3 className="text-lg sm:text-2xl font-bold tracking-wider" style={{ fontFamily: 'var(--font-quiche)' }} data-testid="footer-brand">
                  SM FURNISHINGS
                </h3>
              </div>
              <p className="text-xs sm:text-base text-cream leading-relaxed" data-testid="footer-description">
                SM Furnishings is more than a home décor brand — it's a family legacy. Inspired by Shakuntala & Manohar's values of love, comfort, and quality, we design luxury that feels personal, timeless, and affordable.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-cream hover:text-white hover:bg-terracotta-dark transition-colors duration-200 rounded-full"
                  style={{ borderRadius: '3px' }}
                  data-testid="footer-social-instagram"
                  onClick={() => window.open('https://www.instagram.com/sm_furnishings/', '_blank')}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-cream hover:text-white hover:bg-terracotta-dark transition-colors duration-200 rounded-full"
                  style={{ borderRadius: '3px' }}
                  data-testid="footer-social-linkedin"
                  onClick={() => window.open('https://www.linkedin.com/company/sm-furnishings/', '_blank')}
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links & Contact */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4 md:gap-8">
              {/* Quick Links */}
              <div className="space-y-6 ml-4 md:ml-8">
                <h4 className="font-semibold text-sm sm:text-lg" data-testid="footer-links-title">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/" 
                      className="text-xs sm:text-base text-cream hover:text-white transition-colors duration-200"
                      data-testid="footer-link-home"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/shop" 
                      className="text-xs sm:text-base text-cream hover:text-white transition-colors duration-200"
                      data-testid="footer-link-shop"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="text-xs sm:text-base text-cream hover:text-white transition-colors duration-200"
                      data-testid="footer-link-about"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/faqs" 
                      className="text-xs sm:text-base text-cream hover:text-white transition-colors duration-200"
                      data-testid="footer-link-faqs"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact & Newsletter */}
              <div className="space-y-6 text-center">
                <h4 className="font-semibold text-xs sm:text-sm" data-testid="footer-contact-title">Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3 text-cream">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm" data-testid="footer-email">Info@smfurnishings.com</span>
                  </div>
                  <div className="flex items-start justify-center space-x-3 text-cream">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-1" />
                    <span className="text-xs sm:text-sm text-center" data-testid="footer-address">
                      233, Model Town, Tosham Road<br />
                      Hisar, 125001
                    </span>
                  </div>
                </div>

                {/* Newsletter Section under Contact Us */}
                <div className="space-y-4 pt-2">
                  <h5 className="font-semibold text-xs sm:text-sm">Newsletter</h5>
                  <p className="font-medium text-xs text-center text-cream">Subscribe to our newsletter to receive the latest collections, special drops, and exclusive coupons.</p>
                  <div className="flex flex-col space-y-2 items-center">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-cream text-foreground border-cream-dark placeholder:text-muted-foreground text-center w-full max-w-xs"
                      data-testid="footer-newsletter-input"
                    />
                    <Button
                      onClick={handleNewsletterSubmit}
                      disabled={isSubmitting || !email.trim()}
                      className="bg-cream text-terracotta hover:bg-cream-dark transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs"
                      data-testid="footer-newsletter-button"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-cream-dark opacity-30 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-cream text-xs sm:text-sm" data-testid="footer-copyright">
              © 2025 SM Furnishings. All rights reserved.
            </div>
            <div className="flex space-x-6 text-xs sm:text-sm">
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