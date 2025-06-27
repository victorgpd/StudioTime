import ContainerPage from "../../components/ContainerPage";

import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../enums/routes";
import {
  ContainerLogin,
  LoginContainerRegister,
  LoginForm,
  LoginFormButton,
  LoginFormInput,
  LoginFormItem,
  LoginFormTitle,
  LoginLogotipo,
  LoginTextError,
  LoginTextRegister,
  LoginTextRegisterLink,
  LoginTitle,
} from "./styles";
import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { useAuth } from "../../hooks/useAuth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  useTitle("Login");
  const navigate = useNavigate();

  const { login, loading, error } = useAuth(navigate);

  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (!userInputs.email) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!EMAIL_REGEX.test(userInputs.email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!userInputs.password) {
      newErrors.password = "A senha é obrigatória.";
    } else if (userInputs.password.length < 6) {
      newErrors.password = "A senha deve ter ao menos 6 caracteres.";
    }

    setWasSubmitted(false);
    setFieldErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [userInputs]);

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!isFormValid) return;

    await login(userInputs.email, userInputs.password);
  };

  return (
    <ContainerPage alignItems="center" justifyContent="center">
      <ContainerLogin>
        <LoginLogotipo src="/images/logo-vertical.png" alt="Logotipo" />

        <LoginTitle>Entrar</LoginTitle>

        <LoginForm onSubmit={handleSubmit}>
          <LoginFormItem>
            <LoginFormTitle htmlFor="email">E-mail</LoginFormTitle>
            <LoginFormInput type="text" placeholder="E-mail" id="email" name="email" value={userInputs.email} onChange={handleChangeInputs} />
            {wasSubmitted && fieldErrors.email && <LoginTextError>{fieldErrors.email}</LoginTextError>}
          </LoginFormItem>

          <LoginFormItem>
            <LoginFormTitle htmlFor="password">Senha</LoginFormTitle>
            <LoginFormInput.Password type="password" placeholder="Senha" id="password" name="password" value={userInputs.password} onChange={handleChangeInputs} />
            {wasSubmitted && fieldErrors.password && <LoginTextError>{fieldErrors.password}</LoginTextError>}
          </LoginFormItem>

          <LoginFormButton variant="solid" color="default" htmlType="submit" loading={loading}>
            Entrar
          </LoginFormButton>
        </LoginForm>

        {error && <LoginTextError>{error}</LoginTextError>}

        <LoginContainerRegister>
          <LoginTextRegister>
            Novo por aqui? <LoginTextRegisterLink onClick={() => navigate(RoutesEnum.Register)}>Cadastre-se</LoginTextRegisterLink>
          </LoginTextRegister>
        </LoginContainerRegister>
      </ContainerLogin>
    </ContainerPage>
  );
};

export default Login;
