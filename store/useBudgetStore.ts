import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval'; // IndexedDB wrapper

// Defined in assignment [cite: 14]
export interface BudgetData {
  income: number;
  bills: number;
  food: number;
  transport: number;
  subscriptions: number;
  misc: number;
}

interface BudgetState {
  data: BudgetData;
  syncStatus: 'synced' | 'pending' | 'local-only'; // [cite: 36]
  lastSyncedAt: string | null;
  updateField: (field: keyof BudgetData, value: number) => void;
  setSyncStatus: (status: 'synced' | 'pending' | 'local-only') => void;
  loadServerData: (data: BudgetData) => void;
}

// Custom storage adapter for IndexedDB [cite: 72]
const storage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      data: {
        income: 0,
        bills: 0,
        food: 0,
        transport: 0,
        subscriptions: 0,
        misc: 0,
      },
      syncStatus: 'local-only', // Default start [cite: 38]
      lastSyncedAt: null,

      // Auto-save keystroke logic [cite: 33]
      updateField: (field, value) =>
        set((state) => ({
          data: { ...state.data, [field]: value },
          syncStatus: 'pending', // Mark as needs sync on edit [cite: 43]
        })),

      setSyncStatus: (status) => set({ syncStatus: status }),
      
      loadServerData: (serverData) => set({ 
        data: serverData, 
        syncStatus: 'synced' 
      }),
    }),
    {
      name: 'budget-storage', // key in IndexedDB
      storage: createJSONStorage(() => storage), // Use IndexedDB
    }
  )
);