import type {
  EBalanceStatus,
  ECurrency,
  ESplitMode,
} from "@/types/domain.enums";

export interface IPerson {
  id: string;
  name: string;
}

export interface IGroup {
  id: string;
  name: string;
  description: string;
  currency: ECurrency;
  memberIds: string[];
}

export interface ICreateGroupInput {
  name: string;
  description: string;
  currency: ECurrency;
  memberIds: string[];
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
  splitMode: ESplitMode;
  shares: IExpenseShare[];
}

export interface ISettlement {
  id: string;
  date: string;
  amount: number;
  fromMemberId: string;
  toMemberId: string;
}

export interface ICreateExpenseInput {
  title: string;
  amount: number;
  paidById: string;
  participantIds: string[];
  splitMode: ESplitMode;
  shares: IExpenseShare[];
}

export interface ICreateSettlementInput {
  amount: number;
  fromMemberId: string;
  toMemberId: string;
}
