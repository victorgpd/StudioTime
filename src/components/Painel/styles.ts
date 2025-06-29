import { Menu as MenuAntd } from "antd";
import styled from "styled-components";

export const ContainerPainelPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`;

interface PainelProps {
  $collapsed?: boolean;
}

export const PainelContainer = styled.aside<PainelProps>`
  width: 246px;
  height: 100%;
  padding-top: 50px;
  transition: transform 0.3s ease;
  background-color: #2e2e2e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  display: flex;
  position: relative;

  transform: ${({ $collapsed }) => ($collapsed ? "translateX(0)" : "translateX(-100%)")};
`;

export const CollapseButton = styled.button<{ $collapsed: boolean }>`
  position: absolute;
  top: 50%;
  right: -25px;
  transform: translateY(-50%);
  z-index: 1;

  width: 32px;
  height: 64px;

  background-color: #2e2e2e;
  color: white;
  font-size: 18px;
  font-weight: bold;

  border: none;
  border-radius: 0 8px 8px 0;

  cursor: pointer;
  transition: background-color 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    transform: rotate(${({ $collapsed }) => ($collapsed ? "180deg" : "0deg")});
    transition: transform 0.3s ease;
  }
`;

export const Menu = styled(MenuAntd)`
  width: 100%;
  height: 100%;
  color: white !important;
  background-color: #2e2e2e !important;

  .ant-menu-item-group-title {
    color: rgba(0, 0, 0, 0.65);
  }

  .ant-menu-item-selected {
    background-color: #f0fdf4 !important;
    color: #374151 !important;
    border-left: 4px solid #10b981;
  }

  .ant-menu-item {
    color: white;
  }

  .ant-menu-item-active {
    color: #10b981 !important;
  }

  .ant-menu-submenu-active > .ant-menu-submenu-title {
    color: #10b981 !important;
  }

  .ant-menu-submenu-title {
    color: white;
  }

  .ant-menu-submenu-selected {
    background-color: #f0fdf4 !important;
    border-left: 4px solid #10b981;

    & span {
      color: #374151 !important;
    }
  }

  .ant-menu-inline {
    background-color: #262626 !important;
  }
`;
