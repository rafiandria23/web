export interface IPageInitialProps {
  errorStatus?: number;
  errorMessage?: string;
}

export interface IPagination {
  total: number;
  pageSize: number;
  pageCount: number;
  page: number;
}
