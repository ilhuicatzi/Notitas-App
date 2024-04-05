import { createContext, useState, useEffect } from "react";
import Axios from "../api/axios";
import axios, { AxiosError } from "axios";
import Cookie from "js-cookie";

type User = string | null;

interface ErrorResponse {
  message: string;
}

type FormDataSignUp = {
  nombre: string;
  nick: string;
  email: string;
  password: string;
};

type FormDataSignIn = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const initialState: AuthContextType = {
  user: null,
  setUser: () => null,
  isAuthenticated: false,
  setIsAuthenticated: () => false,
  loading: true,
  setLoading: () => true,
  errorsBack: " ",
  setErrorsBack: () => " ",
  signup: () => null,
  signin: () => null,
};

type AuthContextType = {
  user: string | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  errorsBack: string | null | string[];
  setErrorsBack: (errorsBack: string) => void;
  signup: (data: FormDataSignUp) => void;
  signin: (data: FormDataSignIn) => void;
};

export const AuthContext = createContext<AuthContextType>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorsBack, setErrorsBack] = useState<string | null | string[]>(null);

  const signup = async (data: FormDataSignUp) => {
    const { nombre, nick, email, password } = data;
    try {
      const response = await Axios.post("/signup", {
        nombre,
        nick,
        email,
        password,
      });
      const dataSignUp = response.data;
      console.log(dataSignUp);
      setUser(dataSignUp);
      setIsAuthenticated(true);
      setErrorsBack(null);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const responseData = axiosError.response?.data as ErrorResponse;
        if (Array.isArray(responseData)) {
          return setErrorsBack(responseData);
        } else {
          return setErrorsBack([responseData.message]);
        }
      }
    }
  };

  const signin = async (data: FormDataSignIn) => {
    const { email, password } = data;
    try {
      const response = await Axios.post("/signin", {
        email,
        password,
      });
      const dataSignIn = response.data;
      //console.log(dataSignIn);

      setUser(dataSignIn);
      setIsAuthenticated(true);
      setErrorsBack(null);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const responseData = axiosError.response?.data as ErrorResponse;
        if (Array.isArray(responseData)) {
          return setErrorsBack(responseData);
        } else {
          return setErrorsBack([responseData.message]);
        }
      }
    }
  };

  useEffect(() => {
    if (Cookie.get("token")) {
      Axios
        .get("/profile")
        .then((response) => {
          const data = response.data;
          setUser(data);
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        });
    }
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    errorsBack,
    setErrorsBack,
    signup,
    signin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
