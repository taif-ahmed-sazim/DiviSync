import { EActivityKind } from "@/types/domain.enums";
import type { IExpense, ISettlement } from "@/types/domain.interfaces";
import type { TGroupActivity } from "@/types/domain.types";

export function getActivityDate(activity: TGroupActivity): string {
  if (activity.kind === EActivityKind.EXPENSE) {
    return activity.expense.date;
  }

  return activity.settlement.date;
}

export function getActivityId(activity: TGroupActivity): string {
  if (activity.kind === EActivityKind.EXPENSE) {
    return activity.expense.id;
  }

  return activity.settlement.id;
}

export function buildGroupActivity(
  expenses: IExpense[],
  settlements: ISettlement[],
): TGroupActivity[] {
  const expenseActivity: TGroupActivity[] = expenses.map((expense) => ({
    kind: EActivityKind.EXPENSE,
    expense,
  }));

  const settlementActivity: TGroupActivity[] = settlements.map(
    (settlement) => ({
      kind: EActivityKind.SETTLEMENT,
      settlement,
    }),
  );

  return [...expenseActivity, ...settlementActivity].sort((first, second) =>
    getActivityDate(second).localeCompare(getActivityDate(first)),
  );
}
