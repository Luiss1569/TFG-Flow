import { IBaseResponse } from "../../../types";

export interface IInstituteModel {
  id: string;
  acronym: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface IGetInstituteDTORespose
  extends IBaseResponse<IInstituteModel[]> {}
