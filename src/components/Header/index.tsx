import { useNavigate } from "react-router-dom";
import { Container, Logo } from "./styles";
import { RoutesEnum } from "../../enums/routes";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src="/images/logo-horizontal.png" alt="Logo StudioTime" onClick={() => navigate(RoutesEnum.Home)} />
    </Container>
  );
};

export default Header;
