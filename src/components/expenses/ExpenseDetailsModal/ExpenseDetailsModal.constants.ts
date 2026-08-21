import { ESplitMode } from "@/types/domain.enums";

export const EXPENSE_DETAILS_TITLE_ID = "expense-details-title";
export const EXPENSE_DETAILS_EYEBROW = "Expense";

export const TOTAL_LABEL = "Total";
export const PAID_BY_LABEL = "Paid by";
export const DATE_LABEL = "Date";
export const SPLIT_LABEL = "Split";
export const PARTICIPANTS_HEADING = "Participants";

export const SPLIT_MODE_LABELS = {
  [ESplitMode.EQUAL]: "Equally",
  [ESplitMode.CUSTOM]: "Custom amounts",
} as const;
