import {
  GROUPS_SECTION_TITLE,
  NAVIGATION_ITEMS,
  SIDEBAR_BRAND,
  SIDEBAR_GROUPS,
} from "./Sidebar.constants";

import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.brand}>{SIDEBAR_BRAND}</h1>

      <nav className={styles.navigation}>
        {NAVIGATION_ITEMS.map((item) => (
          <button className={styles.navButton} key={item.id}>
            {item.label}
          </button>
        ))}
      </nav>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>{GROUPS_SECTION_TITLE}</p>

        {SIDEBAR_GROUPS.map((group) => (
          <button className={styles.groupButton} key={group.id}>
            {group.name}
          </button>
        ))}
      </section>
    </aside>
  );
}
