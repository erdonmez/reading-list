"use client";
import { readBook } from "@/app/action";

export default function ReadButton({ id }: { id: string }) {
  return (
    <button
      className="border rounded px-3 py-1 text-sm"
      onClick={() => readBook(id)}
    >
      Read
    </button>
  );
}
