import { useState } from "react";
import { Button } from "../../components/Button";
import { TableUsers } from "./components/TableUsers";
import { arrayUsersMock } from "./mock";
import { Container, Wrapper, WrapperTable } from "./style";
import { ModalUsers } from "./components/ModalUsers";

export function Users() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <Container>
      <Wrapper>
        <Button onClick={handleOpenModal}>Cadastrar</Button>
      </Wrapper>

      <WrapperTable>
        <TableUsers data={arrayUsersMock} />
      </WrapperTable>

      <ModalUsers isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </Container>
  );
}
