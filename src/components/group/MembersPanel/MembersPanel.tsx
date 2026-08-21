import { REMOVE_MEMBER_LABEL } from "@/constants/members.constants";
import { EBalanceStatus } from "@/types/domain.enums";
import { buildBalanceSummary } from "@/utils/balances.helpers";

import {
  ADD_MEMBER_LABEL,
  MEMBERS_PANEL_TITLE,
} from "./MembersPanel.constants";
import type { IMembersPanelProps } from "./MembersPanel.interfaces";

import styles from "./MembersPanel.module.css";

export function MembersPanel({
  currency,
  onAddMember,
  onRemoveMember,
  rows,
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
        {rows.map((row) => {
          let statusClassName = styles.neutral;

          if (row.balance.status === EBalanceStatus.GETS) {
            statusClassName = styles.positive;
          } else if (row.balance.status === EBalanceStatus.OWES) {
            statusClassName = styles.negative;
          }

          return (
            <li className={styles.member} key={row.balance.id}>
              <span className={styles.avatar}>
                {row.balance.name.charAt(0)}
              </span>

              <div className={styles.details}>
                <strong>{row.balance.name}</strong>

                <span className={statusClassName}>
                  {buildBalanceSummary(row.balance, currency)}
                </span>
              </div>

              <div className={styles.removal}>
                <button
                  className={styles.removeButton}
                  disabled={row.removalError !== undefined}
                  onClick={() => onRemoveMember(row.balance.id)}
                  type="button"
                >
                  {REMOVE_MEMBER_LABEL}
                </button>

                {row.removalError ? (
                  <span className={styles.removalReason}>
                    {row.removalError}
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
