export interface AddExpenseFormValues {
  description: string;
  amount: string;
}

export interface AddExpenseFormErrors {
  description?: string;
  amount?: string;
}

export interface AddExpenseModalProps {
  onClose: () => void;
  onSubmit: (values: AddExpenseFormValues) => void;
}
