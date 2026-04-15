import { api } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const authorizationHeader = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token; // !! converts to boolean i.e if token is present it will return true else false

  const removeToken = () => {
    setToken(null);
    return localStorage.removeItem("token");
  };

  // const fetchUser = async (token) => {
  //   const response = await api.get("/auth/user", {
  //     headers: {
  //       Authorization: `authorizationHeader`,
  //     },
  //   });

  //   console.log("response", response.data);
  //   return response.data;
  // };

  // const useUser = (token) => {
  //   return useQuery({
  //     queryKey: ["user", token],
  //     queryFn: () => fetchUser(token),
  //     enabled: !!token,
  //     retry: 1,
  //   });
  // };

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        isLoggedIn,
        removeToken,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a authProvider");
  }
  return context;
};
