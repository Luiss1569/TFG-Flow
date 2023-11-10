import { EnumTypeUser, EnumUniversity_Degree } from "../../constants/enums";
import { FormDataTable } from "./types";

export const optionsRole: Array<{ value: string; label: string }> = [
  { value: EnumTypeUser.ESTUDANTE, label: "Estudante" },
  { value: EnumTypeUser.PROFESSOR, label: "Professor" },
  { value: EnumTypeUser.COORDENADOR, label: "Coordenador" },
  { value: EnumTypeUser.ADMINISTRADOR, label: "Administrador" },
];

export const optionsRoleTypeGrau: Array<{ value: string; label: string }> = [
  { value: EnumUniversity_Degree.MESTRADO, label: "Mestrado" },
  { value: EnumUniversity_Degree.DOUTORADO, label: "Doutorado" },
];

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
