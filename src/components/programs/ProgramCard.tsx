import { CalendarDays, Clock3, MapPin, UserPlus } from 'lucide-react';
import { memo } from 'react';
import type { Program } from '../../types/program.types';
import { Button } from '../ui/Button';

interface ProgramCardProps {
  program: Program;
  onEnroll: (program: Program) => void;
}

const ProgramCardComponent = ({ program, onEnroll }: ProgramCardProps) => (
  <article className="group flex h-full min-h-[430px] flex-col overflow-hidden rounded-sm border border-stone-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-javeriana-blue-800 dark:bg-javeriana-blue-900">
    <div className="relative h-44 overflow-hidden bg-javeriana-blue-100">
      <img
        src={program.imageUrl}
        alt={`Imagen representativa de ${program.title}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-javeriana-blue via-javeriana-blue/35 to-transparent" />
      <span className="absolute bottom-4 left-4 rounded-sm bg-javeriana-gold px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-javeriana-blue">
        {program.category}
      </span>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-blue-100">
        {program.faculty}
      </p>
      <h3 className="font-serif text-2xl font-bold leading-7 text-javeriana-blue dark:text-white">
        {program.title}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-blue-100">
        {program.description}
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-2 border-y border-stone-line py-4 text-sm text-slate-700 dark:border-javeriana-blue-800 dark:text-blue-50">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-javeriana-gold" aria-hidden="true" />
          <dt className="sr-only">Duración</dt>
          <dd>{program.duration}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-javeriana-gold" aria-hidden="true" />
          <dt className="sr-only">Modalidad</dt>
          <dd>{program.modality}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-javeriana-gold" aria-hidden="true" />
          <dt className="sr-only">Inscripción</dt>
          <dd>Inscripción abierta</dd>
        </div>
      </dl>

      <Button className="mt-5" fullWidth onClick={() => onEnroll(program)}>
        <UserPlus className="h-4 w-4" aria-hidden="true" />
        Solicitar información
      </Button>
    </div>
  </article>
);

export const ProgramCard = memo(ProgramCardComponent);
