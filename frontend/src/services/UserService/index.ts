import api from "../../lib/axios";
import { IDeleteUserDTORequest } from "./dtos/IDeleteUserDTORequest";
import { IDeleteUserDTORespose } from "./dtos/IDeleteUserDTOResponse";
import { IGetUserDTORespose } from "./dtos/IGetUserDTOResponse";
import { IPostUserDTORequest } from "./dtos/IPostUserDTORequest";
import { IPostUserDTOResponse } from "./dtos/IPostUserDTOResponse";
import { IPutUserDTORequest } from "./dtos/IPutUserDTORequest";
import { IPutUserDTOResponse } from "./dtos/IPutUserDTOResponse";

export default class UserService {
  private route = "users";

  public async postUser(
    dataRequest: IPostUserDTORequest
  ): Promise<IPostUserDTOResponse> {
    const { data } = await api.post<IPostUserDTOResponse>(
      this.route,
      dataRequest
    );
    return data;
  }
  public async getUsers(): Promise<IGetUserDTORespose[]> {
    const { data } = await api.get<IGetUserDTORespose[]>(this.route);
    return data;
  }

  public async putUser(
    dataRequest: IPutUserDTORequest
  ): Promise<IPutUserDTOResponse> {
    const { data } = await api.put<IPutUserDTOResponse>(
      this.route,
      dataRequest
    );
    return data;
  }

  public async deleteUser(
    dataRequest: IDeleteUserDTORequest
  ): Promise<IDeleteUserDTORespose> {
    const { data } = await api.delete<IDeleteUserDTORespose>(
      `${this.route}/${dataRequest.id}`
    );
    return data;
  }
}
