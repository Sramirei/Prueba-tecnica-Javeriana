export interface Lead {
  id: string;
  name: string;
  email: string;
  programId: string;
  programName: string;
  registrationDate: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  programId: string;
}

export type LeadDraft = Omit<Lead, 'id' | 'registrationDate'>;
