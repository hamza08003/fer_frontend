
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios_ from '@/lib/axios';
import {getAuthHeader, token} from "@/utils/auth.ts";

interface errorsType {
    currentPassword: string | null;
    newPassword: string | null;
    confirmPassword: string | null;
}

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState<errorsType>(
    {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  );
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<errorsType>(
    {
      currentPassword: null,
      newPassword: null,
      confirmPassword: null
    }
  );
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {
        currentPassword: null,
        newPassword: null,
        confirmPassword: null
    }
    
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    if (formData.newPassword.length < 8) newErrors.newPassword = 'New password must be at least 8 characters';
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }
    
    setErrors(newErrors);
    return Object.values(newErrors).some(error => error === null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    let response;
    try {
      response = await axios_.post('/fer/v1/users/me/change-password/',
          {
            "old_password": formData.currentPassword,
            "new_password": formData.newPassword,
            "new_password_confirm": formData.confirmPassword
          },
          {
            headers: {
              ...getAuthHeader()
            },
          }
      );
    } catch (e) {
        setIsLoading(false);
        console.error(e);
        if (e.response && e.response.data && e.response.data.message) {
            setErrors(prev => ({ ...prev, currentPassword: e.response.data.message }));
        } else {
            setErrors(prev => ({ ...prev, currentPassword: 'Network error. Please check your connection.' }));
        }
        return;
    }
    toast({
        title: "Password Changed Successfully",
        description: "You will be logged out of all devices."
    })

    setIsLoading(false);
    token.remove();
    window.location.reload();

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

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
            <h1 className="text-2xl font-bold text-fer-text">Change Password</h1>
            <p className="text-fer-text/70">Update your account password</p>
          </div>
        </div>

        <Card className="p-6 bg-fer-bg-card border-fer-bg-card">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-fer-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-fer-primary" />
              </div>
            </div>

            <div className="p-4 bg-fer-error/10 border border-fer-error rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-fer-error mt-0.5" />
                <div>
                  <p className="text-fer-error font-medium text-sm">Security Notice</p>
                  <p className="text-fer-error text-sm">
                    You will be logged out of all devices after changing your password.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-fer-text">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPasswords.current ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary pr-10 ${
                      errors.currentPassword ? 'border-fer-error' : ''
                    }`}
                    placeholder="Enter current password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-fer-text/70 hover:text-fer-text"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.currentPassword && <p className="text-fer-error text-sm">{errors.currentPassword}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-fer-text">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`bg-fer-bg-main border-fer-bg-main text-fer-text focus:border-fer-primary pr-10 ${
                      errors.newPassword ? 'border-fer-error' : ''
                    }`}
                    placeholder="Enter new password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-fer-text/70 hover:text-fer-text"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.newPassword && <p className="text-fer-error text-sm">{errors.newPassword}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-fer-text">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
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
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-fer-error text-sm">{errors.confirmPassword}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white h-12"
                disabled={isLoading}
              >
                {isLoading ? 'Changing Password...' : 'Change Password'}
              </Button>
            </form>

            <div className="text-center">
              <Link to="/profile" className="text-fer-text/70 hover:text-fer-text text-sm">
                Cancel
              </Link>
            </div>

            <div className="pt-4 border-t border-fer-bg-main">
              <p className="text-xs text-fer-text/50 text-center">
                Demo: Use "wrongpassword" as current password to see error handling
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
