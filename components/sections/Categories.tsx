"use client";

import { ArrowRight, Sofa, Bed, Utensils, Briefcase, Lamp, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 1,
    name: "Living Room",
    description: "Elegant sofas, coffee tables, and entertainment units",
    icon: Sofa,
    image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
    count: 156,
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    name: "Bedroom",
    description: "Comfortable beds, wardrobes, and nightstands",
    icon: Bed,
    image: "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg",
    count: 98,
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 3,
    name: "Dining Room",
    description: "Beautiful dining tables, chairs, and cabinets",
    icon: Utensils,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    count: 73,
    color: "from-amber-500 to-orange-600"
  },
  {
    id: 4,
    name: "Office",
    description: "Ergonomic desks, chairs, and storage solutions",
    icon: Briefcase,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    count: 124,
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 5,
    name: "Lighting",
    description: "Designer lamps, chandeliers, and fixtures",
    icon: Lamp,
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
    count: 89,
    color: "from-yellow-500 to-amber-600"
  },
  {
    id: 6,
    name: "Accessories",
    description: "Decorative items, mirrors, and accents",
    icon: Home,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    count: 215,
    color: "from-indigo-500 to-blue-600"
  }
];

export default function Categories() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore our diverse collection of furniture designed for every space in your home
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.id}
              className="group glass-dark border-white/10 overflow-hidden hover:border-amber-500/50 transition-all duration-500 transform hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="absolute top-6 left-6">
                  <div className="glass-effect rounded-full p-3 group-hover:bg-white/20 transition-all duration-300">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Product Count */}
                <div className="absolute top-6 right-6">
                  <div className="glass-effect rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">{category.count} items</span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <div className="glass-effect rounded-full p-2">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 glass-effect rounded-full px-8 py-4">
            <span className="text-white/80">Can't find what you're looking for?</span>
            <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0">
              Browse All Categories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}