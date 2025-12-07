'use client';
import { useState, useEffect } from 'react';
import BudgetForm from '@/components/BudgetForm';
import Dashboard from '@/components/Dashboard';
import SyncManager from '@/components/SyncManager';
import Login from '@/components/Login';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration errors by ensuring we only render on client
  useEffect(() => {
    setIsClient(true);
    // Optional: Check if user was previously logged in via localStorage
    const savedAuth = localStorage.getItem('budgetbox_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('budgetbox_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('budgetbox_auth');
  };

  if (!isClient) return null; // Or a loading spinner

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">BudgetBox 📦</h1>
          <button 
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 underline"
          >
            Logout
          </button>
        </div>

        {/* Core Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <BudgetForm />
          </div>
          <div className="space-y-6">
            <Dashboard />
          </div>
        </div>

        {/* Floating Sync Button */}
        <SyncManager />
        
      </div>
    </main>
  );
}