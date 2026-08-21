import type { IExpenseShare } from "@/types/domain.interfaces";

const CENTS_PER_UNIT = 100;

export function toCents(amount: number): number {
  return Math.round(amount * CENTS_PER_UNIT);
}

export function fromCents(cents: number): number {
  return cents / CENTS_PER_UNIT;
}

export function calculateEqualShares(
  amount: number,
  participantIds: string[],
): IExpenseShare[] {
  if (participantIds.length === 0) {
    return [];
  }

  const totalCents = toCents(amount);
  const baseCents = Math.floor(totalCents / participantIds.length);
  const remainderCents = totalCents - baseCents * participantIds.length;

  return participantIds.map((memberId, index) => ({
    memberId,
    amount: fromCents(index < remainderCents ? baseCents + 1 : baseCents),
  }));
}

export function sumShareAmounts(shares: IExpenseShare[]): number {
  const totalCents = shares.reduce(
    (runningTotal, share) => runningTotal + toCents(share.amount),
    0,
  );

  return fromCents(totalCents);
}
