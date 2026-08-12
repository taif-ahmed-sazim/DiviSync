import styles from "./GroupHeader.module.css";

export function GroupHeader() {
  return (
    <section className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Group</p>
        <h1 className={styles.title}>Gamer Bros</h1>
        <p className={styles.description}>
          Turjo, Asif, Sadik, Wardat and Amio
        </p>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryButton}>
          New expense
        </button>

        <button className={styles.secondaryButton}>
          Settle up
        </button>
      </div>
    </section>
  );
}
