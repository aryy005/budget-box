'use client';
import { useBudgetStore, BudgetData } from '@/store/useBudgetStore';

const fields: { key: keyof BudgetData; label: string }[] = [
  { key: 'income', label: 'Monthly Income' },
  { key: 'bills', label: 'Monthly Bills (Rent, EMI)' }, // [cite: 14]
  { key: 'food', label: 'Food & Groceries' },
  { key: 'transport', label: 'Transport' },
  { key: 'subscriptions', label: 'Subscriptions' },
  { key: 'misc', label: 'Miscellaneous' },
];

export default function BudgetForm() {
  const { data, updateField } = useBudgetStore();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Monthly Budget</h2>
      <div className="grid gap-4">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type="number"
              value={data[field.key] || ''}
              onChange={(e) => updateField(field.key, Number(e.target.value))}
              className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}