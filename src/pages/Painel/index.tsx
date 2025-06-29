import useTitle from "../../hooks/useTitle";
import PainelComponent from "../../components/Painel";

const Painel = () => {
  useTitle("Painel");

  return <PainelComponent defaultSelectedKeys={["home"]}></PainelComponent>;
};

export default Painel;
