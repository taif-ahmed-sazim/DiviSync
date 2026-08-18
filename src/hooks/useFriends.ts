import { useMemo, useState } from "react";

import {
  directExpenses as initialDirectExpenses,
  friendIds as initialFriendIds,
} from "@/data/mockData";
import type { IDirectExpense, IPerson } from "@/types/domain.interfaces";
import {
  calculateFriendBalances,
  resolveFriends,
} from "@/utils/friends.helpers";

export function useFriends(people: IPerson[]) {
  const [friendIds] = useState<string[]>(initialFriendIds);
  const [directExpenses] =
    useState<IDirectExpense[]>(initialDirectExpenses);

  const friends = useMemo(
    () => resolveFriends(people, friendIds),
    [people, friendIds],
  );

  const friendBalances = useMemo(
    () => calculateFriendBalances(friends, directExpenses),
    [friends, directExpenses],
  );

  return { friends, friendBalances };
}
