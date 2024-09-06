"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { User } from "@/types/user";
import { BASE_URL } from "@/utils/constants";
import { NotNullOrUndefinedValueError } from "@/utils/errors";
import { useRouter } from "next/navigation";
export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextData = {
  user?: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  error?: Error;
};

export const AuthContextDefaultValues = {
  user: undefined,
  loading: false,
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
  error: undefined,
};

export const AuthContext = createContext<AuthContextData>(
  AuthContextDefaultValues
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const signUp = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);

        const url = BASE_URL + "/api/signup";

        if (!BASE_URL) {
          throw new NotNullOrUndefinedValueError("BASE_URL");
        }

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const dataJson = await response.json();

        const data = dataJson?.data;

        const { token, user } = data;

        if (!token || !user) {
          throw new NotNullOrUndefinedValueError("token or user");
        }

        setUser(user);

        router.push("/painel");
      } catch (error) {
        // TODO: handle error
        // setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);

        const url = BASE_URL + "/api/signin";

        if (!BASE_URL) {
          throw new NotNullOrUndefinedValueError("BASE_URL");
        }

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const dataJson = await response.json();

        if (!response.ok) {
          throw new Error(dataJson?.message || "Failed to sign in");
        }

        const data = dataJson?.data;

        const { user } = data;

        if (!user) {
          throw new NotNullOrUndefinedValueError("user");
        }

        setUser(user);

        router.push("/painel");
      } catch (error) {
        // TODO: Handle error
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signOut = async () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
