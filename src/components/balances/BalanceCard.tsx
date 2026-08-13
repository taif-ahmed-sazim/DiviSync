import { EBalanceStatus } from "@/types/domain.enums";
import type { IMemberBalance } from "@/types/domain.interfaces";

import { formatCurrency } from "@/utils/formatCurrency";

import styles from "./BalanceCard.module.css";

interface IBalanceCardProps {
  balance: IMemberBalance;
}

export function BalanceCard({ balance }: IBalanceCardProps) {
  const formattedAmount = formatCurrency(balance.amount);

  return (
    <article className={styles.card}>
      <div>
        <strong className={styles.name}>{balance.name}</strong>

        <span
          className={
            balance.status === EBalanceStatus.GETS
              ? styles.positive
              : styles.negative
          }
        >
          {balance.status === EBalanceStatus.GETS ? " gets " : " owes "}
          {formattedAmount}
        </span>
      </div>

      <span className={styles.avatar}>
        {balance.name.charAt(0)}
      </span>
    </article>
  );
}
