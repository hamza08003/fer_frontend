
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, QrCode, Key, Copy, Check, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

const TwoFAManagementPage = ({ user, setUser }) => {
  const [isEnabling, setIsEnabling] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [disablePassword, setDisablePassword] = useState('');
  const [disableCode, setDisableCode] = useState('');
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const { toast } = useToast();

  const qrCodeUrl = "https://via.placeholder.com/200x200/1E1E1E/FF6F00?text=QR+Code";
  const manualKey = "JBSWY3DPEHPK3PXP";
  const backupCodes = [
    "1a2b3c4d", "5e6f7g8h", "9i0j1k2l", "3m4n5o6p", 
    "7q8r9s0t", "1u2v3w4x", "5y6z7a8b", "9c0d1e2f"
  ];

  const handleEnable2FA = async (e) => {
    e.preventDefault();
    setIsEnabling(true);
    
    setTimeout(() => {
      setIsEnabling(false);
      
      if (verificationCode === '123456') {
        const updatedUser = { ...user, twoFactorEnabled: true };
        setUser(updatedUser);
        toast({
          title: "2FA enabled successfully!",
          description: "Your account is now more secure.",
        });
        setVerificationCode('');
      } else {
        toast({
          title: "Invalid code",
          description: "Please check your authenticator app and try again.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleDisable2FA = async (e) => {
    e.preventDefault();
    setIsDisabling(true);
    
    setTimeout(() => {
      setIsDisabling(false);
      
      if (disablePassword === 'password' && disableCode === '123456') {
        const updatedUser = { ...user, twoFactorEnabled: false };
        setUser(updatedUser);
        toast({
          title: "2FA disabled",
          description: "Two-factor authentication has been disabled.",
        });
        setDisablePassword('');
        setDisableCode('');
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your password and code.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(type);
    toast({
      title: "Copied to clipboard",
      description: `${type} copied successfully.`,
    });
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const regenerateBackupCodes = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      toast({
        title: "Backup codes regenerated",
        description: "Your old backup codes are no longer valid.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-fer-bg-main p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="text-fer-text/70 hover:text-fer-text p-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-fer-text">Two-Factor Authentication</h1>
            <p className="text-fer-text/70">Secure your account with 2FA</p>
          </div>
        </div>

        {/* Status Card */}
        <Card className="p-6 bg-fer-bg-card border-fer-bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                user.twoFactorEnabled ? 'bg-fer-accent/20' : 'bg-fer-text/10'
              }`}>
                <Shield className={`w-6 h-6 ${
                  user.twoFactorEnabled ? 'text-fer-accent' : 'text-fer-text/50'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fer-text">
                  Two-Factor Authentication
                </h3>
                <p className="text-fer-text/70">
                  {user.twoFactorEnabled 
                    ? 'Your account is protected with 2FA' 
                    : 'Add an extra layer of security to your account'
                  }
                </p>
              </div>
            </div>
            <Badge className={
              user.twoFactorEnabled 
                ? 'bg-fer-accent/20 text-fer-accent border-fer-accent'
                : 'bg-fer-text/10 text-fer-text/70 border-fer-text/30'
            }>
              {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </Card>

        {!user.twoFactorEnabled ? (
          // Enable 2FA Section
          <Card className="p-6 bg-fer-bg-card border-fer-bg-card">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-fer-text mb-2">Enable Two-Factor Authentication</h3>
                <p className="text-fer-text/70">
                  Scan the QR code with your authenticator app or enter the setup key manually.
                </p>
              </div>

              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between border-fer-text/20 text-fer-text hover:bg-fer-text/5">
                    <div className="flex items-center">
                      <QrCode className="w-4 h-4 mr-2" />
                      Show QR Code & Setup Key
                    </div>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <h4 className="font-medium text-fer-text mb-3">Scan QR Code</h4>
                      <div className="bg-white p-4 rounded-lg inline-block">
                        <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-fer-text mb-3">Manual Setup</h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-fer-text/70 text-sm">Setup Key</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Input
                              value={manualKey}
                              readOnly
                              className="bg-fer-bg-main border-fer-bg-main text-fer-text font-mono text-sm"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(manualKey, 'Setup key')}
                              className="border-fer-text/20 text-fer-text hover:bg-fer-text/5"
                            >
                              {copiedCode === 'Setup key' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <p className="text-fer-text/60 text-sm">
                          Enter this key in your authenticator app (Google Authenticator, Authy, etc.)
                        </p>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <form onSubmit={handleEnable2FA} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode" className="text-fer-text">
                    Verification Code
                  </Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary"
                    placeholder="Enter 6-digit code from your app"
                    maxLength={6}
                    required
                  />
                  <p className="text-fer-text/60 text-sm">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12"
                  disabled={isEnabling || verificationCode.length !== 6}
                >
                  {isEnabling ? 'Enabling...' : 'Enable 2FA'}
                </Button>
              </form>

              <div className="text-center pt-4 border-t border-fer-bg-main">
                <p className="text-xs text-fer-text/50">
                  Demo: Use code "123456" to enable 2FA
                </p>
              </div>
            </div>
          </Card>
        ) : (
          // Manage 2FA Section
          <div className="space-y-6">
            {/* Backup Codes */}
            <Card className="p-6 bg-fer-bg-card border-fer-bg-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-fer-text">Backup Codes</h3>
                    <p className="text-fer-text/70">Use these codes if you lose access to your authenticator app</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBackupCodes(!showBackupCodes)}
                    className="border-fer-info text-fer-info hover:bg-fer-info/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showBackupCodes ? 'Hide' : 'Show'} Codes
                  </Button>
                </div>

                {showBackupCodes && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {backupCodes.map((code, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={code}
                            readOnly
                            className="bg-fer-bg-main border-fer-bg-main text-fer-text font-mono text-sm"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(code, `Backup code ${index + 1}`)}
                            className="border-fer-text/20 text-fer-text hover:bg-fer-text/5"
                          >
                            {copiedCode === (`Backup code ${index + 1}`) ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-fer-bg-main">
                      <p className="text-fer-text/60 text-sm">
                        Save these codes in a secure location. Each code can only be used once.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={regenerateBackupCodes}
                        disabled={isRegenerating}
                        className="border-fer-highlight text-fer-highlight hover:bg-fer-highlight/10"
                      >
                        <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                        {isRegenerating ? 'Generating...' : 'Regenerate'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Disable 2FA */}
            <Card className="p-6 bg-fer-bg-card border-fer-error">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-fer-error">Disable Two-Factor Authentication</h3>
                  <p className="text-fer-text/70">
                    This will make your account less secure. Enter your password and a verification code to disable.
                  </p>
                </div>

                <form onSubmit={handleDisable2FA} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="disablePassword" className="text-fer-text">Password</Label>
                    <div className="relative">
                      <Input
                        id="disablePassword"
                        type={showPassword ? 'text' : 'password'}
                        value={disablePassword}
                        onChange={(e) => setDisablePassword(e.target.value)}
                        className="bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary pr-10"
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disableCode" className="text-fer-text">Verification Code</Label>
                    <Input
                      id="disableCode"
                      type="text"
                      value={disableCode}
                      onChange={(e) => setDisableCode(e.target.value)}
                      className="bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full border-fer-error text-fer-error hover:bg-fer-error/10 h-12"
                    disabled={isDisabling}
                  >
                    {isDisabling ? 'Disabling...' : 'Disable 2FA'}
                  </Button>
                </form>

                <div className="text-center pt-4 border-t border-fer-bg-main">
                  <p className="text-xs text-fer-text/50">
                    Demo: Use password "password" and code "123456" to disable 2FA
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFAManagementPage;
