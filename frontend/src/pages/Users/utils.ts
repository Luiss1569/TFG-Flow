import { FormDataUsers } from "./types";

export const optionsRole: Array<{ value: string; label: string }> = [
  { value: "estudante", label: "Estudante" },
  { value: "professor", label: "Professor" },
  { value: "coordenador", label: "Coordenador" },
  { value: "administrador", label: "Administrador" },
];

export const defaultValues: FormDataUsers = {
  cpf: "",
  confirmarSenha: "",
  email: "",
  institute_id: "",
  matriculation: "",
  name: "",
  password: "",
  role: "",
};
