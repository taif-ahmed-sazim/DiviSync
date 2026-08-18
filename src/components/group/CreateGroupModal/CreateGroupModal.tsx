import { useState } from "react";
import type { FormEvent } from "react";

import { Modal } from "@/components/common/Modal";
import { CURRENT_USER_ID } from "@/constants/group.constants";

import {
  CANCEL_LABEL,
  CREATE_GROUP_EYEBROW,
  CREATE_GROUP_TITLE,
  CREATE_GROUP_TITLE_ID,
  CREATE_SUBMIT_LABEL,
  CURRENCY_LABEL,
  CURRENCY_OPTIONS,
  DESCRIPTION_LABEL,
  DESCRIPTION_PLACEHOLDER,
  MEMBERS_LEGEND,
  NAME_LABEL,
  NAME_PLACEHOLDER,
} from "./CreateGroupModal.constants";
import {
  createGroupFormInitialValues,
  hasCreateGroupFormErrors,
  parseCurrency,
  toggleMemberId,
  validateCreateGroupForm,
} from "./CreateGroupModal.helpers";
import type {
  ICreateGroupFormErrors,
  ICreateGroupModalProps,
} from "./CreateGroupModal.interfaces";

import styles from "./CreateGroupModal.module.css";

export function CreateGroupModal({
  onClose,
  onSubmit,
  people,
}: ICreateGroupModalProps) {
  const [values, setValues] = useState(createGroupFormInitialValues);
  const [errors, setErrors] = useState<ICreateGroupFormErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateCreateGroupForm(values);
    setErrors(nextErrors);

    if (hasCreateGroupFormErrors(nextErrors)) {
      return;
    }

    onSubmit(values);
  };

  return (
    <Modal
      eyebrow={CREATE_GROUP_EYEBROW}
      onClose={onClose}
      title={CREATE_GROUP_TITLE}
      titleId={CREATE_GROUP_TITLE_ID}
    >
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>{NAME_LABEL}</span>

          <input
            aria-invalid={errors.name !== undefined}
            onChange={(event) =>
              setValues((current) => ({ ...current, name: event.target.value }))
            }
            placeholder={NAME_PLACEHOLDER}
            value={values.name}
          />

          {errors.name ? (
            <span className={styles.error}>{errors.name}</span>
          ) : null}
        </label>

        <label className={styles.field}>
          <span>{DESCRIPTION_LABEL}</span>

          <input
            aria-invalid={errors.description !== undefined}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            placeholder={DESCRIPTION_PLACEHOLDER}
            value={values.description}
          />

          {errors.description ? (
            <span className={styles.error}>{errors.description}</span>
          ) : null}
        </label>

        <label className={styles.field}>
          <span>{CURRENCY_LABEL}</span>

          <select
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                currency: parseCurrency(event.target.value),
              }))
            }
            value={values.currency}
          >
            {CURRENCY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <fieldset className={styles.members}>
          <legend>{MEMBERS_LEGEND}</legend>

          {people.map((person) => (
            <label className={styles.memberOption} key={person.id}>
              <input
                checked={values.memberIds.includes(person.id)}
                disabled={person.id === CURRENT_USER_ID}
                onChange={() =>
                  setValues((current) => ({
                    ...current,
                    memberIds: toggleMemberId(current.memberIds, person.id),
                  }))
                }
                type="checkbox"
              />

              <span>{person.name}</span>
            </label>
          ))}

          {errors.memberIds ? (
            <span className={styles.error}>{errors.memberIds}</span>
          ) : null}
        </fieldset>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            type="button"
          >
            {CANCEL_LABEL}
          </button>

          <button className={styles.submitButton} type="submit">
            {CREATE_SUBMIT_LABEL}
          </button>
        </div>
      </form>
    </Modal>
  );
}
