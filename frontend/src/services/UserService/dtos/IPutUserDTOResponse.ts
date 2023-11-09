import { IBaseResponse } from "../../../types";

interface BodyUser {
  id: string;
  name: string;
  cpf: string;
  role: string;
  email: string;
  password: string;
  matriculation: string;
  institute_id: string;
  created_at: string;
  updated_at: string;
}

export interface IPutUserDTOResponse extends IBaseResponse<BodyUser> {}
