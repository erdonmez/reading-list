"use client";

import { useState } from "react";
import { Book } from "@/types/Book";
import { toggleBookReadStatus } from "@/app/action";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      const result = await toggleBookReadStatus(book.id);

      if (!result.success) {
        console.error("Failed to mark book read status:", result.error);
      }
    } catch (error) {
      console.error("Error marking book status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
        book.isRead
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg mb-1 ${
              book.isRead ? "text-green-800 line-through" : "text-gray-900"
            }`}
          >
            {book.title}
          </h3>
          <p
            className={`text-sm ${
              book.isRead ? "text-green-600" : "text-gray-600"
            }`}
          >
            by {book.author}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                book.isRead
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {book.isRead ? "Read" : "Unread"}
            </span>
            <span className="text-xs text-gray-400">
              Added {new Date(book.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={handleToggle}
            disabled={isUpdating}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              book.isRead
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            } disabled:opacity-50`}
          >
            {isUpdating ? "..." : book.isRead ? "Mark Unread" : "Mark Read"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
