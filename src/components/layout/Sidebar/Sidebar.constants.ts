import type { IGroupItem, INavItem } from "./Sidebar.interfaces";

export const SIDEBAR_BRAND = "DiviSync";
export const GROUPS_SECTION_TITLE = "Your groups";

export const NAVIGATION_ITEMS: INavItem[] = [
  { id: "home", label: "Home" },
  { id: "friends", label: "Friends" },
  { id: "groups", label: "Groups" },
  { id: "expenses", label: "Expenses" },
  { id: "activity", label: "Activity" },
  { id: "settings", label: "Settings" },
];

export const SIDEBAR_GROUPS: IGroupItem[] = [
  { id: "group-gamer-bros", name: "Gamer Bros" },
  { id: "group-bali", name: "Bali Trip" },
  { id: "group-birthday", name: "Asif's Birthday" },
];
