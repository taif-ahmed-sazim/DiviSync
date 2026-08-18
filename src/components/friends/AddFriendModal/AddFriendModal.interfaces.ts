import type { IPerson } from "@/types/domain.interfaces";

export interface IAddFriendModalProps {
  friends: IPerson[];
  onClose: () => void;
  onSubmit: (name: string) => void;
}
