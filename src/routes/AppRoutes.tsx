import { RoutesEnum } from "../enums/routes";
import type { RouteObject } from "react-router-dom";

export const screensRoutes: RouteObject[] = [
  {
    path: RoutesEnum.Home,
    element: <div>Home</div>,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: RoutesEnum.Login,
        element: <div>Login</div>,
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
    element: <div>Home</div>,
    children: [
      {
        path: RoutesEnum.Painel,
        element: <div>Painel</div>,
      },
    ],
  },
];
