import { RoutesEnum } from "../enums/routes";
import type { RouteObject } from "react-router-dom";

import Screen from "../components/Screen";
import Login from "../pages/Login";

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
        element: <Login />,
      },
      {
        path: RoutesEnum.Register,
        element: <div>Register</div>,
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
        element: <div>Painel</div>,
      },
    ],
  },
];
