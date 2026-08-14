export interface ISettleUpFormValues {
  amount: string;
}

export interface ISettleUpFormErrors {
  amount?: string;
}

export interface ISettleUpModalProps {
  onClose: () => void;
  onSubmit: (values: ISettleUpFormValues) => void;
}
