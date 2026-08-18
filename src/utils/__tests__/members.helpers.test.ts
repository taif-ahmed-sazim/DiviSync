import { describe, expect, it } from "vitest";

import { EBalanceStatus, ESplitMode } from "@/types/domain.enums";
import type {
  IExpense,
  IMemberBalance,
  IPerson,
  ISettlement,
} from "@/types/domain.interfaces";
import {
  buildMemberNamesSummary,
  findMemberName,
  getMemberRemovalError,
  hasLedgerHistory,
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

const expense: IExpense = {
  id: "expense-1",
  groupId: "group-1",
  title: "Lunch",
  date: "2026-01-13",
  amount: 60,
  paidById: "person-2",
  participantIds: ["person-2", "person-3"],
  splitMode: ESplitMode.EQUAL,
  shares: [
    { memberId: "person-2", amount: 30 },
    { memberId: "person-3", amount: 30 },
  ],
};

const settlement: ISettlement = {
  id: "settlement-1",
  groupId: "group-1",
  date: "2026-01-20",
  amount: 30,
  fromMemberId: "person-3",
  toMemberId: "person-2",
};

const settledBalance: IMemberBalance = {
  id: "person-4",
  name: "Wardat",
  amount: 0,
  status: EBalanceStatus.SETTLED,
};

describe("hasLedgerHistory", () => {
  it("should detect a member who paid for an expense", () => {
    expect(hasLedgerHistory("person-2", [expense], [])).toBe(true);
  });

  it("should detect a member who took part in an expense", () => {
    expect(hasLedgerHistory("person-3", [expense], [])).toBe(true);
  });

  it("should detect a member who sent a settlement", () => {
    expect(hasLedgerHistory("person-3", [], [settlement])).toBe(true);
  });

  it("should detect a member who received a settlement", () => {
    expect(hasLedgerHistory("person-2", [], [settlement])).toBe(true);
  });

  it("should return false for a member with no history", () => {
    expect(hasLedgerHistory("person-4", [expense], [settlement])).toBe(false);
  });
});

describe("getMemberRemovalError", () => {
  it("should refuse to remove the current user", () => {
    expect(getMemberRemovalError("person-1", [], [], [])).toBe(
      "You cannot remove yourself from a group",
    );
  });

  it("should refuse to remove a member who is owed money", () => {
    const owedBalance: IMemberBalance = {
      id: "person-2",
      name: "Asif",
      amount: 30,
      status: EBalanceStatus.GETS,
    };

    expect(getMemberRemovalError("person-2", [owedBalance], [], [])).toBe(
      "Settle this member's balance before removing them",
    );
  });

  it("should refuse to remove a member who owes money", () => {
    const owingBalance: IMemberBalance = {
      id: "person-3",
      name: "Sadik",
      amount: 30,
      status: EBalanceStatus.OWES,
    };

    expect(getMemberRemovalError("person-3", [owingBalance], [], [])).toBe(
      "Settle this member's balance before removing them",
    );
  });

  it("should refuse to remove a settled member who appears in an expense", () => {
    const balance: IMemberBalance = {
      id: "person-2",
      name: "Asif",
      amount: 0,
      status: EBalanceStatus.SETTLED,
    };

    expect(getMemberRemovalError("person-2", [balance], [expense], [])).toBe(
      "Members with expense history cannot be removed",
    );
  });

  it("should allow removing a settled member with no history", () => {
    expect(
      getMemberRemovalError("person-4", [settledBalance], [expense], [settlement]),
    ).toBeUndefined();
  });

  it("should allow removing a member who has no balance entry yet", () => {
    expect(getMemberRemovalError("person-9", [], [], [])).toBeUndefined();
  });
});
