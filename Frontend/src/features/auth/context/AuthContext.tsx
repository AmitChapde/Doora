import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import type { LoginPayload, SignupPayload } from "../../../api/auth/auth.types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: SignupPayload) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (loginData: LoginPayload) => {
    try {
      const res = await authService.login(loginData);
      // loginData response: { token, user: { id, name, email } }
      if (res && res.user) {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (signupData: SignupPayload) => {
    try {
      const res = await authService.register(signupData);
      // registerData response: { user: { id, token, name, email } }
      if (res && res.user) {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      } else {
        throw new Error("Invalid register response");
      }
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider ");
  return ctx;
};