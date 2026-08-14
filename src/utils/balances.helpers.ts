import {
  GETS_LABEL,
  OWES_LABEL,
  SETTLED_LABEL,
} from "@/constants/balances.constants";
import { EBalanceStatus } from "@/types/domain.enums";
import type {
  IExpense,
  IGroupMember,
  IMemberBalance,
} from "@/types/domain.interfaces";
import { formatCurrency } from "@/utils/formatCurrency";
import { fromCents, toCents } from "@/utils/splits.helpers";

export function calculateOwedCents(
  memberId: string,
  expense: IExpense,
): number {
  return expense.shares
    .filter((share) => share.memberId === memberId)
    .reduce((runningTotal, share) => runningTotal + toCents(share.amount), 0);
}

export function calculateNetCents(
  memberId: string,
  expenses: IExpense[],
): number {
  return expenses.reduce((runningNet, expense) => {
    const paidCents =
      expense.paidById === memberId ? toCents(expense.amount) : 0;

    return runningNet + paidCents - calculateOwedCents(memberId, expense);
  }, 0);
}

export function resolveBalanceStatus(netCents: number): EBalanceStatus {
  if (netCents > 0) {
    return EBalanceStatus.GETS;
  }

  if (netCents < 0) {
    return EBalanceStatus.OWES;
  }

  return EBalanceStatus.SETTLED;
}

export function buildBalanceSummary(balance: IMemberBalance): string {
  if (balance.status === EBalanceStatus.SETTLED) {
    return SETTLED_LABEL;
  }

  if (balance.status === EBalanceStatus.GETS) {
    return `${GETS_LABEL} ${formatCurrency(balance.amount)}`;
  }

  return `${OWES_LABEL} ${formatCurrency(balance.amount)}`;
}

export function calculateMemberBalances(
  members: IGroupMember[],
  expenses: IExpense[],
): IMemberBalance[] {
  return members.map((member) => {
    const netCents = calculateNetCents(member.id, expenses);

    return {
      id: member.id,
      name: member.name,
      amount: fromCents(Math.abs(netCents)),
      status: resolveBalanceStatus(netCents),
    };
  });
}
