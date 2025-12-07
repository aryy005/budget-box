'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useBudgetStore } from '@/store/useBudgetStore';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';

export default function SyncManager() {
  const { data, syncStatus, setSyncStatus, loadServerData } = useBudgetStore();
  const [isOnline, setIsOnline] = useState(true);

  // Monitor Online Status
  useEffect(() => {
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
      setSyncStatus('pending'); // [cite: 39]
      
      // Push local data -> server [cite: 65]
      await axios.post('/api/sync', data);
      
      setSyncStatus('synced'); // [cite: 40]
    } catch (error) {
      console.error("Sync failed", error);
      setSyncStatus('local-only');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full shadow-lg">
      {/* Offline Indicator [cite: 34] */}
      {!isOnline ? <CloudOff size={18} className="text-red-400" /> : <Cloud size={18} className="text-green-400" />}
      
      <span className="text-sm font-medium">
        {!isOnline ? "Offline" : syncStatus === 'synced' ? "Synced" : "Unsaved Changes"}
      </span>

      <button 
        onClick={handleSync} 
        disabled={!isOnline || syncStatus === 'synced'}
        className="ml-2 p-1 hover:bg-gray-700 rounded-full disabled:opacity-50"
      >
        <RefreshCw size={16} className={syncStatus === 'pending' ? 'animate-spin' : ''} />
      </button>
    </div>
  );
}