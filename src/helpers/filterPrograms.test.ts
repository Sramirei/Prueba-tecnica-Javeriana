import { describe, expect, it } from 'vitest';
import { filterPrograms } from './filterPrograms';
import type { Program } from '../types/program.types';

const programs: Program[] = [
  {
    id: '1',
    title: 'Ingeniería de Sistemas',
    description: 'Tecnología y software',
    category: 'Pregrado',
    imageUrl: '',
    faculty: 'Facultad de Ingeniería',
    duration: '10 semestres',
    modality: 'Presencial'
  },
  {
    id: '2',
    title: 'Maestría en Analítica',
    description: 'Datos e inteligencia de negocios',
    category: 'Posgrado',
    imageUrl: '',
    faculty: 'Facultad de Ciencias Económicas',
    duration: '4 semestres',
    modality: 'Híbrido'
  }
];

describe('filterPrograms', () => {
  it('filtra por categoría y texto de búsqueda', () => {
    const result = filterPrograms(programs, {
      category: 'Posgrado',
      searchTerm: 'analítica'
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Maestría en Analítica');
  });

  it('retorna todos los programas cuando la categoría es Todos y no hay búsqueda', () => {
    expect(filterPrograms(programs, { category: 'Todos', searchTerm: '' })).toHaveLength(2);
  });
});
