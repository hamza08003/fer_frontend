
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import axios_ from "@/lib/axios.ts";
import {token} from "@/utils/auth.ts";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    general: null
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const [verificationError, setVerificationError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({
        username: null,
        password: null,
        general: null
    });
    
    // api call
    let response;
    try {
      response = await axios_.post("/fer/v1/auth/login/", {
        username: formData.username,
        password: formData.password
      })
      if (response.data.two_factor_required === true) {
        // Redirect to 2FA page
        navigate('/2fa-code');
        return;
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      if (e.response && e.response.data && e.response.data.message) {
        setErrors({ ...errors, general: e.response.data.message });
        if (e.response.data.email_verified === false)
        {
          setVerificationError(true);
        }
      } else {
        setErrors({ ...errors, general: 'Network error. Please check your connection.' });
      }
      return;
    }

    token.set(response.data.token, formData.rememberMe);



    setIsLoading(false);

    toast({
      title: "Welcome back!",
      description: "You've successfully signed in to your account.",
    });
    // redirect to profile
    window.location.href = '/profile';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-fer-bg-card border-fer-bg-card">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-fer-text/70 hover:text-fer-text p-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-fer-text">Welcome Back</h1>
              <p className="text-fer-text/70">Sign in to your account</p>
            </div>
          </div>

          {errors.general && (
            <div className="p-4 bg-fer-error/10 border border-fer-error rounded-lg">
              <p className="text-fer-error text-sm">{errors.general}</p>
              {
                verificationError && (
                      <Link to="/verify-email" className="text-fer-primary hover:underline text-sm">
                        Resend verification email
                      </Link>
                  )
              }
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-fer-text">Username or Email</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary"
                placeholder="Enter your username or email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-fer-text">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary pr-10 ${
                    errors.password ? 'border-fer-error' : ''
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-fer-text/70 hover:text-fer-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-fer-error text-sm">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked: boolean) =>
                    setFormData({ ...formData, rememberMe: checked })
                  }
                  className="border-fer-text/30 data-[state=checked]:bg-fer-primary data-[state=checked]:border-fer-primary"
                />
                <Label htmlFor="rememberMe" className="text-fer-text/70 text-sm">
                  Remember me
                </Label>
              </div>
              <Link to="/forgot-password" className="text-fer-primary hover:underline text-sm">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-fer-text/70">
              Don't have an account?{' '}
              <Link to="/signup" className="text-fer-primary hover:underline">
                Create Account
              </Link>
            </p>
          </div>

          <div className="pt-4 border-t border-fer-bg-main">
            <p className="text-xs text-fer-text/50 text-center">
              Demo: Try "2fa@example.com" for 2FA flow, "unverified@example.com" for verification, or "wrong" password for error
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
