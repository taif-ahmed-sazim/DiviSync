import type { IGroupMember } from "@/types/domain.interfaces";

export interface ISettleUpFormValues {
  fromMemberId: string;
  toMemberId: string;
  amount: string;
}

export interface ISettleUpFormErrors {
  fromMemberId?: string;
  toMemberId?: string;
  amount?: string;
}

export interface ISettleUpModalProps {
  members: IGroupMember[];
  onClose: () => void;
  onSubmit: (values: ISettleUpFormValues) => void;
}
