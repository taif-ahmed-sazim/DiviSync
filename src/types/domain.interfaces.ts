import type { EBalanceStatus } from "@/types/domain.enums";

export interface IGroupMember {
  id: string;
  name: string;
}

export interface IMemberBalance {
  id: string;
  name: string;
  amount: number;
  status: EBalanceStatus;
}

export interface IExpenseShare {
  memberId: string;
  amount: number;
}

export interface IExpense {
  id: string;
  title: string;
  date: string;
  amount: number;
  paidById: string;
  participantIds: string[];
  shares: IExpenseShare[];
}

export interface ICreateExpenseInput {
  title: string;
  amount: number;
  paidById: string;
  participantIds: string[];
  shares: IExpenseShare[];
}
