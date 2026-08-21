import styles from "./Sidebar.module.css";

interface INavItem {
  id: string;
  label: string;
}

interface IGroupItem {
  id: string;
  name: string;
}

const navigationItems: INavItem[] = [
  { id: "home", label: "Home" },
  { id: "friends", label: "Friends" },
  { id: "groups", label: "Groups" },
  { id: "expenses", label: "Expenses" },
  { id: "activity", label: "Activity" },
  { id: "settings", label: "Settings" },
];

const groups: IGroupItem[] = [
  {
    id: "group-gamer-bros",
    name: "Gamer Bros",
  },
  {
    id: "group-bali",
    name: "Bali Trip",
  },
  {
    id: "group-birthday",
    name: "Asif's Birthday",
  },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.brand}>DiviSync</h1>

      <nav className={styles.navigation}>
        {navigationItems.map((item) => (
          <button
            className={styles.navButton}
            key={item.id}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>Your groups</p>

        {groups.map((group) => (
          <button
            className={styles.groupButton}
            key={group.id}
          >
            {group.name}
          </button>
        ))}
      </section>
    </aside>
  );
}
