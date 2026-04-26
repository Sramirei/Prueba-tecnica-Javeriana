import { describe, expect, it } from 'vitest';
import { normalizeLead } from './normalizeLead';
import type { LeadFormData } from '../types/lead.types';
import type { Program } from '../types/program.types';

const program: Program = {
  id: '1',
  title: 'Ingeniería de Sistemas',
  description: 'Programa académico',
  category: 'Pregrado',
  imageUrl: 'https://example.com/image.jpg',
  faculty: 'Facultad de Ingeniería',
  duration: '10 semestres',
  modality: 'Presencial'
};

describe('normalizeLead', () => {
  it('limpia espacios, capitaliza nombre y convierte email a lowercase', () => {
    const formData: LeadFormData = {
      name: '  maría   camila restrepo  ',
      email: '  MARIA.RESTREPO@JAVERIANA.EDU.CO ',
      programId: '1'
    };

    expect(normalizeLead(formData, program)).toEqual({
      name: 'María Camila Restrepo',
      email: 'maria.restrepo@javeriana.edu.co',
      programId: '1',
      programName: 'Ingeniería de Sistemas'
    });
  });
});
