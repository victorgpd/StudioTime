import styled from "styled-components";

interface ContainerProps {
  gap?: string;
  alignItems?: "flex-start" | "center" | "flex-end" | undefined;
  justifyContent?: "flex-start" | "space-between" | "space-around" | "space-evenly" | "center" | "flex-end" | undefined;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;

  padding: 15px;

  ${(props) => `gap: ${props.gap}`};
  display: flex;
  ${(props) => `align-items: ${props.alignItems}`};
  ${(props) => `justify-content: ${props.justifyContent}`};
`;
