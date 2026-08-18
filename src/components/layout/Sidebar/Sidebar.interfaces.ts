import type { IGroup } from "@/types/domain.interfaces";

export interface INavItem {
  id: string;
  label: string;
}

export interface ISidebarProps {
  activeGroupId: string | null;
  groups: IGroup[];
  onSelectGroup: (groupId: string) => void;
}
