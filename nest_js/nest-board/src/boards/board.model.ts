export interface Board {
  id: string;
  title: string;
  descript: string;
  status: BoardStatus;
}

export enum BoardStatus {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}
