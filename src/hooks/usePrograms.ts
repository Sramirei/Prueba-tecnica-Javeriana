import { useEffect, useState } from 'react';
import { getAcademicPrograms } from '../services/programsService';
import type { Program } from '../types/program.types';

interface UseProgramsResult {
  programs: Program[];
  isLoading: boolean;
  error: string | null;
}

export const usePrograms = (): UseProgramsResult => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPrograms = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        const academicPrograms = await getAcademicPrograms();

        if (!controller.signal.aborted) {
          setPrograms(academicPrograms);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('No fue posible cargar la oferta académica. Intenta nuevamente en unos minutos.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchPrograms();

    return () => {
      controller.abort();
    };
  }, []);

  return { programs, isLoading, error };
};
