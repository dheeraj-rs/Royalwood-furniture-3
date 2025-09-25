"use client";

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Search, Home, Package, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/providers/CartProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import AuthModal from '@/components/auth/AuthModal';
import CartSidebar from '@/components/cart/CartSidebar';
import SearchModal from '@/components/search/SearchModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Shop', href: '#shop', icon: Package },
    { name: 'About', href: '#about', icon: Info },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-black text-sm">R</span>
              </div>
              <h1 className="text-xl font-playfair text-gradient">Royalwood</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-amber-400">
                <Search 
                  className="w-5 h-5 cursor-pointer transition-transform hover:scale-110" 
                  onClick={() => setIsSearchOpen(true)}
                />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-amber-400"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-amber-400 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-dark border-t border-white/10 mt-2">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-white/80 hover:text-amber-400 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </a>
                ))}
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-amber-400"
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="text-white hover:text-amber-400"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Account
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="text-white hover:text-amber-400 relative"
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Cart
                    {cartItems.length > 0 && (
                      <Badge className="ml-2 bg-amber-500 text-black text-xs">
                        {cartItems.length}
                      </Badge>
                    )}
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}