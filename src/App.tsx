import { useState } from "react";

import { BalanceCard } from "@/components/balances/BalanceCard";
import { AddExpenseModal } from "@/components/expenses/AddExpenseModal";
import type { AddExpenseFormValues } from "@/components/expenses/AddExpenseModal";
import { ExpenseRow } from "@/components/expenses/ExpenseRow";
import { GroupHeader } from "@/components/group/GroupHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

import { balances } from "@/data/mockData";
import { useGroupExpenses } from "@/hooks/useGroupExpenses";

import styles from "./App.module.css";

function App() {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const { expenses, addExpense } = useGroupExpenses();

  const handleAddExpense = (values: AddExpenseFormValues) => {
    addExpense(values);
    setIsAddExpenseModalOpen(false);
  };

  return (
    <div className={styles.shell}>
      <Sidebar />

      <div className={styles.content}>
        <TopBar />

        <main className={styles.main}>
          <GroupHeader onNewExpense={() => setIsAddExpenseModalOpen(true)} />

          <nav className={styles.tabs}>
            <button className={styles.activeTab}>
              Balances
            </button>

            <button>Stats</button>
            <button>Members</button>
          </nav>

          <section className={styles.balanceGrid}>
            {balances.map((balance) => (
              <BalanceCard
                balance={balance}
                key={balance.id}
              />
            ))}
          </section>

          <section className={styles.expenseSection}>
            <h2 className={styles.sectionHeading}>
              January 2026
            </h2>

            <div className={styles.expenseList}>
              {expenses.map((expense) => (
                <ExpenseRow
                  expense={expense}
                  key={expense.id}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      {isAddExpenseModalOpen ? (
        <AddExpenseModal
          onClose={() => setIsAddExpenseModalOpen(false)}
          onSubmit={handleAddExpense}
        />
      ) : null}
    </div>
  );
}

export default App;
