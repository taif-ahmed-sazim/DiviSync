import { useState } from "react";
import type { FormEvent } from "react";

import { Modal } from "@/components/common/Modal";

import {
  ADD_FRIEND_EYEBROW,
  ADD_FRIEND_TITLE,
  ADD_FRIEND_TITLE_ID,
  ADD_SUBMIT_LABEL,
  CANCEL_LABEL,
  NAME_LABEL,
  NAME_PLACEHOLDER,
} from "./AddFriendModal.constants";
import { getFriendNameError } from "./AddFriendModal.helpers";
import type { IAddFriendModalProps } from "./AddFriendModal.interfaces";

import styles from "./AddFriendModal.module.css";

export function AddFriendModal({
  friends,
  onClose,
  onSubmit,
}: IAddFriendModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextError = getFriendNameError(name, friends);
    setError(nextError);

    if (nextError !== undefined) {
      return;
    }

    onSubmit(name);
  };

  return (
    <Modal
      eyebrow={ADD_FRIEND_EYEBROW}
      onClose={onClose}
      title={ADD_FRIEND_TITLE}
      titleId={ADD_FRIEND_TITLE_ID}
    >
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>{NAME_LABEL}</span>

          <input
            aria-invalid={error !== undefined}
            onChange={(event) => setName(event.target.value)}
            placeholder={NAME_PLACEHOLDER}
            value={name}
          />

          {error ? <span className={styles.error}>{error}</span> : null}
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
            {ADD_SUBMIT_LABEL}
          </button>
        </div>
      </form>
    </Modal>
  );
}
