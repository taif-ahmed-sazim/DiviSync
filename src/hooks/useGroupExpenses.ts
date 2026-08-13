import { useState } from "react";

import type { IAddExpenseFormValues } from "@/components/expenses/AddExpenseModal";
import { expenses as initialExpenses } from "@/data/mockData";
import type { IExpense } from "@/types/domain.interfaces";
import { createExpense } from "@/utils/expenses.helpers";

export function useGroupExpenses() {
  const [expenses, setExpenses] = useState<IExpense[]>(initialExpenses);

  const addExpense = (values: IAddExpenseFormValues) => {
    const expense = createExpense({
      title: values.description.trim(),
      amount: Number(values.amount),
      paidById: values.paidById,
    });

    setExpenses((currentExpenses) => [expense, ...currentExpenses]);
  };

  return { expenses, addExpense };
}
