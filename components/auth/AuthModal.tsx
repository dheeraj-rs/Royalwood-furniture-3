"use client";

import { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { login, register, isLoading } = useAuth();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let success = false;
    if (isLogin) {
      success = await login(formData.email, formData.password);
    } else {
      success = await register(formData.name, formData.email, formData.password);
    }

    if (success) {
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You've been successfully logged in." : "Welcome to Royalwood!",
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: isLogin ? "Invalid credentials." : "Failed to create account.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass-dark border border-white/20 rounded-2xl w-full max-w-md p-8 animate-in zoom-in-95">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white/60 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center">
              <span className="font-bold text-black">R</span>
            </div>
            <h2 className="text-2xl font-playfair text-gradient">Royalwood</h2>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-white/70">
            {isLogin ? 'Sign in to your account' : 'Join our exclusive community'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="text-white mb-2 block">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                required={!isLogin}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-white mb-2 block">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white mb-2 block">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                placeholder="Enter your password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="text-center mt-6 pt-6 border-t border-white/10">
          <p className="text-white/70">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="ghost"
            className="text-amber-400 hover:text-amber-300 mt-2"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </Button>
        </div>
      </div>
    </div>
  );
}