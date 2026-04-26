import type { Program } from '../../types/program.types';
import { ProgramCard } from './ProgramCard';

interface ProgramListProps {
  programs: Program[];
  onEnroll: (program: Program) => void;
}

export const ProgramList = ({ programs, onEnroll }: ProgramListProps) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {programs.map((program) => (
      <ProgramCard key={program.id} program={program} onEnroll={onEnroll} />
    ))}
  </div>
);
