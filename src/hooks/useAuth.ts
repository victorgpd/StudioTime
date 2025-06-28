import type { IUser } from "../enums/types";
import type { NavigateFunction } from "react-router-dom";

import { useState } from "react";
import { auth } from "../services/firebase";
import { RoutesEnum } from "../enums/routes";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "../redux/hook";
import { useNotification } from "./useNotification";
import { clearUser, setUser } from "../redux/globalReducer/slice";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useDocument } from "./useDocument";

export const useAuth = (navigate: NavigateFunction) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const notification = useNotification();

  const { insertDocument } = useDocument();

  const runAsync = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError("");

    try {
      return await fn();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const errorCode = err.code;
        console.log(errorCode);
        setError(getFirebaseErrorMessage(errorCode));
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = (email: string, password: string) =>
    runAsync(async () => {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        setUser({
          email: user.email!,
          name: user.displayName!,
          uid: user.uid,
        })
      );
      notification.success("Seja bem-vindo!", "Usuário logado com sucesso.");
      navigate(RoutesEnum.Painel);
      return null;
    });

  const register = (user: IUser, password: string) =>
    runAsync(async () => {
      const { user: userCredential } = await createUserWithEmailAndPassword(auth, user.email, password);

      await updateProfile(userCredential, {
        displayName: user.name,
      });

      await insertDocument("photographers", {
        proprietary: userCredential.uid,
        clients: [],
        rehearsals: [],
      });

      dispatch(
        setUser({
          email: user.email,
          name: user.name,
          uid: userCredential.uid,
        })
      );

      notification.success("Seja bem-vindo!", "Usuário cadastrado com sucesso.");
      navigate(RoutesEnum.Painel);
      return userCredential;
    });

  const logout = () =>
    runAsync(async () => {
      dispatch(clearUser());
      await signOut(auth);

      notification.success("Tchau!", "Usuário deslogado com sucesso.");
    });

  return { login, register, logout, error, loading };
};
