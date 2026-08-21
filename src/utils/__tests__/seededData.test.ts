import { describe, expect, it } from "vitest";

import {
  directExpenses,
  expenses,
  friendIds,
  groups,
  people,
  settlements,
} from "@/data/mockData";
import { EBalanceStatus } from "@/types/domain.enums";
import { calculateMemberBalances } from "@/utils/balances.helpers";
import {
  calculateFriendBalances,
  resolveFriends,
} from "@/utils/friends.helpers";
import { resolveGroupMembers } from "@/utils/group.helpers";

const SETTLED_TOLERANCE = 0.01;

function signedAmount(status: EBalanceStatus, amount: number): number {
  if (status === EBalanceStatus.GETS) {
    return amount;
  }

  if (status === EBalanceStatus.OWES) {
    return -amount;
  }

  return 0;
}

describe("seeded groups", () => {
  it("should resolve every member id to a known person", () => {
    groups.forEach((group) => {
      const members = resolveGroupMembers(people, group);

      expect(members.length).toBe(group.memberIds.length);
    });
  });

  it("should keep each group's balances summing to zero", () => {
    groups.forEach((group) => {
      const members = resolveGroupMembers(people, group);
      const groupExpenses = expenses.filter(
        (expense) => expense.groupId === group.id,
      );
      const groupSettlements = settlements.filter(
        (settlement) => settlement.groupId === group.id,
      );

      const total = calculateMemberBalances(
        members,
        groupExpenses,
        groupSettlements,
      ).reduce(
        (sum, balance) => sum + signedAmount(balance.status, balance.amount),
        0,
      );

      expect(Math.abs(total)).toBeLessThan(SETTLED_TOLERANCE);
    });
  });

  it("should give every group at least one expense", () => {
    groups.forEach((group) => {
      const groupExpenses = expenses.filter(
        (expense) => expense.groupId === group.id,
      );

      expect(groupExpenses.length).toBeGreaterThan(0);
    });
  });
});

describe("seeded friends", () => {
  it("should report the friend as owed when they paid more", () => {
    const friends = resolveFriends(people, friendIds);
    const balances = calculateFriendBalances(friends, directExpenses);

    const nabil = balances.find((balance) => balance.name === "Nabil");

    expect(nabil?.status).toBe(EBalanceStatus.GETS);
    expect(nabil?.amount).toBe(15);
  });

  it("should net direct expenses that run in both directions", () => {
    const friends = resolveFriends(people, friendIds);
    const balances = calculateFriendBalances(friends, directExpenses);

    const asif = balances.find((balance) => balance.name === "Asif");

    expect(asif?.status).toBe(EBalanceStatus.GETS);
    expect(asif?.amount).toBe(10);
  });

  it("should report a friend with no direct expenses as settled", () => {
    const friends = resolveFriends(people, friendIds);
    const balances = calculateFriendBalances(friends, directExpenses);

    const rifat = balances.find((balance) => balance.name === "Rifat");

    expect(rifat?.status).toBe(EBalanceStatus.SETTLED);
    expect(rifat?.amount).toBe(0);
  });
});
