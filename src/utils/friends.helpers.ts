import { CURRENT_USER_ID } from "@/constants/group.constants";
import type {
  IDirectExpense,
  IMemberBalance,
  IPerson,
} from "@/types/domain.interfaces";
import { resolveBalanceStatus } from "@/utils/balances.helpers";
import { fromCents, toCents } from "@/utils/splits.helpers";

export function resolveFriends(
  people: IPerson[],
  friendIds: string[],
): IPerson[] {
  return people.filter((person) => friendIds.includes(person.id));
}

export function calculateFriendNetCents(
  friendId: string,
  directExpenses: IDirectExpense[],
): number {
  return directExpenses
    .filter((directExpense) => directExpense.friendId === friendId)
    .reduce((runningNet, directExpense) => {
      const paidCents =
        directExpense.paidById === CURRENT_USER_ID
          ? toCents(directExpense.amount)
          : 0;

      const owedCents = directExpense.shares
        .filter((share) => share.memberId === CURRENT_USER_ID)
        .reduce(
          (runningTotal, share) => runningTotal + toCents(share.amount),
          0,
        );

      return runningNet + paidCents - owedCents;
    }, 0);
}

export function calculateFriendBalances(
  friends: IPerson[],
  directExpenses: IDirectExpense[],
): IMemberBalance[] {
  return friends.map((friend) => {
    const netCents = calculateFriendNetCents(friend.id, directExpenses);

    return {
      id: friend.id,
      name: friend.name,
      amount: fromCents(Math.abs(netCents)),
      status: resolveBalanceStatus(netCents),
    };
  });
}
