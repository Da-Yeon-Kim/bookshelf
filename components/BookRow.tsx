"use client";
import React from "react";
import { BookRowData } from "@/types/book";

interface BookRowProps {
  rowData: BookRowData;
  onBookClick: (bookId: string) => void;
}

export const BookRow = React.memo(({ rowData, onBookClick }: BookRowProps) => {
  const bookStyle = rowData.styleType === "STYLE2" ? "book-sm" : "book-lg";

  return (
    <div className={`w-91.25 ${bookStyle}`}>
      <div className="flex items-center w-full">
        {rowData.elements.map((el) => {
          const isImage = el.type === "DECO" && typeof el.content !== "string";

          return (
            <div
              key={el.id}
              className={`flex items-center h-full shrink-0 ${
                isImage ? "grow" : ""
              }`}
            >
              {/* 책 제목 */}
              {el.type === "BOOK" && el.bookData ? (
                <button
                  onClick={() => onBookClick(el.bookData!.id)}
                  className={`transition-colors duration-300 hover:opacity-70 whitespace-nowrap px-0 shrink-0
                    ${
                      el.bookData.status === "PROGRESS"
                        ? "text-[#CDC8BC]"
                        : "text-black"
                    }`}
                >
                  {el.bookData.title}
                </button>
              ) : (
                <div
                  className={`flex items-center justify-center
                  ${el.content === "/" ? "w-10" : "w-full"}`}
                >
                  {/* 슬래쉬(/)와 이미지 */}
                  {typeof el.content === "string" ? (
                    <span className="select-none pointer-events-none">
                      {el.content}
                    </span>
                  ) : (
                    <div className="w-full flex p-0 m-0 items-center justify-center object-fit: contain">
                      {el.content}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

BookRow.displayName = "BookRow";
