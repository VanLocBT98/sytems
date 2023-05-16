type ErrorResponse = {
  code?: string;
  field?: string;
  message: string;
};

type OptionsType = {
  label: string;
  value: string;
};

type ErrorStatusCode = 401 | 404 | 403 | 503;

type PaginationLinks = {
  self: string;
  first: string;
  prev?: any;
  next?: any;
  last: string;
};

type PaginationMeta = {
  totalPages: number;
  limit: number;
  total: number;
  page: number;
};

type APIPaginationResponse<T> = {
  data: T;
  meta: PaginationMeta;
  links: PaginationLinks;
};
