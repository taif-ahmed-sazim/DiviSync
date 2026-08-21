import type { IGroupMember } from "@/types/domain.interfaces";

const UNKNOWN_MEMBER_NAME = "Unknown member";

export function findMemberName(
  members: IGroupMember[],
  memberId: string,
): string {
  const member = members.find((groupMember) => groupMember.id === memberId);

  return member?.name ?? UNKNOWN_MEMBER_NAME;
}
