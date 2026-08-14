import type { EActivityKind } from "@/types/domain.enums";
import type { IExpense, ISettlement } from "@/types/domain.interfaces";

export type TGroupActivity =
  | { kind: EActivityKind.EXPENSE; expense: IExpense }
  | { kind: EActivityKind.SETTLEMENT; settlement: ISettlement };
