import { useMemo } from "react";

import type { IExpenseShare } from "@/types/domain.interfaces";
import { calculateEqualShares } from "@/utils/splits.helpers";

import { parseAmount } from "./AddExpenseModal.helpers";

export function useEqualSplitShares(
  amount: string,
  participantIds: string[],
): IExpenseShare[] {
  return useMemo(
    () => calculateEqualShares(parseAmount(amount), participantIds),
    [amount, participantIds],
  );
}
