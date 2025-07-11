
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const SignUpPage = (props: object) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {
        name: null,
        username: null,
        email: null,
        password: null,
        confirmPassword: null
    };
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    // If there are no errors (all keys have null va;), return true
    if (Object.values(newErrors).every(error => error === null)) {
      return true;
    }
    // If there are errors, return false

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
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

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-fer-bg-card border-fer-bg-card text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-fer-accent rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-fer-text">Check Your Email</h1>
              <p className="text-fer-text/70">
                We've sent a verification link to <strong>{formData.email}</strong>
              </p>
            </div>
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full border-fer-info text-fer-info hover:bg-fer-info/10"
                onClick={() => {
                  toast({
                    title: "Verification email resent",
                    description: "Please check your inbox and spam folder.",
                  });
                }}
              >
                Resend Email
              </Button>
              <Link to="/login">
                <Button className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white">
                  Continue to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold text-fer-text">Create Account</h1>
              <p className="text-fer-text/70">Join the FER App community</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-fer-text">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary ${
                  errors.name ? 'border-fer-error' : ''
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-fer-error text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-fer-text">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary ${
                  errors.username ? 'border-fer-error' : ''
                }`}
                placeholder="Choose a username"
              />
              {errors.username && <p className="text-fer-error text-sm">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-fer-text">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary ${
                  errors.email ? 'border-fer-error' : ''
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-fer-error text-sm">{errors.email}</p>}
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
                  placeholder="Create a password"
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
              <Label htmlFor="confirmPassword" className="text-fer-text">Confirm Password</Label>
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
                  placeholder="Confirm your password"
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

            <Button
              type="submit"
              className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-fer-text/70">
              Already have an account?{' '}
              <Link to="/login" className="text-fer-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
