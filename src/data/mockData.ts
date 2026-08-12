import type { Expense, MemberBalance } from "../types/domain";

export const balances: MemberBalance[] = [
  {
    id: "member-1",
    name: "Turjo",
    amount: 3805,
    status: "gets",
  },
  {
    id: "member-2",
    name: "Asif",
    amount: 20,
    status: "owes",
  },
  {
    id: "member-3",
    name: "Sadik",
    amount: 20,
    status: "owes",
  },
  {
    id: "member-4",
    name: "Wardat",
    amount: 1882.5,
    status: "owes",
  },
  {
    id: "member-5",
    name: "Amio",
    amount: 1882.5,
    status: "owes",
  },
];

export const expenses: Expense[] = [
  {
    id: "expense-1",
    title: "Shawpno groceries",
    date: "Jan 18",
    amount: 100,
    paidBy: "Turjo",
    participantCount: 5,
  },
  {
    id: "expense-2",
    title: "Hotel booking",
    date: "Jan 16",
    amount: 5562,
    paidBy: "Turjo",
    participantCount: 6,
  },
  {
    id: "expense-3",
    title: "Lunch",
    date: "Jan 13",
    amount: 5613,
    paidBy: "Turjo",
    participantCount: 6,
  },
  {
    id: "expense-4",
    title: "Snacks",
    date: "Jan 7",
    amount: 42,
    paidBy: "Turjo",
    participantCount: 5,
  },
];
