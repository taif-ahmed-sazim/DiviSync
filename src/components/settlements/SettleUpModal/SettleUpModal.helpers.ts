import { CURRENT_USER_ID } from "@/constants/group.constants";
import type { IPerson } from "@/types/domain.interfaces";
import { getAmountError } from "@/utils/amount.helpers";

import {
  MEMBER_REQUIRED_MESSAGE,
  SAME_MEMBER_MESSAGE,
} from "./SettleUpModal.constants";
import type {
  ISettleUpFormErrors,
  ISettleUpFormValues,
} from "./SettleUpModal.interfaces";

export const settleUpFormInitialValues: ISettleUpFormValues = {
  fromMemberId: CURRENT_USER_ID,
  toMemberId: "",
  amount: "",
};

export function buildSettleUpFormInitialValues(
  members: IPerson[],
): ISettleUpFormValues {
  const receiver = members.find((member) => member.id !== CURRENT_USER_ID);

  return {
    ...settleUpFormInitialValues,
    toMemberId: receiver?.id ?? "",
  };
}

export function getMemberError(
  memberId: string,
  members: IPerson[],
): string | undefined {
  const isGroupMember = members.some((member) => member.id === memberId);

  if (!isGroupMember) {
    return MEMBER_REQUIRED_MESSAGE;
  }

  return undefined;
}

export function getReceiverError(
  values: ISettleUpFormValues,
  members: IPerson[],
): string | undefined {
  const memberError = getMemberError(values.toMemberId, members);

  if (memberError !== undefined) {
    return memberError;
  }

  if (values.toMemberId === values.fromMemberId) {
    return SAME_MEMBER_MESSAGE;
  }

  return undefined;
}

export function validateSettleUpForm(
  values: ISettleUpFormValues,
  members: IPerson[],
): ISettleUpFormErrors {
  return {
    fromMemberId: getMemberError(values.fromMemberId, members),
    toMemberId: getReceiverError(values, members),
    amount: getAmountError(values.amount),
  };
}

export function hasSettleUpFormErrors(errors: ISettleUpFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
