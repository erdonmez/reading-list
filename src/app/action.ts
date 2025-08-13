"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/service/repository";
import { bookInput } from "@/validation/validator";

export async function addBook(formData: FormData) {
  const parsed = bookInput.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
  });

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.book.create({ data: { ...parsed.data } });

  revalidatePath("/");

  return { ok: true };
}

export async function readBook(id: string) {
  const current = await prisma.book.findUnique({ where: { id } });

  if (!current) return { ok: false, error: "Not found" };

  await prisma.book.update({
    where: { id },
    data: { isRead: !current.isRead },
  });

  revalidatePath("/");

  return { ok: true };
}
