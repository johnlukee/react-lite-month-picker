export const getFirstDayOfMonth = (m?: { year: number; month: number }) =>
  m ? new Date(m.year, m.month - 1, 1) : undefined;

export const getLastDayOfMonth = (date?: {
  year: number;
  month: number;
}): Date | undefined => {
  if (!date) return undefined;

  return new Date(date.year, date.month, 0);
};

export const dateToMonthObject = (
  date?: Date
): { year: number; month: number } | undefined => {
  return date
    ? { year: date.getFullYear(), month: date.getMonth() + 1 }
    : undefined;
};
