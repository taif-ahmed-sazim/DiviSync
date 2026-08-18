import { EBalanceStatus } from "@/types/domain.enums";
import { buildBalanceSummary } from "@/utils/balances.helpers";

import {
  FRIENDS_SUBTITLE,
  FRIENDS_TITLE,
  NO_FRIENDS_MESSAGE,
} from "./FriendsView.constants";
import type { IFriendsViewProps } from "./FriendsView.interfaces";

import styles from "./FriendsView.module.css";

export function FriendsView({ balances, currency }: IFriendsViewProps) {
  return (
    <section className={styles.view}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{FRIENDS_TITLE}</h1>
          <p className={styles.subtitle}>{FRIENDS_SUBTITLE}</p>
        </div>
      </header>

      {balances.length === 0 ? (
        <p className={styles.empty}>{NO_FRIENDS_MESSAGE}</p>
      ) : (
        <ul className={styles.list}>
          {balances.map((balance) => {
            let statusClassName = styles.neutral;

            if (balance.status === EBalanceStatus.GETS) {
              statusClassName = styles.positive;
            } else if (balance.status === EBalanceStatus.OWES) {
              statusClassName = styles.negative;
            }

            return (
              <li className={styles.friend} key={balance.id}>
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
      )}
    </section>
  );
}
