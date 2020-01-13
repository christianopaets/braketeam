export interface ILefrecceSearchParams {
  origin: string;
  destination: string;
  arflag: 'A' | 'R';
  adate: string;
  atime: string;
  offset: string;
  adultno: string;
  childno: string;
  direction: 'A' | 'R';
  frecce: string;
  onlyRegional: string;
  rdate: string;
  rtime: string;
  codeList: string;
}
