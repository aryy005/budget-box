'use client';
import { useBudgetStore } from '@/store/useBudgetStore';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { data } = useBudgetStore();
  
  // Calculations [cite: 20]
  const totalExpenses = data.bills + data.food + data.transport + data.subscriptions + data.misc;
  const savings = data.income - totalExpenses;
  const burnRate = data.income > 0 ? ((totalExpenses / data.income) * 100).toFixed(1) : '0';

  // Rule-based Alerts [cite: 46, 47, 48]
  const alerts = [];
  if (data.food > data.income * 0.4) alerts.push("Reduce food spend next month.");
  if (data.subscriptions > data.income * 0.3) alerts.push("Consider cancelling unused apps.");
  if (savings < 0) alerts.push("Warning: Your expenses exceed income.");

  const chartData = {
    labels: ['Bills', 'Food', 'Transport', 'Subs', 'Misc'],
    datasets: [{
      data: [data.bills, data.food, data.transport, data.subscriptions, data.misc],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-gray-500">Burn Rate</p>
          <p className="text-2xl font-bold">{burnRate}%</p>
        </div>
        <div className={`p-4 rounded ${savings < 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          <p>Savings Potential</p>
          <p className="text-2xl font-bold">₹{savings}</p>
        </div>
      </div>

      {/* Chart [cite: 24] */}
      <div className="h-64 flex justify-center">
        <Pie data={chartData} />
      </div>

      {/* Alerts [cite: 25] */}
      {alerts.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <h3 className="font-bold text-yellow-800">Anomaly Warnings</h3>
          <ul className="list-disc ml-5 text-yellow-700">
            {alerts.map((alert, idx) => <li key={idx}>{alert}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}