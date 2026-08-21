import { CURRENT_USER_ID } from "@/constants/group.constants";
import { ESplitMode } from "@/types/domain.enums";
import type {
  IExpenseShare,
  IGroupMember,
} from "@/types/domain.interfaces";
import { getAmountError, parseAmount } from "@/utils/amount.helpers";
import { formatCurrency } from "@/utils/formatCurrency";
import { sumShareAmounts, toCents } from "@/utils/splits.helpers";

import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH_MESSAGE,
  DESCRIPTION_REQUIRED_MESSAGE,
  PARTICIPANTS_REQUIRED_MESSAGE,
  PAYER_REQUIRED_MESSAGE,
  PER_PERSON_LABEL,
  SPLIT_TOTAL_MISMATCH_MESSAGE,
} from "./AddExpenseModal.constants";
import type {
  IAddExpenseFormErrors,
  IAddExpenseFormValues,
} from "./AddExpenseModal.interfaces";
import type { TCustomShareInputs } from "./AddExpenseModal.types";

export const addExpenseFormInitialValues: IAddExpenseFormValues = {
  description: "",
  amount: "",
  paidById: CURRENT_USER_ID,
  participantIds: [],
  splitMode: ESplitMode.EQUAL,
  customShares: {},
};

export function buildAddExpenseFormInitialValues(
  members: IGroupMember[],
): IAddExpenseFormValues {
  return {
    ...addExpenseFormInitialValues,
    participantIds: members.map((member) => member.id),
  };
}

export function toggleParticipantId(
  participantIds: string[],
  memberId: string,
): string[] {
  if (participantIds.includes(memberId)) {
    return participantIds.filter(
      (participantId) => participantId !== memberId,
    );
  }

  return [...participantIds, memberId];
}

export function getDescriptionError(description: string): string | undefined {
  const trimmedDescription = description.trim();

  if (trimmedDescription.length === 0) {
    return DESCRIPTION_REQUIRED_MESSAGE;
  }

  if (trimmedDescription.length > DESCRIPTION_MAX_LENGTH) {
    return DESCRIPTION_MAX_LENGTH_MESSAGE;
  }

  return undefined;
}

export function setCustomShare(
  customShares: TCustomShareInputs,
  memberId: string,
  amount: string,
): TCustomShareInputs {
  return { ...customShares, [memberId]: amount };
}

export function buildCustomShares(
  participantIds: string[],
  customShares: TCustomShareInputs,
): IExpenseShare[] {
  return participantIds.map((memberId) => ({
    memberId,
    amount: parseAmount(customShares[memberId] ?? ""),
  }));
}

export function buildPerPersonSummary(perPersonAmount: number): string {
  return `${formatCurrency(perPersonAmount)} ${PER_PERSON_LABEL}`;
}

export function getPayerError(
  paidById: string,
  members: IGroupMember[],
): string | undefined {
  const isGroupMember = members.some((member) => member.id === paidById);

  if (!isGroupMember) {
    return PAYER_REQUIRED_MESSAGE;
  }

  return undefined;
}

export function getParticipantsError(
  participantIds: string[],
): string | undefined {
  if (participantIds.length === 0) {
    return PARTICIPANTS_REQUIRED_MESSAGE;
  }

  return undefined;
}

export function getCustomSplitError(
  splitMode: ESplitMode,
  amount: string,
  shares: IExpenseShare[],
): string | undefined {
  if (splitMode !== ESplitMode.CUSTOM) {
    return undefined;
  }

  if (toCents(sumShareAmounts(shares)) !== toCents(parseAmount(amount))) {
    return SPLIT_TOTAL_MISMATCH_MESSAGE;
  }

  return undefined;
}

export function buildAssignedSummary(
  assignedAmount: number,
  totalAmount: number,
): string {
  return `${formatCurrency(assignedAmount)} of ${formatCurrency(totalAmount)}`;
}

export function validateAddExpenseForm(
  values: IAddExpenseFormValues,
  members: IGroupMember[],
  shares: IExpenseShare[],
): IAddExpenseFormErrors {
  return {
    description: getDescriptionError(values.description),
    amount: getAmountError(values.amount),
    paidById: getPayerError(values.paidById, members),
    participantIds: getParticipantsError(values.participantIds),
    customShares: getCustomSplitError(values.splitMode, values.amount, shares),
  };
}

export function hasFormErrors(errors: IAddExpenseFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
