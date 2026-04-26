import type { LeadDraft, LeadFormData } from '../types/lead.types';
import type { Program } from '../types/program.types';
import { capitalizeWords } from './formatText';

export const normalizeLead = (formData: LeadFormData, program: Program): LeadDraft => ({
  name: capitalizeWords(formData.name),
  email: formData.email.trim().toLocaleLowerCase('es-CO'),
  programId: program.id,
  programName: program.title
});
