
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">CricNagar</h2>
            <p className="mb-4 opacity-80">
              Premium cricket equipment store providing high-quality cricket gear for professionals
              and enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in animation-delay-200">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="opacity-80 hover:opacity-100 transition-opacity">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/payment" className="opacity-80 hover:opacity-100 transition-opacity">
                  Payment
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="opacity-80 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="opacity-80 hover:opacity-100 transition-opacity">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="animate-fade-in animation-delay-400">
            <h3 className="text-lg font-bold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products/bat"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Cricket Bats
                </Link>
              </li>
              <li>
                <Link
                  to="/products/ball"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Cricket Balls
                </Link>
              </li>
              <li>
                <Link
                  to="/products/pad"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Batting Pads
                </Link>
              </li>
              <li>
                <Link
                  to="/products/gloves"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Batting Gloves
                </Link>
              </li>
              <li>
                <Link
                  to="/products/helmet"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Helmets
                </Link>
              </li>
              <li>
                <Link
                  to="/products/accessories"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in animation-delay-600">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span className="opacity-80">
                  123 Cricket Street, Biratnagar, Nepal
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="shrink-0" />
                <span className="opacity-80">+977 1234567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="shrink-0" />
                <span className="opacity-80">info@cricnagar.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} CricNagar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
