import { useState } from "react";

import styles from "./AddExpenseModal.module.css";

interface AddExpenseModalProps {
  onClose: () => void;
}

export function AddExpenseModal({ onClose }: AddExpenseModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

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
          <label className={styles.field}>
            <span>Description</span>

            <input
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Dinner, Airbnb, groceries..."
              type="text"
              value={description}
            />
          </label>

          <label className={styles.field}>
            <span>Amount</span>

            <input
              inputMode="decimal"
              min="0"
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              step="0.01"
              type="number"
              value={amount}
            />
          </label>

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
