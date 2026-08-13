import { useState } from "react";
import type { FormEvent } from "react";

import {
  buildAddExpenseFormInitialValues,
  hasFormErrors,
  toggleParticipantId,
  validateAddExpenseForm,
} from "./AddExpenseModal.helpers";
import type {
  IAddExpenseFormErrors,
  IAddExpenseModalProps,
} from "./AddExpenseModal.interfaces";

import styles from "./AddExpenseModal.module.css";

export function AddExpenseModal({
  members,
  onClose,
  onSubmit,
}: IAddExpenseModalProps) {
  const [values, setValues] = useState(() =>
    buildAddExpenseFormInitialValues(members),
  );
  const [errors, setErrors] = useState<IAddExpenseFormErrors>({});

  const resetForm = () => {
    setValues(buildAddExpenseFormInitialValues(members));
    setErrors({});
  };

  const handleParticipantToggle = (memberId: string) => {
    setValues((current) => ({
      ...current,
      participantIds: toggleParticipantId(current.participantIds, memberId),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateAddExpenseForm(values);
    setErrors(nextErrors);

    if (hasFormErrors(nextErrors)) {
      return;
    }

    onSubmit(values);
    resetForm();
  };

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

        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Description</span>

            <input
              aria-invalid={errors.description !== undefined}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Dinner, Airbnb, groceries..."
              type="text"
              value={values.description}
            />

            {errors.description ? (
              <span className={styles.error}>{errors.description}</span>
            ) : null}
          </label>

          <label className={styles.field}>
            <span>Amount</span>

            <input
              aria-invalid={errors.amount !== undefined}
              inputMode="decimal"
              min="0"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  amount: event.target.value,
                }))
              }
              placeholder="0.00"
              step="0.01"
              type="number"
              value={values.amount}
            />

            {errors.amount ? (
              <span className={styles.error}>{errors.amount}</span>
            ) : null}
          </label>

          <label className={styles.field}>
            <span>Paid by</span>

            <select
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  paidById: event.target.value,
                }))
              }
              value={values.paidById}
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>

          <fieldset className={styles.participants}>
            <legend>Split between</legend>

            {members.map((member) => (
              <label className={styles.participant} key={member.id}>
                <input
                  checked={values.participantIds.includes(member.id)}
                  onChange={() => handleParticipantToggle(member.id)}
                  type="checkbox"
                />

                <span>{member.name}</span>
              </label>
            ))}
          </fieldset>

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
