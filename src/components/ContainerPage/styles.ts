import styled from "styled-components";

interface ContainerProps {
  gap?: string;
  alignItems?: "flex-start" | "center" | "flex-end" | undefined;
  justifyContent?: "flex-start" | "space-between" | "space-around" | "space-evenly" | "center" | "flex-end" | undefined;
  paddingLeft?: boolean;
}

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["alignItems", "justifyContent", "gap", "paddingLeft"].includes(prop),
})<ContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;

  ${({ gap }) => gap && `gap: ${gap};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}

  padding: 15px;
  ${({ paddingLeft }) => paddingLeft && `padding-left: 261px;`}

  position: relative;
  transition: padding-left 0.3s ease;

  overflow-y: auto;
`;
