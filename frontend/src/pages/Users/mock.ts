import { ITableUsers } from "./types";

export const arrayUsersMock: ITableUsers[] = [
  {
    id: 1,
    role: "Estudante",
    name: "Maria",
    email: "maria@gmail.com",
    cpf: "145.147.258-33",
    matriculation: "123456",
    institute: "IMC",
  },
  {
    id: 2,
    role: "Professor",
    name: "Ana Pereira",
    email: "ana@gmail.com",
    cpf: "145.147.258-00",
    matriculation: "222222",
    institute: "IEPG",
  },
  {
    id: 3,
    role: "Coordenador",
    name: "João",
    email: "joao@gmail.com",
    cpf: "222.147.111-33",
    matriculation: "333333",
    institute: "IEST",
  },
  {
    id: 4,
    role: "Estudante",
    name: "Maria",
    email: "maria@gmail.com",
    cpf: "145.147.745-12",
    matriculation: "123456",
    institute: "CEDUC",
  },
  {
    id: 5,
    role: "Estudante",
    name: "Maria",
    email: "maria@gmail.com",
    cpf: "145.147.258-33",
    matriculation: "123456",
    institute: "IMC",
  },
  {
    id: 6,
    role: "Estudante",
    name: "Maria",
    email: "maria@gmail.com",
    cpf: "145.147.258-33",
    matriculation: "123456",
    institute: "IMC",
  },
];

export const optionsInstituteMock: Array<{
  value: string;
  label: string;
}> = [
  { label: "IMC", value: "1" },
  { label: "IEST", value: "2" },
  { label: "IEPG", value: "3" },
  { label: "CEDUC", value: "4" },
];
