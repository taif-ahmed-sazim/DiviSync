import dayjs from "dayjs";

import {
  CURRENT_USER_NAME,
  GROUP_MEMBER_COUNT,
} from "../constants/group.constants";
import type { CreateExpenseInput, Expense } from "../types/domain";

const ISO_DATE_FORMAT = "YYYY-MM-DD";

export function createExpense(input: CreateExpenseInput): Expense {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    date: dayjs().format(ISO_DATE_FORMAT),
    amount: input.amount,
    paidBy: CURRENT_USER_NAME,
    participantCount: GROUP_MEMBER_COUNT,
  };
}
