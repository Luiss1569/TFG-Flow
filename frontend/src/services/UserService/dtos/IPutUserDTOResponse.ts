import { EnumTypeUser, EnumUniversity_Degree } from "../../../constants/enums";
import { IBaseResponse } from "../../../types";

export interface IPutUserModel {
  id: string;
  name?: string;
  cpf?: string;
  role?: EnumTypeUser;
  email?: string;
  password?: string;
  matriculation?: string;
  institute_id?: string;
  university_degree: EnumUniversity_Degree | null;
  created_at?: string;
  updated_at?: string;
}

export interface IPutUserDTOResponse extends IBaseResponse<IPutUserModel> {}
