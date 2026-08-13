import { useState } from "react";

import type { IAddExpenseSubmitPayload } from "@/components/expenses/AddExpenseModal";
import { expenses as initialExpenses } from "@/data/mockData";
import type { IExpense } from "@/types/domain.interfaces";
import { createExpense } from "@/utils/expenses.helpers";

export function useGroupExpenses() {
  const [expenses, setExpenses] = useState<IExpense[]>(initialExpenses);

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

  return { expenses, addExpense };
}
