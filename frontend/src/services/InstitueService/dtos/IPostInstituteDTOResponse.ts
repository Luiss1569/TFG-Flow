import { IBaseResponse } from "../../../types";

export interface IPostInstituteModel {
  id?: string;
  name: string;
  acronym: string;
}

export interface IPostInstituteDTOResponse
  extends IBaseResponse<IPostInstituteModel> {}
