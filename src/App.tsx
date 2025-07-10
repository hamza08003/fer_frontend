import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // For testing, set isAuthenticated to true by default
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Create a mock user for testing protected routes
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    joinDate: '2024-01-15',
    lastLogin: '2024-07-08 14:32',
    emailVerified: true,
    twoFactorEnabled: true
  });

  const authProps = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-fer-bg-main">
            <Routes>
              <Route path="/" element={<WelcomePage {...authProps} />} />
              <Route path="/signup" element={<SignUpPage {...authProps} />} />
              <Route path="/login" element={<LoginPage {...authProps} />} />
              <Route path="/2fa-code" element={<TwoFACodePage {...authProps} />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage {...authProps} />} />
              <Route path="/reset-password" element={<ResetPasswordPage {...authProps} />} />
              <Route path="/verify-email" element={<EmailVerificationPage {...authProps} />} />
              
              {/* Modified Protected Routes - now directly rendering components without authentication check */}
              <Route path="/profile" element={<UserProfilePage {...authProps} />} />
              <Route path="/edit-profile" element={<EditProfilePage {...authProps} />} />
              <Route path="/change-password" element={<ChangePasswordPage {...authProps} />} />
              <Route path="/2fa-settings" element={<TwoFAManagementPage {...authProps} />} />
              <Route path="/delete-account" element={<DeleteAccountPage {...authProps} />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
