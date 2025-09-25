"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Categories from '@/components/sections/Categories';
import About from '@/components/sections/About';
import Footer from '@/components/layout/Footer';
import CartProvider from '@/components/providers/CartProvider';
import AuthProvider from '@/components/providers/AuthProvider';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-amber-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-playfair text-gradient">Royalwood</h1>
          <p className="text-white/60 mt-2">Loading luxury...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-black">
          <Header />
          <main>
            <Hero />
            <FeaturedProducts />
            <Categories />
            <About />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}