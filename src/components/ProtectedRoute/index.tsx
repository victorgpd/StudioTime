import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { RoutesEnum } from "../../enums/routes";
import ContainerPage from "../ContainerPage";
import { Spin } from "antd";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <ContainerPage alignItems="center" justifyContent="center">
        <Spin size="large" />
      </ContainerPage>
    );

  return isAuthenticated ? children : <Navigate to={RoutesEnum.Login} replace />;
};

export default ProtectedRoute;
