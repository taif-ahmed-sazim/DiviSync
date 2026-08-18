import type { IPerson } from "@/types/domain.interfaces";

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
  members: IPerson[];
  onClose: () => void;
  onSubmit: (values: ISettleUpFormValues) => void;
}
