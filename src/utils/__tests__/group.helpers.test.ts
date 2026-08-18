import { describe, expect, it } from "vitest";

import { ECurrency } from "@/types/domain.enums";
import type { IGroup, IPerson } from "@/types/domain.interfaces";
import { findGroupById, resolveGroupMembers } from "@/utils/group.helpers";

const people: IPerson[] = [
  { id: "person-1", name: "Turjo" },
  { id: "person-2", name: "Asif" },
  { id: "person-3", name: "Sadik" },
];

const group: IGroup = {
  id: "group-1",
  name: "Gamer Bros",
  description: "Weekend gaming",
  currency: ECurrency.BDT,
  memberIds: ["person-1", "person-3"],
};

describe("findGroupById", () => {
  it("should return the matching group", () => {
    expect(findGroupById([group], "group-1")).toBe(group);
  });

  it("should return null when no group matches", () => {
    expect(findGroupById([group], "group-9")).toBeNull();
  });
});

describe("resolveGroupMembers", () => {
  it("should return only the people listed as members", () => {
    expect(resolveGroupMembers(people, group)).toEqual([
      { id: "person-1", name: "Turjo" },
      { id: "person-3", name: "Sadik" },
    ]);
  });

  it("should return an empty list when there is no active group", () => {
    expect(resolveGroupMembers(people, null)).toEqual([]);
  });

  it("should ignore member ids that have no matching person", () => {
    const groupWithMissingPerson: IGroup = {
      ...group,
      memberIds: ["person-1", "person-404"],
    };

    expect(resolveGroupMembers(people, groupWithMissingPerson)).toEqual([
      { id: "person-1", name: "Turjo" },
    ]);
  });
});
