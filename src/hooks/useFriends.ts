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
import { findPersonByName } from "@/utils/people.helpers";

export function useFriends(
  people: IPerson[],
  addPerson: (name: string) => IPerson,
) {
  const [friendIds, setFriendIds] = useState<string[]>(initialFriendIds);
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

  const addFriend = (name: string) => {
    const existingPerson = findPersonByName(people, name);

    if (existingPerson !== null) {
      setFriendIds((currentFriendIds) => [
        ...currentFriendIds,
        existingPerson.id,
      ]);

      return;
    }

    const person = addPerson(name);

    setFriendIds((currentFriendIds) => [...currentFriendIds, person.id]);
  };

  return { friends, friendBalances, addFriend };
}
