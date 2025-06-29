import { RoutesEnum } from "../enums/routes";
import type { RouteObject } from "react-router-dom";

import Screen from "../components/Screen";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicOnlyRoute from "../components/PublicOnlyRoute";
import Painel from "../pages/Painel";

export const screensRoutes: RouteObject[] = [
  {
    path: RoutesEnum.Home,
    element: <Screen />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: RoutesEnum.Login,
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        ),
      },
      {
        path: RoutesEnum.Register,
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        ),
      },
    ],
  },
];

export const loggedScreensRoutes: RouteObject[] = [
  {
    path: RoutesEnum.Home,
    element: <Screen />,
    children: [
      {
        path: RoutesEnum.Painel,
        element: <Painel />,
      },
      {
        path: RoutesEnum.Fotos,
        element: <div>Fotos</div>,
      },
      {
        path: RoutesEnum.FotosCadastrar,
        element: <div>FotosCadastrar</div>,
      },
      {
        path: RoutesEnum.Clientes,
        element: <div>Clientes</div>,
      },
      {
        path: RoutesEnum.ClientesCadastrar,
        element: <div>ClientesCadastrar</div>,
      },
      {
        path: RoutesEnum.Ensaios,
        element: <div>Ensaios</div>,
      },
      {
        path: RoutesEnum.EnsaiosCadastrar,
        element: <div>EnsaiosCadastrar</div>,
      },
    ],
  },
];
