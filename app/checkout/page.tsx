"use client";

import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/providers/CartProvider';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  
  const { cartItems, getTotalPrice } = useCart();
  const router = useRouter();
  const subtotal = getTotalPrice();
  const shipping = 99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 1, title: 'Information', icon: Mail },
    { id: 2, title: 'Shipping', icon: Truck },
    { id: 3, title: 'Payment', icon: CreditCard }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    router.push('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="text-white hover:text-amber-400"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-black text-sm">R</span>
            </div>
            <h1 className="text-xl font-playfair text-gradient">Royalwood</h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${
                  step >= stepItem.id ? 'text-amber-400' : 'text-white/40'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step >= stepItem.id 
                      ? 'border-amber-400 bg-amber-400/20' 
                      : 'border-white/20 bg-white/5'
                  }`}>
                    {step > stepItem.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <stepItem.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="hidden md:block font-medium">{stepItem.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-4 ${
                    step > stepItem.id ? 'bg-amber-400' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  {step === 1 && 'Contact Information'}
                  {step === 2 && 'Shipping Address'}
                  {step === 3 && 'Payment Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Contact Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white mb-2 block">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white mb-2 block">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping Address */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-white mb-2 block">
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="123 Main Street"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-white mb-2 block">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-white mb-2 block">
                          State
                        </Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-white mb-2 block">
                          ZIP Code
                        </Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    {/* Shipping Options */}
                    <div className="space-y-3 pt-4">
                      <h4 className="text-white font-medium">Shipping Options</h4>
                      <div className="space-y-2">
                        <div className="glass-effect rounded-lg p-4 border border-amber-500/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Truck className="w-5 h-5 text-amber-400" />
                              <div>
                                <p className="text-white font-medium">White Glove Delivery</p>
                                <p className="text-white/60 text-sm">Professional setup included</p>
                              </div>
                            </div>
                            <span className="text-amber-400 font-semibold">$99</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nameOnCard" className="text-white mb-2 block">
                        Name on Card
                      </Label>
                      <Input
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber" className="text-white mb-2 block">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-white mb-2 block">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-white mb-2 block">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    {/* Security Features */}
                    <div className="glass-effect rounded-lg p-4 mt-6">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">Secure Payment</p>
                          <p className="text-white/60 text-sm">Your payment information is encrypted and secure</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="text-white hover:text-amber-400 disabled:opacity-50"
                  >
                    Back
                  </Button>
                  
                  <Button
                    onClick={step === 3 ? handleSubmit : handleNext}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8"
                  >
                    {step === 3 ? 'Complete Order' : 'Continue'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="glass-dark border-white/10 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{item.name}</p>
                        <p className="text-white/60 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-amber-400 font-semibold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
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

                {/* Trust Badges */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <span>Free Returns within 30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}