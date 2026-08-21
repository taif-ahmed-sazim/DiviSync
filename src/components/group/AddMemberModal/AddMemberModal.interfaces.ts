import type { IPerson } from "@/types/domain.interfaces";

export interface IAddMemberModalProps {
  candidates: IPerson[];
  groupName: string;
  onClose: () => void;
  onSubmit: (personId: string) => void;
}
