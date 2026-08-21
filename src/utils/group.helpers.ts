import type {
  ICreateGroupInput,
  IGroup,
  IPerson,
} from "@/types/domain.interfaces";

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

export function resolveNonMembers(
  people: IPerson[],
  group: IGroup | null,
): IPerson[] {
  if (group === null) {
    return [];
  }

  return people.filter((person) => !group.memberIds.includes(person.id));
}

export function createGroup(input: ICreateGroupInput): IGroup {
  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    description: input.description.trim(),
    currency: input.currency,
    memberIds: input.memberIds,
  };
}
