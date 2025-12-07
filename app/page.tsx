'use client';
import { useState, useEffect } from 'react';
import BudgetForm from '@/components/BudgetForm';
import Dashboard from '@/components/Dashboard';
import SyncManager from '@/components/SyncManager';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check login on load
  useEffect(() => {
    const savedAuth = localStorage.getItem('budgetbox_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials
    if (email === 'hire-me@anshumat.org' && password === 'HireMe@2025!') {
      setIsAuthenticated(true);
      localStorage.setItem('budgetbox_auth', 'true');
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('budgetbox_auth');
  };

  // --- VIEW 1: LOGIN SCREEN (Inline Styles to force them to work) ---
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-3xl">📦</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-center text-slate-500 mb-8">Sign in to manage your budget offline.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm text-center font-bold">{error}</div>}

            <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all">
              Access Dashboard <ArrowRight size={18} className="inline ml-2"/>
            </button>
          </form>
          
          <div className="mt-8 text-center">
             <code className="bg-slate-100 px-2 py-1 rounded text-xs text-indigo-600">hire-me@anshumat.org</code>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: DASHBOARD (Main App) ---
  return (
    <main className="min-h-screen bg-slate-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">BudgetBox 📦</h1>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 underline">Logout</button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6"><BudgetForm /></div>
          <div className="space-y-6"><Dashboard /></div>
        </div>
        <SyncManager />
      </div>
    </main>
  );
}