import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLeads } from '../hooks/useLeads';
import type { Lead, LeadDraft } from '../types/lead.types';

interface LeadsContextValue {
  leads: Lead[];
  addLead: (leadDraft: LeadDraft) => void;
  editLead: (lead: Lead) => void;
  removeLead: (leadId: string) => void;
  totalLeads: number;
}

const LeadsContext = createContext<LeadsContextValue | undefined>(undefined);

interface LeadsProviderProps {
  children: ReactNode;
}

export const LeadsProvider = ({ children }: LeadsProviderProps) => {
  const { leads, addLead, editLead, removeLead, totalLeads } = useLeads();

  const value = useMemo(
    () => ({ leads, addLead, editLead, removeLead, totalLeads }),
    [leads, addLead, editLead, removeLead, totalLeads]
  );

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
};

export const useLeadsContext = (): LeadsContextValue => {
  const context = useContext(LeadsContext);

  if (!context) {
    throw new Error('useLeadsContext debe usarse dentro de LeadsProvider.');
  }

  return context;
};
