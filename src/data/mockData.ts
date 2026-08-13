import { EBalanceStatus } from "@/types/domain.enums";
import type { IExpense, IMemberBalance } from "@/types/domain.interfaces";

export const balances: IMemberBalance[] = [
  {
    id: "member-1",
    name: "Turjo",
    amount: 3805,
    status: EBalanceStatus.GETS,
  },
  {
    id: "member-2",
    name: "Asif",
    amount: 20,
    status: EBalanceStatus.OWES,
  },
  {
    id: "member-3",
    name: "Sadik",
    amount: 20,
    status: EBalanceStatus.OWES,
  },
  {
    id: "member-4",
    name: "Wardat",
    amount: 1882.5,
    status: EBalanceStatus.OWES,
  },
  {
    id: "member-5",
    name: "Amio",
    amount: 1882.5,
    status: EBalanceStatus.OWES,
  },
];

export const expenses: IExpense[] = [
  {
    id: "expense-1",
    title: "Shawpno groceries",
    date: "2026-01-18",
    amount: 100,
    paidBy: "Turjo",
    participantCount: 5,
  },
  {
    id: "expense-2",
    title: "Hotel booking",
    date: "2026-01-16",
    amount: 5562,
    paidBy: "Turjo",
    participantCount: 6,
  },
  {
    id: "expense-3",
    title: "Lunch",
    date: "2026-01-13",
    amount: 5613,
    paidBy: "Turjo",
    participantCount: 6,
  },
  {
    id: "expense-4",
    title: "Snacks",
    date: "2026-01-07",
    amount: 42,
    paidBy: "Turjo",
    participantCount: 5,
  },
];
