export interface TransactionFormMutation {
  type: string;
  category: string;
  amount: number;
}

export interface TransactionMutation {
  category: string;
  amount: number;
  createdAt: string;
}

export interface TransactionApi {
  [id: string]: TransactionMutation;
}

export interface Transaction extends TransactionMutation {
  id: string;
}

export interface CategoryForm {
  name: string;
  type: "income" | "expense";
}

export interface CategoryApi {
  [id: string]: CategoryForm;
}

export interface Category extends CategoryForm {
  id: string;
}
