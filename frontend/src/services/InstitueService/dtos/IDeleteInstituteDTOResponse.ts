import { IBaseResponse } from "../../../types";

interface BodyInstitute {
  id: string;
  acronym: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IDeleteInstituteDTORespose
  extends IBaseResponse<BodyInstitute> {}
