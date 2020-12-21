export interface IRequestParams {
  [key: string]: string;
};

export interface ISaleforceResponse {
  id: string;
  success: boolean;
  error: any[];
};
