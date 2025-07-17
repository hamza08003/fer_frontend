
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

import { UserProfile } from '@/lib/types';

const DeleteAccountPage = () => {

  const {state} = useLocation();

  const user: UserProfile = state;

  const [formData, setFormData] = useState({
    password: '',
    twoFactorCode: '',
    confirmText: '',
    understood: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const [errors, setErrors] = useState({
    password: null,
    twoFactorCode: null,
    confirmText: null,
    understood: null
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {
        password: null,
        twoFactorCode: null,
        confirmText: null,
        understood: null
    };
    
    if (!formData.password) newErrors.password = 'Password is required';
    if (user.two_factor_enabled && !formData.twoFactorCode) {
      newErrors.twoFactorCode = '2FA code is required';
    }
    if (formData.confirmText !== 'DELETE') {
      newErrors.confirmText = 'Please type DELETE to confirm';
    }
    if (!formData.understood) {
      newErrors.understood = 'You must acknowledge the consequences';
    }
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === null);
  };

  const handleDeleteAccount = async () => {
    if (!validateForm()) return;
    
    setIsDeleting(true);

    let response;
    try {

    } catch (e) {

    }

    setIsDeleting(false);

    // Simulate wrong password
    if (formData.password === 'wrongpassword') {
      setErrors({...errors,  password: 'Incorrect password' });
      setShowDeleteModal(false);
      return;
    }

    // Simulate wrong 2FA code
    if (user.two_factor_enabled && formData.twoFactorCode !== '123456') {
      setErrors({...errors, twoFactorCode: 'Invalid 2FA code' });
      setShowDeleteModal(false);
      return;
    }

    // Success - show goodbye screen
    setShowDeleteModal(false);
    setShowGoodbye(true);

    setTimeout(() => {
      // setIsAuthenticated(false);
      // setUser(null);
      navigate('/');
    }, 3000);

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

  if (showGoodbye) {
    return (
      <div className="min-h-screen bg-fer-bg-main flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-fer-bg-card border-fer-bg-card text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-fer-text/10 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-8 h-8 text-fer-text/70" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-fer-text">Goodbye</h1>
              <p className="text-fer-text/70">
                Your account has been successfully deleted. We're sorry to see you go.
              </p>
              <p className="text-fer-text/60 text-sm">
                Redirecting to home page...
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fer-bg-main p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="text-fer-text/70 hover:text-fer-text p-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-fer-error">Delete Account</h1>
            <p className="text-fer-text/70">Permanently remove your account</p>
          </div>
        </div>

        <Card className="p-6 bg-fer-bg-card border-fer-error">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-fer-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-fer-error" />
              </div>
              <h2 className="text-xl font-bold text-fer-error mb-2">Danger Zone</h2>
              <p className="text-fer-text/70">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>

            <div className="space-y-4 p-4 bg-fer-error/5 border border-fer-error/20 rounded-lg">
              <h3 className="font-semibold text-fer-text">What will be deleted:</h3>
              <ul className="space-y-2 text-fer-text/70 text-sm">
                <li>• Your profile and account information</li>
                <li>• All your personal data and settings</li>
                <li>• Your login credentials and security settings</li>
                <li>• All associated backup codes and 2FA settings</li>
              </ul>
            </div>

            <form className="space-y-4">
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

              {user.two_factor_enabled && (
                <div className="space-y-2">
                  <Label htmlFor="twoFactorCode" className="text-fer-text">2FA Code</Label>
                  <Input
                    id="twoFactorCode"
                    name="twoFactorCode"
                    type="text"
                    value={formData.twoFactorCode}
                    onChange={handleChange}
                    className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary ${
                      errors.twoFactorCode ? 'border-fer-error' : ''
                    }`}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                  />
                  {errors.twoFactorCode && <p className="text-fer-error text-sm">{errors.twoFactorCode}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="confirmText" className="text-fer-text">
                  Type "DELETE" to confirm
                </Label>
                <Input
                  id="confirmText"
                  name="confirmText"
                  type="text"
                  value={formData.confirmText}
                  onChange={handleChange}
                  className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary ${
                    errors.confirmText ? 'border-fer-error' : ''
                  }`}
                  placeholder="Type DELETE"
                  required
                />
                {errors.confirmText && <p className="text-fer-error text-sm">{errors.confirmText}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="understood"
                    name="understood"
                    checked={formData.understood}
                    onCheckedChange={(checked: boolean) =>
                      setFormData({ ...errors, understood: checked })
                    }
                    className="border-fer-text/30 data-[state=checked]:bg-fer-error data-[state=checked]:border-fer-error mt-1"
                  />
                  <Label htmlFor="understood" className="text-fer-text/70 text-sm leading-relaxed">
                    I understand that this action is permanent and irreversible. All my data will be lost forever.
                  </Label>
                </div>
                {errors.understood && <p className="text-fer-error text-sm">{errors.understood}</p>}
              </div>
            </form>

            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-fer-error text-fer-error hover:bg-fer-error hover:text-white h-12"
                  disabled={!formData.password || !formData.confirmText || !formData.understood || (user.two_factor_enabled && !formData.twoFactorCode)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete My Account
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-fer-bg-card border-fer-bg-card">
                <DialogHeader>
                  <DialogTitle className="text-fer-error">Final Confirmation</DialogTitle>
                  <DialogDescription className="text-fer-text/70">
                    Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                    className="border-fer-text/20 text-fer-text hover:bg-fer-text/5"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-fer-error hover:bg-fer-error/90 text-white"
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete Forever'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="text-center pt-4 border-t border-fer-bg-main">
              <p className="text-xs text-fer-text/50">
                Demo: Use password "wrongpassword" or invalid 2FA to see error handling
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
