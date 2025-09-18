import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-terracotta text-white py-16">
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
                Transforming homes with affordable luxury furniture. Each piece is carefully curated to bring elegance and comfort to every space.
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
                  <a 
                    href="#" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-link-contact"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-link-faq"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg" data-testid="footer-categories-title">Categories</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-living"
                  >
                    Living Room
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-bedroom"
                  >
                    Bedroom
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-dining"
                  >
                    Dining Room
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-office"
                  >
                    Office
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-cream hover:text-white transition-colors duration-200"
                    data-testid="footer-category-outdoor"
                  >
                    Outdoor
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg" data-testid="footer-contact-title">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-cream">
                  <Phone className="w-4 h-4" />
                  <span data-testid="footer-phone">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-cream">
                  <Mail className="w-4 h-4" />
                  <span data-testid="footer-email">hello@smfurnishings.com</span>
                </div>
                <div className="flex items-start space-x-3 text-cream">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span data-testid="footer-address">
                    123 Furniture Ave<br />
                    Design District, NY 10001
                  </span>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h5 className="font-medium" data-testid="footer-newsletter-title">Stay Updated</h5>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-cream text-foreground border-cream-dark placeholder:text-muted-foreground"
                    data-testid="footer-newsletter-input"
                  />
                  <Button
                    className="bg-cream text-terracotta hover:bg-cream-dark transition-colors duration-200 font-semibold"
                    data-testid="footer-newsletter-button"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-cream-dark opacity-30 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-cream text-sm" data-testid="footer-copyright">
              © 2024 SM Furnishings. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-cream hover:text-white transition-colors duration-200"
                data-testid="footer-privacy"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-cream hover:text-white transition-colors duration-200"
                data-testid="footer-terms"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-cream hover:text-white transition-colors duration-200"
                data-testid="footer-returns"
              >
                Returns & Exchanges
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}