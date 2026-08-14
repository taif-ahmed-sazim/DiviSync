import { useMemo, useState } from "react";

import type { IAddExpenseSubmitPayload } from "@/components/expenses/AddExpenseModal";
import { expenses as initialExpenses } from "@/data/mockData";
import type { IExpense, IGroupMember } from "@/types/domain.interfaces";
import { calculateMemberBalances } from "@/utils/balances.helpers";
import { createExpense } from "@/utils/expenses.helpers";

export function useGroupExpenses(members: IGroupMember[]) {
  const [expenses, setExpenses] = useState<IExpense[]>(initialExpenses);

  const balances = useMemo(
    () => calculateMemberBalances(members, expenses),
    [members, expenses],
  );

  const addExpense = ({ values, shares }: IAddExpenseSubmitPayload) => {
    const expense = createExpense({
      title: values.description.trim(),
      amount: Number(values.amount),
      paidById: values.paidById,
      participantIds: values.participantIds,
      splitMode: values.splitMode,
      shares,
    });

    setExpenses((currentExpenses) => [expense, ...currentExpenses]);
  };

  return { expenses, balances, addExpense };
}
