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

export interface IMemberRow {
  balance: IMemberBalance;
  removalError?: string;
}

export interface IExpenseShare {
  memberId: string;
  amount: number;
}

export interface IExpense {
  id: string;
  groupId: string;
  title: string;
  date: string;
  amount: number;
  paidById: string;
  participantIds: string[];
  splitMode: ESplitMode;
  shares: IExpenseShare[];
}

export interface IDirectExpense {
  id: string;
  friendId: string;
  title: string;
  date: string;
  amount: number;
  paidById: string;
  shares: IExpenseShare[];
}

export interface ISettlement {
  id: string;
  groupId: string;
  date: string;
  amount: number;
  fromMemberId: string;
  toMemberId: string;
}

export interface ICreateExpenseInput {
  groupId: string;
  title: string;
  amount: number;
  paidById: string;
  participantIds: string[];
  splitMode: ESplitMode;
  shares: IExpenseShare[];
}

export interface ICreateSettlementInput {
  groupId: string;
  amount: number;
  fromMemberId: string;
  toMemberId: string;
}
