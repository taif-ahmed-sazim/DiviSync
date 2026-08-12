import type { Expense } from "../../types/domain";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatExpenseDate } from "../../utils/formatDate";

import styles from "./ExpenseRow.module.css";

interface ExpenseRowProps {
  expense: Expense;
}

export function ExpenseRow({ expense }: ExpenseRowProps) {
  const formattedAmount = formatCurrency(expense.amount);
  const formattedDate = formatExpenseDate(expense.date);

  return (
    <article className={styles.row}>
      <div>
        <strong>{expense.title}</strong>
        <p className={styles.date}>{formattedDate}</p>
      </div>

      <div className={styles.details}>
        <div>
          <span>{expense.paidBy} paid </span>
          <strong>{formattedAmount}</strong>
        </div>

        <span className={styles.participants}>
          {expense.participantCount} people
        </span>
      </div>
    </article>
  );
}
