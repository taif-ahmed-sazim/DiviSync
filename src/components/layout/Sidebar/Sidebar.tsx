import { EAppView } from "@/types/domain.enums";

import {
  GROUPS_SECTION_TITLE,
  NAVIGATION_ITEMS,
  NEW_GROUP_LABEL,
  SIDEBAR_BRAND,
} from "./Sidebar.constants";
import type { INavItem, ISidebarProps } from "./Sidebar.interfaces";

import styles from "./Sidebar.module.css";

export function Sidebar({
  activeGroupId,
  activeView,
  groups,
  onCreateGroup,
  onSelectGroup,
  onSelectView,
}: ISidebarProps) {
  const isGroupActive = (groupId: string) => {
    return activeView === EAppView.GROUP && groupId === activeGroupId;
  };

  const handleSelectNavItem = (item: INavItem) => {
    if (item.view === undefined) {
      return;
    }

    onSelectView(item.view);
  };

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.brand}>{SIDEBAR_BRAND}</h1>

      <nav className={styles.navigation}>
        {NAVIGATION_ITEMS.map((item) => (
          <button
            className={
              item.view === activeView
                ? styles.activeNavButton
                : styles.navButton
            }
            key={item.id}
            onClick={() => handleSelectNavItem(item)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>{GROUPS_SECTION_TITLE}</p>

        {groups.map((group) => (
          <button
            className={
              isGroupActive(group.id)
                ? styles.activeGroupButton
                : styles.groupButton
            }
            key={group.id}
            onClick={() => onSelectGroup(group.id)}
            type="button"
          >
            {group.name}
          </button>
        ))}

        <button
          className={styles.newGroupButton}
          onClick={onCreateGroup}
          type="button"
        >
          {NEW_GROUP_LABEL}
        </button>
      </section>
    </aside>
  );
}
