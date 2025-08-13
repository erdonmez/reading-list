import { getBooks } from "@/app/action";
import BookCard from "./book-card";
import { Book } from "@/types/Book";

export default async function BookList() {
  const result = await getBooks();

  if (!result.success) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">
          <svg
            className="w-12 h-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Error Loading Books
        </h3>
        <p className="text-gray-600">{result.error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const books: Book[] = result.data || [];

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No books yet</h3>
        <p className="text-gray-600 mb-4">
          Start building your reading list by adding your first book!
        </p>
      </div>
    );
  }

  const readBooks = books.filter((book) => book.isRead);
  const unreadBooks = books.filter((book) => !book.isRead);

  return (
    <div className="space-y-8">
      {unreadBooks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            To Read ({unreadBooks.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {unreadBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}

      {readBooks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Completed ({readBooks.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {readBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
