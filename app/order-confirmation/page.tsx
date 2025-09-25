"use client";

import { useEffect, useState } from 'react';
import { Check, Package, Truck, Home, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(`RW${Date.now().toString().slice(-6)}`);
  const router = useRouter();

  const orderItems = [
    { id: 1, name: "Royal Oak Dining Table", price: 2499, quantity: 1, image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg" },
    { id: 2, name: "Luxury Velvet Sofa", price: 1899, quantity: 1, image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg" },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const trackingSteps = [
    { id: 1, title: 'Order Confirmed', status: 'completed', date: 'Today' },
    { id: 2, title: 'Processing', status: 'current', date: '1-2 days' },
    { id: 3, title: 'Shipped', status: 'pending', date: '3-5 days' },
    { id: 4, title: 'Delivered', status: 'pending', date: '7-10 days' },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in-50">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-white/80 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-white/60">
            Order #{orderNumber} • Estimated delivery: 7-10 business days
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 glass-effect rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-white/60 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <span className="text-amber-400 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Order Tracking */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Order Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        step.status === 'completed' 
                          ? 'bg-green-500 border-green-500' 
                          : step.status === 'current'
                          ? 'bg-amber-500 border-amber-500'
                          : 'bg-white/10 border-white/20'
                      }`}>
                        {step.status === 'completed' ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-semibold text-sm">{step.id}</span>
                        )}
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <p className={`font-medium ${
                          step.status === 'completed' || step.status === 'current'
                            ? 'text-white' 
                            : 'text-white/60'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-white/60 text-sm">{step.date}</p>
                      </div>

                      {step.status === 'current' && (
                        <Badge className="bg-amber-500 text-black">
                          Current
                        </Badge>
                      )}
                      
                      {index < trackingSteps.length - 1 && (
                        <div className={`absolute left-5 mt-10 w-0.5 h-8 ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-white/20'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white/80">
                  <p className="font-medium text-white">John Doe</p>
                  <p>123 Main Street</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                  <p className="mt-2">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-lg pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-amber-400">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="glass-dark border-white/10">
              <CardContent className="pt-6 space-y-4">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  onClick={() => router.push('/track-order')}
                >
                  Track Your Order
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full text-white/70 hover:text-white"
                  onClick={() => router.push('/')}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="glass-dark border-white/10">
              <CardContent className="pt-6">
                <h4 className="text-white font-medium mb-3">Need Help?</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-white/70">
                    Questions about your order? Our customer service team is here to help.
                  </p>
                  <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0 h-auto">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}