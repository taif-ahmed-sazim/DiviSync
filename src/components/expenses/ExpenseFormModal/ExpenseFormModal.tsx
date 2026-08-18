import { useState } from "react";
import type { FormEvent } from "react";

import { Modal } from "@/components/common/Modal";
import { ESplitMode } from "@/types/domain.enums";
import { parseAmount } from "@/utils/amount.helpers";
import { findMemberName } from "@/utils/members.helpers";
import { sumShareAmounts } from "@/utils/splits.helpers";

import {
  ADD_EXPENSE_TITLE,
  ASSIGNED_LABEL,
  CANCEL_LABEL,
  CREATE_SUBMIT_LABEL,
  EDIT_EXPENSE_TITLE,
  EQUAL_SPLIT_LABEL,
  EXPENSE_FORM_TITLE_ID,
  SAVE_SUBMIT_LABEL,
  SPLIT_MODE_LEGEND,
  SPLIT_MODE_OPTIONS,
} from "./ExpenseFormModal.constants";
import {
  buildAssignedSummary,
  buildExpenseFormValues,
  buildPerPersonSummary,
  hasFormErrors,
  setCustomShare,
  toggleParticipantId,
  validateExpenseForm,
} from "./ExpenseFormModal.helpers";
import { useSplitShares } from "./ExpenseFormModal.hooks";
import type {
  IExpenseFormErrors,
  IExpenseFormModalProps,
} from "./ExpenseFormModal.interfaces";

import styles from "./ExpenseFormModal.module.css";

export function ExpenseFormModal({
  currency,
  expense,
  groupName,
  members,
  onClose,
  onSubmit,
}: IExpenseFormModalProps) {
  const isEditing = expense !== undefined;

  const [values, setValues] = useState(() =>
    buildExpenseFormValues(members, expense),
  );
  const [errors, setErrors] = useState<IExpenseFormErrors>({});

  const shares = useSplitShares(values);

  const resetForm = () => {
    setValues(buildExpenseFormValues(members, expense));
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

    const nextErrors = validateExpenseForm(values, members, shares);
    setErrors(nextErrors);

    if (hasFormErrors(nextErrors)) {
      return;
    }

    onSubmit({ values, shares });
    resetForm();
  };

  return (
    <Modal
      eyebrow={groupName}
      onClose={onClose}
      title={isEditing ? EDIT_EXPENSE_TITLE : ADD_EXPENSE_TITLE}
      titleId={EXPENSE_FORM_TITLE_ID}
    >
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

          {errors.paidById ? (
            <span className={styles.error}>{errors.paidById}</span>
          ) : null}
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

          {errors.participantIds ? (
            <span className={styles.error}>{errors.participantIds}</span>
          ) : null}
        </fieldset>

        <fieldset className={styles.splitModes}>
          <legend>{SPLIT_MODE_LEGEND}</legend>

          {SPLIT_MODE_OPTIONS.map((option) => (
            <label className={styles.splitMode} key={option.value}>
              <input
                checked={values.splitMode === option.value}
                name="split-mode"
                onChange={() =>
                  setValues((current) => ({
                    ...current,
                    splitMode: option.value,
                  }))
                }
                type="radio"
              />

              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>

        {values.splitMode === ESplitMode.CUSTOM ? (
          <div className={styles.customShares}>
            {values.participantIds.map((participantId) => (
              <label className={styles.customShare} key={participantId}>
                <span>{findMemberName(members, participantId)}</span>

                <input
                  inputMode="decimal"
                  min="0"
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      customShares: setCustomShare(
                        current.customShares,
                        participantId,
                        event.target.value,
                      ),
                    }))
                  }
                  placeholder="0.00"
                  step="0.01"
                  type="number"
                  value={values.customShares[participantId] ?? ""}
                />
              </label>
            ))}

            <p className={styles.summary}>
              <span>{ASSIGNED_LABEL}</span>

              <strong>
                {buildAssignedSummary(
                  sumShareAmounts(shares),
                  parseAmount(values.amount),
                  currency,
                )}
              </strong>
            </p>

            {errors.customShares ? (
              <span className={styles.error}>{errors.customShares}</span>
            ) : null}
          </div>
        ) : null}

        {values.splitMode === ESplitMode.EQUAL && shares.length > 0 ? (
          <p className={styles.summary}>
            <span>{EQUAL_SPLIT_LABEL}</span>
            <strong>{buildPerPersonSummary(shares[0].amount, currency)}</strong>
          </p>
        ) : null}

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            type="button"
          >
            {CANCEL_LABEL}
          </button>

          <button className={styles.submitButton} type="submit">
            {isEditing ? SAVE_SUBMIT_LABEL : CREATE_SUBMIT_LABEL}
          </button>
        </div>
      </form>
    </Modal>
  );
}
