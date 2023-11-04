export interface IPaginationQuery {
  page?: number;
  limit?: number;
}

export interface IPaginationResponse<T> {
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  docs: T[];
}

export interface IPaginationQueryServer {
  page?: number;
  limit?: number;
}

export interface IPaginationServerResponse<T> {
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  docs: T[];
}
