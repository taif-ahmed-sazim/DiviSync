import type { ECurrency, ESplitMode } from "@/types/domain.enums";
import type {
  IExpense,
  IExpenseShare,
  IPerson,
} from "@/types/domain.interfaces";

import type { TCustomShareInputs } from "./ExpenseFormModal.types";

export interface IExpenseFormValues {
  description: string;
  amount: string;
  paidById: string;
  participantIds: string[];
  splitMode: ESplitMode;
  customShares: TCustomShareInputs;
}

export interface IExpenseFormErrors {
  description?: string;
  amount?: string;
  paidById?: string;
  participantIds?: string;
  customShares?: string;
}

export interface IExpenseFormSubmitPayload {
  values: IExpenseFormValues;
  shares: IExpenseShare[];
}

export interface IExpenseFormModalProps {
  currency: ECurrency;
  groupName: string;
  expense?: IExpense;
  members: IPerson[];
  onClose: () => void;
  onSubmit: (payload: IExpenseFormSubmitPayload) => void;
}
