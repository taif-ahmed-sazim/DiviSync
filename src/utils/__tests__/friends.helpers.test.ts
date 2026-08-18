import { describe, expect, it } from "vitest";

import { EBalanceStatus } from "@/types/domain.enums";
import type { IDirectExpense, IPerson } from "@/types/domain.interfaces";
import {
  calculateFriendBalances,
  calculateFriendNetCents,
  resolveFriends,
} from "@/utils/friends.helpers";

const people: IPerson[] = [
  { id: "person-1", name: "Turjo" },
  { id: "person-2", name: "Asif" },
  { id: "person-6", name: "Nabil" },
];

const paidByCurrentUser: IDirectExpense = {
  id: "direct-1",
  friendId: "person-2",
  title: "Dinner",
  date: "2026-01-19",
  amount: 40,
  paidById: "person-1",
  shares: [
    { memberId: "person-1", amount: 20 },
    { memberId: "person-2", amount: 20 },
  ],
};

const paidByFriend: IDirectExpense = {
  id: "direct-2",
  friendId: "person-2",
  title: "Movie tickets",
  date: "2026-01-24",
  amount: 60,
  paidById: "person-2",
  shares: [
    { memberId: "person-1", amount: 30 },
    { memberId: "person-2", amount: 30 },
  ],
};

describe("resolveFriends", () => {
  it("should return only the people listed as friends", () => {
    expect(resolveFriends(people, ["person-2"])).toEqual([
      { id: "person-2", name: "Asif" },
    ]);
  });

  it("should return an empty list when there are no friends", () => {
    expect(resolveFriends(people, [])).toEqual([]);
  });
});

describe("calculateFriendNetCents", () => {
  it("should be positive when the friend owes the current user", () => {
    expect(calculateFriendNetCents("person-2", [paidByCurrentUser])).toBe(2000);
  });

  it("should be negative when the current user owes the friend", () => {
    expect(calculateFriendNetCents("person-2", [paidByFriend])).toBe(-3000);
  });

  it("should net expenses in both directions", () => {
    expect(
      calculateFriendNetCents("person-2", [paidByCurrentUser, paidByFriend]),
    ).toBe(-1000);
  });

  it("should ignore expenses belonging to another friend", () => {
    expect(calculateFriendNetCents("person-6", [paidByCurrentUser])).toBe(0);
  });

  it("should be zero when there are no direct expenses", () => {
    expect(calculateFriendNetCents("person-2", [])).toBe(0);
  });
});

describe("calculateFriendBalances", () => {
  it("should report a friend who owes the current user", () => {
    const [balance] = calculateFriendBalances(
      [people[1]],
      [paidByCurrentUser],
    );

    expect(balance.status).toBe(EBalanceStatus.GETS);
    expect(balance.amount).toBe(20);
  });

  it("should report a friend the current user owes", () => {
    const [balance] = calculateFriendBalances([people[1]], [paidByFriend]);

    expect(balance.status).toBe(EBalanceStatus.OWES);
    expect(balance.amount).toBe(30);
  });

  it("should report a settled friend with no direct expenses", () => {
    const [balance] = calculateFriendBalances([people[2]], []);

    expect(balance.status).toBe(EBalanceStatus.SETTLED);
    expect(balance.amount).toBe(0);
  });
});
