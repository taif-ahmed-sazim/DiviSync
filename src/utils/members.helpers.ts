import { NO_MEMBERS_LABEL } from "@/constants/group.constants";
import type { IPerson } from "@/types/domain.interfaces";

const UNKNOWN_MEMBER_NAME = "Unknown member";

export function findMemberName(
  members: IPerson[],
  memberId: string,
): string {
  const member = members.find((groupMember) => groupMember.id === memberId);

  return member?.name ?? UNKNOWN_MEMBER_NAME;
}

export function buildMemberNamesSummary(members: IPerson[]): string {
  if (members.length === 0) {
    return NO_MEMBERS_LABEL;
  }

  const names = members.map((member) => member.name);

  if (names.length === 1) {
    return names[0];
  }

  const lastName = names[names.length - 1];
  const earlierNames = names.slice(0, names.length - 1);

  return `${earlierNames.join(", ")} and ${lastName}`;
}
