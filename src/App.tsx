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
  {/*
  For testing, `isAuthenticated` is set to true by default, If you want to test
  the authentication flow, you can toggle this state to false.
  In a real application, this would be managed by your authentication logic.
  Here, we are simulating an authenticated user for testing purposes.
  You can later replace this with actual authentication logic.
  For example, you might check if a token exists in localStorage or use a context
  provider to manage authentication state across your app.
  This is just a placeholder to demonstrate how the app would behave with an authenticated user.
  In a production app, you would typically fetch this state from an API or context provider
  to determine if the user is logged in or not.
  */}

  // State to manage authentication status
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
    twoFactorEnabled: false
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
              
              {/* ------------------ Protected Routes ------------------------

              Modified for Testing Purposes - Currently components are rendered 
              directly without authentication check.

              If you want to add authentication check later, you can use a ternary 
              expression with the `isAuthenticated` variable to protect certain routes. 

              For example:

                <Route 
                  path="/profile" 
                  element={isAuthenticated ? <UserProfilePage {...authProps} /> : <Navigate to="/login" />} 
                />

              This ensures only logged-in users can access sensitive routes like 
              Profile, Edit Profile, or Account Settings. If the user is not 
              authenticated, they’ll be redirected to the login page.

              For better scalability and cleaner code, consider creating a reusable 
              `PrivateRoute` wrapper component like this:

                const PrivateRoute = ({ element, isAuthenticated }) => {
                  return isAuthenticated ? element : <Navigate to="/login" />;
                };

              Then use it in your routes:

                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute 
                      isAuthenticated={isAuthenticated} 
                      element={<UserProfilePage {...authProps} />} 
                    />
                  } 
                />

              This avoids repeating the same logic for every protected route.

              */}
              
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