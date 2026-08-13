import dayjs from "dayjs";

import { GROUP_MEMBER_COUNT } from "@/constants/group.constants";
import type { ICreateExpenseInput, IExpense } from "@/types/domain.interfaces";

const ISO_DATE_FORMAT = "YYYY-MM-DD";

export function createExpense(input: ICreateExpenseInput): IExpense {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    date: dayjs().format(ISO_DATE_FORMAT),
    amount: input.amount,
    paidById: input.paidById,
    participantCount: GROUP_MEMBER_COUNT,
  };
}
