import { useState } from "react";
import type { FormEvent } from "react";

import { Modal } from "@/components/common/Modal";
import { GROUP_NAME } from "@/constants/group.constants";

import {
  AMOUNT_LABEL,
  CANCEL_LABEL,
  SETTLE_UP_TITLE,
  SETTLE_UP_TITLE_ID,
  SUBMIT_LABEL,
} from "./SettleUpModal.constants";
import { settleUpFormInitialValues } from "./SettleUpModal.helpers";
import type { ISettleUpModalProps } from "./SettleUpModal.interfaces";

import styles from "./SettleUpModal.module.css";

export function SettleUpModal({ onClose, onSubmit }: ISettleUpModalProps) {
  const [values, setValues] = useState(settleUpFormInitialValues);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(values);
  };

  return (
    <Modal
      eyebrow={GROUP_NAME}
      onClose={onClose}
      title={SETTLE_UP_TITLE}
      titleId={SETTLE_UP_TITLE_ID}
    >
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>{AMOUNT_LABEL}</span>

          <input
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
        </label>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            type="button"
          >
            {CANCEL_LABEL}
          </button>

          <button className={styles.submitButton} type="submit">
            {SUBMIT_LABEL}
          </button>
        </div>
      </form>
    </Modal>
  );
}
