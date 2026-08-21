import type { IExpense } from "@/types/domain.interfaces";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatExpenseDate } from "@/utils/formatDate";

import styles from "./ExpenseRow.module.css";

interface IExpenseRowProps {
  expense: IExpense;
  onSelect: () => void;
  payerName: string;
}

export function ExpenseRow({
  expense,
  onSelect,
  payerName,
}: IExpenseRowProps) {
  const formattedAmount = formatCurrency(expense.amount);
  const formattedDate = formatExpenseDate(expense.date);

  return (
    <button className={styles.row} onClick={onSelect} type="button">
      <div>
        <strong>{expense.title}</strong>
        <p className={styles.date}>{formattedDate}</p>
      </div>

      <div className={styles.details}>
        <div>
          <span>{payerName} paid </span>
          <strong>{formattedAmount}</strong>
        </div>

        <span className={styles.participants}>
          {expense.participantIds.length} people
        </span>
      </div>
    </button>
  );
}
