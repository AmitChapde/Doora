import { Routes, Route } from "react-router-dom";
import './App.css';
import { Toaster } from "sonner";
import LoginSignupPage from "./Components/LoginSignupPage/LoginSignupPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function AuthLayout() {
  return <LoginSignupPage />; 
}

function App() {
  return (
    <>
     <Toaster richColors position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />} />
        <Route path="/auth/login" element={<AuthLayout />} />
        <Route path="/auth/signup" element={<AuthLayout />} />
        <Route path="/auth/forget-password" element={<AuthLayout/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
 
      </Routes>
    </>
  )
}

export default App