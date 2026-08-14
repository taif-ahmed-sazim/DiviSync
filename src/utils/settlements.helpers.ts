import dayjs from "dayjs";

import type {
  ICreateSettlementInput,
  ISettlement,
} from "@/types/domain.interfaces";

const ISO_DATE_FORMAT = "YYYY-MM-DD";

export function createSettlement(
  input: ICreateSettlementInput,
): ISettlement {
  return {
    id: crypto.randomUUID(),
    date: dayjs().format(ISO_DATE_FORMAT),
    amount: input.amount,
    fromMemberId: input.fromMemberId,
    toMemberId: input.toMemberId,
  };
}
