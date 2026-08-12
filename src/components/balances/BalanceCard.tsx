import type { MemberBalance } from "../../types/domain";

import { formatCurrency } from "../../utils/formatCurrency";

import styles from "./BalanceCard.module.css";

interface BalanceCardProps {
  balance: MemberBalance;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const formattedAmount = formatCurrency(balance.amount);

  return (
    <article className={styles.card}>
      <div>
        <strong className={styles.name}>{balance.name}</strong>

        <span
          className={
            balance.status === "gets"
              ? styles.positive
              : styles.negative
          }
        >
          {balance.status === "gets" ? " gets " : " owes "}
          {formattedAmount}
        </span>
      </div>

      <span className={styles.avatar}>
        {balance.name.charAt(0)}
      </span>
    </article>
  );
}
