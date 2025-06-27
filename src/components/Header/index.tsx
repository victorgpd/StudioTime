import { useNavigate } from "react-router-dom";
import { Container, Logo, ButtonsWrapper, ButtonHeader, UserName } from "./styles";
import { RoutesEnum } from "../../enums/routes";
import { useAppSelector } from "../../redux/hook";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(navigate);
  const { user } = useAppSelector((state) => state.globalReducer);

  const isLoggedIn = !!user?.uid;

  const capitalizeFirstLetter = () => {
    if (!user?.name) return "";

    const name = user?.name.split(" ")[0];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <Container>
      <Logo src="/images/logo-horizontal.png" alt="Logo StudioTime" onClick={() => navigate(RoutesEnum.Home)} />

      {!isLoggedIn ? (
        <ButtonsWrapper>
          <ButtonHeader onClick={() => navigate(RoutesEnum.Login)}>Login</ButtonHeader>
          <ButtonHeader onClick={() => navigate(RoutesEnum.Register)} $secondary>
            Cadastro
          </ButtonHeader>
        </ButtonsWrapper>
      ) : (
        <ButtonsWrapper>
          <UserName>Olá, {capitalizeFirstLetter()}</UserName>

          <ButtonHeader onClick={() => navigate(RoutesEnum.Painel)} $secondary>
            Painel
          </ButtonHeader>

          <ButtonHeader onClick={logout}>Sair</ButtonHeader>
        </ButtonsWrapper>
      )}
    </Container>
  );
};

export default Header;
