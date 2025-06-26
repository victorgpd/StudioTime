import { Button, Input } from "antd";
import styled from "styled-components";

export const ContainerVerification = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 16px 12px;
  border-radius: 8px;

  background-color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.13);

  gap: 16px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const VerificationLogotipo = styled.img`
  width: 64px;
  height: 64px;
`;

export const VerificationTitle = styled.h1`
  color: #333;
  font-size: 1.6rem;
`;

export const VerificationText = styled.span`
  width: 280px;

  color: #6a6c84;
  font-size: 0.9rem;

  line-height: 1.3rem;

  & > span {
    color: #333;
    font-weight: 600;
  }
`;

export const VerificationTextError = styled.span`
  color: red;
  font-size: 0.75rem;
`;

export const VerificationForm = styled.form`
  width: 100%;
  max-width: 280px;

  gap: 16px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const VerificationFormItem = styled.div`
  width: 100%;

  gap: 4px;
  display: flex;
  flex-flow: column;
`;

export const VerificationFormTitle = styled.label`
  color: #6a6c84;
  font-weight: 600;
  font-size: 0.9rem;
  margin-left: 4px;
`;

export const VerificationFormInput = styled(Input)`
  width: 100%;
  font-size: 0.9rem;
`;

export const VerificationFormButton = styled(Button)`
  width: 100%;
  height: 32px;
  font-size: 0.9rem;
`;
