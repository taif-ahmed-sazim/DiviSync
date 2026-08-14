import { CLOSE_BUTTON_LABEL } from "./Modal.constants";
import type { IModalProps } from "./Modal.interfaces";

import styles from "./Modal.module.css";

export function Modal({
  children,
  eyebrow,
  onClose,
  title,
  titleId,
}: IModalProps) {
  return (
    <div className={styles.backdrop}>
      <section
        aria-labelledby={titleId}
        className={styles.modal}
        role="dialog"
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>

            <h2 className={styles.title} id={titleId}>
              {title}
            </h2>
          </div>

          <button
            aria-label={CLOSE_BUTTON_LABEL}
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>

        {children}
      </section>
    </div>
  );
}
