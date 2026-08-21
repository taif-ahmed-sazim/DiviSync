import { ECurrency, ESplitMode } from "@/types/domain.enums";
import type {
  IDirectExpense,
  IExpense,
  IGroup,
  IPerson,
  ISettlement,
} from "@/types/domain.interfaces";

export const people: IPerson[] = [
  { id: "person-1", name: "Turjo" },
  { id: "person-2", name: "Asif" },
  { id: "person-3", name: "Sadik" },
  { id: "person-4", name: "Wardat" },
  { id: "person-5", name: "Amio" },
  { id: "person-6", name: "Nabil" },
  { id: "person-7", name: "Rifat" },
];

export const friendIds: string[] = [
  "person-2",
  "person-3",
  "person-6",
  "person-7",
];

export const groups: IGroup[] = [
  {
    id: "group-1",
    name: "Gamer Bros",
    description: "Weekend gaming sessions and snack runs",
    currency: ECurrency.BDT,
    memberIds: ["person-1", "person-2", "person-3", "person-4", "person-5"],
  },
  {
    id: "group-2",
    name: "Bali Trip",
    description: "Five days in Bali, splitting everything",
    currency: ECurrency.USD,
    memberIds: ["person-1", "person-2", "person-4"],
  },
  {
    id: "group-3",
    name: "Asif's Birthday",
    description: "Surprise dinner and cake",
    currency: ECurrency.BDT,
    memberIds: ["person-1", "person-2", "person-3"],
  },
];

export const expenses: IExpense[] = [
  {
    id: "expense-1",
    groupId: "group-1",
    title: "Shawpno groceries",
    date: "2026-01-18",
    amount: 100,
    paidById: "person-1",
    participantIds: ["person-1", "person-2", "person-3", "person-4", "person-5"],
    splitMode: ESplitMode.EQUAL,
    shares: [
      { memberId: "person-1", amount: 20 },
      { memberId: "person-2", amount: 20 },
      { memberId: "person-3", amount: 20 },
      { memberId: "person-4", amount: 20 },
      { memberId: "person-5", amount: 20 },
    ],
  },
  {
    id: "expense-2",
    groupId: "group-1",
    title: "Hotel booking",
    date: "2026-01-16",
    amount: 5562,
    paidById: "person-1",
    participantIds: ["person-1", "person-2", "person-3", "person-4", "person-5"],
    splitMode: ESplitMode.EQUAL,
    shares: [
      { memberId: "person-1", amount: 1112.4 },
      { memberId: "person-2", amount: 1112.4 },
      { memberId: "person-3", amount: 1112.4 },
      { memberId: "person-4", amount: 1112.4 },
      { memberId: "person-5", amount: 1112.4 },
    ],
  },
  {
    id: "expense-3",
    groupId: "group-1",
    title: "Lunch",
    date: "2026-01-13",
    amount: 5613,
    paidById: "person-4",
    participantIds: ["person-1", "person-2", "person-3", "person-4"],
    splitMode: ESplitMode.EQUAL,
    shares: [
      { memberId: "person-1", amount: 1403.25 },
      { memberId: "person-2", amount: 1403.25 },
      { memberId: "person-3", amount: 1403.25 },
      { memberId: "person-4", amount: 1403.25 },
    ],
  },
  {
    id: "expense-4",
    groupId: "group-1",
    title: "Snacks",
    date: "2026-01-07",
    amount: 42,
    paidById: "person-2",
    participantIds: ["person-1", "person-2", "person-3"],
    splitMode: ESplitMode.EQUAL,
    shares: [
      { memberId: "person-1", amount: 14 },
      { memberId: "person-2", amount: 14 },
      { memberId: "person-3", amount: 14 },
    ],
  },
  {
    id: "expense-5",
    groupId: "group-2",
    title: "Flight tickets",
    date: "2026-01-22",
    amount: 900,
    paidById: "person-1",
    participantIds: ["person-1", "person-2", "person-4"],
    splitMode: ESplitMode.EQUAL,
    shares: [
      { memberId: "person-1", amount: 300 },
      { memberId: "person-2", amount: 300 },
      { memberId: "person-4", amount: 300 },
    ],
  },
  {
    id: "expense-6",
    groupId: "group-2",
    title: "Villa stay",
    date: "2026-01-23",
    amount: 600,
    paidById: "person-2",
    participantIds: ["person-1", "person-2", "person-4"],
    splitMode: ESplitMode.EQUAL,
    shares: [
      { memberId: "person-1", amount: 200 },
      { memberId: "person-2", amount: 200 },
      { memberId: "person-4", amount: 200 },
    ],
  },
  {
    id: "expense-7",
    groupId: "group-3",
    title: "Birthday cake",
    date: "2026-01-25",
    amount: 1500,
    paidById: "person-3",
    participantIds: ["person-1", "person-2", "person-3"],
    splitMode: ESplitMode.EQUAL,
    shares: [
      { memberId: "person-1", amount: 500 },
      { memberId: "person-2", amount: 500 },
      { memberId: "person-3", amount: 500 },
    ],
  },
];

export const settlements: ISettlement[] = [
  {
    id: "settlement-1",
    groupId: "group-1",
    date: "2026-01-20",
    amount: 500,
    fromMemberId: "person-5",
    toMemberId: "person-1",
  },
  {
    id: "settlement-2",
    groupId: "group-2",
    date: "2026-01-24",
    amount: 100,
    fromMemberId: "person-4",
    toMemberId: "person-1",
  },
];

export const directExpenses: IDirectExpense[] = [
  {
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
  },
  {
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
  },
  {
    id: "direct-3",
    friendId: "person-6",
    title: "Coffee",
    date: "2026-01-21",
    amount: 30,
    paidById: "person-6",
    shares: [
      { memberId: "person-1", amount: 15 },
      { memberId: "person-6", amount: 15 },
    ],
  },
];
