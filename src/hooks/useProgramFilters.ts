import { useCallback, useMemo, useState } from 'react';
import { filterPrograms } from '../helpers/filterPrograms';
import type { Program, ProgramCategoryFilter } from '../types/program.types';

interface UseProgramFiltersResult {
  searchTerm: string;
  selectedCategory: ProgramCategoryFilter;
  filteredPrograms: Program[];
  setSearchTerm: (value: string) => void;
  setSelectedCategory: (value: ProgramCategoryFilter) => void;
  clearFilters: () => void;
}

export const useProgramFilters = (programs: Program[]): UseProgramFiltersResult => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategoryFilter>('Todos');

  const filteredPrograms = useMemo(
    () => filterPrograms(programs, { searchTerm, category: selectedCategory }),
    [programs, searchTerm, selectedCategory]
  );

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('Todos');
  }, []);

  return {
    searchTerm,
    selectedCategory,
    filteredPrograms,
    setSearchTerm,
    setSelectedCategory,
    clearFilters
  };
};
