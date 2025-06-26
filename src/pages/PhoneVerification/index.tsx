import { useEffect, useState } from "react";
import ContainerPage from "../../components/ContainerPage";
import {
  ContainerVerification,
  VerificationForm,
  VerificationFormButton,
  VerificationFormInput,
  VerificationFormItem,
  VerificationFormTitle,
  VerificationLogotipo,
  VerificationText,
  VerificationTextError,
  VerificationTitle,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RoutesEnum } from "../../enums/routes";

const PHONE_REGEX = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const PhoneVerification = () => {
  const navigate = useNavigate();

  const { error, loading } = useAuth(navigate);

  const [phone, setPhone] = useState("");

  const [code, setCode] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    let error = "";

    if (!code || !PHONE_REGEX.test(code)) {
      error = "Telefone inválido.";
    }

    setWasSubmitted(false);
    setFieldError(error);
    setIsFormValid(error === "");
  }, [code]);

  useEffect(() => {
    const phoneStorage = localStorage.getItem("phone");

    if (phoneStorage) {
      setPhone(phoneStorage);
    } else {
      navigate(RoutesEnum.Login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPhone = (phone: string): string => {
    const numbersOnly = phone.replace(/\D/g, "").slice(0, 11);

    if (numbersOnly.length <= 11) {
      return numbersOnly.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    } else {
      return numbersOnly.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(formatPhone(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;
  };

  return (
    <ContainerPage alignItems="center" justifyContent="center">
      <ContainerVerification>
        <VerificationLogotipo src="/images/logo-horizontal.png" alt="Logotipo" />

        <VerificationTitle>Verificação de telefone</VerificationTitle>

        <VerificationText>
          Insira o código de verificação que foi enviado para o telefone <span>{phone}</span>.
        </VerificationText>

        <VerificationForm onSubmit={handleSubmit}>
          <VerificationFormItem>
            <VerificationFormTitle htmlFor="code">Código de verificação</VerificationFormTitle>
            <VerificationFormInput type="text" placeholder="Código de verificação" id="code" name="code" value={code} onChange={handleChangeInput} />
            {wasSubmitted && fieldError && <VerificationTextError>{fieldError}</VerificationTextError>}
          </VerificationFormItem>

          <VerificationFormButton variant="solid" color="blue" htmlType="submit" loading={loading}>
            Confirmar
          </VerificationFormButton>
        </VerificationForm>

        {error && <VerificationTextError>{error}</VerificationTextError>}
      </ContainerVerification>
    </ContainerPage>
  );
};

export default PhoneVerification;
