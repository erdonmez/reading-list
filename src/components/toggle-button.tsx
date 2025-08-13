"use client";
import React from "react";
import { toggleBookReadStatus } from "@/app/action";

export default function ToggleButton({ id }: { id: string }) {
  return (
    <button
      className="border rounded px-3 py-1 text-sm"
      onClick={() => toggleBookReadStatus(id)}
    >
      Read
    </button>
  );
}
