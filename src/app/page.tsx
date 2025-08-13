import { Suspense } from "react";
import BookList from "@/components/book-list";
import AddBookButton from "@/components/new-book-button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📚 Reading List
          </h1>
          <p className="text-lg text-gray-600">
            Track your reading progress and discover new books
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            Manage your personal library
          </div>
          <AddBookButton />
        </div>

        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading your books...</p>
            </div>
          }
        >
          <BookList />
        </Suspense>
      </div>
    </div>
  );
}
