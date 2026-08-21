import {
  AMOUNT_INVALID_MESSAGE,
  AMOUNT_MIN_MESSAGE,
  AMOUNT_REQUIRED_MESSAGE,
} from "@/constants/amount.constants";

export function parseAmount(amount: string): number {
  const parsedAmount = Number(amount.trim());

  if (Number.isNaN(parsedAmount)) {
    return 0;
  }

  return parsedAmount;
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
