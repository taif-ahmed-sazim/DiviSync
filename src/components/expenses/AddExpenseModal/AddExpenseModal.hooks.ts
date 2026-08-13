import { useMemo } from "react";

import type { IExpenseShare } from "@/types/domain.interfaces";
import { calculateEqualShares } from "@/utils/splits.helpers";

import { parseAmount } from "./AddExpenseModal.helpers";
import type { IAddExpenseFormValues } from "./AddExpenseModal.interfaces";

export function useSplitShares(
  values: IAddExpenseFormValues,
): IExpenseShare[] {
  return useMemo(
    () => calculateEqualShares(parseAmount(values.amount), values.participantIds),
    [values.amount, values.participantIds],
  );
}
