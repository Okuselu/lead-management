'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Lead } from '@/types/lead';

interface LeadState {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
}

type LeadAction = 
  | { type: 'SET_LEADS'; payload: Lead[] }
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const LeadContext = createContext<{
  state: LeadState;
  dispatch: React.Dispatch<LeadAction>;
} | undefined>(undefined);

const initialState: LeadState = {
  leads: [],
  isLoading: false,
  error: null,
};

function leadReducer(state: LeadState, action: LeadAction): LeadState {
  switch (action.type) {
    case 'SET_LEADS':
      return { ...state, leads: action.payload, error: null };
    case 'ADD_LEAD':
      return { ...state, leads: [...state.leads, action.payload], error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(leadReducer, initialState);

  return (
    <LeadContext.Provider value={{ state, dispatch }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}