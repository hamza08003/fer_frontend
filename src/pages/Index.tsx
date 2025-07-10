import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import WelcomePage from '@/components/auth/WelcomePage';
import SignUpPage from '@/components/auth/SignUpPage';
import LoginPage from '@/components/auth/LoginPage';
import TwoFACodePage from '@/components/auth/TwoFACodePage';
import ForgotPasswordPage from '@/components/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/components/auth/ResetPasswordPage';
import EmailVerificationPage from '@/components/auth/EmailVerificationPage';
import UserProfilePage from '@/components/auth/UserProfilePage';
import EditProfilePage from '@/components/auth/EditProfilePage';
import ChangePasswordPage from '@/components/auth/ChangePasswordPage';
import TwoFAManagementPage from '@/components/auth/TwoFAManagementPage';
import DeleteAccountPage from '@/components/auth/DeleteAccountPage';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const authProps = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser
  };

  return (
    <div className="min-h-screen bg-fer-bg-main">
      <Routes>
        <Route path="/" element={<WelcomePage {...authProps} />} />
        <Route path="/signup" element={<SignUpPage {...authProps} />} />
        <Route path="/login" element={<LoginPage {...authProps} />} />
        <Route path="/2fa-code" element={<TwoFACodePage {...authProps} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage {...authProps} />} />
        <Route path="/reset-password" element={<ResetPasswordPage {...authProps} />} />
        <Route path="/verify-email" element={<EmailVerificationPage {...authProps} />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          isAuthenticated ? <UserProfilePage {...authProps} /> : <Navigate to="/login" />
        } />
        <Route path="/edit-profile" element={
          isAuthenticated ? <EditProfilePage {...authProps} /> : <Navigate to="/login" />
        } />
        <Route path="/change-password" element={
          isAuthenticated ? <ChangePasswordPage {...authProps} /> : <Navigate to="/login" />
        } />
        <Route path="/2fa-settings" element={
          isAuthenticated ? <TwoFAManagementPage {...authProps} /> : <Navigate to="/login" />
        } />
        <Route path="/delete-account" element={
          isAuthenticated ? <DeleteAccountPage {...authProps} /> : <Navigate to="/login" />
        } />
      </Routes>
      <Toaster />
    </div>
  );
};

export default Index;
