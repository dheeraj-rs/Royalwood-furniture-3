"use client";

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-black text-sm">R</span>
              </div>
              <h3 className="text-xl font-playfair text-gradient">Royalwood</h3>
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              Crafting exceptional furniture pieces that blend traditional artistry with contemporary design for over 50 years.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="glass-effect hover:bg-amber-500/20 text-white hover:text-amber-400 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                'Living Room', 'Bedroom', 'Dining Room', 'Office', 
                'About Us', 'Contact', 'FAQ', 'Size Guide'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-amber-400 transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Customer Service</h4>
            <ul className="space-y-4">
              {[
                'Shipping Info', 'Returns & Exchanges', 'Warranty', 'Care Instructions',
                'Track Your Order', 'Gift Cards', 'Bulk Orders', 'Design Services'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-amber-400 transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Stay Connected</h4>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-white/70">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-white/70">info@royalwood.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1" />
                <span className="text-white/70">
                  123 Furniture St,<br />
                  Craftsman District, NY 10001
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="text-white font-medium mb-4">Newsletter</h5>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1"
                />
                <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                  Subscribe
                </Button>
              </div>
              <p className="text-white/50 text-sm mt-2">
                Get exclusive offers and new arrivals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © {currentYear} Royalwood. All rights reserved.
            </p>

            {/* Made with Love */}
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for furniture lovers</span>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-amber-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}