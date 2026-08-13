import { CURRENT_USER_ID } from "@/constants/group.constants";
import { ESplitMode } from "@/types/domain.enums";
import type { IGroupMember } from "@/types/domain.interfaces";
import { formatCurrency } from "@/utils/formatCurrency";

import {
  AMOUNT_INVALID_MESSAGE,
  AMOUNT_MIN_MESSAGE,
  AMOUNT_REQUIRED_MESSAGE,
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH_MESSAGE,
  DESCRIPTION_REQUIRED_MESSAGE,
  PARTICIPANTS_REQUIRED_MESSAGE,
  PAYER_REQUIRED_MESSAGE,
  PER_PERSON_LABEL,
} from "./AddExpenseModal.constants";
import type {
  IAddExpenseFormErrors,
  IAddExpenseFormValues,
} from "./AddExpenseModal.interfaces";

export const addExpenseFormInitialValues: IAddExpenseFormValues = {
  description: "",
  amount: "",
  paidById: CURRENT_USER_ID,
  participantIds: [],
  splitMode: ESplitMode.EQUAL,
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

export function getAmountError(amount: string): string | undefined {
  const trimmedAmount = amount.trim();

  if (trimmedAmount.length === 0) {
    return AMOUNT_REQUIRED_MESSAGE;
  }

  const parsedAmount = Number(trimmedAmount);

  if (Number.isNaN(parsedAmount)) {
    return AMOUNT_INVALID_MESSAGE;
  }

  if (parsedAmount <= 0) {
    return AMOUNT_MIN_MESSAGE;
  }

  return undefined;
}

export function parseAmount(amount: string): number {
  const parsedAmount = Number(amount.trim());

  if (Number.isNaN(parsedAmount)) {
    return 0;
  }

  return parsedAmount;
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

export function validateAddExpenseForm(
  values: IAddExpenseFormValues,
  members: IGroupMember[],
): IAddExpenseFormErrors {
  return {
    description: getDescriptionError(values.description),
    amount: getAmountError(values.amount),
    paidById: getPayerError(values.paidById, members),
    participantIds: getParticipantsError(values.participantIds),
  };
}

export function hasFormErrors(errors: IAddExpenseFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
