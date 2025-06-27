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
import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { useAuth } from "../../hooks/useAuth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  useTitle("Cadastro");
  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { register, loading, error } = useAuth(navigate);

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

    setFieldErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [userInputs]);

  const handleChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserInputs((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!isFormValid) return;

    await register({ name: userInputs.name, email: userInputs.email }, userInputs.password);
  };

  return (
    <ContainerPage alignItems="center" justifyContent="center">
      <ContainerRegister>
        <RegisterLogotipo src="/images/logo-vertical.png" alt="Logotipo" />
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
