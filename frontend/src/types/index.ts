export interface IBaseResponse<T> {
  status: number;
  message: string;
  body: T | null;
}
