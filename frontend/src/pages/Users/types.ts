export interface ITableUsers {
  id: number;
  perfil: string;
  name: string;
  email: string;
  cpf: string;
  register: string;
}

export interface FormDataUsers {
  name: string;
  cpf: string;
  role: string;
  email: string;
  password: string;
  confirmarSenha: string;
  matriculation: string;
  institute_id: string;
}
