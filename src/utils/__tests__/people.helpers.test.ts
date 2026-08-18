import { describe, expect, it } from "vitest";

import type { IPerson } from "@/types/domain.interfaces";
import { createPerson, findPersonByName } from "@/utils/people.helpers";

const people: IPerson[] = [
  { id: "person-1", name: "Turjo" },
  { id: "person-2", name: "Asif" },
];

describe("createPerson", () => {
  it("should trim the name", () => {
    expect(createPerson("  Nabil  ").name).toBe("Nabil");
  });

  it("should give each person its own id", () => {
    expect(createPerson("Nabil").id).not.toBe(createPerson("Nabil").id);
  });
});

describe("findPersonByName", () => {
  it("should find a person by exact name", () => {
    expect(findPersonByName(people, "Asif")).toEqual({
      id: "person-2",
      name: "Asif",
    });
  });

  it("should ignore case and surrounding whitespace", () => {
    expect(findPersonByName(people, "  aSiF ")).toEqual({
      id: "person-2",
      name: "Asif",
    });
  });

  it("should return null when nobody matches", () => {
    expect(findPersonByName(people, "Nabil")).toBeNull();
  });
});
