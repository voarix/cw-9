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

export interface CategoryMutation{
  name: string;
  type: string;
}

export interface CategoryApi {
  [id: string]: CategoryMutation
}

export interface Category extends CategoryMutation{
  id: string;
}
