import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute ({ children }: ProtectedRouteProps){
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Give auth context time to initialize from localStorage
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // If user exists, show content immediately (don't wait for initial loading)
  if (user) {
    return <>{children}</>;
  }


  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // No user and loading complete, redirect to login
  return <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
