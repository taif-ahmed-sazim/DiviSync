import type { IPerson } from "@/types/domain.interfaces";

const UNKNOWN_MEMBER_NAME = "Unknown member";

export function findMemberName(
  members: IPerson[],
  memberId: string,
): string {
  const member = members.find((groupMember) => groupMember.id === memberId);

  return member?.name ?? UNKNOWN_MEMBER_NAME;
}
