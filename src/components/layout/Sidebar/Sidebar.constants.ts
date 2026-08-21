import { EAppView } from "@/types/domain.enums";

import type { INavItem } from "./Sidebar.interfaces";

export const SIDEBAR_BRAND = "DiviSync";
export const GROUPS_SECTION_TITLE = "Your groups";
export const NEW_GROUP_LABEL = "+ New group";

export const NAVIGATION_ITEMS: INavItem[] = [
  { id: "home", label: "Home" },
  { id: "friends", label: "Friends", view: EAppView.FRIENDS },
  { id: "groups", label: "Groups", view: EAppView.GROUP },
  { id: "expenses", label: "Expenses" },
  { id: "activity", label: "Activity" },
  { id: "settings", label: "Settings" },
];
