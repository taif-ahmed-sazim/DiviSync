import type { IGroupMember } from "@/types/domain.interfaces";

export interface IAddExpenseFormValues {
  description: string;
  amount: string;
  paidById: string;
}

export interface IAddExpenseFormErrors {
  description?: string;
  amount?: string;
}

export interface IAddExpenseModalProps {
  members: IGroupMember[];
  onClose: () => void;
  onSubmit: (values: IAddExpenseFormValues) => void;
}
