import type { ECurrency } from "@/types/domain.enums";
import type { IExpense, IPerson } from "@/types/domain.interfaces";

export interface IExpenseDetailsModalProps {
  currency: ECurrency;
  expense: IExpense;
  members: IPerson[];
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}
