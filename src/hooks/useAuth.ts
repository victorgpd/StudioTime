import type { IUser } from "../enums/types";
import type { NavigateFunction } from "react-router-dom";

import { useState } from "react";
import { auth } from "../services/firebase";
import { RoutesEnum } from "../enums/routes";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const useAuth = (navigate: NavigateFunction) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const runAsync = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError("");

    try {
      return await fn();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = (email: string, password: string) =>
    runAsync(async () => {
      await signInWithEmailAndPassword(auth, email, password);

      navigate(RoutesEnum.Painel);
      return null;
    });

  const register = (user: IUser, password: string) =>
    runAsync(async () => {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, password);

      await updateProfile(userCredential.user, {
        displayName: user.name,
      });

      localStorage.setItem("phone", user.phone);

      navigate(RoutesEnum.Painel);
      return userCredential.user;
    });

  const logout = () =>
    runAsync(async () => {
      await signOut(auth);
    });

  return { login, register, logout, error, loading };
};
