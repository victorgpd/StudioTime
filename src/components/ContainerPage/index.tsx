import { Container } from "./styles";

interface ContainerPageProps {
  children: React.ReactNode;
  gap?: string;
  alignItems?: "flex-start" | "center" | "flex-end" | undefined;
  justifyContent?: "flex-start" | "space-between" | "space-around" | "space-evenly" | "center" | "flex-end" | undefined;
  paddingLeft?: boolean;
}

const ContainerPage = ({ children, gap, alignItems, justifyContent, paddingLeft }: ContainerPageProps) => {
  return (
    <Container gap={gap} alignItems={alignItems} justifyContent={justifyContent} paddingLeft={paddingLeft}>
      {children}
    </Container>
  );
};

export default ContainerPage;
