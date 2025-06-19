import styled from "styled-components";

export const Container = styled.header`
  height: 72px;
  padding: 8px 2rem;

  background-color: #fefdfd;
  border-bottom: 1px solid #eff2f5;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Logo = styled.img`
  height: 100%;

  cursor: pointer;
`;
