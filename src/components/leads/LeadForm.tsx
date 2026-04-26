import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { normalizeLead } from '../../helpers/normalizeLead';
import { useLeadsContext } from '../../context/LeadsContext';
import type { LeadFormData } from '../../types/lead.types';
import type { Program } from '../../types/program.types';
import { Button } from '../ui/Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JAVERIANA_DOMAIN = '@javeriana.edu.co';

interface LeadFormProps {
  selectedProgram: Program | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const LeadForm = ({ selectedProgram, onSuccess, onCancel }: LeadFormProps) => {
  const { addLead } = useLeadsContext();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<LeadFormData>({
    defaultValues: {
      name: '',
      email: '',
      programId: selectedProgram?.id ?? ''
    }
  });

  useEffect(() => {
    reset({
      name: '',
      email: '',
      programId: selectedProgram?.id ?? ''
    });
  }, [reset, selectedProgram]);

  const watchedEmail = watch('email');
  const showInstitutionalEmailTip = useMemo(() => {
    const normalizedEmail = watchedEmail.trim().toLocaleLowerCase('es-CO');
    return normalizedEmail.length > 0 && EMAIL_PATTERN.test(normalizedEmail) && !normalizedEmail.endsWith(JAVERIANA_DOMAIN);
  }, [watchedEmail]);

  const onSubmit = (formData: LeadFormData): void => {
    if (!selectedProgram) {
      return;
    }

    addLead(normalizeLead(formData, selectedProgram));
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-javeriana-blue-900" noValidate>
      <input
        type="hidden"
        {...register('programId', {
          required: 'El programa seleccionado es obligatorio.'
        })}
      />

      <div className="space-y-5 p-6 sm:p-8">
        <div className="border-l-4 border-javeriana-gold bg-javeriana-blue-100 p-4 text-javeriana-blue dark:bg-javeriana-blue-800 dark:text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-javeriana-gold">Programa seleccionado</p>
          <p className="mt-1 font-serif text-2xl font-bold">{selectedProgram?.title ?? 'Sin selección'}</p>
        </div>

        {errors.programId ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-red-700">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {errors.programId.message}
          </p>
        ) : null}

        <div>
          <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-blue-50">
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="mt-2 min-h-12 w-full rounded-sm border border-stone-line bg-white px-4 py-3 text-base text-ink shadow-sm transition-colors duration-200 placeholder:text-slate-400 focus:border-javeriana-blue dark:border-javeriana-blue-800 dark:bg-javeriana-blue-950 dark:text-white"
            placeholder="Ej. María Camila Restrepo"
            aria-invalid={Boolean(errors.name)}
            {...register('name', {
              required: 'El nombre es obligatorio.',
              minLength: { value: 3, message: 'Ingresa al menos 3 caracteres.' }
            })}
          />
          {errors.name ? <p className="mt-2 text-sm font-semibold text-red-700">{errors.name.message}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-blue-50">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-2 min-h-12 w-full rounded-sm border border-stone-line bg-white px-4 py-3 text-base text-ink shadow-sm transition-colors duration-200 placeholder:text-slate-400 focus:border-javeriana-blue dark:border-javeriana-blue-800 dark:bg-javeriana-blue-950 dark:text-white"
            placeholder="usuario@javeriana.edu.co"
            aria-invalid={Boolean(errors.email)}
            {...register('email', {
              required: 'El correo es obligatorio.',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Ingresa un correo con formato válido.'
              }
            })}
          />
          {errors.email ? (
            <p className="mt-2 text-sm font-semibold text-red-700">{errors.email.message}</p>
          ) : showInstitutionalEmailTip ? (
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-javeriana-gold">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              Se recomienda usar un correo con dominio {JAVERIANA_DOMAIN}.
            </p>
          ) : (
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-blue-100">
              <CheckCircle2 className="h-4 w-4 text-javeriana-blue dark:text-javeriana-gold" aria-hidden="true" />
              Preferiblemente dominio institucional {JAVERIANA_DOMAIN}.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-stone-line bg-slate-50 px-6 py-5 dark:border-javeriana-blue-800 dark:bg-javeriana-blue-950 sm:flex-row sm:justify-end sm:px-8">
        <Button onClick={onCancel} type="button" variant="ghost">
          Cancelar
        </Button>
        <Button disabled={isSubmitting || !selectedProgram} type="submit">
          <Send className="h-4 w-4" aria-hidden="true" />
          Enviar registro
        </Button>
      </div>
    </form>
  );
};
