import { describe, expect, it } from "vitest";

import type { IPerson } from "@/types/domain.interfaces";

import {
  buildInitialPersonId,
  getPersonError,
} from "../AddMemberModal.helpers";

const candidates: IPerson[] = [
  { id: "person-2", name: "Asif" },
  { id: "person-3", name: "Sadik" },
];

describe("buildInitialPersonId", () => {
  it("should preselect the first candidate", () => {
    expect(buildInitialPersonId(candidates)).toBe("person-2");
  });

  it("should return an empty id when there are no candidates", () => {
    expect(buildInitialPersonId([])).toBe("");
  });
});

describe("getPersonError", () => {
  it("should accept a candidate", () => {
    expect(getPersonError("person-3", candidates)).toBeUndefined();
  });

  it("should reject someone who is not a candidate", () => {
    expect(getPersonError("person-9", candidates)).toBe(
      "Select a person to add",
    );
  });

  it("should reject an empty selection", () => {
    expect(getPersonError("", candidates)).toBe("Select a person to add");
  });
});
