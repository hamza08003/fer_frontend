
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const EmailVerificationPage = (props: object) => {
  const [isVerified, setIsVerified] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  
  const { toast } = useToast();

  const handleResend = async () => {
    setIsResending(true);
    
    setTimeout(() => {
      setIsResending(false);
      toast({
        title: "Verification email sent!",
        description: "Please check your inbox and spam folder.",
      });
    }, 2000);
  };

  const handleManualVerification = async (e) => {
    e.preventDefault();
    
    if (!manualToken.trim()) {
      setError('Verification code is required');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    
    setTimeout(() => {
      setIsVerifying(false);
      
      if (manualToken === 'verify123') {
        setIsVerified(true);
        toast({
          title: "Email verified successfully!",
          description: "Your account is now fully activated.",
        });
      } else {
        setError('Invalid verification code. Please try again.');
        setManualToken('');
      }
    }, 1500);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-fer-bg-card border-fer-bg-card text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-fer-accent rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-fer-text">Email Verified!</h1>
              <p className="text-fer-text/70">
                Your email has been successfully verified. You can now access all features of your account.
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
              <Mail className="w-8 h-8 text-fer-primary" />
            </div>
            <h1 className="text-2xl font-bold text-fer-text">Verify Your Email</h1>
            <p className="text-fer-text/70">
              We've sent a verification link to your email address. Click the link to activate your account.
            </p>
          </div>

          <div className="p-4 bg-fer-info/10 border border-fer-info rounded-lg">
            <p className="text-fer-info text-sm text-center">
              Check your inbox and spam folder for the verification email.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleResend}
              disabled={isResending}
              className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </Button>

            <div className="text-center">
              <Button
                variant="ghost"
                className="text-fer-info hover:text-fer-info/80 text-sm"
                onClick={() => setShowManualInput(!showManualInput)}
              >
                {showManualInput ? 'Hide manual verification' : 'Enter verification code manually'}
              </Button>
            </div>
          </div>

          {showManualInput && (
            <form onSubmit={handleManualVerification} className="space-y-4 border-t border-fer-bg-main pt-6">
              <div className="space-y-2">
                <Label htmlFor="manualToken" className="text-fer-text">Verification Code</Label>
                <Input
                  id="manualToken"
                  type="text"
                  value={manualToken}
                  onChange={(e) => {
                    setManualToken(e.target.value);
                    setError('');
                  }}
                  className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary ${
                    error ? 'border-fer-error' : ''
                  }`}
                  placeholder="Enter verification code"
                  required
                />
                {error && <p className="text-fer-error text-sm">{error}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-fer-accent hover:bg-fer-accent/90 text-white"
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify Email'}
              </Button>
            </form>
          )}

          <div className="text-center pt-4 border-t border-fer-bg-main">
            <p className="text-fer-text/70 text-sm">
              Need help?{' '}
              <Link to="/login" className="text-fer-primary hover:underline">
                Back to Sign In
              </Link>
            </p>
            <p className="text-xs text-fer-text/50 mt-2">
              Demo: Use code "verify123" for manual verification
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
