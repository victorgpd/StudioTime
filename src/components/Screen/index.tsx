import { Outlet } from "react-router-dom";
import Header from "../Header";
import Main from "../Main";

const Screen = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
        {children}
      </Main>
    </>
  );
};

export default Screen;
