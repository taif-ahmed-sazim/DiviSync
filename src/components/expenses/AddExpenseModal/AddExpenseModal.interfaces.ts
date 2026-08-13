import type { ESplitMode } from "@/types/domain.enums";
import type {
  IExpenseShare,
  IGroupMember,
} from "@/types/domain.interfaces";

import type { TCustomShareInputs } from "./AddExpenseModal.types";

export interface IAddExpenseFormValues {
  description: string;
  amount: string;
  paidById: string;
  participantIds: string[];
  splitMode: ESplitMode;
  customShares: TCustomShareInputs;
}

export interface IAddExpenseFormErrors {
  description?: string;
  amount?: string;
  paidById?: string;
  participantIds?: string;
}

export interface IAddExpenseSubmitPayload {
  values: IAddExpenseFormValues;
  shares: IExpenseShare[];
}

export interface IAddExpenseModalProps {
  members: IGroupMember[];
  onClose: () => void;
  onSubmit: (payload: IAddExpenseSubmitPayload) => void;
}
