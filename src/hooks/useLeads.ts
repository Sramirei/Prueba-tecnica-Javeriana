import { useCallback, useMemo, useState } from 'react';
import { leadsStorageService } from '../services/leadsStorageService';
import type { Lead, LeadDraft } from '../types/lead.types';

interface UseLeadsResult {
  leads: Lead[];
  addLead: (leadDraft: LeadDraft) => void;
  editLead: (lead: Lead) => void;
  removeLead: (leadId: string) => void;
  totalLeads: number;
}

const createLeadId = (): string => {
  if ('randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const useLeads = (): UseLeadsResult => {
  const [leads, setLeads] = useState<Lead[]>(() => leadsStorageService.getLeads());

  const addLead = useCallback((leadDraft: LeadDraft): void => {
    const lead: Lead = {
      ...leadDraft,
      id: createLeadId(),
      registrationDate: new Date().toISOString()
    };

    setLeads(leadsStorageService.saveLead(lead));
  }, []);

  const editLead = useCallback((lead: Lead): void => {
    setLeads(leadsStorageService.editLead(lead.id, lead));
  }, []);

  const removeLead = useCallback((leadId: string): void => {
    setLeads(leadsStorageService.deleteLead(leadId));
  }, []);

  const totalLeads = useMemo(() => leads.length, [leads.length]);

  return { leads, addLead, editLead, removeLead, totalLeads };
};
