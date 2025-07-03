import useTitle from "../../hooks/useTitle";
import PainelComponent from "../../components/Painel";

const Painel = () => {
  useTitle("Painel");

  return (
    <PainelComponent defaultSelectedKeys={["home"]}>
      <h1>Painel</h1>
    </PainelComponent>
  );
};

export default Painel;
