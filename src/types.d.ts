export interface TransactionForm {
  category: string;
  amount: number;
  createdAt: string;
}

export interface TransactionApi {
  [id: string]: TransactionForm;
}

export interface Transaction extends TransactionForm {
  id: string;
}

export interface CategoryForm {
  name: string;
  type: 'income' | 'expense';
}

export interface CategoryApi {
  [id: string]: CategoryForm;
}

export interface Category extends CategoryForm {
  id: string;
}