"use client";

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/CartProvider';
import { useToast } from '@/hooks/use-toast';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Redirecting to secure checkout...",
    });
    // In real app, redirect to checkout page
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md glass-dark border-l border-white/20 animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/60 hover:text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                <p className="text-white/60 mb-6">Add some beautiful furniture to get started</p>
                <Button
                  onClick={onClose}
                  className="bg-amber-500 hover:bg-amber-600 text-black"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-auto p-6 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{item.name}</h4>
                      <p className="text-amber-400 font-semibold">${item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mt-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 glass-effect hover:bg-white/20 text-white"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="text-white min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 glass-effect hover:bg-white/20 text-white"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-lg">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-amber-400 font-bold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      className="flex-1 text-white/70 hover:text-white border-white/20"
                      onClick={onClose}
                    >
                      Continue Shopping
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={clearCart}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}