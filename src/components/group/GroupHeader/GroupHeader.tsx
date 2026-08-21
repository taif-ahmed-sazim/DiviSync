import { GROUP_EYEBROW } from "@/constants/group.constants";

import {
  NEW_EXPENSE_LABEL,
  SETTLE_UP_LABEL,
} from "./GroupHeader.constants";
import type { IGroupHeaderProps } from "./GroupHeader.interfaces";

import styles from "./GroupHeader.module.css";

export function GroupHeader({
  description,
  membersSummary,
  name,
  onNewExpense,
  onSettleUp,
}: IGroupHeaderProps) {
  return (
    <section className={styles.header}>
      <div>
        <p className={styles.eyebrow}>{GROUP_EYEBROW}</p>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.description}>{description}</p>
        <p className={styles.description}>{membersSummary}</p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryButton}
          onClick={onNewExpense}
          type="button"
        >
          {NEW_EXPENSE_LABEL}
        </button>

        <button
          className={styles.secondaryButton}
          onClick={onSettleUp}
          type="button"
        >
          {SETTLE_UP_LABEL}
        </button>
      </div>
    </section>
  );
}
