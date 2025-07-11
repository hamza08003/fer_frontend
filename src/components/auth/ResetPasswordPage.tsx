
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Key, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const ResetPasswordPage = (props: object) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [errors, setErrors] = useState({
    password: null,
    confirmPassword: null
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulate checking if token is expired (demo purposes)
  const checkTokenExpired = Math.random() < 0.3; // 30% chance of expired token

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {
        password: null,
        confirmPassword: null
    };
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (checkTokenExpired) {
        setIsExpired(true);
        return;
      }
      
      setIsSuccess(true);
      toast({
        title: "Password updated successfully!",
        description: "You can now sign in with your new password.",
      });
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-fer-bg-card border-fer-bg-card text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-fer-error/20 rounded-full flex items-center justify-center mx-auto">
              <X className="w-8 h-8 text-fer-error" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-fer-text">Link Expired</h1>
              <p className="text-fer-text/70">
                This password reset link has expired or is invalid.
              </p>
            </div>
            <div className="space-y-4">
              <Link to="/forgot-password">
                <Button className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white">
                  Request New Reset Link
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full border-fer-info text-fer-info hover:bg-fer-info/10">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-fer-bg-card border-fer-bg-card text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-fer-accent rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-fer-text">Password Updated</h1>
              <p className="text-fer-text/70">
                Your password has been successfully updated. You can now sign in with your new password.
              </p>
            </div>
            <Link to="/login">
              <Button className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white">
                Continue to Sign In
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-fer-bg-card border-fer-bg-card">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-fer-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-fer-primary" />
            </div>
            <h1 className="text-2xl font-bold text-fer-text">Create New Password</h1>
            <p className="text-fer-text/70">Enter a strong password for your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-fer-text">New Password</Label>
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
                  placeholder="Enter new password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-fer-text">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary pr-10 ${
                    errors.confirmPassword ? 'border-fer-error' : ''
                  }`}
                  placeholder="Confirm new password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-fer-text/70 hover:text-fer-text"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-fer-error text-sm">{errors.confirmPassword}</p>}
            </div>

            <div className="p-4 bg-fer-info/10 border border-fer-info rounded-lg">
              <p className="text-fer-info text-sm">
                After updating your password, you'll be signed out of all devices and need to sign in again.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12"
              disabled={isLoading}
            >
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </Button>
          </form>

          <div className="text-center">
            <Link to="/login" className="text-fer-text/70 hover:text-fer-text text-sm">
              Back to Sign In
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
