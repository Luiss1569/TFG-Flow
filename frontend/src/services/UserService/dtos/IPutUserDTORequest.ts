import { EnumTypeUser, EnumUniversity_Degree } from "../../../constants/enums";

export interface IPutUserDTORequest {
  id: string;
  name?: string;
  cpf?: string;
  role?: EnumTypeUser;
  email?: string;
  password?: string;
  matriculation?: string;
  institute_id?: string;
  university_degree?: EnumUniversity_Degree;
}
