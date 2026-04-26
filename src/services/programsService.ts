import { getPosts, type JsonPlaceholderPost } from '../api/jsonPlaceholderApi';
import { sentenceCase } from '../helpers/formatText';
import type { Program, ProgramCategory, ProgramModality } from '../types/program.types';

const PROGRAM_NAMES = [
  'Derecho y Ciencias Políticas',
  'Ingeniería de Sistemas',
  'Medicina',
  'Comunicación Social',
  'Maestría en Analítica para la Inteligencia de Negocios',
  'Especialización en Gerencia Financiera',
  'Diplomado en Innovación Educativa',
  'Curso de Liderazgo Público',
  'Arquitectura',
  'Psicología',
  'Maestría en Estudios Culturales',
  'Seminario de Transformación Digital'
] as const;

const FACULTIES = [
  'Facultad de Ciencias Jurídicas',
  'Facultad de Ingeniería',
  'Facultad de Medicina',
  'Facultad de Comunicación y Lenguaje',
  'Facultad de Ciencias Económicas y Administrativas',
  'Educación Continua'
] as const;

const PROGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=900'
] as const;

const categories: ProgramCategory[] = ['Pregrado', 'Posgrado', 'Educación Continua'];
const modalities: ProgramModality[] = ['Presencial', 'Híbrido', 'Virtual'];

const getProgramCategory = (post: JsonPlaceholderPost): ProgramCategory =>
  categories[(post.id - 1) % categories.length];

const getDurationByCategory = (category: ProgramCategory): string => {
  const durationByCategory: Record<ProgramCategory, string> = {
    Pregrado: '8 a 10 semestres',
    Posgrado: '2 a 4 semestres',
    'Educación Continua': '24 a 96 horas'
  };

  return durationByCategory[category];
};

const transformPostToProgram = (post: JsonPlaceholderPost): Program => {
  const category = getProgramCategory(post);
  const programName = PROGRAM_NAMES[(post.id - 1) % PROGRAM_NAMES.length];

  return {
    id: String(post.id),
    title: programName,
    description: `${sentenceCase(post.body)} Este espacio académico integra excelencia disciplinar, acompañamiento docente y enfoque de servicio a la sociedad.`,
    category,
    imageUrl: PROGRAM_IMAGES[(post.id - 1) % PROGRAM_IMAGES.length],
    faculty: FACULTIES[(post.userId - 1) % FACULTIES.length],
    duration: getDurationByCategory(category),
    modality: modalities[(post.id - 1) % modalities.length]
  };
};

export const getAcademicPrograms = async (): Promise<Program[]> => {
  const posts = await getPosts(12);

  return posts.map(transformPostToProgram);
};
