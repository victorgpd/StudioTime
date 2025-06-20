import Screen from "../Screen";
import ContainerPage from "../ContainerPage";

const Painel = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Screen>
      <ContainerPage>{children}</ContainerPage>
    </Screen>
  );
};

export default Painel;
