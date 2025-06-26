import ContainerPage from "../../components/ContainerPage";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../enums/routes";
import {
  ContainerRegister,
  RegisterContainerLogin,
  RegisterForm,
  RegisterFormButton,
  RegisterFormInput,
  RegisterFormItem,
  RegisterFormTitle,
  RegisterLogotipo,
  RegisterTextError,
  RegisterTextLogin,
  RegisterTextLoginLink,
  RegisterTitle,
} from "./styles";
import { Select } from "antd";
import { useEffect, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const Register = () => {
  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (!userInputs.name || userInputs.name.length < 3) {
      newErrors.name = "Nome deve ter ao menos 3 caracteres.";
    }

    if (!userInputs.email || !EMAIL_REGEX.test(userInputs.email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!userInputs.password || userInputs.password.length < 6) {
      newErrors.password = "A senha deve ter ao menos 6 caracteres.";
    }

    if (!userInputs.phone || !PHONE_REGEX.test(userInputs.phone)) {
      newErrors.phone = "Telefone inválido. Ex: (11) 91234-5678";
    }

    if (!userInputs.role) {
      newErrors.role = "Selecione o tipo de perfil.";
    }

    setFieldErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [userInputs]);

  const formatPhone = (phone: string): string => {
    const numbersOnly = phone.replace(/\D/g, "").slice(0, 11);

    if (numbersOnly.length <= 11) {
      return numbersOnly.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    } else {
      return numbersOnly.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  const handleChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserInputs((prevUser) => ({
      ...prevUser,
      [name]: name === "phone" ? formatPhone(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!isFormValid) return;
  };

  return (
    <ContainerPage alignItems="center" justifyContent="center">
      <ContainerRegister>
        <RegisterLogotipo src="/images/logo-horizontal.png" alt="Logotipo" />
        <RegisterTitle>Cadastrar-se</RegisterTitle>

        <RegisterForm onSubmit={handleSubmit}>
          <RegisterFormItem>
            <RegisterFormTitle htmlFor="name">Nome</RegisterFormTitle>
            <RegisterFormInput type="text" name="name" placeholder="Seu nome" value={userInputs.name} onChange={handleChangeInputs} status={wasSubmitted && fieldErrors.name ? "error" : ""} />
            {wasSubmitted && fieldErrors.name && <RegisterTextError>{fieldErrors.name}</RegisterTextError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="email">E-mail</RegisterFormTitle>
            <RegisterFormInput
              type="text"
              name="email"
              placeholder="exemplo@email.com"
              value={userInputs.email}
              onChange={handleChangeInputs}
              status={wasSubmitted && fieldErrors.email ? "error" : ""}
            />
            {wasSubmitted && fieldErrors.email && <RegisterTextError>{fieldErrors.email}</RegisterTextError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="password">Senha</RegisterFormTitle>
            <RegisterFormInput.Password
              name="password"
              placeholder="Senha segura"
              value={userInputs.password}
              onChange={handleChangeInputs}
              status={wasSubmitted && fieldErrors.password ? "error" : ""}
            />
            {wasSubmitted && fieldErrors.password && <RegisterTextError>{fieldErrors.password}</RegisterTextError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="phone">Telefone</RegisterFormTitle>
            <RegisterFormInput
              type="text"
              name="phone"
              placeholder="(11) 91234-5678"
              value={userInputs.phone}
              onChange={handleChangeInputs}
              status={wasSubmitted && fieldErrors.phone ? "error" : ""}
            />
            {wasSubmitted && fieldErrors.phone && <RegisterTextError>{fieldErrors.phone}</RegisterTextError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="role">Tipo de perfil</RegisterFormTitle>
            <Select
              style={{ width: "100%" }}
              placeholder="Selecione uma opção"
              value={userInputs.role || undefined}
              onChange={(value) => setUserInputs({ ...userInputs, role: value })}
              status={wasSubmitted && fieldErrors.role ? "error" : ""}
              options={[
                { label: "Fotógrafo", value: "photographer" },
                { label: "Assistente", value: "assistant" },
              ]}
            />
            {wasSubmitted && fieldErrors.role && <RegisterTextError>{fieldErrors.role}</RegisterTextError>}
          </RegisterFormItem>

          <RegisterFormButton variant="solid" color="blue" htmlType="submit" loading={loading}>
            Cadastrar
          </RegisterFormButton>
        </RegisterForm>

        {error && <RegisterTextError>{error}</RegisterTextError>}

        <RegisterContainerLogin>
          <RegisterTextLogin>
            Já possui uma conta? <RegisterTextLoginLink onClick={() => navigate(RoutesEnum.Login)}>Entrar</RegisterTextLoginLink>
          </RegisterTextLogin>
        </RegisterContainerLogin>
      </ContainerRegister>
    </ContainerPage>
  );
};

export default Register;
