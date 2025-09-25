"use client";

import { Award, Users, Truck, Shield, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handcrafted with the finest materials by skilled artisans",
    gradient: "from-amber-400 to-yellow-600"
  },
  {
    icon: Users,
    title: "Expert Craftsmen",
    description: "Over 50 years of combined experience in furniture making",
    gradient: "from-blue-400 to-indigo-600"
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary white-glove delivery and setup service",
    gradient: "from-green-400 to-emerald-600"
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Comprehensive protection for your investment",
    gradient: "from-purple-400 to-violet-600"
  }
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "50+", label: "Years Experience" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "500+", label: "Products Crafted" }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Why Choose <span className="text-gradient">Royalwood</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            For over five decades, we've been crafting exceptional furniture pieces that stand the test of time. 
            Our commitment to quality, craftsmanship, and customer satisfaction sets us apart.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group glass-dark border-white/10 hover:border-amber-500/50 transition-all duration-500 transform hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-amber-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
              Our <span className="text-gradient">Story</span>
            </h3>
            
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Founded in 1973, Royalwood began as a small family workshop with a simple mission: 
              to create furniture that combines traditional craftsmanship with modern design sensibilities.
            </p>
            
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Today, we continue that legacy with a team of master craftsmen who pour their passion 
              into every piece, ensuring that each item tells a story of excellence and attention to detail.
            </p>

            {/* Check Points */}
            <div className="space-y-4 mb-8">
              {[
                "Sustainable sourcing of premium materials",
                "Traditional techniques meets modern innovation",
                "Customization options for unique requirements",
                "Comprehensive after-sales support"
              ].map((point, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-white/80">{point}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4"
            >
              Learn More About Us
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-dark">
              <img
                src="https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg"
                alt="Our Workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6">
              <div className="glass-effect rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-amber-400 fill-current" />
                  <div>
                    <div className="text-white font-bold">4.9/5</div>
                    <div className="text-white/60 text-sm">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6">
              <div className="glass-effect rounded-2xl p-4">
                <div className="text-white font-bold text-2xl">50+</div>
                <div className="text-white/60 text-sm">Years Legacy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}