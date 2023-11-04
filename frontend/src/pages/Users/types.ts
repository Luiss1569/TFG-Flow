export interface ITableUsers {
  id: number;
  role: string;
  name: string;
  email: string;
  cpf: string;
  matriculation: string;
  institute: string;
}

export interface FormDataUsers {
  name: string;
  cpf: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  matriculation: string;
  institute_id: string;
}

export interface FormDataTable {
  nameColunm: string;
  search: string;
}
