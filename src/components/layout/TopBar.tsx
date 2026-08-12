import styles from "./TopBar.module.css";

const currentUserName = "Turjo";

export function TopBar() {
  return (
    <header className={styles.topBar}>
      <label className={styles.search}>
        <span className={styles.searchIcon}>⌕</span>

        <input
          className={styles.searchInput}
          placeholder="Search..."
          type="search"
        />
      </label>

      <div className={styles.profile}>
        <span className={styles.avatar}>
          {currentUserName.charAt(0)}
        </span>

        <strong>{currentUserName}</strong>
      </div>
    </header>
  );
}
