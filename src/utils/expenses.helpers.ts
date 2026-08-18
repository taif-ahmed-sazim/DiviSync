import dayjs from "dayjs";

import type { ICreateExpenseInput, IExpense } from "@/types/domain.interfaces";

const ISO_DATE_FORMAT = "YYYY-MM-DD";

export function createExpense(input: ICreateExpenseInput): IExpense {
  return {
    id: crypto.randomUUID(),
    groupId: input.groupId,
    title: input.title,
    date: dayjs().format(ISO_DATE_FORMAT),
    amount: input.amount,
    paidById: input.paidById,
    participantIds: input.participantIds,
    splitMode: input.splitMode,
    shares: input.shares,
  };
}

export function applyExpenseUpdate(
  expense: IExpense,
  input: ICreateExpenseInput,
): IExpense {
  return {
    ...expense,
    title: input.title,
    amount: input.amount,
    paidById: input.paidById,
    participantIds: input.participantIds,
    splitMode: input.splitMode,
    shares: input.shares,
  };
}
