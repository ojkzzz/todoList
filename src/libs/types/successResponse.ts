export interface SuccessResponse<T> {
  message: string;
  status: string;
  data: T;
}
