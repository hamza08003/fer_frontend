import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordPage = (props: object) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      });
    }, 2000);
  };

  if (isSuccess) {
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
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <p className="text-fer-text/60 text-sm">
                The link will expire in 1 hour for security reasons.
              </p>
            </div>
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full border-fer-info text-fer-info hover:bg-fer-info/10"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    toast({
                      title: "Reset link resent",
                      description: "Please check your inbox and spam folder.",
                    });
                  }, 1000);
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Resend Reset Link'}
              </Button>
              <Link to="/login" className="block mt-4">
                <Button className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white">
                  Back to Sign In
                </Button>
              </Link>
            </div>
            <div className="pt-4 border-t border-fer-bg-main">
              <p className="text-xs text-fer-text/50">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
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
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-fer-text/70 hover:text-fer-text p-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-fer-text">Reset Password</h1>
              <p className="text-fer-text/70">Enter your email to get reset instructions</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-fer-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-fer-primary" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-fer-text">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary ${
                  error ? 'border-fer-error' : ''
                }`}
                placeholder="Enter your email address"
                required
              />
              {error && <p className="text-fer-error text-sm">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12"
              disabled={isLoading}
            >
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-fer-text/70">
              Remember your password?{' '}
              <Link to="/login" className="text-fer-primary hover:underline">
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
