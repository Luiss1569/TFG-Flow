import { FormDataTable, FormDataUsers } from "./types";

export const optionsRole: Array<{ value: string; label: string }> = [
  { value: "estudante", label: "Estudante" },
  { value: "professor", label: "Professor" },
  { value: "coordenador", label: "Coordenador" },
  { value: "administrador", label: "Administrador" },
];

export const defaultValues: FormDataUsers = {
  cpf: "",
  confirmPassword: "",
  email: "",
  institute_id: "",
  matriculation: "",
  name: "",
  password: "",
  role: "",
};

export const optionsColunmTable: Array<{ value: string; label: string }> = [
  { label: "Perfil", value: "Perfil" },
  { label: "Nome", value: "Nome" },
  { label: "Email", value: "Email" },
  { label: "CPF", value: "CPF" },
  { label: "Matricula", value: "Matrícula" },
  { label: "Instituto", value: "Instituto" },
];

export const defaultValuesTable: FormDataTable = {
  nameColunm: "",
  search: "",
};
