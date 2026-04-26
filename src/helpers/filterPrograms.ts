import type { Program, ProgramCategoryFilter } from '../types/program.types';

export interface ProgramFilters {
  searchTerm: string;
  category: ProgramCategoryFilter;
}

export const filterPrograms = (programs: Program[], filters: ProgramFilters): Program[] => {
  const normalizedSearch = filters.searchTerm.trim().toLocaleLowerCase('es-CO');

  return programs.filter((program) => {
    const matchesCategory = filters.category === 'Todos' || program.category === filters.category;

    if (!matchesCategory) {
      return false;
    }

    if (normalizedSearch.length === 0) {
      return true;
    }

    const searchableText = [
      program.title,
      program.description,
      program.category,
      program.faculty,
      program.modality
    ]
      .join(' ')
      .toLocaleLowerCase('es-CO');

    return searchableText.includes(normalizedSearch);
  });
};
