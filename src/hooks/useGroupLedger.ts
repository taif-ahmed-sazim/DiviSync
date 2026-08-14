import { useMemo, useState } from "react";

import type { IExpenseFormSubmitPayload } from "@/components/expenses/ExpenseFormModal";
import type { ISettleUpFormValues } from "@/components/settlements/SettleUpModal";
import {
  expenses as initialExpenses,
  settlements as initialSettlements,
} from "@/data/mockData";
import type {
  IExpense,
  IGroupMember,
  ISettlement,
} from "@/types/domain.interfaces";
import { buildGroupActivity } from "@/utils/activity.helpers";
import { calculateMemberBalances } from "@/utils/balances.helpers";
import { createExpense } from "@/utils/expenses.helpers";
import { createSettlement } from "@/utils/settlements.helpers";

export function useGroupLedger(members: IGroupMember[]) {
  const [expenses, setExpenses] = useState<IExpense[]>(initialExpenses);
  const [settlements, setSettlements] =
    useState<ISettlement[]>(initialSettlements);

  const activity = useMemo(
    () => buildGroupActivity(expenses, settlements),
    [expenses, settlements],
  );

  const balances = useMemo(
    () => calculateMemberBalances(members, expenses, settlements),
    [members, expenses, settlements],
  );

  const addExpense = ({ values, shares }: IExpenseFormSubmitPayload) => {
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

  const addSettlement = (values: ISettleUpFormValues) => {
    const settlement = createSettlement({
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
    expenses,
    settlements,
    activity,
    balances,
    addExpense,
    addSettlement,
  };
}
