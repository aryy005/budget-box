'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useBudgetStore } from '@/store/useBudgetStore';
import { Cloud, CloudOff, RefreshCw, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti'; // Requires: npm install canvas-confetti

export default function SyncManager() {
  const { data, syncStatus, setSyncStatus } = useBudgetStore();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    if (!isOnline) return;

    try {
      setSyncStatus('pending');
      await axios.post('/api/sync', data);
      
      setSyncStatus('synced');
      
      // 🎉 Celebration Effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#10b981', '#f59e0b']
      });
      
    } catch (error) {
      console.error("Sync failed", error);
      setSyncStatus('local-only');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3 p-1.5 pl-4 bg-slate-900/90 backdrop-blur-md text-white rounded-full shadow-2xl border border-white/10 transition-all hover:scale-105 z-50">
      
      {/* Icon Logic */}
      {!isOnline ? (
        <CloudOff size={18} className="text-red-400" />
      ) : syncStatus === 'synced' ? (
        <CheckCircle size={18} className="text-emerald-400" />
      ) : (
        <Cloud size={18} className="text-indigo-400" />
      )}
      
      <span className="text-sm font-semibold pr-1">
        {!isOnline ? "Offline Mode" : syncStatus === 'synced' ? "All Saved" : "Unsaved Changes"}
      </span>

      <button 
        onClick={handleSync} 
        disabled={!isOnline || syncStatus === 'synced'}
        className={`p-2 rounded-full transition-all ${
          !isOnline || syncStatus === 'synced' 
            ? 'bg-white/5 text-white/30 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/50'
        }`}
      >
        <RefreshCw size={16} className={syncStatus === 'pending' ? 'animate-spin' : ''} />
      </button>
    </div>
  );
}