import { useMemo } from "react";

import { ESplitMode } from "@/types/domain.enums";
import type { IExpenseShare } from "@/types/domain.interfaces";
import { parseAmount } from "@/utils/amount.helpers";
import { calculateEqualShares } from "@/utils/splits.helpers";

import { buildCustomShares } from "./ExpenseFormModal.helpers";
import type { IExpenseFormValues } from "./ExpenseFormModal.interfaces";

export function useSplitShares(
  values: IExpenseFormValues,
): IExpenseShare[] {
  return useMemo(() => {
    if (values.splitMode === ESplitMode.CUSTOM) {
      return buildCustomShares(values.participantIds, values.customShares);
    }

    return calculateEqualShares(
      parseAmount(values.amount),
      values.participantIds,
    );
  }, [
    values.amount,
    values.customShares,
    values.participantIds,
    values.splitMode,
  ]);
}
