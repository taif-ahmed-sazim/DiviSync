import { ESplitMode } from "@/types/domain.enums";

export const ADD_EXPENSE_TITLE = "Add expense";
export const ADD_EXPENSE_TITLE_ID = "add-expense-title";

export const DESCRIPTION_MAX_LENGTH = 80;

export const DESCRIPTION_REQUIRED_MESSAGE = "Description is required";
export const DESCRIPTION_MAX_LENGTH_MESSAGE = `Description must be at most ${DESCRIPTION_MAX_LENGTH} characters`;

export const EQUAL_SPLIT_LABEL = "Split equally";
export const CUSTOM_SPLIT_LABEL = "Custom amounts";
export const PER_PERSON_LABEL = "per person";
export const SPLIT_MODE_LEGEND = "How to split";

export const SPLIT_MODE_OPTIONS = [
  { value: ESplitMode.EQUAL, label: EQUAL_SPLIT_LABEL },
  { value: ESplitMode.CUSTOM, label: CUSTOM_SPLIT_LABEL },
] as const;

export const ASSIGNED_LABEL = "Assigned";
export const SPLIT_TOTAL_MISMATCH_MESSAGE =
  "Custom amounts must add up to the expense total";

export const PAYER_REQUIRED_MESSAGE = "Select who paid for this expense";
export const PARTICIPANTS_REQUIRED_MESSAGE =
  "Select at least one participant";

export const AMOUNT_REQUIRED_MESSAGE = "Amount is required";
export const AMOUNT_INVALID_MESSAGE = "Amount must be a valid number";
export const AMOUNT_MIN_MESSAGE = "Amount must be greater than zero";
