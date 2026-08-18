import { useState } from "react";
import type { FormEvent } from "react";

import { Modal } from "@/components/common/Modal";

import {
  ADD_MEMBER_TITLE,
  ADD_MEMBER_TITLE_ID,
  ADD_SUBMIT_LABEL,
  CANCEL_LABEL,
  NO_CANDIDATES_MESSAGE,
  PERSON_LABEL,
} from "./AddMemberModal.constants";
import {
  buildInitialPersonId,
  getPersonError,
} from "./AddMemberModal.helpers";
import type { IAddMemberModalProps } from "./AddMemberModal.interfaces";

import styles from "./AddMemberModal.module.css";

export function AddMemberModal({
  candidates,
  groupName,
  onClose,
  onSubmit,
}: IAddMemberModalProps) {
  const [personId, setPersonId] = useState(() =>
    buildInitialPersonId(candidates),
  );
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextError = getPersonError(personId, candidates);
    setError(nextError);

    if (nextError !== undefined) {
      return;
    }

    onSubmit(personId);
  };

  return (
    <Modal
      eyebrow={groupName}
      onClose={onClose}
      title={ADD_MEMBER_TITLE}
      titleId={ADD_MEMBER_TITLE_ID}
    >
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        {candidates.length === 0 ? (
          <p className={styles.empty}>{NO_CANDIDATES_MESSAGE}</p>
        ) : (
          <label className={styles.field}>
            <span>{PERSON_LABEL}</span>

            <select
              onChange={(event) => setPersonId(event.target.value)}
              value={personId}
            >
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>

            {error ? <span className={styles.error}>{error}</span> : null}
          </label>
        )}

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            type="button"
          >
            {CANCEL_LABEL}
          </button>

          <button
            className={styles.submitButton}
            disabled={candidates.length === 0}
            type="submit"
          >
            {ADD_SUBMIT_LABEL}
          </button>
        </div>
      </form>
    </Modal>
  );
}
