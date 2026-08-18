import { EBalanceStatus } from "@/types/domain.enums";
import { buildBalanceSummary } from "@/utils/balances.helpers";

import {
  ADD_MEMBER_LABEL,
  MEMBERS_PANEL_TITLE,
} from "./MembersPanel.constants";
import type { IMembersPanelProps } from "./MembersPanel.interfaces";

import styles from "./MembersPanel.module.css";

export function MembersPanel({
  balances,
  currency,
  onAddMember,
}: IMembersPanelProps) {
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.title}>{MEMBERS_PANEL_TITLE}</h2>

        <button
          className={styles.addButton}
          onClick={onAddMember}
          type="button"
        >
          {ADD_MEMBER_LABEL}
        </button>
      </header>

      <ul className={styles.list}>
        {balances.map((balance) => {
          let statusClassName = styles.neutral;

          if (balance.status === EBalanceStatus.GETS) {
            statusClassName = styles.positive;
          } else if (balance.status === EBalanceStatus.OWES) {
            statusClassName = styles.negative;
          }

          return (
            <li className={styles.member} key={balance.id}>
              <span className={styles.avatar}>{balance.name.charAt(0)}</span>

              <div className={styles.details}>
                <strong>{balance.name}</strong>

                <span className={statusClassName}>
                  {buildBalanceSummary(balance, currency)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
