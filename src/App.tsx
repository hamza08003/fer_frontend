import {useEffect, useState } from 'react';
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
import axios from "axios";
import {isLoggedIn, token} from "@/utils/auth.ts";

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
    const PrivateRoute = ({ isAuthenticated, element }) => {
        const [checking, setChecking] = useState(true);
        const [isAuth, setIsAuth] = useState(isAuthenticated);

        useEffect(() => {
            // Check token validity
            const checkAuth = async () => {
                const auth = isLoggedIn(); // Your auth checking function
                setIsAuth(auth);
                setChecking(false);
            };

            checkAuth();
        }, []);

        if (checking) {
            return (
                <div className="min-h-screen bg-fer-bg-main flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-fer-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-fer-text font-medium text-red-800">Loading...</p>
                    </div>
                </div>
            );
        }

        return isAuth ? element : <Navigate to="/login" />;
    };

    const PublicOnlyRoute = ({ isAuthenticated, element }) => {
        const [checking, setChecking] = useState(true);
        const [isAuth, setIsAuth] = useState(isAuthenticated);

        useEffect(() => {
            // Check token validity
            const checkAuth = async () => {
                const auth = isLoggedIn(); // Your auth checking function
                setIsAuth(auth);
                setChecking(false);
            };

            checkAuth();
        }, []);

        if (checking) {
            return (
                <div className="min-h-screen bg-fer-bg-main flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-fer-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-fer-text font-medium">Loading...</p>
                    </div>
                </div>
            );
        }

        return !isAuth ? element : <Navigate to="/" />;
    };


  const isAuthenticated = isLoggedIn();

  // const navigate = useNavigate();
  // ping backend to check if the user is authenticated

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-fer-bg-main">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route
                  path="/signup"
                  element={
                    <PublicOnlyRoute
                        isAuthenticated={isAuthenticated}
                        element={<SignUpPage />}
                    />
                  }
                />
              <Route path="/login" element={
                <PublicOnlyRoute
                  isAuthenticated={isAuthenticated}
                  element={<LoginPage />}
                />
              } />
              <Route
                  path="/2fa-code" element={
                    <PublicOnlyRoute
                        isAuthenticated={isAuthenticated}
                        element={<TwoFACodePage />}
                    />
              } />
              <Route
                  path="/forgot-password"
                  element={
                    <PublicOnlyRoute
                        isAuthenticated={isAuthenticated}
                        element={<ForgotPasswordPage />}
                    />
                  }
              />
              <Route
                  path="/reset-password"
                  element={
                    <PublicOnlyRoute
                        isAuthenticated={isAuthenticated}
                        element={<ResetPasswordPage />}
                    />
                  }
              />
              <Route
                  path="/verify-email"
                  element={
                    <PublicOnlyRoute
                        isAuthenticated={isAuthenticated}
                        element={<EmailVerificationPage />}
                    />
                  }
              />

              
              {/* -------+----------- Protected Routes ------------------------

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
              <Route
                  path="/profile"
                  element={
                    <PrivateRoute
                        isAuthenticated={isAuthenticated}
                        element={<UserProfilePage  />}
                    />
                  }
              />

                <Route
                    path="/edit-profile"
                    element={
                        <PrivateRoute
                            isAuthenticated={isAuthenticated}
                            element={<EditProfilePage />}
                        />
                    }
                />

                <Route
                    path="/change-password"
                    element={
                        <PrivateRoute
                            isAuthenticated={isAuthenticated}
                            element={<ChangePasswordPage />}
                        />
                    }
                />

                <Route
                    path="/2fa-settings"
                    element={
                        <PrivateRoute
                            isAuthenticated={isAuthenticated}
                            element={<TwoFAManagementPage />}
                        />
                    }
                />

                <Route
                    path="/delete-account"
                    element={
                        <PrivateRoute
                            isAuthenticated={isAuthenticated}
                            element={<DeleteAccountPage />}
                        />
                    }
                />


              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


export default App;