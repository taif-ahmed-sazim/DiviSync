import {
  GETS_LABEL,
  OWES_LABEL,
  SETTLED_LABEL,
} from "@/constants/balances.constants";
import { EBalanceStatus } from "@/types/domain.enums";
import type {
  IExpense,
  IPerson,
  IMemberBalance,
  ISettlement,
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

export function calculateSettlementCents(
  memberId: string,
  settlements: ISettlement[],
): number {
  return settlements.reduce((runningNet, settlement) => {
    if (settlement.fromMemberId === memberId) {
      return runningNet + toCents(settlement.amount);
    }

    if (settlement.toMemberId === memberId) {
      return runningNet - toCents(settlement.amount);
    }

    return runningNet;
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
  members: IPerson[],
  expenses: IExpense[],
  settlements: ISettlement[],
): IMemberBalance[] {
  return members.map((member) => {
    const netCents =
      calculateNetCents(member.id, expenses) +
      calculateSettlementCents(member.id, settlements);

    return {
      id: member.id,
      name: member.name,
      amount: fromCents(Math.abs(netCents)),
      status: resolveBalanceStatus(netCents),
    };
  });
}
