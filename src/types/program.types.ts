export type ProgramCategory = 'Pregrado' | 'Posgrado' | 'Educación Continua';

export type ProgramCategoryFilter = ProgramCategory | 'Todos';

export type ProgramModality = 'Presencial' | 'Híbrido' | 'Virtual';

export interface Program {
  id: string;
  title: string;
  description: string;
  category: ProgramCategory;
  imageUrl: string;
  faculty: string;
  duration: string;
  modality: ProgramModality;
}
