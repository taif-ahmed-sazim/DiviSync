import type { IPerson } from "@/types/domain.interfaces";

import { PERSON_REQUIRED_MESSAGE } from "./AddMemberModal.constants";

export function buildInitialPersonId(candidates: IPerson[]): string {
  if (candidates.length === 0) {
    return "";
  }

  return candidates[0].id;
}

export function getPersonError(
  personId: string,
  candidates: IPerson[],
): string | undefined {
  const isCandidate = candidates.some(
    (candidate) => candidate.id === personId,
  );

  if (!isCandidate) {
    return PERSON_REQUIRED_MESSAGE;
  }

  return undefined;
}
