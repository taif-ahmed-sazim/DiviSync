import { CURRENT_USER_ID, NO_MEMBERS_LABEL } from "@/constants/group.constants";
import {
  REMOVE_MEMBER_HISTORY_MESSAGE,
  REMOVE_MEMBER_SELF_MESSAGE,
  REMOVE_MEMBER_UNSETTLED_MESSAGE,
  UNKNOWN_MEMBER_NAME,
} from "@/constants/members.constants";
import { EBalanceStatus } from "@/types/domain.enums";
import type {
  IExpense,
  IMemberBalance,
  IMemberRow,
  IPerson,
  ISettlement,
} from "@/types/domain.interfaces";

export function findMemberName(members: IPerson[], memberId: string): string {
  const member = members.find((groupMember) => groupMember.id === memberId);

  return member?.name ?? UNKNOWN_MEMBER_NAME;
}

export function buildMemberNamesSummary(members: IPerson[]): string {
  if (members.length === 0) {
    return NO_MEMBERS_LABEL;
  }

  const names = members.map((member) => member.name);

  if (names.length === 1) {
    return names[0];
  }

  const lastName = names[names.length - 1];
  const earlierNames = names.slice(0, names.length - 1);

  return `${earlierNames.join(", ")} and ${lastName}`;
}

export function hasLedgerHistory(
  memberId: string,
  expenses: IExpense[],
  settlements: ISettlement[],
): boolean {
  const appearsInExpense = expenses.some(
    (expense) =>
      expense.paidById === memberId ||
      expense.participantIds.includes(memberId),
  );

  if (appearsInExpense) {
    return true;
  }

  return settlements.some(
    (settlement) =>
      settlement.fromMemberId === memberId ||
      settlement.toMemberId === memberId,
  );
}

export function getMemberRemovalError(
  memberId: string,
  balances: IMemberBalance[],
  expenses: IExpense[],
  settlements: ISettlement[],
): string | undefined {
  if (memberId === CURRENT_USER_ID) {
    return REMOVE_MEMBER_SELF_MESSAGE;
  }

  const balance = balances.find((item) => item.id === memberId);

  if (balance !== undefined && balance.status !== EBalanceStatus.SETTLED) {
    return REMOVE_MEMBER_UNSETTLED_MESSAGE;
  }

  if (hasLedgerHistory(memberId, expenses, settlements)) {
    return REMOVE_MEMBER_HISTORY_MESSAGE;
  }

  return undefined;
}

export function buildMemberRows(
  balances: IMemberBalance[],
  expenses: IExpense[],
  settlements: ISettlement[],
): IMemberRow[] {
  return balances.map((balance) => ({
    balance,
    removalError: getMemberRemovalError(
      balance.id,
      balances,
      expenses,
      settlements,
    ),
  }));
}
