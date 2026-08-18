import type { ECurrency } from "@/types/domain.enums";
import type { IPerson } from "@/types/domain.interfaces";

export interface ICreateGroupFormValues {
  name: string;
  description: string;
  currency: ECurrency;
  memberIds: string[];
}

export interface ICreateGroupFormErrors {
  name?: string;
  description?: string;
  memberIds?: string;
}

export interface ICreateGroupModalProps {
  onClose: () => void;
  onSubmit: (values: ICreateGroupFormValues) => void;
  people: IPerson[];
}
