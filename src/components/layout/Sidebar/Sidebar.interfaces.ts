import type { EAppView } from "@/types/domain.enums";
import type { IGroup } from "@/types/domain.interfaces";

export interface INavItem {
  id: string;
  label: string;
  view?: EAppView;
}

export interface ISidebarProps {
  activeGroupId: string | null;
  activeView: EAppView;
  groups: IGroup[];
  onCreateGroup: () => void;
  onSelectGroup: (groupId: string) => void;
  onSelectView: (view: EAppView) => void;
}
