import { ECurrency } from "@/types/domain.enums";

export const CREATE_GROUP_TITLE = "Create group";
export const CREATE_GROUP_EYEBROW = "New group";
export const CREATE_GROUP_TITLE_ID = "create-group-title";

export const CANCEL_LABEL = "Cancel";
export const CREATE_SUBMIT_LABEL = "Create group";

export const NAME_LABEL = "Group name";
export const DESCRIPTION_LABEL = "Description";
export const CURRENCY_LABEL = "Currency";
export const MEMBERS_LEGEND = "Members";

export const NAME_PLACEHOLDER = "Bali Trip";
export const DESCRIPTION_PLACEHOLDER = "What is this group for?";

export const GROUP_NAME_MIN_LENGTH = 3;
export const GROUP_NAME_MAX_LENGTH = 50;
export const GROUP_DESCRIPTION_MAX_LENGTH = 120;

export const GROUP_NAME_REQUIRED_MESSAGE = "Group name is required";
export const GROUP_NAME_MIN_LENGTH_MESSAGE = `Group name must be at least ${GROUP_NAME_MIN_LENGTH} characters`;
export const GROUP_NAME_MAX_LENGTH_MESSAGE = `Group name must be at most ${GROUP_NAME_MAX_LENGTH} characters`;
export const GROUP_DESCRIPTION_MAX_LENGTH_MESSAGE = `Description must be at most ${GROUP_DESCRIPTION_MAX_LENGTH} characters`;
export const GROUP_MEMBERS_REQUIRED_MESSAGE =
  "Select at least one other member";

export const CURRENCY_OPTIONS = [
  { value: ECurrency.BDT, label: "BDT — Taka" },
  { value: ECurrency.USD, label: "USD — Dollar" },
  { value: ECurrency.EUR, label: "EUR — Euro" },
] as const;
