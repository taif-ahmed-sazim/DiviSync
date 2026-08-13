import {
  AMOUNT_INVALID_MESSAGE,
  AMOUNT_MIN_MESSAGE,
  AMOUNT_REQUIRED_MESSAGE,
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH_MESSAGE,
  DESCRIPTION_REQUIRED_MESSAGE,
} from "./AddExpenseModal.constants";
import type {
  IAddExpenseFormErrors,
  IAddExpenseFormValues,
} from "./AddExpenseModal.interfaces";

export const addExpenseFormInitialValues: IAddExpenseFormValues = {
  description: "",
  amount: "",
};

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

export function validateAddExpenseForm(
  values: IAddExpenseFormValues,
): IAddExpenseFormErrors {
  return {
    description: getDescriptionError(values.description),
    amount: getAmountError(values.amount),
  };
}

export function hasFormErrors(errors: IAddExpenseFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
