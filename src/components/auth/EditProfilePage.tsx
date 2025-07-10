import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const EditProfilePage = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    const emailHasChanged = formData.email !== user.email;
    
    setTimeout(() => {
      setIsLoading(false);
      
      // Update user data
      const updatedUser = {
        ...user,
        ...formData,
        emailVerified: emailHasChanged ? false : user.emailVerified
      };
      
      setUser(updatedUser);
      
      if (emailHasChanged) {
        setEmailChanged(true);
        toast({
          title: "Profile updated!",
          description: "Please check your new email to verify it.",
        });
      } else {
        toast({
          title: "Profile updated successfully!",
          description: "Your changes have been saved.",
        });
        navigate('/profile');
      }
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  if (emailChanged) {
    return (
      <div className="min-h-screen bg-fer-bg-main p-4">
        <div className="max-w-md mx-auto mt-20">
          <Card className="p-8 bg-fer-bg-card border-fer-bg-card text-center">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-fer-info/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-fer-info" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-fer-text">Verify New Email</h1>
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
                      description: "Please check your inbox.",
                    });
                  }}
                >
                  Resend Verification Email
                </Button>
                <Link to="/profile" className="block mt-8">
                  <Button className="w-full bg-fer-primary hover:bg-fer-primary/90 text-white">
                    Back to Profile
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-fer-text">Edit Profile</h1>
            <p className="text-fer-text/70">Update your account information</p>
          </div>
        </div>

        <Card className="p-8 bg-fer-bg-card border-fer-bg-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20 bg-fer-primary">
                <AvatarFallback className="text-white text-2xl font-bold">
                  {formData.name.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-fer-text">Profile Picture</h3>
                <p className="text-fer-text/60 text-sm">Avatar is generated from your name</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-fer-text">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </Label>
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
                <Label htmlFor="username" className="text-fer-text">
                  <AtSign className="w-4 h-4 inline mr-2" />
                  Username
                </Label>
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
                <Label htmlFor="email" className="text-fer-text">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </Label>
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
                {formData.email !== user.email && (
                  <p className="text-fer-info text-sm">
                    Changing your email will require re-verification
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-fer-primary hover:bg-fer-primary/90 text-white"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Link to="/profile" className="flex-1">
                <Button type="button" variant="outline" className="w-full border-fer-text/20 text-fer-text hover:bg-fer-text/5">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilePage;