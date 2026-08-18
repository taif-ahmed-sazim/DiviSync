import { describe, expect, it } from "vitest";

import type { IPerson } from "@/types/domain.interfaces";

import { getFriendNameError } from "../AddFriendModal.helpers";

const friends: IPerson[] = [
  { id: "person-2", name: "Asif" },
  { id: "person-6", name: "Nabil" },
];

describe("getFriendNameError", () => {
  it("should reject an empty name", () => {
    expect(getFriendNameError("", friends)).toBe("Friend's name is required");
  });

  it("should reject a name that is only whitespace", () => {
    expect(getFriendNameError("   ", friends)).toBe(
      "Friend's name is required",
    );
  });

  it("should reject a name shorter than the minimum length", () => {
    expect(getFriendNameError("A", friends)).toBe(
      "Name must be at least 2 characters",
    );
  });

  it("should reject a name longer than the maximum length", () => {
    expect(getFriendNameError("a".repeat(51), friends)).toBe(
      "Name must be at most 50 characters",
    );
  });

  it("should reject someone who is already a friend", () => {
    expect(getFriendNameError("Asif", friends)).toBe(
      "This person is already a friend",
    );
  });

  it("should reject an existing friend regardless of casing", () => {
    expect(getFriendNameError("  aSiF  ", friends)).toBe(
      "This person is already a friend",
    );
  });

  it("should accept a new name", () => {
    expect(getFriendNameError("Rifat", friends)).toBeUndefined();
  });
});
