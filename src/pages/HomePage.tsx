import { AlertCircle, BookOpenCheck } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { CategoryFilter } from '../components/filters/CategoryFilter';
import { SearchInput } from '../components/filters/SearchInput';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { HeroBanner } from '../components/layout/HeroBanner';
import { LeadModal } from '../components/leads/LeadModal';
import { LeadsTable } from '../components/leads/LeadsTable';
import { ProgramList } from '../components/programs/ProgramList';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { useModal } from '../hooks/useModal';
import { useProgramFilters } from '../hooks/useProgramFilters';
import { usePrograms } from '../hooks/usePrograms';
import type { Program } from '../types/program.types';

export const HomePage = () => {
  const { programs, isLoading, error } = usePrograms();
  const {
    searchTerm,
    selectedCategory,
    filteredPrograms,
    setSearchTerm,
    setSelectedCategory,
    clearFilters
  } = useProgramFilters(programs);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleEnroll = useCallback(
    (program: Program): void => {
      setSelectedProgram(program);
      openModal();
    },
    [openModal]
  );

  const handleCloseModal = useCallback((): void => {
    closeModal();
    setSelectedProgram(null);
  }, [closeModal]);

  const toggleTheme = useCallback((): void => {
    setIsDarkMode((currentValue) => !currentValue);
  }, []);

  const resultsLabel = useMemo(() => {
    if (isLoading) {
      return 'Cargando programas académicos';
    }

    return `${filteredPrograms.length} programa${filteredPrograms.length === 1 ? '' : 's'} encontrado${filteredPrograms.length === 1 ? '' : 's'}`;
  }, [filteredPrograms.length, isLoading]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-paper academic-texture text-ink dark:bg-javeriana-blue-950 dark:text-white">
        <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <HeroBanner />

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <section id="programas" className="scroll-mt-28">
            <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-javeriana-gold">
                  Oferta académica simulada
                </p>
                <h2 className="font-serif text-4xl font-bold leading-tight text-javeriana-blue dark:text-white sm:text-5xl">
                  Programas y eventos académicos
                </h2>
              </div>
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-blue-100" aria-live="polite">
                {resultsLabel}
              </p>
            </div>

            <div className="mb-8 grid gap-5 border border-stone-line bg-white p-5 shadow-sm dark:border-javeriana-blue-800 dark:bg-javeriana-blue-900 lg:grid-cols-[minmax(260px,1fr)_auto] lg:items-end">
              <SearchInput value={searchTerm} onChange={setSearchTerm} />
              <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            </div>

            {isLoading ? <LoadingState /> : null}

            {!isLoading && error ? (
              <EmptyState
                icon={<AlertCircle className="h-7 w-7" aria-hidden="true" />}
                title="No se pudo cargar la oferta"
                description={error}
              />
            ) : null}

            {!isLoading && !error && filteredPrograms.length === 0 ? (
              <EmptyState
                icon={<BookOpenCheck className="h-7 w-7" aria-hidden="true" />}
                title="Sin coincidencias"
                description="Ajusta el texto de búsqueda o selecciona otra categoría para ver más programas."
                action={
                  <Button onClick={clearFilters} variant="secondary">
                    Limpiar filtros
                  </Button>
                }
              />
            ) : null}

            {!isLoading && !error && filteredPrograms.length > 0 ? (
              <ProgramList programs={filteredPrograms} onEnroll={handleEnroll} />
            ) : null}
          </section>

          <LeadsTable />
        </main>

        <Footer />
        <LeadModal isOpen={isOpen} selectedProgram={selectedProgram} onClose={handleCloseModal} />
      </div>
    </div>
  );
};
