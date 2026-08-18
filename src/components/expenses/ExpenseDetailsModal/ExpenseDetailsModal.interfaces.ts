import type { IExpense, IPerson } from "@/types/domain.interfaces";

export interface IExpenseDetailsModalProps {
  expense: IExpense;
  members: IPerson[];
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}
