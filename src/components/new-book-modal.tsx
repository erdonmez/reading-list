"use client";

import { useState } from "react";
import { addBook } from "@/app/action";
import { CreateBookInput } from "@/types/Input";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const [formData, setFormData] = useState<CreateBookInput>({
    title: "",
    author: "",
  });
  const [errors, setErrors] = useState<Partial<CreateBookInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      return;
    }

    if (!formData.author.trim()) {
      setErrors((prev) => ({ ...prev, author: "Author is required" }));
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addBook(formData);

      if (result.success) {
        setFormData({ title: "", author: "" });
        onClose();
      } else {
        setErrors({ title: result.error || "Failed to create book" });
      }

      setIsSubmitting(false);
    } catch {
      setErrors({ title: "An unexpected error occurred" });
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateBookInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-100 transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add New Book</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                errors.title
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter book title"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author *
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                errors.author
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter author name"
              disabled={isSubmitting}
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 font-medium shadow-sm hover:shadow-md"
            >
              {isSubmitting ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
