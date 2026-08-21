import { EBalanceStatus } from "@/types/domain.enums";
import type { IMemberBalance } from "@/types/domain.interfaces";
import { buildBalanceSummary } from "@/utils/balances.helpers";

import styles from "./BalanceCard.module.css";

interface IBalanceCardProps {
  balance: IMemberBalance;
}

export function BalanceCard({ balance }: IBalanceCardProps) {
  let statusClassName = styles.neutral;

  if (balance.status === EBalanceStatus.GETS) {
    statusClassName = styles.positive;
  } else if (balance.status === EBalanceStatus.OWES) {
    statusClassName = styles.negative;
  }

  return (
    <article className={styles.card}>
      <div>
        <strong className={styles.name}>{balance.name}</strong>

        <span className={statusClassName}>{buildBalanceSummary(balance)}</span>
      </div>

      <span className={styles.avatar}>{balance.name.charAt(0)}</span>
    </article>
  );
}
