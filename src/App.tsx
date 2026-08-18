import { useState } from "react";

import { BalanceCard } from "@/components/balances/BalanceCard";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { ExpenseDetailsModal } from "@/components/expenses/ExpenseDetailsModal";
import { ExpenseFormModal } from "@/components/expenses/ExpenseFormModal";
import type { IExpenseFormSubmitPayload } from "@/components/expenses/ExpenseFormModal";
import { ExpenseRow } from "@/components/expenses/ExpenseRow";
import { GroupHeader } from "@/components/group/GroupHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { SettlementRow } from "@/components/settlements/SettlementRow";
import { SettleUpModal } from "@/components/settlements/SettleUpModal";
import type { ISettleUpFormValues } from "@/components/settlements/SettleUpModal";
import {
  DELETE_EXPENSE_CANCEL_LABEL,
  DELETE_EXPENSE_CONFIRM_LABEL,
  DELETE_EXPENSE_DESCRIPTION,
  DELETE_EXPENSE_EYEBROW,
  DELETE_EXPENSE_TITLE,
  DELETE_EXPENSE_TITLE_ID,
} from "@/constants/expenses.constants";
import { DEFAULT_CURRENCY } from "@/constants/group.constants";
import { useGroupLedger } from "@/hooks/useGroupLedger";
import { useGroups } from "@/hooks/useGroups";
import { usePeople } from "@/hooks/usePeople";
import { EActivityKind } from "@/types/domain.enums";
import { getActivityId } from "@/utils/activity.helpers";
import {
  buildMemberNamesSummary,
  findMemberName,
} from "@/utils/members.helpers";

import styles from "./App.module.css";

function App() {
  const [isExpenseFormModalOpen, setIsExpenseFormModalOpen] = useState(false);
  const [isSettleUpModalOpen, setIsSettleUpModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(
    null,
  );
  const { people } = usePeople();
  const { groups, activeGroup, activeMembers, selectGroup } =
    useGroups(people);
  const currency = activeGroup?.currency ?? DEFAULT_CURRENCY;
  const {
    expenses,
    activity,
    balances,
    addExpense,
    updateExpense,
    removeExpense,
    addSettlement,
  } = useGroupLedger(activeGroup, activeMembers);

  const selectedExpense =
    expenses.find((expense) => expense.id === selectedExpenseId) ?? null;

  const editingExpense = expenses.find(
    (expense) => expense.id === editingExpenseId,
  );

  const handleSubmitExpense = (payload: IExpenseFormSubmitPayload) => {
    if (editingExpenseId === null) {
      addExpense(payload);
    } else {
      updateExpense(editingExpenseId, payload);
    }

    handleCloseExpenseForm();
  };

  const handleEditExpense = () => {
    setEditingExpenseId(selectedExpenseId);
    setSelectedExpenseId(null);
    setIsExpenseFormModalOpen(true);
  };

  const handleDeleteExpense = () => {
    setDeletingExpenseId(selectedExpenseId);
    setSelectedExpenseId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingExpenseId !== null) {
      removeExpense(deletingExpenseId);
    }

    setDeletingExpenseId(null);
  };

  const handleCloseExpenseForm = () => {
    setEditingExpenseId(null);
    setIsExpenseFormModalOpen(false);
  };

  const handleSettleUp = (values: ISettleUpFormValues) => {
    addSettlement(values);
    setIsSettleUpModalOpen(false);
  };

  return (
    <div className={styles.shell}>
      <Sidebar
        activeGroupId={activeGroup?.id ?? null}
        groups={groups}
        onSelectGroup={selectGroup}
      />

      <div className={styles.content}>
        <TopBar />

        <main className={styles.main}>
          <GroupHeader
            description={activeGroup?.description ?? ""}
            membersSummary={buildMemberNamesSummary(activeMembers)}
            name={activeGroup?.name ?? ""}
            onNewExpense={() => setIsExpenseFormModalOpen(true)}
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
              <BalanceCard
                balance={balance}
                currency={currency}
                key={balance.id}
              />
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
                    currency={currency}
                    expense={item.expense}
                    key={getActivityId(item)}
                    onSelect={() => setSelectedExpenseId(item.expense.id)}
                    payerName={findMemberName(activeMembers, item.expense.paidById)}
                  />
                ) : (
                  <SettlementRow
                    currency={currency}
                    fromName={findMemberName(
                      activeMembers,
                      item.settlement.fromMemberId,
                    )}
                    key={getActivityId(item)}
                    settlement={item.settlement}
                    toName={findMemberName(activeMembers, item.settlement.toMemberId)}
                  />
                ),
              )}
            </div>
          </section>
        </main>
      </div>

      {isExpenseFormModalOpen ? (
        <ExpenseFormModal
          currency={currency}
          expense={editingExpense}
          members={activeMembers}
          onClose={handleCloseExpenseForm}
          onSubmit={handleSubmitExpense}
        />
      ) : null}

      {selectedExpense ? (
        <ExpenseDetailsModal
          currency={currency}
          expense={selectedExpense}
          members={activeMembers}
          onClose={() => setSelectedExpenseId(null)}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
      ) : null}

      {deletingExpenseId !== null ? (
        <ConfirmDialog
          cancelLabel={DELETE_EXPENSE_CANCEL_LABEL}
          confirmLabel={DELETE_EXPENSE_CONFIRM_LABEL}
          description={DELETE_EXPENSE_DESCRIPTION}
          eyebrow={DELETE_EXPENSE_EYEBROW}
          onCancel={() => setDeletingExpenseId(null)}
          onConfirm={handleConfirmDelete}
          title={DELETE_EXPENSE_TITLE}
          titleId={DELETE_EXPENSE_TITLE_ID}
        />
      ) : null}

      {isSettleUpModalOpen ? (
        <SettleUpModal
          members={activeMembers}
          onClose={() => setIsSettleUpModalOpen(false)}
          onSubmit={handleSettleUp}
        />
      ) : null}
    </div>
  );
}

export default App;
