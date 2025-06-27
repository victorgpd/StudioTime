import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { RoutesEnum } from "../../enums/routes";
import ContainerPage from "../ContainerPage";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking)
    return (
      <ContainerPage alignItems="center" justifyContent="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </ContainerPage>
    );

  return isAuthenticated ? <Navigate to={RoutesEnum.Painel} replace /> : children;
};

export default PublicOnlyRoute;
