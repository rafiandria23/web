export interface PageInitialProps {
  errorStatus?: number;
  errorMessage?: string;
}

export interface UploadFile {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  previewUrl: string;
  provider: string;
}
