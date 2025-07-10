
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const WelcomePage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-fer-bg-card border-fer-bg-card text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-fer-text">Welcome Back!</h1>
              <p className="text-fer-text/70">You're already signed in.</p>
            </div>
            <Link to="/profile">
              <Button className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white">
                Go to Profile
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-fer-primary rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-fer-text mb-4">FER App</h1>
          <p className="text-xl text-fer-text/70 max-w-2xl mx-auto">
            Your secure authentication experience starts here. Join thousands of users who trust FER App for their digital identity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-fer-bg-card border-fer-bg-card text-center">
            <Shield className="w-12 h-12 text-fer-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-fer-text mb-2">Secure by Design</h3>
            <p className="text-fer-text/70">Advanced 2FA and encryption protect your account</p>
          </Card>
          
          <Card className="p-6 bg-fer-bg-card border-fer-bg-card text-center">
            <Zap className="w-12 h-12 text-fer-info mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-fer-text mb-2">Lightning Fast</h3>
            <p className="text-fer-text/70">Optimized performance for seamless experience</p>
          </Card>
          
          <Card className="p-6 bg-fer-bg-card border-fer-bg-card text-center">
            <Sparkles className="w-12 h-12 text-fer-highlight mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-fer-text mb-2">Modern UI</h3>
            <p className="text-fer-text/70">Beautiful, responsive design that works everywhere</p>
          </Card>
        </div>

        <Card className="w-full max-w-md mx-auto p-8 bg-fer-bg-card border-fer-bg-card">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-fer-text mb-2">Get Started</h2>
              <p className="text-fer-text/70">Choose your path to join FER App</p>
            </div>
            
            <div className="space-y-4">
              <Link to="/signup" className="block">
                <Button className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12 text-lg">
                  Create Account
                </Button>
              </Link>
              
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full border-fer-info text-fer-info hover:bg-fer-info/10 h-12 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
            
            <div className="text-center pt-4">
              <p className="text-sm text-fer-text/50">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WelcomePage;
