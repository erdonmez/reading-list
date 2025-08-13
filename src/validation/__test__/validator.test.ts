import { describe, it, expect } from "vitest";
import { createBookSchema } from "../validator";

describe("Validation Schemas", () => {
  describe("createBookSchema", () => {
    it("should validate valid book data", () => {
      const validData = {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
      };

      const result = createBookSchema.safeParse(validData);

      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("should reject empty title", () => {
      const invalidData = {
        title: "",
        author: "F. Scott Fitzgerald",
      };

      const result = createBookSchema.safeParse(invalidData);

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Title is required");
      } else {
        expect(result.data).toEqual(invalidData);
      }
    });

    it("should reject empty author", () => {
      const invalidData = {
        title: "The Great Gatsby",
        author: "",
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Author is required");
      }
    });

    it("should reject title that is too long", () => {
      const invalidData = {
        title: "A".repeat(256),
        author: "F. Scott Fitzgerald",
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Title must be less than 255 characters"
        );
      }
    });

    it("should reject author that is too long", () => {
      const invalidData = {
        title: "The Great Gatsby",
        author: "A".repeat(256),
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Author must be less than 255 characters"
        );
      }
    });
  });
});
