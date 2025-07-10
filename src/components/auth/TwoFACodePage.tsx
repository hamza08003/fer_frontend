import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Check } from 'lucide-react'; // Added Check icon
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const TwoFACodePage = ({ setIsAuthenticated, setUser }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBackupCode, setShowBackupCode] = useState(false);
  const [backupCode, setBackupCode] = useState('');
  const [animationState, setAnimationState] = useState('idle'); // 'idle', 'animating', 'success', 'error'
  const [animatingIndex, setAnimatingIndex] = useState(-1);
  const [showSuccess, setShowSuccess] = useState(false); // New state for success message
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  // Animation sequence effect
  useEffect(() => {
    if (animationState === 'animating' && animatingIndex < 6) {
      const timer = setTimeout(() => {
        setAnimatingIndex(prevIndex => prevIndex + 1);
      }, 150); // Time between each digit animation
      
      return () => clearTimeout(timer);
    } else if (animationState === 'animating' && animatingIndex >= 6) {
      // animation sequence completed
      const fullCode = code.join('');
      if (fullCode === '123456') {
        setAnimationState('success');
        
        // Show success message after boxes turn green
        setTimeout(() => {
          setShowSuccess(true);
          
          // Wait a bit longer before redirecting
          setTimeout(() => {
            // success login after showing success state
            const mockUser = {
              id: 1,
              name: 'John Doe',
              username: '2fa@example.com',
              email: '2fa@example.com',
              joinDate: '2024-01-15',
              loginCount: 42,
              emailVerified: true,
              twoFactorEnabled: true
            };
            
            setUser(mockUser);
            setIsAuthenticated(true);
            toast({
              title: "Authentication successful!",
              description: "Welcome back to your account.",
            });
            navigate('/profile');
          }, 2000); // Longer delay before redirect
        }, 500); // Delay before showing success message
      } else {
        setAnimationState('error');
        setTimeout(() => {
          // reset animation state after showing error
          setAnimationState('idle');
          setAnimatingIndex(-1);
          setCode(['', '', '', '', '', '']);
          setError('Invalid verification code. Please try again.');
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 1000);
      }
    }
  }, [animationState, animatingIndex, code, toast, setIsAuthenticated, setUser, navigate]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');
    
    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    
    setIsLoading(true);
    
    // Start animation sequence
    setTimeout(() => {
      setIsLoading(false);
      setAnimationState('animating');
      setAnimatingIndex(0);
    }, 600);
  };

  // Get the CSS class for each OTP input
  const getInputClass = (index) => {
    let baseClass = "w-12 h-12 text-center text-lg font-mono bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary transition-all duration-200";
    
    if (animationState === 'animating' && index <= animatingIndex) {
      baseClass += " scale-110"; // pop-up effect
    } else if (animationState === 'success') {
      baseClass += " border-fer-accent scale-100";
    } else if (animationState === 'error') {
      baseClass += " border-fer-error scale-100";
    }
    
    return baseClass;
  };

  const handleBackupCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (backupCode === 'backup123') {
        const mockUser = {
          id: 1,
          name: 'John Doe',
          username: '2fa@example.com',
          email: '2fa@example.com',
          joinDate: '2024-01-15',
          loginCount: 42,
          emailVerified: true,
          twoFactorEnabled: true
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        toast({
          title: "Authentication successful!",
          description: "Signed in using backup code.",
        });
        navigate('/profile');
      } else {
        setError('Invalid backup code. Please try again.');
        setBackupCode('');
      }
    }, 1500);
  };

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
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-fer-text">Two-Factor Authentication</h1>
              <p className="text-fer-text/70">Enter the code from your authenticator app</p>
            </div>
          </div>

          {/* Success message */}
          {showSuccess ? (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="mx-auto w-16 h-16 bg-fer-accent/20 rounded-full flex items-center justify-center animate-scale-in">
                <Check className="w-8 h-8 text-fer-accent animate-check" />
              </div>
              <div className="space-y-1">
                <p className="text-fer-accent font-medium">
                  2FA Verification Successful
                </p>
                <p className="text-fer-primary font-medium">
                  Redirecting you to your Profile
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-fer-info/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-fer-info" />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-fer-error/10 border border-fer-error rounded-lg">
                  <p className="text-fer-error text-sm text-center">{error}</p>
                </div>
              )}

              {!showBackupCode ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-center space-x-2">
                    {code.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={getInputClass(index)}
                        disabled={animationState !== 'idle' && animationState !== ''}
                      />
                    ))}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12"
                    disabled={isLoading || animationState !== 'idle'}
                  >
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleBackupCodeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-fer-text font-medium">Backup Code</label>
                    <Input
                      type="text"
                      value={backupCode}
                      onChange={(e) => setBackupCode(e.target.value)}
                      className="bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary"
                      placeholder="Enter your backup code"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Use Backup Code'}
                  </Button>
                </form>
              )}

              <div className="text-center space-y-2">
                <Button
                  variant="ghost"
                  className="text-fer-info hover:text-fer-info/80 text-sm"
                  onClick={() => setShowBackupCode(!showBackupCode)}
                >
                  {showBackupCode ? 'Use authenticator code instead' : 'Use backup code instead'}
                </Button>
                
                <p className="text-xs text-fer-text/50">
                  Demo: Use code "123456" or backup code "backup123"
                </p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};


export default TwoFACodePage;