import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate, register, removeAuthHeader } from "@/axios/auth";
import Toast from "react-native-toast-message";

interface AuthContextProps {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    const { token, tokenType } = await authenticate(username, password);
    setToken(token);
    setIsAuthenticated(true);
    await AsyncStorage.setItem("token", token);
  };

  const signup = async (username: string, password: string): Promise<void> => {
    await register(username, password);
  };

  const logout = async () => {
    removeAuthHeader();
    await AsyncStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    Toast.show({
      type: "info",
      text1: "Logged out",
      text2: "You have been successfully logged out.",
      position: "bottom",
    });
  };

  return (
    <AuthContext.Provider
      value={{ token, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
