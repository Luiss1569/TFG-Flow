import { Institute } from "./Institute";

export type User = {
  id: string;
  role: string;
  name: string;
  email: string;
  cpf: string;
  matriculation: string;
};

export type UserWithInstitute = User & {
  institute: Institute;
};
