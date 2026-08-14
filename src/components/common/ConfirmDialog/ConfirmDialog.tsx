import { Modal } from "@/components/common/Modal";

import type { IConfirmDialogProps } from "./ConfirmDialog.interfaces";

import styles from "./ConfirmDialog.module.css";

export function ConfirmDialog({
  cancelLabel,
  confirmLabel,
  description,
  eyebrow,
  onCancel,
  onConfirm,
  title,
  titleId,
}: IConfirmDialogProps) {
  return (
    <Modal
      eyebrow={eyebrow}
      onClose={onCancel}
      title={title}
      titleId={titleId}
    >
      <p className={styles.description}>{description}</p>

      <div className={styles.actions}>
        <button
          className={styles.cancelButton}
          onClick={onCancel}
          type="button"
        >
          {cancelLabel}
        </button>

        <button
          className={styles.confirmButton}
          onClick={onConfirm}
          type="button"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
