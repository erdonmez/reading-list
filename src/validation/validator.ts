import { z } from "zod";

export const bookInput = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
});

export type BookInput = z.infer<typeof bookInput>;
