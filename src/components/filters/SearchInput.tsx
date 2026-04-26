import { Search, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <div className="w-full max-w-xl">
    <label htmlFor="program-search" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-blue-100">
      Buscar oferta académica
    </label>
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        id="program-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-sm border border-stone-line bg-white py-3 pl-11 pr-12 text-base text-ink shadow-sm transition-colors duration-200 placeholder:text-slate-400 focus:border-javeriana-blue dark:border-javeriana-blue-800 dark:bg-javeriana-blue-900 dark:text-white"
        placeholder="Nombre, facultad o modalidad"
      />
      {value.length > 0 ? (
        <Button
          aria-label="Limpiar búsqueda"
          className="absolute right-1.5 top-1/2 h-9 min-h-9 w-9 -translate-y-1/2 p-0"
          onClick={() => onChange('')}
          size="sm"
          variant="ghost"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  </div>
);
