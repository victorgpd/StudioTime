import ContainerPage from "../ContainerPage";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../enums/routes";
import { CollapseButton, ContainerBackdrop, ContainerPainelPage, Menu, PainelContainer } from "./styles";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  CameraOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
  LogoutOutlined,
  PictureOutlined,
  RightOutlined,
} from "@ant-design/icons";

const PainelComponent = ({ children, defaultSelectedKeys }: { children?: React.ReactNode; defaultSelectedKeys: string[] }) => {
  const navigate = useNavigate();
  const { logout } = useAuth(navigate);

  const [collapsed, setCollapsed] = useState(true);
  const [resizePage, setResizePage] = useState(false);
  const [widthPage, setWidthPage] = useState(window.innerWidth);

  const menuItems = useMemo(
    () => [
      {
        key: "home",
        icon: <HomeOutlined />,
        label: "Início",
        onClick: () => navigate(RoutesEnum.Painel),
      },
      {
        key: "clientes",
        icon: <UserOutlined />,
        label: "Clientes",
        children: [
          {
            key: "clientes-lista",
            icon: <UsergroupAddOutlined />,
            label: "Lista de Clientes",
            onClick: () => navigate(RoutesEnum.Clientes),
          },
          {
            key: "novo-cliente",
            icon: <UserAddOutlined />,
            label: "Novo Cliente",
            onClick: () => navigate(RoutesEnum.ClientesCadastrar),
          },
        ],
      },
      {
        key: "ensaios",
        icon: <CameraOutlined />,
        label: "Ensaios",
        children: [
          {
            key: "ensaios-lista",
            icon: <FileTextOutlined />,
            label: "Lista de Ensaios",
            onClick: () => navigate(RoutesEnum.Ensaios),
          },
          {
            key: "novo-ensaio",
            icon: <PlusCircleOutlined />,
            label: "Novo Ensaio",
            onClick: () => navigate(RoutesEnum.EnsaiosCadastrar),
          },
        ],
      },
      {
        key: "fotos",
        icon: <PictureOutlined />,
        label: "Fotos",
        onClick: () => navigate(RoutesEnum.Fotos),
      },
      {
        key: "sair",
        icon: <LogoutOutlined />,
        label: "Sair",
        onClick: logout,
        style: { color: "red" },
      },
    ],
    [navigate, logout]
  );

  useEffect(() => {
    const handleResize = () => setWidthPage(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (widthPage < 768) {
      setResizePage(true);
    } else {
      setResizePage(false);
    }
  }, [widthPage]);

  return (
    <ContainerPainelPage>
      <PainelContainer $collapsed={collapsed} $resize={resizePage}>
        <CollapseButton onClick={() => setCollapsed(!collapsed)} $collapsed={collapsed}>
          <span>
            <RightOutlined />
          </span>
        </CollapseButton>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={defaultSelectedKeys} style={{ height: "100%", borderRight: 0 }} items={menuItems} />
      </PainelContainer>

      <ContainerPage paddingLeft={collapsed && !resizePage ? true : false}>
        <ContainerBackdrop $collapsed={collapsed && resizePage} onClick={() => setCollapsed(false)}></ContainerBackdrop>
        {children}
      </ContainerPage>
    </ContainerPainelPage>
  );
};

export default PainelComponent;
