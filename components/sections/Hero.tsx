"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Luxury Redefined",
      subtitle: "Handcrafted Excellence",
      description: "Discover our premium collection of handcrafted furniture pieces that blend traditional artistry with contemporary design.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    },
    {
      title: "Modern Elegance",
      subtitle: "Timeless Design",
      description: "Transform your living spaces with our curated selection of modern furniture that speaks to your sophisticated taste.",
      image: "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg"
    },
    {
      title: "Artisan Crafted",
      subtitle: "Premium Quality",
      description: "Each piece is meticulously crafted by skilled artisans using the finest materials and time-honored techniques.",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%),
                        url('${slide.image}') center/cover`
          }}
        />
      ))}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Stats */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="glass-effect rounded-full px-4 py-2">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-white text-sm">4.9 Rating</span>
              </div>
            </div>
            <div className="glass-effect rounded-full px-4 py-2">
              <span className="text-white text-sm">1000+ Happy Customers</span>
            </div>
            <div className="glass-effect rounded-full px-4 py-2">
              <span className="text-white text-sm">Premium Quality</span>
            </div>
          </div>

          <h2 className="text-amber-400 font-medium mb-4 text-lg tracking-wide">
            {slides[currentSlide].subtitle}
          </h2>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 rounded-full animate-glow"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-white border-white/20 hover:bg-white/10 px-8 py-4 rounded-full glass-effect"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Story
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-amber-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="glass-effect rounded-full p-3 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}