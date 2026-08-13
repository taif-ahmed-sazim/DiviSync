import type { EBalanceStatus } from "@/types/domain.enums";

export interface IMemberBalance {
  id: string;
  name: string;
  amount: number;
  status: EBalanceStatus;
}

export interface IExpense {
  id: string;
  title: string;
  date: string;
  amount: number;
  paidBy: string;
  participantCount: number;
}

export interface ICreateExpenseInput {
  title: string;
  amount: number;
}
