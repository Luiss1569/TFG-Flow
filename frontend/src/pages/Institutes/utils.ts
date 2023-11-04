import { FormDataInstitutes, FormDataTable } from "./types";

export const defaultValues: FormDataInstitutes = {
  name: "",
  acronym: "",
};

export const optionsColunmTable: Array<{ value: string; label: string }> = [
  { label: "Nome", value: "Nome" },
  { label: "Instituto", value: "Instituto" },
];

export const defaultValuesTable: FormDataTable = {
  nameColunm: "",
  search: "",
};
