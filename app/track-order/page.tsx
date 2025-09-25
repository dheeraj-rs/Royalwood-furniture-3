"use client";

import { useState } from 'react';
import { Search, Package, Truck, MapPin, Clock, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const router = useRouter();

  const mockTrackingData = {
    orderNumber: 'RW123456',
    status: 'In Transit',
    estimatedDelivery: 'March 15, 2024',
    currentLocation: 'Distribution Center - New York',
    items: [
      { name: 'Royal Oak Dining Table', quantity: 1, image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg' },
      { name: 'Luxury Velvet Sofa', quantity: 1, image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg' }
    ],
    timeline: [
      { 
        id: 1, 
        title: 'Order Placed', 
        description: 'Your order has been confirmed and is being prepared',
        date: 'March 8, 2024 - 2:30 PM',
        status: 'completed',
        icon: Package
      },
      { 
        id: 2, 
        title: 'Processing', 
        description: 'Items are being carefully prepared and quality checked',
        date: 'March 9, 2024 - 10:15 AM',
        status: 'completed',
        icon: Package
      },
      { 
        id: 3, 
        title: 'Shipped', 
        description: 'Your order has left our warehouse and is on its way',
        date: 'March 12, 2024 - 8:45 AM',
        status: 'completed',
        icon: Truck
      },
      { 
        id: 4, 
        title: 'In Transit', 
        description: 'Package is currently at Distribution Center - New York',
        date: 'March 13, 2024 - 3:20 PM',
        status: 'current',
        icon: MapPin
      },
      { 
        id: 5, 
        title: 'Out for Delivery', 
        description: 'Your order is out for delivery and will arrive today',
        date: 'Estimated: March 15, 2024',
        status: 'pending',
        icon: Truck
      },
      { 
        id: 6, 
        title: 'Delivered', 
        description: 'Package has been successfully delivered',
        date: 'Estimated: March 15, 2024',
        status: 'pending',
        icon: Check
      }
    ]
  };

  const handleTrackOrder = () => {
    if (orderNumber.trim()) {
      setTrackingData(mockTrackingData);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500 border-green-500';
      case 'current': return 'bg-amber-500 border-amber-500';
      case 'pending': return 'bg-white/10 border-white/20';
      default: return 'bg-white/10 border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="text-white hover:text-amber-400"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-black text-sm">R</span>
            </div>
            <h1 className="text-xl font-playfair text-gradient">Royalwood</h1>
          </div>
        </div>

        {!trackingData ? (
          /* Track Order Form */
          <div className="max-w-md mx-auto">
            <Card className="glass-dark border-white/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-amber-400" />
                </div>
                <CardTitle className="text-white text-2xl font-playfair">
                  Track Your Order
                </CardTitle>
                <p className="text-white/70">
                  Enter your order number to see the latest updates
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Order Number
                  </label>
                  <div className="relative">
                    <Input
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="Enter order number (e.g., RW123456)"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-4 pr-12"
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  </div>
                </div>

                <Button
                  onClick={handleTrackOrder}
                  disabled={!orderNumber.trim()}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3"
                >
                  Track Order
                </Button>

                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-2">
                    Don't have your order number?
                  </p>
                  <Button variant="ghost" className="text-amber-400 hover:text-amber-300">
                    Check your email receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Tracking Results */
          <div className="space-y-8">
            {/* Order Status Header */}
            <Card className="glass-dark border-white/10">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Order #{trackingData.orderNumber}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-amber-500 text-black">
                        {trackingData.status}
                      </Badge>
                      <span className="text-white/70">
                        Estimated delivery: {trackingData.estimatedDelivery}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-white/70 text-sm">Current Location</p>
                    <p className="text-white font-medium">{trackingData.currentLocation}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h3 className="text-white font-medium">Items in this order</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trackingData.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 glass-effect rounded-lg p-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{item.name}</p>
                          <p className="text-white/60 text-xs">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Tracking Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingData.timeline.map((step, index) => (
                    <div key={step.id} className="relative flex items-start">
                      {/* Timeline Line */}
                      {index < trackingData.timeline.length - 1 && (
                        <div className={`absolute left-5 top-12 w-0.5 h-16 ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-white/20'
                        }`} />
                      )}
                      
                      {/* Status Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getStatusColor(step.status)} flex-shrink-0`}>
                        {step.status === 'completed' ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : step.status === 'current' ? (
                          <step.icon className="w-5 h-5 text-white" />
                        ) : (
                          <step.icon className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium ${
                            step.status === 'pending' ? 'text-white/60' : 'text-white'
                          }`}>
                            {step.title}
                          </h4>
                          {step.status === 'current' && (
                            <Badge className="bg-amber-500 text-black text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${
                          step.status === 'pending' ? 'text-white/40' : 'text-white/70'
                        }`}>
                          {step.description}
                        </p>
                        <p className={`text-xs ${
                          step.status === 'pending' ? 'text-white/40' : 'text-white/60'
                        }`}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => setTrackingData(null)}
              >
                Track Another Order
              </Button>
              
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}