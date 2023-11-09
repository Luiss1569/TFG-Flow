import { IBaseResponse } from "../../../types";

interface IUserModel {
  id: string;
  name: string;
  cpf: number;
  role: string;
  email: string;
  password: string;
  matriculation: string;
  institute_id: string;
  created_at: string;
  updated_at: string;
}

export interface IGetUserDTORespose extends IBaseResponse<IUserModel[]> {}
