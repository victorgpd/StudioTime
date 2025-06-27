import styled from "styled-components";

export const Container = styled.header`
  height: 72px;
  padding: 0 2rem;

  background-color: #2e2e2e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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
