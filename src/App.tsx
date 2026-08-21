import { useState } from "react";

import { BalanceCard } from "@/components/balances/BalanceCard";
import { AddExpenseModal } from "@/components/expenses/AddExpenseModal";
import type { IAddExpenseSubmitPayload } from "@/components/expenses/AddExpenseModal";
import { ExpenseDetailsModal } from "@/components/expenses/ExpenseDetailsModal";
import { ExpenseRow } from "@/components/expenses/ExpenseRow";
import { SettlementRow } from "@/components/settlements/SettlementRow";
import { SettleUpModal } from "@/components/settlements/SettleUpModal";
import type { ISettleUpFormValues } from "@/components/settlements/SettleUpModal";
import { GroupHeader } from "@/components/group/GroupHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

import { members } from "@/data/mockData";
import { useGroupLedger } from "@/hooks/useGroupLedger";
import { EActivityKind } from "@/types/domain.enums";
import { getActivityId } from "@/utils/activity.helpers";
import { findMemberName } from "@/utils/members.helpers";

import styles from "./App.module.css";

function App() {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isSettleUpModalOpen, setIsSettleUpModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );
  const { expenses, activity, balances, addExpense, addSettlement } =
    useGroupLedger(members);

  const selectedExpense =
    expenses.find((expense) => expense.id === selectedExpenseId) ?? null;

  const handleAddExpense = (payload: IAddExpenseSubmitPayload) => {
    addExpense(payload);
    setIsAddExpenseModalOpen(false);
  };

  const handleSettleUp = (values: ISettleUpFormValues) => {
    addSettlement(values);
    setIsSettleUpModalOpen(false);
  };

  return (
    <div className={styles.shell}>
      <Sidebar />

      <div className={styles.content}>
        <TopBar />

        <main className={styles.main}>
          <GroupHeader
            onNewExpense={() => setIsAddExpenseModalOpen(true)}
            onSettleUp={() => setIsSettleUpModalOpen(true)}
          />

          <nav className={styles.tabs}>
            <button className={styles.activeTab}>
              Balances
            </button>

            <button>Stats</button>
            <button>Members</button>
          </nav>

          <section className={styles.balanceGrid}>
            {balances.map((balance) => (
              <BalanceCard balance={balance} key={balance.id} />
            ))}
          </section>

          <section className={styles.expenseSection}>
            <h2 className={styles.sectionHeading}>
              January 2026
            </h2>

            <div className={styles.expenseList}>
              {activity.map((item) =>
                item.kind === EActivityKind.EXPENSE ? (
                  <ExpenseRow
                    expense={item.expense}
                    key={getActivityId(item)}
                    onSelect={() => setSelectedExpenseId(item.expense.id)}
                    payerName={findMemberName(members, item.expense.paidById)}
                  />
                ) : (
                  <SettlementRow
                    fromName={findMemberName(
                      members,
                      item.settlement.fromMemberId,
                    )}
                    key={getActivityId(item)}
                    settlement={item.settlement}
                    toName={findMemberName(members, item.settlement.toMemberId)}
                  />
                ),
              )}
            </div>
          </section>
        </main>
      </div>

      {isAddExpenseModalOpen ? (
        <AddExpenseModal
          members={members}
          onClose={() => setIsAddExpenseModalOpen(false)}
          onSubmit={handleAddExpense}
        />
      ) : null}

      {selectedExpense ? (
        <ExpenseDetailsModal
          expense={selectedExpense}
          members={members}
          onClose={() => setSelectedExpenseId(null)}
        />
      ) : null}

      {isSettleUpModalOpen ? (
        <SettleUpModal
          members={members}
          onClose={() => setIsSettleUpModalOpen(false)}
          onSubmit={handleSettleUp}
        />
      ) : null}
    </div>
  );
}

export default App;
