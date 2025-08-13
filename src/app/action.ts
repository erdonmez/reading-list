"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/service/repository";
import { CreateBookInput, createBookSchema } from "@/validation/validator";

export async function addBook(createBookInput: CreateBookInput) {
  try {
    const validatedData = createBookSchema.parse(createBookInput);

    const book = await prisma.book.create({
      data: validatedData,
    });

    revalidatePath("/");

    return { success: true, data: book };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create book" };
  }
}

export async function readBook(id: string) {
  try {
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      return { success: false, error: "Book not found" };
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: { isRead: true },
    });

    revalidatePath("/");

    return { success: true, data: updatedBook };
  } catch (error) {
    console.error("Error marking book read status:", error);
    return { success: false, error: "Failed to update book" };
  }
}
