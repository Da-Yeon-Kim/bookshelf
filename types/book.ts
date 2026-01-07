export type BookStatus = "PROGRESS" | "DONE";

export interface Book {
  id: string;
  title: string;
  status: BookStatus;
  len: number;
}

export interface RowElement {
  id: string;
  type: "BOOK" | "DECO";
  content?: React.ReactNode; // 이미지 또는 "/"
  bookData?: Book;
  unitLen: number; // 해당 요소가 차지하는 너비 (1, 2, 0.5 등)
}

export interface BookRowData {
  id: string;
  elements: RowElement[];
  styleType: "STYLE1" | "STYLE2";
  totalLen: number; // 현재 행의 총 유닛 합계 (최대 9)
  align?: "left" | "right"; // 정렬 방향을 고정하기 위한 속성 추가
}
