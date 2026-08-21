import { CURRENT_USER_ID } from "@/constants/group.constants";
import { ESplitMode } from "@/types/domain.enums";
import type { ECurrency } from "@/types/domain.enums";
import type {
  IExpense,
  IExpenseShare,
  IPerson,
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
} from "./ExpenseFormModal.constants";
import type {
  IExpenseFormErrors,
  IExpenseFormValues,
} from "./ExpenseFormModal.interfaces";
import type { TCustomShareInputs } from "./ExpenseFormModal.types";

export const expenseFormInitialValues: IExpenseFormValues = {
  description: "",
  amount: "",
  paidById: CURRENT_USER_ID,
  participantIds: [],
  splitMode: ESplitMode.EQUAL,
  customShares: {},
};

export function buildExpenseFormInitialValues(
  members: IPerson[],
): IExpenseFormValues {
  return {
    ...expenseFormInitialValues,
    participantIds: members.map((member) => member.id),
  };
}

export function buildCustomShareInputs(
  shares: IExpenseShare[],
): TCustomShareInputs {
  return shares.reduce<TCustomShareInputs>(
    (inputs, share) => ({ ...inputs, [share.memberId]: String(share.amount) }),
    {},
  );
}

export function buildExpenseFormValues(
  members: IPerson[],
  expense?: IExpense,
): IExpenseFormValues {
  if (expense === undefined) {
    return buildExpenseFormInitialValues(members);
  }

  return {
    description: expense.title,
    amount: String(expense.amount),
    paidById: expense.paidById,
    participantIds: expense.participantIds,
    splitMode: expense.splitMode,
    customShares: buildCustomShareInputs(expense.shares),
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

export function buildPerPersonSummary(
  perPersonAmount: number,
  currency: ECurrency,
): string {
  return `${formatCurrency(perPersonAmount, currency)} ${PER_PERSON_LABEL}`;
}

export function getPayerError(
  paidById: string,
  members: IPerson[],
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
  currency: ECurrency,
): string {
  return `${formatCurrency(assignedAmount, currency)} of ${formatCurrency(
    totalAmount,
    currency,
  )}`;
}

export function validateExpenseForm(
  values: IExpenseFormValues,
  members: IPerson[],
  shares: IExpenseShare[],
): IExpenseFormErrors {
  return {
    description: getDescriptionError(values.description),
    amount: getAmountError(values.amount),
    paidById: getPayerError(values.paidById, members),
    participantIds: getParticipantsError(values.participantIds),
    customShares: getCustomSplitError(values.splitMode, values.amount, shares),
  };
}

export function hasFormErrors(errors: IExpenseFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
