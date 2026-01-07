"use client";

import { useState, useCallback } from "react";
import { BookRow } from "@/components/BookRow";
import { Book, BookRowData, RowElement, BookStatus } from "@/types/book";
import { getLen } from "@/utils/bookUtils";
import { getRandomImg } from "@/constants/assets";

export default function BookshelfPage() {
  const [rows, setRows] = useState<BookRowData[]>([]); // 배치 끝난 행들
  const [waitRow, setWaitRow] = useState<BookRowData | null>(null); // 배치 대기 행
  const [inputValue, setInputValue] = useState("");

  // 이미지 요소 생성기
  const createImgElement = (width: number): RowElement => ({
    id: `img-${Math.random()}`,
    type: "DECO",
    unitLen: width,
    content: (
      <img
        src={getRandomImg(width)}
        alt=""
        className="w-full h-12 object-contain block opacity-90"
      />
    ),
  });

  // 총합이 9 미만이지만 마감해야 할 때
  const finalizeWaitRow = useCallback((currentRow: BookRowData | null) => {
    if (!currentRow) return;

    let finalElements = [...currentRow.elements];
    const slashUnit = 1;
    const neededForImg = 9 - currentRow.totalLen - slashUnit;
    const side = Math.random() > 0.5 ? "left" : "right";
    const slashEl: RowElement = {
      id: `s-${Math.random()}`,
      type: "DECO",
      content: "/",
      unitLen: 1,
    };

    if (neededForImg > 0) {
      const imgEl = createImgElement(Math.floor(neededForImg));
      if (side === "left") finalElements = [imgEl, slashEl, ...finalElements];
      else finalElements = [...finalElements, slashEl, imgEl];
    } else if (neededForImg === 0) {
      if (side === "left") finalElements = [slashEl, ...finalElements];
      else finalElements = [...finalElements, slashEl];
    }

    setRows((prev) => [
      ...prev,
      {
        ...currentRow,
        elements: finalElements,
        totalLen: 9,
        align: side,
      },
    ]);
    setWaitRow(null);
  }, []);

  const handleBookClick = useCallback((bookId: string) => {
    const updateElements = (elements: RowElement[]): RowElement[] =>
      elements.map((el) => {
        if (el.type === "BOOK" && el.bookData?.id === bookId) {
          const newStatus: BookStatus =
            el.bookData.status === "DONE" ? "PROGRESS" : "DONE";
          return {
            ...el,
            bookData: { ...el.bookData, status: newStatus },
          };
        }
        return el;
      });

    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        elements: updateElements(row.elements),
      }))
    );

    setWaitRow((prev) =>
      prev
        ? {
            ...prev,
            elements: updateElements(prev.elements),
          }
        : null
    );
  }, []);

  // 인풋 통해 책 제목 추가할 때
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const title = inputValue.trim();
    if (!title) return;

    const len = getLen(title);
    const newBook: Book = {
      id: `book-${Date.now()}`,
      title,
      status: "PROGRESS",
      len,
    };

    if (len > 9) {
      if (waitRow) finalizeWaitRow(waitRow);
      setRows((prev) => [
        ...prev,
        {
          id: `row-${Date.now()}`,
          elements: [
            {
              id: `el-${Date.now()}`,
              type: "BOOK",
              bookData: newBook,
              unitLen: 9,
            },
          ],
          styleType: "STYLE2",
          totalLen: 9,
          align: Math.random() > 0.5 ? "left" : "right",
        },
      ]);
    } else if (len === 9) {
      if (waitRow) finalizeWaitRow(waitRow);
      setRows((prev) => [
        ...prev,
        {
          id: `row-${Date.now()}`,
          elements: [
            {
              id: `el-${Date.now()}`,
              type: "BOOK",
              bookData: newBook,
              unitLen: 9,
            },
          ],
          styleType: "STYLE1",
          totalLen: 9,
        },
      ]);
    } else {
      if (!waitRow) {
        setWaitRow({
          id: `row-${Date.now()}`,
          elements: [
            {
              id: `el-${Date.now()}`,
              type: "BOOK",
              bookData: newBook,
              unitLen: len,
            },
          ],
          styleType: "STYLE1",
          totalLen: len,
        });
      } else {
        const slashUnit = 1;
        const newTotal = waitRow.totalLen + slashUnit + len;
        if (
          newTotal > 9 ||
          waitRow.elements.filter((el) => el.type === "BOOK").length >= 3
        ) {
          finalizeWaitRow(waitRow);
          setWaitRow({
            id: `row-${Date.now()}`,
            elements: [
              {
                id: `el-${Date.now()}`,
                type: "BOOK",
                bookData: newBook,
                unitLen: len,
              },
            ],
            styleType: "STYLE1",
            totalLen: len,
          });
        } else {
          setWaitRow((prev) =>
            prev
              ? {
                  ...prev,
                  elements: [
                    ...prev.elements,
                    {
                      id: `s-${Date.now()}`,
                      type: "DECO",
                      content: "/",
                      unitLen: 1,
                    },
                    {
                      id: `b-${Date.now()}`,
                      type: "BOOK",
                      bookData: newBook,
                      unitLen: len,
                    },
                  ],
                  totalLen: prev.totalLen + slashUnit + len,
                }
              : null
          );
        }
      }
    }
    setInputValue("");
  };

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-black flex flex-col items-center">
      <div className="w-91.25 flex-1 flex flex-col overflow-y-auto pb-40 pt-10 scrollbar-hide">
        {rows.map((row) => (
          <BookRow key={row.id} rowData={row} onBookClick={handleBookClick} />
        ))}
        {waitRow && <BookRow rowData={waitRow} onBookClick={handleBookClick} />}
      </div>

      <div className="fixed bottom-0 w-91.25 p-6 bg-linear-to-t from-[#FDFCF0] via-[#FDFCF0] to-transparent">
        <form
          onSubmit={handleAddBook}
          className="flex gap-2 border-b border-black pb-1"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent py-2 focus:outline-none text-base"
            placeholder="책 제목을 입력해주세요"
          />
          <button type="submit" className="text-3xl">
            +
          </button>
        </form>
      </div>
    </main>
  );
}
