"use client";

import { useState, useCallback } from "react";
import BookItem from "@/components/BookItem";
import {
  FONT_VARIANTS,
  SIZE_VARIANTS,
  WEIGHT_VARIANTS,
  ROTATION_VARIANTS,
} from "@/constants/styles";

interface Book {
  id: number;
  title: string;
  style: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getRandomStyle = () => {
    const f = FONT_VARIANTS[Math.floor(Math.random() * FONT_VARIANTS.length)];
    const s = SIZE_VARIANTS[Math.floor(Math.random() * SIZE_VARIANTS.length)];
    const w =
      WEIGHT_VARIANTS[Math.floor(Math.random() * WEIGHT_VARIANTS.length)];
    const r =
      ROTATION_VARIANTS[Math.floor(Math.random() * ROTATION_VARIANTS.length)];
    return `${f} ${s} ${w} ${r}`;
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newBook: Book = {
      id: Date.now(),
      title: inputValue,
      style: getRandomStyle(),
    };

    setBooks((prev) => [...prev, newBook]);
    setInputValue("");
  };

  const handleBookClick = useCallback((id: number) => {
    console.log(`클릭된 아이템 ID: ${id}`);
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-black flex flex-col relative overflow-hidden">
      <div className="flex-1 flex flex-wrap items-center justify-center content-center p-4 pb-32 overflow-y-auto">
        {books.length === 0 && (
          <div className="text-center opacity-20 select-none">
            <p className="text-lg font-serif italic">
              나만의 서재를 채워보세요
            </p>
          </div>
        )}

        {books.map((book) => (
          <BookItem
            key={book.id}
            id={book.id}
            title={book.title}
            styleClassName={book.style}
            onClick={handleBookClick}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-8 bg-linear-to-t from-[#FDFCF0] via-[#FDFCF0] to-transparent">
        <form
          onSubmit={handleAddBook}
          className="max-w-md mx-auto flex items-center gap-4 border-b border-black/30 pb-2 focus-within:border-black transition-colors"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="읽은 책의 제목을 입력하세요..."
            className="flex-1 bg-transparent py-2 focus:outline-none placeholder:text-black/20 font-serif"
          />
          <button
            type="submit"
            className="text-3xl font-medium tracking-widest hover:opacity-50 transition-opacity"
          >
            +
          </button>
        </form>
      </div>
    </main>
  );
}
