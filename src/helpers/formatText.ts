export const capitalizeWords = (value: string): string =>
  value
    .trim()
    .toLocaleLowerCase('es-CO')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase('es-CO') + word.slice(1))
    .join(' ');

export const sentenceCase = (value: string): string => {
  const normalized = value.trim().replace(/\s+/g, ' ');

  if (normalized.length === 0) {
    return normalized;
  }

  return normalized.charAt(0).toLocaleUpperCase('es-CO') + normalized.slice(1);
};

export const formatDate = (isoDate: string): string =>
  new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(isoDate));
