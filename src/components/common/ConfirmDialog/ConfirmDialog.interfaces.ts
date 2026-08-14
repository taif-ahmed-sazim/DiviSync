export interface IConfirmDialogProps {
  cancelLabel: string;
  confirmLabel: string;
  description: string;
  eyebrow: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  titleId: string;
}
