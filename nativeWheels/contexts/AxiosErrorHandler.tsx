import { useContext, useEffect } from "react";

import { useAuth } from "./AuthContext";
import instance from "@/axios/instance";

const AxiosErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Logging out due to 401 error");
          logout();
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
