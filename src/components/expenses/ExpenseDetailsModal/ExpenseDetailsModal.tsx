import { Modal } from "@/components/common/Modal";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatExpenseDate } from "@/utils/formatDate";
import { findMemberName } from "@/utils/members.helpers";

import {
  DATE_LABEL,
  DELETE_LABEL,
  EDIT_LABEL,
  EXPENSE_DETAILS_EYEBROW,
  EXPENSE_DETAILS_TITLE_ID,
  PAID_BY_LABEL,
  PARTICIPANTS_HEADING,
  SPLIT_LABEL,
  SPLIT_MODE_LABELS,
  TOTAL_LABEL,
} from "./ExpenseDetailsModal.constants";
import type { IExpenseDetailsModalProps } from "./ExpenseDetailsModal.interfaces";

import styles from "./ExpenseDetailsModal.module.css";

export function ExpenseDetailsModal({
  expense,
  members,
  onClose,
  onDelete,
  onEdit,
}: IExpenseDetailsModalProps) {
  return (
    <Modal
      eyebrow={EXPENSE_DETAILS_EYEBROW}
      onClose={onClose}
      title={expense.title}
      titleId={EXPENSE_DETAILS_TITLE_ID}
    >
      <dl className={styles.summary}>
        <div className={styles.summaryRow}>
          <dt className={styles.summaryLabel}>{TOTAL_LABEL}</dt>

          <dd className={styles.total}>
            <strong>{formatCurrency(expense.amount)}</strong>
          </dd>
        </div>

        <div className={styles.summaryRow}>
          <dt className={styles.summaryLabel}>{PAID_BY_LABEL}</dt>
          <dd>{findMemberName(members, expense.paidById)}</dd>
        </div>

        <div className={styles.summaryRow}>
          <dt className={styles.summaryLabel}>{DATE_LABEL}</dt>
          <dd>{formatExpenseDate(expense.date)}</dd>
        </div>

        <div className={styles.summaryRow}>
          <dt className={styles.summaryLabel}>{SPLIT_LABEL}</dt>
          <dd>{SPLIT_MODE_LABELS[expense.splitMode]}</dd>
        </div>
      </dl>

      <section>
        <h3 className={styles.heading}>{PARTICIPANTS_HEADING}</h3>

        <ul className={styles.participants}>
          {expense.shares.map((share) => (
            <li className={styles.participant} key={share.memberId}>
              <span>{findMemberName(members, share.memberId)}</span>
              <strong>{formatCurrency(share.amount)}</strong>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.actions}>
        <button
          className={styles.deleteButton}
          onClick={onDelete}
          type="button"
        >
          {DELETE_LABEL}
        </button>

        <button className={styles.editButton} onClick={onEdit} type="button">
          {EDIT_LABEL}
        </button>
      </div>
    </Modal>
  );
}
