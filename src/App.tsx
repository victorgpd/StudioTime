import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter, type RouteObject } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

import ProtectedRoute from "./components/ProtectedRoute";
import { loggedScreensRoutes, screensRoutes } from "./routes/AppRoutes";
import { useAppDispatch } from "./redux/hook";
import { clearUser, setUser } from "./redux/globalReducer/slice";

function App() {
  const dispatch = useAppDispatch();
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email ?? "",
            name: user.displayName ?? "",
          })
        );
      } else {
        dispatch(clearUser());
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const routesLogged: RouteObject[] = loggedScreensRoutes.map((route) => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
  }));

  const router = createBrowserRouter([...screensRoutes, ...routesLogged]);

  if (loadingAuth) return <div>Carregando autenticação...</div>;

  return <RouterProvider router={router} />;
}

export default App;
