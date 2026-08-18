import type { IGroup, IPerson } from "@/types/domain.interfaces";

export function findGroupById(
  groups: IGroup[],
  groupId: string,
): IGroup | null {
  const group = groups.find((item) => item.id === groupId);

  return group ?? null;
}

export function resolveGroupMembers(
  people: IPerson[],
  group: IGroup | null,
): IPerson[] {
  if (group === null) {
    return [];
  }

  return people.filter((person) => group.memberIds.includes(person.id));
}
