import { useState } from "react";

import { people as initialPeople } from "@/data/mockData";
import type { IPerson } from "@/types/domain.interfaces";
import { createPerson } from "@/utils/people.helpers";

export function usePeople() {
  const [people, setPeople] = useState<IPerson[]>(initialPeople);

  const addPerson = (name: string) => {
    const person = createPerson(name);

    setPeople((currentPeople) => [...currentPeople, person]);

    return person;
  };

  return { people, addPerson };
}
