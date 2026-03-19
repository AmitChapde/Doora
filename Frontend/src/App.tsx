import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";
import AuthLayout from "./Components/Layouts/AuthLayout";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import AppLayout from "./Components/Layouts/AppLayout";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />} />
        <Route path="/auth/login" element={<AuthLayout />} />
        <Route path="/auth/signup" element={<AuthLayout />} />
        <Route path="/auth/forget-password" element={<AuthLayout />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected App Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
