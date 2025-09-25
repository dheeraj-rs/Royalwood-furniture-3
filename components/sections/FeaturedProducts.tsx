"use client";

import { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/providers/CartProvider';
import { useToast } from '@/hooks/use-toast';

const featuredProducts = [
  {
    id: 1,
    name: "Royal Oak Dining Table",
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 128,
    category: "Dining",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 2,
    name: "Luxury Velvet Sofa",
    price: 1899,
    originalPrice: null,
    rating: 4.8,
    reviews: 94,
    category: "Living Room",
    image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
    badge: "New",
    isNew: true
  },
  {
    id: 3,
    name: "Designer Coffee Table",
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    reviews: 76,
    category: "Living Room",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
    badge: "Sale",
    isNew: false
  },
  {
    id: 4,
    name: "Modern Bookshelf",
    price: 649,
    originalPrice: null,
    rating: 4.9,
    reviews: 152,
    category: "Office",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    badge: null,
    isNew: false
  },
  {
    id: 5,
    name: "Artisan Wardrobe",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 89,
    category: "Bedroom",
    image: "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg",
    badge: "Limited",
    isNew: false
  },
  {
    id: 6,
    name: "Executive Desk Chair",
    price: 449,
    originalPrice: null,
    rating: 4.6,
    reviews: 203,
    category: "Office",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    badge: "Popular",
    isNew: false
  }
];

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case 'Bestseller': return 'bg-amber-500 text-black';
      case 'New': return 'bg-green-500 text-white';
      case 'Sale': return 'bg-red-500 text-white';
      case 'Limited': return 'bg-purple-500 text-white';
      case 'Popular': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <section id="shop" className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Featured <span className="text-gradient">Collection</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover our handpicked selection of premium furniture pieces that define luxury and comfort
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group glass-dark border-white/10 overflow-hidden hover:border-amber-500/50 transition-all duration-500 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                {/* Product Image */}
                <div className="aspect-[4/3] bg-gray-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.badge && (
                    <Badge className={`${getBadgeVariant(product.badge)} text-xs font-semibold`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-semibold animate-pulse">
                      NEW
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="glass-effect hover:bg-white/20 text-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="glass-effect hover:bg-white/20 text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Category */}
                <p className="text-amber-400 text-sm font-medium mb-2">{product.category}</p>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-amber-400 fill-current' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/80 text-sm">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <Badge className="bg-red-500 text-white text-xs">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-12 py-4 text-lg font-semibold"
          >
            View All Products
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}