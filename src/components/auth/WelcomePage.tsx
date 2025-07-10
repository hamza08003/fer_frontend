import { Link } from 'react-router-dom';
import { Sparkles, Shield, Zap, Camera, BarChart, Eye, LucideGithub, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
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
              <p className="text-fer-text/70">Continue analyzing facial emotions in real-time.</p>
            </div>
            <Link to="/profile">
              <Button className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-fer-primary rounded-2xl flex items-center justify-center mr-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-fer-text">Facial Emotion Recognition</h1>
            </div>
            <p className="text-xl text-fer-text/70 max-w-2xl mx-auto">
              Analyze and interpret facial expressions in real-time with our advanced AI. Understand emotions instantly and accurately.
            </p>
          </div>

          <Card className="w-full max-w-4xl mx-auto p-10 bg-fer-bg-card border-fer-bg-card mb-12">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-fer-text">Start Analyzing</h2>
                  <p className="text-fer-text/70">
                    Our platform provides instant analysis of facial expressions, detecting emotions like happiness, 
                    sadness, anger, surprise, fear, and more. Perfect for researchers, developers, and businesses 
                    looking to understand emotional responses.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-fer-accent mr-2" />
                    <p className="text-fer-text">Instant emotion detection</p>
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-fer-info mr-2" />
                    <p className="text-fer-text">Detailed emotion analytics</p>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-fer-highlight mr-2" />
                    <p className="text-fer-text">Privacy-first approach</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-fer-text mb-2">Join Now</h2>
                  <p className="text-fer-text/70">Begin your emotion recognition journey</p>
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
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-fer-text/20"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-fer-bg-card px-2 text-fer-text/50">Or continue with</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-fer-text/20 text-fer-text hover:bg-fer-text/5 h-12">
                    <svg className="mr-2 h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.12C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    Sign in with Google
                  </Button>
                </div>
                
                <div className="text-center pt-2">
                  <p className="text-sm text-fer-text/50">
                    By continuing, you agree to our Terms of Service, Privacy Policy, and facial data processing guidelines
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-fer-bg-card border-t border-fer-text/10 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-fer-text/60 text-sm">
              &copy; 2025 FER.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;