'use client';
import { useBudgetStore, BudgetData } from '@/store/useBudgetStore';
import { Banknote, CreditCard, ShoppingBag, Car, Tv, Sparkles } from 'lucide-react';

const fieldConfig: { key: keyof BudgetData; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'income', label: 'Monthly Income', icon: <Banknote size={18} />, color: 'bg-emerald-100 text-emerald-600' },
  { key: 'bills', label: 'Bills & Rent', icon: <CreditCard size={18} />, color: 'bg-blue-100 text-blue-600' },
  { key: 'food', label: 'Food & Dining', icon: <ShoppingBag size={18} />, color: 'bg-orange-100 text-orange-600' },
  { key: 'transport', label: 'Transport', icon: <Car size={18} />, color: 'bg-yellow-100 text-yellow-600' },
  { key: 'subscriptions', label: 'Subscriptions', icon: <Tv size={18} />, color: 'bg-purple-100 text-purple-600' },
  { key: 'misc', label: 'Miscellaneous', icon: <Sparkles size={18} />, color: 'bg-pink-100 text-pink-600' },
];

export default function BudgetForm() {
  const { data, updateField } = useBudgetStore();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">Budget Planner</h2>
        <p className="text-sm text-slate-500">Updates save automatically to your device.</p>
      </div>
      
      <div className="p-6 grid gap-5">
        {fieldConfig.map((field) => (
          <div key={field.key} className="group relative">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              {field.label}
            </label>
            
            <div className="relative flex items-center">
              {/* Icon Container */}
              <div className={`absolute left-3 p-1.5 rounded-md ${field.color}`}>
                {field.icon}
              </div>

              <input
                type="number"
                value={data[field.key] || ''}
                onChange={(e) => updateField(field.key, Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 
                           focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="0"
              />
              
              <div className="absolute right-4 text-slate-400 font-medium pointer-events-none">
                ₹
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}