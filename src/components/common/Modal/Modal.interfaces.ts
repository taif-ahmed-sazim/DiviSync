import type { ReactNode } from "react";

export interface IModalProps {
  children: ReactNode;
  eyebrow: string;
  onClose: () => void;
  title: string;
  titleId: string;
}
