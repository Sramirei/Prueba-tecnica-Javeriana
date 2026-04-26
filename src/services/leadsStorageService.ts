import type { Lead } from '../types/lead.types';

const STORAGE_KEY = 'javeriana_leads_v1';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isLead = (value: unknown): value is Lead => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.email === 'string' &&
    typeof value.programId === 'string' &&
    typeof value.programName === 'string' &&
    typeof value.registrationDate === 'string'
  );
};

const readLeads = (): Lead[] => {
  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  const parsedValue: unknown = JSON.parse(rawValue);

  if (!Array.isArray(parsedValue)) {
    return [];
  }

  return parsedValue.filter(isLead);
};

const writeLeads = (leads: Lead[]): void => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
};

export const leadsStorageService = {
  getLeads: (): Lead[] => {
    try {
      return readLeads();
    } catch {
      return [];
    }
  },

  saveLead: (lead: Lead): Lead[] => {
    const updatedLeads = [lead, ...leadsStorageService.getLeads()];
    writeLeads(updatedLeads);
    return updatedLeads;
  },

  editLead: (leadId: string, lead: Lead): Lead[] => {
    const updatedLeads = leadsStorageService
      .getLeads()
      .map((currentLead) => (currentLead.id === leadId ? lead : currentLead));

    writeLeads(updatedLeads);
    return updatedLeads;
  },

  deleteLead: (leadId: string): Lead[] => {
    const updatedLeads = leadsStorageService
      .getLeads()
      .filter((currentLead) => currentLead.id !== leadId);

    writeLeads(updatedLeads);
    return updatedLeads;
  }
};
