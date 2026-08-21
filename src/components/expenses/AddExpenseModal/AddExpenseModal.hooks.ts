import { useMemo } from "react";

import { ESplitMode } from "@/types/domain.enums";
import type { IExpenseShare } from "@/types/domain.interfaces";
import { parseAmount } from "@/utils/amount.helpers";
import { calculateEqualShares } from "@/utils/splits.helpers";

import { buildCustomShares } from "./AddExpenseModal.helpers";
import type { IAddExpenseFormValues } from "./AddExpenseModal.interfaces";

export function useSplitShares(
  values: IAddExpenseFormValues,
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
