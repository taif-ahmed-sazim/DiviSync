import type { ISettlement } from "@/types/domain.interfaces";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatExpenseDate } from "@/utils/formatDate";

import styles from "./SettlementRow.module.css";

const PAYMENT_TAG = "Payment";

interface ISettlementRowProps {
  fromName: string;
  settlement: ISettlement;
  toName: string;
}

export function SettlementRow({
  fromName,
  settlement,
  toName,
}: ISettlementRowProps) {
  const formattedAmount = formatCurrency(settlement.amount);
  const formattedDate = formatExpenseDate(settlement.date);

  return (
    <article className={styles.row}>
      <div>
        <strong>
          {fromName} paid {toName}
        </strong>

        <p className={styles.date}>{formattedDate}</p>
      </div>

      <div className={styles.details}>
        <strong>{formattedAmount}</strong>

        <span className={styles.tag}>{PAYMENT_TAG}</span>
      </div>
    </article>
  );
}
