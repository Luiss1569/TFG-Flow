import { IBaseResponse } from "../../../types";

export interface IPutInstituteModel {
  id: string;
  acronym?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IPutInstituteDTOResponse
  extends IBaseResponse<IPutInstituteModel> {}
