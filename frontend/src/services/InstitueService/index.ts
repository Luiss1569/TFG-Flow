import { IDeletetInstituteDTORequest } from "./dtos/IDeleteInstituteDTOResquest";
import api from "../../lib/axios";
import { IGetInstituteDTORespose } from "./dtos/IGetInstituteDTOResponse";
import { IPostInstituteDTORequest } from "./dtos/IPostInstituteDTORequest";
import { IPostInstituteDTOResponse } from "./dtos/IPostInstituteDTOResponse";
import { IPutInstituteDTORequest } from "./dtos/IPutInstituteDTORequest";
import { IPutInstituteDTOResponse } from "./dtos/IPutInstituteDTOResponse";
import { IDeleteInstituteDTORespose } from "./dtos/IDeleteInstituteDTOResponse";

export default class InstituteService {
  private route = "institute";

  public async postInstitute(
    dataRequest: IPostInstituteDTORequest
  ): Promise<IPostInstituteDTOResponse> {
    const { data } = await api.post<IPostInstituteDTOResponse>(
      this.route,
      dataRequest
    );
    return data;
  }

  public async getInstitutes(): Promise<IGetInstituteDTORespose> {
    const { data } = await api.get<IGetInstituteDTORespose>(this.route);
    return data;
  }

  public async putInstitute(
    dataRequest: IPutInstituteDTORequest
  ): Promise<IPutInstituteDTOResponse> {
    const { data } = await api.put<IPutInstituteDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest
    );
    return data;
  }

  public async deleteInstitute(
    dataRequest: IDeletetInstituteDTORequest
  ): Promise<IDeleteInstituteDTORespose> {
    const { data } = await api.delete<IDeleteInstituteDTORespose>(
      `${this.route}/${dataRequest.id}`,
      {}
    );
    return data;
  }
}
