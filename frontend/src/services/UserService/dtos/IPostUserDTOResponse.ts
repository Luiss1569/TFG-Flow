import { EnumTypeUser, EnumUniversity_Degree } from "../../../constants/enums";
import { IBaseResponse } from "../../../types";

export interface IPostUserModel {
  id?: string;
  cpf: string;
  email: string;
  institute_id: string;
  matriculation: string;
  name: string;
  password: string;
  confirmPassword?: string;
  role: EnumTypeUser;
  university_degree: EnumUniversity_Degree;
}
export interface IPostUsereDTOResponse extends IBaseResponse<IPostUserModel> {}
