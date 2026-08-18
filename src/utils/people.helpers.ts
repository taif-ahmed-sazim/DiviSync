import type { IPerson } from "@/types/domain.interfaces";

export function createPerson(name: string): IPerson {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
  };
}

export function findPersonByName(
  people: IPerson[],
  name: string,
): IPerson | null {
  const searchedName = name.trim().toLowerCase();

  const person = people.find(
    (item) => item.name.toLowerCase() === searchedName,
  );

  return person ?? null;
}
