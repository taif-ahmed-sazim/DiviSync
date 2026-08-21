import styles from "./GroupHeader.module.css";

interface IGroupHeaderProps {
  onNewExpense: () => void;
}

export function GroupHeader({ onNewExpense }: IGroupHeaderProps) {
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
        <button
          className={styles.primaryButton}
          onClick={onNewExpense}
          type="button"
        >
          New expense
        </button>

        <button className={styles.secondaryButton} type="button">
          Settle up
        </button>
      </div>
    </section>
  );
}
