import api from "../../lib/axios";
import { IDeleteUserDTORequest } from "./dtos/IDeleteUserDTORequest";
import { IDeleteUserDTORespose } from "./dtos/IDeleteUserDTOResponse";
import { IGetUserDTOResponse } from "./dtos/IGetUserDTOResponse";
import { IPostUserDTORequest } from "./dtos/IPostUserDTORequest";
import { IPostUsereDTOResponse } from "./dtos/IPostUserDTOResponse";
import { IPutUserDTORequest } from "./dtos/IPutUserDTORequest";
import { IPutUserDTOResponse } from "./dtos/IPutUserDTOResponse";

export default class UserService {
  private route = "user";

  public async postUser(
    dataRequest: IPostUserDTORequest
  ): Promise<IPostUsereDTOResponse> {
    const { data } = await api.post<IPostUsereDTOResponse>(
      this.route,
      dataRequest
    );
    return data;
  }
  public async getUsers(): Promise<IGetUserDTOResponse> {
    const { data } = await api.get<IGetUserDTOResponse>(this.route);
    return data;
  }

  public async putUser(
    dataRequest: IPutUserDTORequest
  ): Promise<IPutUserDTOResponse> {
    const { data } = await api.put<IPutUserDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest
    );
    return data;
  }

  public async deleteUser(
    dataRequest: IDeleteUserDTORequest
  ): Promise<IDeleteUserDTORespose> {
    const { data } = await api.delete<IDeleteUserDTORespose>(
      `${this.route}/${dataRequest.id}`,
      {}
    );
    return data;
  }
}
