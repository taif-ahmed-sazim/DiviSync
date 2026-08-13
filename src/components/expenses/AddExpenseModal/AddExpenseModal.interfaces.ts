export interface IAddExpenseFormValues {
  description: string;
  amount: string;
}

export interface IAddExpenseFormErrors {
  description?: string;
  amount?: string;
}

export interface IAddExpenseModalProps {
  onClose: () => void;
  onSubmit: (values: IAddExpenseFormValues) => void;
}
