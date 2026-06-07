import { getFirst, getAll } from '@/core/database/database.service';

export type BudgetingMethodRow = {
  id: string;
  label: string;
  description: string;
  summary: string;
};

export async function getBudgetingMethodById(id: string) {
  return getFirst<BudgetingMethodRow>(
    'SELECT * FROM budgeting_methods WHERE id = ?',
    [id]
  );
}

export async function getAllBudgetingMethods() {
  return getAll<BudgetingMethodRow>('SELECT * FROM budgeting_methods');
}
