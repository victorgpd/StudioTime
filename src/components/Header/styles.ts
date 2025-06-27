import styled from "styled-components";

export const Container = styled.header`
  height: 72px;
  padding: 0 1.5rem;
  background-color: #2e2e2e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Logo = styled.img`
  height: 48px;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

interface ButtonProps {
  $secondary?: boolean;
}

export const ButtonHeader = styled.button<ButtonProps>`
  font-weight: 600;
  border-radius: 999px;
  font-size: 0.92rem;
  padding: 0.45rem 1.3rem;

  color: ${({ $secondary }) => ($secondary ? "#ffffff" : "#ffffff")};
  border: ${({ $secondary }) => ($secondary ? "1px solid #ffffff80" : "none")};
  background-color: ${({ $secondary }) => ($secondary ? "transparent" : "#00c853")};
  box-shadow: ${({ $secondary }) => ($secondary ? "none" : "0 3px 8px rgba(0, 200, 83, 0.25)")};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.03);
    background-color: ${({ $secondary }) => ($secondary ? "#ffffff1a" : "#00b44b")};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.3);
  }
`;

export const UserName = styled.span`
  color: #ffffffdd;
  font-weight: 500;
  font-size: 0.95rem;
`;
