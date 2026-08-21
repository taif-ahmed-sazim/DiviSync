import type { ECurrency } from "@/types/domain.enums";

const CURRENCY_LOCALE = "en-US";

export function formatCurrency(amount: number, currency: ECurrency): string {
  return amount.toLocaleString(CURRENCY_LOCALE, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  });
}
