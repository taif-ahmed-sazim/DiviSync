import { describe, expect, it } from "vitest";

import { ECurrency } from "@/types/domain.enums";
import type { IGroup, IPerson } from "@/types/domain.interfaces";
import {
  createGroup,
  findGroupById,
  resolveGroupMembers,
  resolveNonMembers,
} from "@/utils/group.helpers";

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

describe("resolveNonMembers", () => {
  it("should return the people who are not members", () => {
    expect(resolveNonMembers(people, group)).toEqual([
      { id: "person-2", name: "Asif" },
    ]);
  });

  it("should return an empty list when there is no active group", () => {
    expect(resolveNonMembers(people, null)).toEqual([]);
  });

  it("should return an empty list when everyone is a member", () => {
    const groupWithEveryone: IGroup = {
      ...group,
      memberIds: ["person-1", "person-2", "person-3"],
    };

    expect(resolveNonMembers(people, groupWithEveryone)).toEqual([]);
  });
});

describe("createGroup", () => {
  it("should trim the name and description", () => {
    const created = createGroup({
      name: "  Bali Trip  ",
      description: "  Five days away  ",
      currency: ECurrency.USD,
      memberIds: ["person-1", "person-2"],
    });

    expect(created.name).toBe("Bali Trip");
    expect(created.description).toBe("Five days away");
  });

  it("should keep the chosen currency and members", () => {
    const created = createGroup({
      name: "Bali Trip",
      description: "",
      currency: ECurrency.USD,
      memberIds: ["person-1", "person-2"],
    });

    expect(created.currency).toBe(ECurrency.USD);
    expect(created.memberIds).toEqual(["person-1", "person-2"]);
  });

  it("should give each group its own id", () => {
    const input = {
      name: "Bali Trip",
      description: "",
      currency: ECurrency.USD,
      memberIds: ["person-1", "person-2"],
    };

    expect(createGroup(input).id).not.toBe(createGroup(input).id);
  });
});
