import ContainerPage from "./components/ContainerPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { Spin } from "antd";
import { auth } from "./services/firebase";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./redux/hook";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { clearUser, setUser } from "./redux/globalReducer/slice";
import { NotificationProvider } from "./context/notificationContext";
import { loggedScreensRoutes, screensRoutes } from "./routes/AppRoutes";
import { RouterProvider, createBrowserRouter, type RouteObject } from "react-router-dom";

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

  return (
    <NotificationProvider>
      {loadingAuth ? (
        <ContainerPage alignItems="center" justifyContent="center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </ContainerPage>
      ) : (
        <RouterProvider router={router} />
      )}
    </NotificationProvider>
  );
}

export default App;
