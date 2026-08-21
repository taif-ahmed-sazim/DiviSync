import dayjs from "dayjs";

const EXPENSE_DATE_FORMAT = "MMM D";

export function formatExpenseDate(date: string): string {
  return dayjs(date).format(EXPENSE_DATE_FORMAT);
}
