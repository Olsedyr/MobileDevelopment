import { useContext, useEffect } from "react";

import { useAuth } from "./AuthContext";
import instance from "@/axios/instance";
import Toast from "react-native-toast-message";

const AxiosErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          logout();
          Toast.show({
            type: "error",
            text1: "Session expired",
            text2: "Please log in again.",
            position: "bottom",
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return <>{children}</>;
};

export default AxiosErrorHandler;
