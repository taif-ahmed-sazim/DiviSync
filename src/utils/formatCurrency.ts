const CURRENCY_LOCALE = "en-US";
const CURRENCY_CODE = "BDT";

export function formatCurrency(amount: number): string {
  return amount.toLocaleString(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
    currencyDisplay: "narrowSymbol",
  });
}
