"use client";

import { memo } from "react";

interface BookItemProps {
  id: number;
  title: string;
  styleClassName: string;
  onClick: (id: number) => void;
}

const BookItem = memo(function BookItem({
  id,
  title,
  styleClassName,
  onClick,
}: BookItemProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`inline-block m-1 transition-transform hover:scale-110 active:scale-95 cursor-pointer text-black break-keep ${styleClassName}`}
    >
      {title}
    </button>
  );
});

export default BookItem;
