import { EnumUniversity_Degree, EnumTypeUser } from "../../../constants/enums";

export interface IPostUserDTORequest {
  name: string;
  cpf: string;
  role: EnumTypeUser;
  email: string;
  password: string;
  matriculation: string;
  institute_id: string;
  university_degree: EnumUniversity_Degree;
}
