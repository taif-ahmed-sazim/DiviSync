import { useMemo, useState } from "react";

import type { IExpenseFormSubmitPayload } from "@/components/expenses/ExpenseFormModal";
import type { ISettleUpFormValues } from "@/components/settlements/SettleUpModal";
import {
  expenses as initialExpenses,
  settlements as initialSettlements,
} from "@/data/mockData";
import type {
  IExpense,
  IGroup,
  IPerson,
  ISettlement,
} from "@/types/domain.interfaces";
import { buildGroupActivity } from "@/utils/activity.helpers";
import { calculateMemberBalances } from "@/utils/balances.helpers";
import {
  applyExpenseUpdate,
  createExpense,
} from "@/utils/expenses.helpers";
import { createSettlement } from "@/utils/settlements.helpers";

export function useGroupLedger(group: IGroup | null, members: IPerson[]) {
  const [expenses, setExpenses] = useState<IExpense[]>(initialExpenses);
  const [settlements, setSettlements] =
    useState<ISettlement[]>(initialSettlements);

  const groupExpenses = useMemo(() => {
    if (group === null) {
      return [];
    }

    return expenses.filter((expense) => expense.groupId === group.id);
  }, [expenses, group]);

  const groupSettlements = useMemo(() => {
    if (group === null) {
      return [];
    }

    return settlements.filter((settlement) => settlement.groupId === group.id);
  }, [settlements, group]);

  const activity = useMemo(
    () => buildGroupActivity(groupExpenses, groupSettlements),
    [groupExpenses, groupSettlements],
  );

  const balances = useMemo(
    () => calculateMemberBalances(members, groupExpenses, groupSettlements),
    [members, groupExpenses, groupSettlements],
  );

  const addExpense = ({ values, shares }: IExpenseFormSubmitPayload) => {
    if (group === null) {
      return;
    }

    const expense = createExpense({
      groupId: group.id,
      title: values.description.trim(),
      amount: Number(values.amount),
      paidById: values.paidById,
      participantIds: values.participantIds,
      splitMode: values.splitMode,
      shares,
    });

    setExpenses((currentExpenses) => [expense, ...currentExpenses]);
  };

  const updateExpense = (
    expenseId: string,
    { values, shares }: IExpenseFormSubmitPayload,
  ) => {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) => {
        if (expense.id !== expenseId) {
          return expense;
        }

        return applyExpenseUpdate(expense, {
          groupId: expense.groupId,
          title: values.description.trim(),
          amount: Number(values.amount),
          paidById: values.paidById,
          participantIds: values.participantIds,
          splitMode: values.splitMode,
          shares,
        });
      }),
    );
  };

  const removeExpense = (expenseId: string) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    );
  };

  const addSettlement = (values: ISettleUpFormValues) => {
    if (group === null) {
      return;
    }

    const settlement = createSettlement({
      groupId: group.id,
      amount: Number(values.amount),
      fromMemberId: values.fromMemberId,
      toMemberId: values.toMemberId,
    });

    setSettlements((currentSettlements) => [
      settlement,
      ...currentSettlements,
    ]);
  };

  return {
    expenses: groupExpenses,
    settlements: groupSettlements,
    activity,
    balances,
    addExpense,
    updateExpense,
    removeExpense,
    addSettlement,
  };
}
