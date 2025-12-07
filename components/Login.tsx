'use client';
import { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react'; // Added icons

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials 
    if (email === 'hire-me@anshumat.org' && password === 'HireMe@2025!') {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Check the README.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01]">
        
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-3xl">📦</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2">Welcome Back</h2>
        <p className="text-center text-slate-500 mb-8">Sign in to manage your budget offline.</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="admin@example.com"
                required
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
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transform transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Access Dashboard <ArrowRight size={18} />
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-center text-slate-400 mb-2">Demo Credentials</p>
          <div className="flex flex-col items-center gap-1 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <code className="font-mono text-indigo-600">hire-me@anshumat.org</code>
            <code className="font-mono text-indigo-600">HireMe@2025!</code>
          </div>
        </div>
      </div>
    </div>
  );
}