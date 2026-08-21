import type { IExpense, IGroupMember } from "@/types/domain.interfaces";

export interface IExpenseDetailsModalProps {
  expense: IExpense;
  members: IGroupMember[];
  onClose: () => void;
}
