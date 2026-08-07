import styles from "./Sidebar.module.css";

type NavItem = {
  label: string;
  active?: boolean;
};

const navigationItems: NavItem[] = [
    { label: "Home",},
    { label: "Friends",},
    { label: "Groups", active: true,},
    { label: "Expenses",},
];


export function Sidebar() {
    return (
        <aside className={styles.sidebar}>  
            <h1 className={styles.title}>DiviSync</h1>
            <nav className={styles.nav}>
                {navigationItems.map((item) => (
                    <button
                        key={item.label}
                        className={styles.navButton}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
