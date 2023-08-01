export interface IPageProps {
  errorStatus?: number;
  errorMessage?: string;
}

export interface IPagination {
  total?: number;
  pageSize?: number;
  pageCount?: number;
  page?: number;
}
