import { z } from "zod";

export const createBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  author: z
    .string()
    .trim()
    .min(1, "Author is required")
    .max(255, "Author must be less than 255 characters"),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
