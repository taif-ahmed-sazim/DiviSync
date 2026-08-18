import { useState } from "react";

import { people as initialPeople } from "@/data/mockData";
import type { IPerson } from "@/types/domain.interfaces";

export function usePeople() {
  const [people] = useState<IPerson[]>(initialPeople);

  return { people };
}
