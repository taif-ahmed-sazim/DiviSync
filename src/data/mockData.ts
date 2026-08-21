import { EBalanceStatus } from "@/types/domain.enums";
import type {
  IExpense,
  IGroupMember,
  IMemberBalance,
} from "@/types/domain.interfaces";

export const members: IGroupMember[] = [
  { id: "member-1", name: "Turjo" },
  { id: "member-2", name: "Asif" },
  { id: "member-3", name: "Sadik" },
  { id: "member-4", name: "Wardat" },
  { id: "member-5", name: "Amio" },
];

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
    paidById: "member-1",
    participantIds: ["member-1", "member-2", "member-3", "member-4", "member-5"],
    shares: [
      { memberId: "member-1", amount: 20 },
      { memberId: "member-2", amount: 20 },
      { memberId: "member-3", amount: 20 },
      { memberId: "member-4", amount: 20 },
      { memberId: "member-5", amount: 20 },
    ],
  },
  {
    id: "expense-2",
    title: "Hotel booking",
    date: "2026-01-16",
    amount: 5562,
    paidById: "member-1",
    participantIds: ["member-1", "member-2", "member-3", "member-4", "member-5"],
    shares: [
      { memberId: "member-1", amount: 1112.4 },
      { memberId: "member-2", amount: 1112.4 },
      { memberId: "member-3", amount: 1112.4 },
      { memberId: "member-4", amount: 1112.4 },
      { memberId: "member-5", amount: 1112.4 },
    ],
  },
  {
    id: "expense-3",
    title: "Lunch",
    date: "2026-01-13",
    amount: 5613,
    paidById: "member-4",
    participantIds: ["member-1", "member-2", "member-3", "member-4"],
    shares: [
      { memberId: "member-1", amount: 1403.25 },
      { memberId: "member-2", amount: 1403.25 },
      { memberId: "member-3", amount: 1403.25 },
      { memberId: "member-4", amount: 1403.25 },
    ],
  },
  {
    id: "expense-4",
    title: "Snacks",
    date: "2026-01-07",
    amount: 42,
    paidById: "member-2",
    participantIds: ["member-1", "member-2", "member-3"],
    shares: [
      { memberId: "member-1", amount: 14 },
      { memberId: "member-2", amount: 14 },
      { memberId: "member-3", amount: 14 },
    ],
  },
];
