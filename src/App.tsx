import ProtectedRoute from "./components/ProtectedRoute";
import { loggedScreensRoutes, screensRoutes } from "./routes/AppRoutes";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";

function App() {
  const routes: RouteObject[] = [...screensRoutes];
  const routesLogged: RouteObject[] = [...loggedScreensRoutes].map((route) => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
  }));

  const router = createBrowserRouter([...routes, ...routesLogged]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
