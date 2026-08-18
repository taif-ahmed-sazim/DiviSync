import { CURRENT_USER_ID, DEFAULT_CURRENCY } from "@/constants/group.constants";
import type { ECurrency } from "@/types/domain.enums";

import {
  CURRENCY_OPTIONS,
  GROUP_DESCRIPTION_MAX_LENGTH,
  GROUP_DESCRIPTION_MAX_LENGTH_MESSAGE,
  GROUP_MEMBERS_REQUIRED_MESSAGE,
  GROUP_NAME_MAX_LENGTH,
  GROUP_NAME_MAX_LENGTH_MESSAGE,
  GROUP_NAME_MIN_LENGTH,
  GROUP_NAME_MIN_LENGTH_MESSAGE,
  GROUP_NAME_REQUIRED_MESSAGE,
} from "./CreateGroupModal.constants";
import type {
  ICreateGroupFormErrors,
  ICreateGroupFormValues,
} from "./CreateGroupModal.interfaces";

export const createGroupFormInitialValues: ICreateGroupFormValues = {
  name: "",
  description: "",
  currency: DEFAULT_CURRENCY,
  memberIds: [CURRENT_USER_ID],
};

export function parseCurrency(value: string): ECurrency {
  const matchedOption = CURRENCY_OPTIONS.find(
    (option) => option.value === value,
  );

  return matchedOption?.value ?? DEFAULT_CURRENCY;
}

export function toggleMemberId(
  memberIds: string[],
  personId: string,
): string[] {
  if (memberIds.includes(personId)) {
    return memberIds.filter((memberId) => memberId !== personId);
  }

  return [...memberIds, personId];
}

export function getGroupNameError(name: string): string | undefined {
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return GROUP_NAME_REQUIRED_MESSAGE;
  }

  if (trimmedName.length < GROUP_NAME_MIN_LENGTH) {
    return GROUP_NAME_MIN_LENGTH_MESSAGE;
  }

  if (trimmedName.length > GROUP_NAME_MAX_LENGTH) {
    return GROUP_NAME_MAX_LENGTH_MESSAGE;
  }

  return undefined;
}

export function getGroupDescriptionError(
  description: string,
): string | undefined {
  if (description.trim().length > GROUP_DESCRIPTION_MAX_LENGTH) {
    return GROUP_DESCRIPTION_MAX_LENGTH_MESSAGE;
  }

  return undefined;
}

export function getGroupMembersError(memberIds: string[]): string | undefined {
  const otherMemberIds = memberIds.filter(
    (memberId) => memberId !== CURRENT_USER_ID,
  );

  if (otherMemberIds.length === 0) {
    return GROUP_MEMBERS_REQUIRED_MESSAGE;
  }

  return undefined;
}

export function validateCreateGroupForm(
  values: ICreateGroupFormValues,
): ICreateGroupFormErrors {
  return {
    name: getGroupNameError(values.name),
    description: getGroupDescriptionError(values.description),
    memberIds: getGroupMembersError(values.memberIds),
  };
}

export function hasCreateGroupFormErrors(
  errors: ICreateGroupFormErrors,
): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
