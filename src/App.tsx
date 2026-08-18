import { useState } from "react";

import { BalanceCard } from "@/components/balances/BalanceCard";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { ExpenseDetailsModal } from "@/components/expenses/ExpenseDetailsModal";
import { ExpenseFormModal } from "@/components/expenses/ExpenseFormModal";
import type { IExpenseFormSubmitPayload } from "@/components/expenses/ExpenseFormModal";
import { ExpenseRow } from "@/components/expenses/ExpenseRow";
import { AddFriendModal } from "@/components/friends/AddFriendModal";
import { FriendsView } from "@/components/friends/FriendsView";
import { AddMemberModal } from "@/components/group/AddMemberModal";
import { CreateGroupModal } from "@/components/group/CreateGroupModal";
import type { ICreateGroupFormValues } from "@/components/group/CreateGroupModal";
import { GroupHeader } from "@/components/group/GroupHeader";
import { MembersPanel } from "@/components/group/MembersPanel";
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
import {
  BALANCES_TAB_LABEL,
  DEFAULT_CURRENCY,
  EXPENSE_HISTORY_HEADING,
  MEMBERS_TAB_LABEL,
  STATS_TAB_LABEL,
} from "@/constants/group.constants";
import { useFriends } from "@/hooks/useFriends";
import { useGroupLedger } from "@/hooks/useGroupLedger";
import { useGroups } from "@/hooks/useGroups";
import { usePeople } from "@/hooks/usePeople";
import { EActivityKind, EAppView, EGroupTab } from "@/types/domain.enums";
import { getActivityId } from "@/utils/activity.helpers";
import { resolveNonMembers } from "@/utils/group.helpers";
import {
  buildMemberNamesSummary,
  buildMemberRows,
  findMemberName,
} from "@/utils/members.helpers";

import styles from "./App.module.css";

function App() {
  const [isExpenseFormModalOpen, setIsExpenseFormModalOpen] = useState(false);
  const [isSettleUpModalOpen, setIsSettleUpModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<EGroupTab>(EGroupTab.BALANCES);
  const [activeView, setActiveView] = useState<EAppView>(EAppView.GROUP);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(
    null,
  );
  const { people, addPerson } = usePeople();
  const {
    groups,
    activeGroup,
    activeMembers,
    addGroup,
    addMember,
    removeMember,
    selectGroup,
  } = useGroups(people);
  const { friends, friendBalances, addFriend } = useFriends(people, addPerson);
  const currency = activeGroup?.currency ?? DEFAULT_CURRENCY;
  const {
    expenses,
    settlements,
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

  const handleAddFriend = (name: string) => {
    addFriend(name);
    setIsAddFriendModalOpen(false);
  };

  const handleSelectGroup = (groupId: string) => {
    selectGroup(groupId);
    setActiveView(EAppView.GROUP);
  };

  const handleAddMember = (personId: string) => {
    addMember(personId);
    setIsAddMemberModalOpen(false);
  };

  const handleCreateGroup = (values: ICreateGroupFormValues) => {
    addGroup(values);
    setIsCreateGroupModalOpen(false);
  };

  const handleSettleUp = (values: ISettleUpFormValues) => {
    addSettlement(values);
    setIsSettleUpModalOpen(false);
  };

  return (
    <div className={styles.shell}>
      <Sidebar
        activeGroupId={activeGroup?.id ?? null}
        activeView={activeView}
        groups={groups}
        onCreateGroup={() => setIsCreateGroupModalOpen(true)}
        onSelectGroup={handleSelectGroup}
        onSelectView={setActiveView}
      />

      <div className={styles.content}>
        <TopBar />

        <main className={styles.main}>
          {activeView === EAppView.FRIENDS ? (
            <FriendsView
              balances={friendBalances}
              currency={DEFAULT_CURRENCY}
              onAddFriend={() => setIsAddFriendModalOpen(true)}
            />
          ) : (
            <>
              <GroupHeader
                description={activeGroup?.description ?? ""}
                membersSummary={buildMemberNamesSummary(activeMembers)}
                name={activeGroup?.name ?? ""}
                onNewExpense={() => setIsExpenseFormModalOpen(true)}
                onSettleUp={() => setIsSettleUpModalOpen(true)}
              />

              <nav className={styles.tabs}>
                <button
                  className={
                    activeTab === EGroupTab.BALANCES ? styles.activeTab : undefined
                  }
                  onClick={() => setActiveTab(EGroupTab.BALANCES)}
                  type="button"
                >
                  {BALANCES_TAB_LABEL}
                </button>

                <button type="button">{STATS_TAB_LABEL}</button>

                <button
                  className={
                    activeTab === EGroupTab.MEMBERS ? styles.activeTab : undefined
                  }
                  onClick={() => setActiveTab(EGroupTab.MEMBERS)}
                  type="button"
                >
                  {MEMBERS_TAB_LABEL}
                </button>
              </nav>

              {activeTab === EGroupTab.BALANCES ? (
                <>
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
                      {EXPENSE_HISTORY_HEADING}
                    </h2>

                    <div className={styles.expenseList}>
                      {activity.map((item) =>
                        item.kind === EActivityKind.EXPENSE ? (
                          <ExpenseRow
                            currency={currency}
                            expense={item.expense}
                            key={getActivityId(item)}
                            onSelect={() => setSelectedExpenseId(item.expense.id)}
                            payerName={findMemberName(
                              activeMembers,
                              item.expense.paidById,
                            )}
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
                            toName={findMemberName(
                              activeMembers,
                              item.settlement.toMemberId,
                            )}
                          />
                        ),
                      )}
                    </div>
                  </section>
                </>
              ) : (
                <MembersPanel
                  currency={currency}
                  onAddMember={() => setIsAddMemberModalOpen(true)}
                  onRemoveMember={removeMember}
                  rows={buildMemberRows(balances, expenses, settlements)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {isExpenseFormModalOpen ? (
        <ExpenseFormModal
          currency={currency}
          expense={editingExpense}
          groupName={activeGroup?.name ?? ""}
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

      {isAddFriendModalOpen ? (
        <AddFriendModal
          friends={friends}
          onClose={() => setIsAddFriendModalOpen(false)}
          onSubmit={handleAddFriend}
        />
      ) : null}

      {isAddMemberModalOpen ? (
        <AddMemberModal
          candidates={resolveNonMembers(people, activeGroup)}
          groupName={activeGroup?.name ?? ""}
          onClose={() => setIsAddMemberModalOpen(false)}
          onSubmit={handleAddMember}
        />
      ) : null}

      {isCreateGroupModalOpen ? (
        <CreateGroupModal
          onClose={() => setIsCreateGroupModalOpen(false)}
          onSubmit={handleCreateGroup}
          people={people}
        />
      ) : null}

      {isSettleUpModalOpen ? (
        <SettleUpModal
          groupName={activeGroup?.name ?? ""}
          members={activeMembers}
          onClose={() => setIsSettleUpModalOpen(false)}
          onSubmit={handleSettleUp}
        />
      ) : null}
    </div>
  );
}

export default App;
