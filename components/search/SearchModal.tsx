"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchData = [
  { id: 1, name: "Royal Oak Dining Table", category: "Dining", price: 2499, image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg" },
  { id: 2, name: "Luxury Velvet Sofa", category: "Living Room", price: 1899, image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg" },
  { id: 3, name: "Designer Coffee Table", category: "Living Room", price: 799, image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg" },
  { id: 4, name: "Modern Bookshelf", category: "Office", price: 649, image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg" },
  { id: 5, name: "Artisan Wardrobe", category: "Bedroom", price: 1299, image: "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg" },
  { id: 6, name: "Executive Desk Chair", category: "Office", price: 449, image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
];

const recentSearches = ["Dining Table", "Sofa", "Office Chair", "Bookshelf"];
const trendingSearches = ["Velvet Sofa", "Oak Table", "Modern Chair", "Designer Lamp"];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(searchData);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = searchData.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults(searchData);
      setIsSearching(false);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in-0">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col max-w-4xl">
        {/* Search Header */}
        <div className="glass-dark rounded-2xl p-6 mb-6 animate-in slide-in-from-top-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search furniture, categories, or brands..."
                className="pl-12 pr-4 py-4 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg rounded-xl focus:ring-2 focus:ring-amber-500"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Quick Searches */}
          {!query && (
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm font-medium">Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <Badge
                      key={search}
                      variant="secondary"
                      className="bg-white/10 text-white hover:bg-white/20 cursor-pointer transition-colors"
                      onClick={() => setQuery(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-white/80 text-sm font-medium">Trending</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search) => (
                    <Badge
                      key={search}
                      variant="secondary"
                      className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 cursor-pointer transition-colors"
                      onClick={() => setQuery(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="flex-1 glass-dark rounded-2xl p-6 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">
              {query ? `Results for "${query}"` : 'Popular Products'}
            </h3>
            <span className="text-white/60 text-sm">
              {results.length} {results.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="h-full overflow-y-auto space-y-4 pr-2">
            {results.length > 0 ? (
              results.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-white/60 text-sm">{item.category}</p>
                    <p className="text-amber-400 font-semibold">${item.price}</p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-white/60" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">No results found</h4>
                <p className="text-white/60">Try searching with different keywords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}