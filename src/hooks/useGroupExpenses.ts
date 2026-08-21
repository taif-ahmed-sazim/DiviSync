import { useState } from "react";

import type { AddExpenseFormValues } from "../components/expenses/AddExpenseModal";
import { expenses as initialExpenses } from "../data/mockData";
import type { Expense } from "../types/domain";
import { createExpense } from "../utils/expenses.helpers";

export function useGroupExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const addExpense = (values: AddExpenseFormValues) => {
    const expense = createExpense({
      title: values.description.trim(),
      amount: Number(values.amount),
    });

    setExpenses((currentExpenses) => [expense, ...currentExpenses]);
  };

  return { expenses, addExpense };
}
