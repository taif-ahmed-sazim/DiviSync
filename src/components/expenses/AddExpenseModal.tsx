import styles from "./AddExpenseModal.module.css";

interface AddExpenseModalProps {
  onClose: () => void;
}

export function AddExpenseModal({ onClose }: AddExpenseModalProps) {
  return (
    <div className={styles.backdrop}>
      <section
        aria-labelledby="add-expense-title"
        className={styles.modal}
        role="dialog"
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Gamer Bros</p>

            <h2 className={styles.title} id="add-expense-title">
              Add expense
            </h2>
          </div>

          <button
            aria-label="Close"
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>

        <form className={styles.form}>
          <div className={styles.actions}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>

            <button className={styles.submitButton} type="submit">
              Add expense
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
