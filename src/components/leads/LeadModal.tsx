import { CheckCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Program } from '../../types/program.types';
import { Button } from '../ui/Button';
import { LeadForm } from './LeadForm';

interface LeadModalProps {
  isOpen: boolean;
  selectedProgram: Program | null;
  onClose: () => void;
}

export const LeadModal = ({ isOpen, selectedProgram, onClose }: LeadModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    setIsSuccess(false);

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isSuccess) {
      return undefined;
    }

    const timeoutId = window.setTimeout(onClose, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccess, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="lead-modal-title" aria-modal="true" role="dialog">
      <div className="flex min-h-full items-end justify-center px-4 py-6 sm:items-center">
        <button
          aria-label="Cerrar modal"
          className="fixed inset-0 cursor-pointer bg-slate-950/75"
          type="button"
          onClick={onClose}
        />
        <div className="relative w-full max-w-2xl animate-enter overflow-hidden rounded-sm bg-white shadow-2xl dark:bg-javeriana-blue-900">
          <div className="flex items-start justify-between gap-4 border-b-4 border-javeriana-gold bg-javeriana-blue px-6 py-5 text-white sm:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-javeriana-gold">Prospecto académico</p>
              <h2 id="lead-modal-title" className="font-serif text-3xl font-bold">
                Formulario de inscripción
              </h2>
            </div>
            <Button
              aria-label="Cerrar formulario"
              className="h-11 min-h-11 w-11 border-white/30 bg-white/10 p-0 text-white hover:bg-white hover:text-javeriana-blue"
              onClick={onClose}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          {isSuccess ? (
            <div className="px-6 py-12 text-center sm:px-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-sm bg-green-100 text-green-700">
                <CheckCircle className="h-10 w-10" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-serif text-3xl font-bold text-javeriana-blue dark:text-white">Registro exitoso</h3>
              <p className="mx-auto mt-2 max-w-md leading-7 text-slate-600 dark:text-blue-100">
                El lead fue normalizado y guardado en localStorage. La tabla se actualizó sin recargar la página.
              </p>
            </div>
          ) : (
            <LeadForm
              selectedProgram={selectedProgram}
              onCancel={onClose}
              onSuccess={() => {
                setIsSuccess(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
