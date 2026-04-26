import { BookOpen, BriefcaseBusiness, CalendarDays, GraduationCap } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ProgramCategoryFilter } from '../../types/program.types';

interface CategoryOption {
  label: ProgramCategoryFilter;
  icon: ReactNode;
}

interface CategoryFilterProps {
  selectedCategory: ProgramCategoryFilter;
  onSelectCategory: (category: ProgramCategoryFilter) => void;
}

const categoryOptions: CategoryOption[] = [
  { label: 'Todos', icon: <BookOpen className="h-4 w-4" aria-hidden="true" /> },
  { label: 'Pregrado', icon: <GraduationCap className="h-4 w-4" aria-hidden="true" /> },
  { label: 'Posgrado', icon: <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" /> },
  { label: 'Educación Continua', icon: <CalendarDays className="h-4 w-4" aria-hidden="true" /> }
];

export const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => (
  <fieldset className="w-full">
    <legend className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-blue-100">
      Categoría
    </legend>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {categoryOptions.map((option) => {
        const isSelected = selectedCategory === option.label;

        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectCategory(option.label)}
            className={[
              'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border px-4 py-2 text-sm font-bold uppercase tracking-wide motion-safe-transition transition-colors duration-200',
              isSelected
                ? 'border-javeriana-blue bg-javeriana-blue text-white shadow-sm dark:border-javeriana-gold dark:bg-javeriana-gold dark:text-javeriana-blue'
                : 'border-stone-line bg-white text-slate-700 hover:border-javeriana-blue hover:text-javeriana-blue dark:border-javeriana-blue-800 dark:bg-javeriana-blue-900 dark:text-blue-100'
            ].join(' ')}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  </fieldset>
);
