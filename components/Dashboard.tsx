'use client';
import { useBudgetStore } from '@/store/useBudgetStore';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Wallet, TrendingDown, PiggyBank, AlertTriangle } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { data } = useBudgetStore();
  
  const totalExpenses = data.bills + data.food + data.transport + data.subscriptions + data.misc;
  const savings = data.income - totalExpenses;
  const burnRate = data.income > 0 ? ((totalExpenses / data.income) * 100).toFixed(1) : '0';

  // Rule-based Alerts 
  const alerts = [];
  if (data.food > data.income * 0.4) alerts.push("Reduce food spend next month.");
  if (data.subscriptions > data.income * 0.3) alerts.push("Consider cancelling unused apps.");
  if (savings < 0) alerts.push("Warning: Your expenses exceed income.");

  const chartData = {
    labels: ['Bills', 'Food', 'Transport', 'Subs', 'Misc'],
    datasets: [{
      data: [data.bills, data.food, data.transport, data.subscriptions, data.misc],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <TrendingDown size={20} />
            </div>
            <p className="text-sm font-medium text-slate-500">Burn Rate</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">{burnRate}%</p>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${savings < 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
              <PiggyBank size={20} />
            </div>
            <p className="text-sm font-medium text-slate-500">Potential Savings</p>
          </div>
          <p className={`text-3xl font-bold ${savings < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            ₹{savings.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart Card */}
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Wallet size={18} className="text-indigo-500"/> Expense Breakdown
        </h3>
        <div className="h-64 flex justify-center relative">
          <Pie data={chartData} options={{ cutout: '70%', plugins: { legend: { position: 'bottom' } } }} />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center mt-8">
              <span className="text-xs text-slate-400 block">Total Spent</span>
              <span className="text-xl font-bold text-slate-700">₹{totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm animate-fade-in">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              <span>{alert}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}