import { describe, expect, it } from "vitest";

import type { IPerson } from "@/types/domain.interfaces";
import {
  buildMemberNamesSummary,
  findMemberName,
} from "@/utils/members.helpers";

const people: IPerson[] = [
  { id: "person-1", name: "Turjo" },
  { id: "person-2", name: "Asif" },
  { id: "person-3", name: "Sadik" },
];

describe("findMemberName", () => {
  it("should return the name of the matching member", () => {
    expect(findMemberName(people, "person-2")).toBe("Asif");
  });

  it("should fall back to a placeholder when the member is missing", () => {
    expect(findMemberName(people, "person-404")).toBe("Unknown member");
  });
});

describe("buildMemberNamesSummary", () => {
  it("should join the last two names with and", () => {
    expect(buildMemberNamesSummary(people)).toBe("Turjo, Asif and Sadik");
  });

  it("should return the single name on its own", () => {
    expect(buildMemberNamesSummary([people[0]])).toBe("Turjo");
  });

  it("should join exactly two names with and", () => {
    expect(buildMemberNamesSummary([people[0], people[1]])).toBe(
      "Turjo and Asif",
    );
  });

  it("should show a placeholder when there are no members", () => {
    expect(buildMemberNamesSummary([])).toBe("No members yet");
  });
});
