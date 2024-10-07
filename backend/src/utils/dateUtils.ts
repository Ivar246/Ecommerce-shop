export const parseIsoDate = (iso: string): Date => {
  const parsedDate = new Date(iso);

  return parsedDate;
};

export const MILLISECONDS24 = 24 * 60 * 60 * 1000;
