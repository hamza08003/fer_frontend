import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, LogIn, Shield, Edit, Settings, Trash2, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {isLoggedIn, token} from "@/utils/auth";
import axios_ from "@/lib/axios.ts";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { getDate } from '@/utils/date';

import { UserProfile } from '@/lib/types';

const UserProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(false);
    token.remove();
    // Optionally, you can also clear any user state here
    console.log("User logged out");
    setTimeout(()=> {
        navigate('/login', { replace: true });
    }, 1000);
  };

  const auth_token = isLoggedIn();
  const [user, setUser] = useState<UserProfile | null>(null);
  const {  isLoading, data, error, isPending } = useQuery(
      {
        queryKey: ['userProfile'],
        queryFn: () => axios_.get(`/fer/v1/users/me/`, {
          headers:{
            'Authorization': `Token ${auth_token}`
          }
        })
            .then(res => res.data),
        enabled: !!auth_token,  // only run if user is logged in
      });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(data.profile);
    }
  }, [data]);

  if (!auth_token) return null;

  else console.log("User data:", user);

  if (isLoading || !user) return <div>Loading user…</div>;
  if (error)     return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-fer-bg-main p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-fer-text">Profile</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-fer-error text-fer-error hover:bg-fer-error/10"
            disabled={isLoggingOut}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="p-8 bg-fer-bg-card border-fer-bg-card">
          <div className="flex items-start space-x-6">
            <Avatar className="w-20 h-20 bg-fer-primary">
              <AvatarFallback className="text-white text-2xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-fer-text">{user.name}</h2>
                <p className="text-fer-text/70">@{user.username}</p>
              </div>
              
              {/* Add more spacing with mb-8 */}
              <div className="flex flex-wrap gap-2 mb-8">
                {user.email_verified ? (
                  <Badge className="bg-fer-accent/20 text-fer-accent border-fer-accent">
                    <Check className="w-3 h-3 mr-1" />
                    Email Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-fer-error/30 text-fer-error">
                    <X className="w-3 h-3 mr-1" />
                    Email Unverified
                  </Badge>
                )}
                
                {user.two_factor_enabled ? (
                  <Badge className="bg-fer-info/20 text-fer-info border-fer-info">
                    <Shield className="w-3 h-3 mr-1" />
                    2FA Enabled
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-fer-text/30 text-fer-text/70">
                    <X className="w-3 h-3 mr-1" />
                    2FA Disabled
                  </Badge>
                )}
              </div>
              
              <Link to="/edit-profile">
                <Button className="bg-fer-primary hover:bg-fer-primary/90 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Account Details */}
        <Card className="p-6 bg-fer-bg-card border-fer-bg-card">
          <h3 className="text-lg font-semibold text-fer-text mb-4">Account Details</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-fer-text/70" />
              <div>
                <p className="text-fer-text">{user.email}</p>
                <p className="text-fer-text/60 text-sm">Email address</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-fer-text/70" />
              <div>
                <p className="text-fer-text">{getDate(user.date_joined)}</p>
                <p className="text-fer-text/60 text-sm">Member since</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-fer-text/70" />
              <div>
                <p className="text-fer-text">{getDate(user.last_login)}</p>
                <p className="text-fer-text/60 text-sm">Last login</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 bg-fer-bg-card border-fer-bg-card">
          <h3 className="text-lg font-semibold text-fer-text mb-4">Security & Privacy</h3>
          <div className="space-y-3">
            <Link to="/change-password" className="block">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-fer-bg-card border-fer-primary/30 text-fer-text hover:bg-fer-primary/5" 
              >
                <Settings className="w-4 h-4 mr-3 text-fer-primary" />
                Change Password
              </Button>
            </Link>
            
            <Link to="/2fa-settings" className="block" state={user}>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-fer-bg-card border-fer-primary/30 text-fer-text hover:bg-fer-primary/5" 
              >
                <Shield className="w-4 h-4 mr-3 text-fer-primary" />
                Two-Factor Authentication
              </Button>
            </Link>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 bg-fer-bg-card border-fer-error">
          <h3 className="text-lg font-semibold text-fer-error mb-4">Danger Zone</h3>
          <p className="text-fer-text/70 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Link to="/delete-account" state={user}>
            <Button variant="outline" className="border-fer-error text-fer-error hover:bg-fer-error/10">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;
